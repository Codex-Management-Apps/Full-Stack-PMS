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
import { Department, Designation, Employee } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { z } from "zod";
import { DesignationEmployeeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateEmployee } from "@/controller/employee";
import { getAllDesignation } from "@/controller/designation";

type Props = {
    data : Employee
}
export function EditEmployeeDesignationForm({data} : Props){
    const {toast} = useToast();
    const currentRun = useRef(false);
    const [employeeDesignation, setEmployeeDesignation] = useState<Department>(data.department)
    const [designation, setDesignation] = useState<Designation[]>([]);

    useEffect(() =>{
        if(currentRun.current === false){
            const getDesignations = async() =>{
                try {
                    const fetch = await getAllDesignation();
                    setDesignation(fetch);
                } catch (error) {
                    console.log(error)
                }
            }
            currentRun.current = true;
            getDesignations();
        }
    },[])
    const form = useForm<z.infer<typeof DesignationEmployeeSchema>>({
        resolver: zodResolver(DesignationEmployeeSchema),
        defaultValues: {
            designation: String(employeeDesignation.id),
        }

    });

    const handleSubmit = async (output:z.infer<typeof DesignationEmployeeSchema>) => {
        try{
            const newData = {
                ...data,
                designation: designation.find(d => d.id === Number(output.designation))
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
                        name="designation"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Designation</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Choose a Designation" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {designation.map((d,i) => (
                                                <SelectItem key={i} value={String(d.id)}>{d.designationName}</SelectItem>
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
