import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "../ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

import { useEffect, useState } from "react"

import {getAllSignatory} from "@/controller/signatory"
import { DataTable } from "../DataTable"
import { ColumnDef, Row } from "@tanstack/react-table"

import { Card } from "../ui/card"
import { Signatory } from "@/lib/types"
import { payrollSchema } from "@/schemas"


import {generatePayPeriodDates} from "@/lib/payperiodCalculation"
import { createPayroll, PayrollSubmission } from "@/controller/payroll"
import { EmployeeTable } from "@/pages/EmployeePage"
import { zodResolver } from "@hookform/resolvers/zod"

export type SignatoryData = {
 id: string,
 employeeId: string,
 signatoryName: string,
 fullname: string,
 designation: string,
 department: string,
}

const columns : ColumnDef<SignatoryData>[] =[
    {
        accessorKey: "id",
        header: "ID",
    },{
        accessorKey: "signatoryName",
        header: "Signatory",
    },{
        accessorKey: "fullname",
        header: "Fullname",
    },{
        accessorKey: "designation",
        header: "Designation",
    },{
        accessorKey: "department",
        header: "Department",
    }
]

type EmpData = {
    data: EmployeeTable
}
export function PayrollForm({data} : EmpData){
    const [employee, setEmployee] = useState<EmployeeTable>(data)
    const [signatory, setSignatory] = useState<SignatoryData[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [payPeriodDates, setPayPeriodDates] = useState<{ startDate: string; endDate: string; } | null>(null);
    const [selectedPayPeriod, setSelectedPayPeriod] = useState<string>();

    const {toast} = useToast();

    const handlePayPeriodChange = (value: string) => {
        setSelectedPayPeriod(value);
        const dates = generatePayPeriodDates(value);
        setPayPeriodDates(dates);
      };


    useEffect(()=> {
        const handleData = async() => {
            try {
                const fetchSignatory = await getAllSignatory()
                
                const newList: SignatoryData[] = fetchSignatory.map( (signatory : Signatory) => {
                    const { id, name, employee } = signatory
                    const {employeeData, department, designation } = employee;
        
                    const { firstname, middlename, lastname } = employeeData;
                    const fullname = `${firstname} ${middlename} ${lastname}`;

                    return{
                        id: id,
                        employeeId: employee.id,
                        signatoryName: name,
                        fullname: fullname,
                        designation: designation.designationName,
                        department: department.departmentName,
                    }
                })
                setSignatory(newList)
            }catch(error){
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        setIsLoading(true)
        handleData()
    }, [])
   
    
    const form = useForm<z.infer<typeof payrollSchema>>({
        resolver: zodResolver(payrollSchema)
    })

    const handleSubmit = async (data: z.infer<typeof payrollSchema>) => {
        try {
            const parts = data.signatory.split('-');
            
            if(payPeriodDates){
                const newData : PayrollSubmission= {
                    signatory: parts[1],
                    employee: employee.id.toString(),
                    start: payPeriodDates.startDate,
                    end: payPeriodDates.endDate,
                }
                await createPayroll(newData)
                toast({
                    variant: "default",
                    title: "Data Added",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        
                          <code className="text-white">{JSON.stringify(newData, null, 2)}</code>
                        </pre>
                      ),
                })
            } else {
                throw Error
            }
           
        } catch (error) {
            // If an error occurs during submission, handle it here
            console.error("Error submitting data:", error);
    
            toast({
                variant: "destructive",
                title: "Error submitting data",
                description: "An error occurred while submitting the data. Please try again later.",
            });
        } 
    }
    // useEffect(() => {
    //     console.log(positions)
    // })
    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 py-4">
                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="signatory"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Signatory</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Signatory" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {signatory.map((d,i) => (
                                                <SelectItem key={i} value ={`${d.employeeId}-${d.id}-${d.signatoryName}`}>{d.signatoryName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="payperiod"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Pay Period</FormLabel>
                                    <Select 
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            handlePayPeriodChange(value);
                                            }
                                        }
                                        defaultValue={selectedPayPeriod}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a pay period" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value = {"Monthly"}>Montly</SelectItem>
                                            <SelectItem value = {"Semi-Monthly"}>Semi-Monthly</SelectItem>
                                            <SelectItem value = {"Bi-Weekly"}>Bi-Weekly</SelectItem>
                                            <SelectItem value = {"Weekly"}>Weekly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <Card className="p-5">
                        {payPeriodDates ? (
                            <>
                                <p>Pay period starts on {payPeriodDates.startDate} and ends on {payPeriodDates.endDate}</p>
                            </>
                            ) : (
                            <p>Please select a pay period</p>
                            )}
                        </Card>
                        <Button type="submit">Submit</Button>
                    </div>
                    <div>
                        {isLoading ? (
                            <Card className="p-5">Please Wait While we're fetching data</Card>
                        ) : (
                            <DataTable columns={columns} data={signatory}/>
                        )}
                        
                    </div>
            </div>
        </form>
    </Form>
    
  )
}
