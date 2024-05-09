import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "../ui/button"

import { DialogFooter } from "../ui/dialog"

import { ColumnDef } from "@tanstack/react-table"
import { useRef, useState, useEffect } from "react"
import { Employee } from "@/lib/types";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "../ui/use-toast"
import { SignatorySchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { DataTable } from "../DataTable"
import { getAllEmployee } from "@/controller/employee"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { createSignatory } from "@/controller/signatory"


const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "empNum",
      header: "ID",
    },{
      accessorKey: "employeeData.firstname",
      header: "Firstname",
    },{
      accessorKey: "employeeData.middlename",
      header: "Middlename",
    },{
      accessorKey: "employeeData.lastname",
      header: "Lastname",
    },{
      accessorKey: "employeeType",
      header: "EmployeeType",
    },{
      accessorKey: "status",
      header: "Status",
    },{
      accessorKey: "department.departmentName",
      header: "Department",
    },{
      accessorKey: "designation.designationName",
      header: "Designation",
    },{
        accessorKey: "createdAt",
        header: "Joined",
    }
  ]

export function AddSignatoryForm(){

    const {toast} = useToast(); 
    const currentRan = useRef(false)
    const [employee, setEmployee] = useState<Employee[]>([]);

    
    useEffect(()=>{
      if(currentRan.current === false){
          const getData = async () =>{
              try {
                    const data = await getAllEmployee();
                    console.log(data)
                    setEmployee(data);
              } catch (error) {
                console.log(error)
              }
            }
            currentRan.current = true
            getData()
      }
    },[])

    const form = useForm<z.infer<typeof SignatorySchema>>({
        resolver: zodResolver(SignatorySchema),
        defaultValues: {
            name : '',
            status: '',
            employee: '',
        }
    });

    const handleSubmit = async (data : any) =>{
        try {
            const newData = {
                ...data,
                employee: employee.find(d => d.id === Number(data.employee)),
            }
            createSignatory(newData)
            toast({
                variant: "default",
                title: "Data Added, Kindly Refresh the page",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(newData, null, 2)}</code>
                    </pre>
                    ),
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error, null, 2)}</code>
                    </pre>
                    ),
            })
        }
    }
    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-5">
                <div className="grid grid-cols-3 gap-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Signatory Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Signatory name" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="employee"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Assign a Employee</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Choose a Employee" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {employee.map((d,i) => (
                                                <SelectItem key={i} value={String(d.id)}>{d.empNum}</SelectItem>
                                            ))}
                                        </SelectContent>
                                        <FormMessage/>
                                    </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value = {"Active"}>Active</SelectItem>
                                            <SelectItem value = {"Inactive"}>Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    />
                </div>
                <Separator/>
                <DataTable columns={columns} data={employee}/>
            <DialogFooter>
                <Button type="submit">Submit</Button>
            </DialogFooter>
        </form>
    </Form>
    
  )
}
