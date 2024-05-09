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
import { Employee } from "@/lib/types";
import { z } from "zod";
import { EmployeeStatusSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UpdateEmployee } from "@/controller/employee";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
    data : Employee
}

export function EditEmployeeForm({data} : Props){
    const {toast} = useToast();
    const [employee, setEmployee] = useState<Employee>(data)
    const form = useForm<z.infer<typeof EmployeeStatusSchema>>({
        resolver: zodResolver(EmployeeStatusSchema),
        defaultValues:{
            status: employee.status
        }
    });

    const handleSubmit = async (output:z.infer<typeof EmployeeStatusSchema>) => {
        try{
            const newOutput =  {
                ...data,
                status: output.status
            }

            await UpdateEmployee(newOutput, String(data.id))
            toast({
                variant: "default",
                title: "Data Added, Kindly Refresh the page",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
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
            className="w-full flex flex-col gap-20">
            <div className="flex flex-col gap-5">

                <FormField
                        control={form.control}
                        name="status"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    />
            </div>
            <Button type="submit">Submit</Button>
        </form>
    </Form>

  )
}
