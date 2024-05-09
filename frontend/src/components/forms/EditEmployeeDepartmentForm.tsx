import {
    Form,
    FormControl,
    FormField,
    FormItem,

    FormLabel,

  } from "@/components/ui/form"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useEffect, useRef, useState } from "react";
import { Department, Employee } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getAllDepartments } from "@/controller/department";
import { z } from "zod";
import { DepartmentEmployeeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateEmployee } from "@/controller/employee";

type Props = {
    data : Employee
}
export function EditEmployeeDepartmentForm({data} : Props){
    const {toast} = useToast();
    const currentRun = useRef(false);
    const [employeeDepartment, setEmployeeDepartment] = useState<Department>(data.department)
    const [department, setDepartment] = useState<Department[]>([]);

    useEffect(() =>{
        if(currentRun.current === false){
            const getDepartments = async() =>{
                try {
                    const fetch = await getAllDepartments();
                    setDepartment(fetch);
                } catch (error) {
                    console.log(error)
                }
            }
            currentRun.current = true;
            getDepartments();
        }
    },[])
    const form = useForm<z.infer<typeof DepartmentEmployeeSchema>>({
        resolver: zodResolver(DepartmentEmployeeSchema),
        defaultValues: {
            department: String(employeeDepartment.id),
        }

    });

    const handleSubmit = async (output:z.infer<typeof DepartmentEmployeeSchema>) => {
        try{
            const newData = {
                ...data,
                department: department.find(d => d.id === Number(output.department))
            }
            await UpdateEmployee(newData,String(data.id))
            toast({
                variant: "default",
                title: "Data Added, Kindly Refresh the page",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(newData, null, 2)}</code>
                    </pre>
                    ),
            })
        }catch (error) {
            console.error("Error submitting data:", error);
            toast({
                variant: "destructive",
                title: "Error submitting data",
                description: "An error occurred while submitting the data. Please try again later.",
            });
        } 
    }
    
    return (

        <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-10">
                <FormField
                        control={form.control}
                        name="department"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Department</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Choose a Department" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {department.map((d,i) => (
                                                <SelectItem key={i} value={String(d.id)}>{d.departmentName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    />
                
            <Button type="submit">Submit</Button>
        </form>
        </Form>

  )
}
