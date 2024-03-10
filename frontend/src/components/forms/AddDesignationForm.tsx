import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { DialogFooter } from "../ui/dialog"
import { Label } from "../ui/label"
import { useToast } from "../ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { DesignationSchema } from "@/schemas"
import { Department } from "@/lib/types"
import { useState, useEffect } from "react"
import { getAllDepartments } from "@/controller/department"
import { Designation, sumbitDesignationData } from "@/controller/designation"


export function AddDesignationForm(){
    const {toast} = useToast();
    const [department, setdepartment] = useState<Department[]>([]);

    useEffect(()=> {
        handleData();
    }, [])

    const handleData = async() => {
        try {
            const response = await getAllDepartments()
            console.log(response)
            setdepartment(response);
        }catch(error){
            console.log(error)
        }
    }
    const form = useForm<z.infer<typeof DesignationSchema>>({
        defaultValues: {
            departmentId:{
                id: "", 
                departmentName: ""
            },
            status: "",
        }
    });
    const handleSubmit = (data: z.infer<typeof DesignationSchema>) => {
        const newData: Designation = {
            ...data,
            designationName: data.designationName,
            status: data.status,
            departmentId: (() => {
                const matchingDepartment = department.find(
                    (d) => d.departmentName === data.departmentId.departmentName
                );
    
                return matchingDepartment ? matchingDepartment.id : null;
            })()|| null,
        };
    
        toast({
            variant: "default",
            title: "Data Added, Kindly Refresh the page",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(newData, null, 2)}</code>
                </pre>
            ),
        });
    
        // Pass the updated employeeData object to the sumbitEmployeeData function
        sumbitDesignationData(newData);
    };
    
    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="">
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="designationName" className="text-right"> Designation name </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="designationName"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            id="designationName"
                                            placeholder="designation name"
                                            type="designationName"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="departmentId.departmentName" className="text-right"> Departments </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="departmentId.departmentName"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={(value) => {
                                        console.log(value)
                                        field.onChange(value)
                                    
                                    }} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a department" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {department.map((d,i) =>(
                                                 <SelectItem key={i} value={d.departmentName}>{d.departmentName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right"> Status </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="InActive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                
            <div>
                <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </div>
            </div>
        </form>
    </Form>
    
  )
}