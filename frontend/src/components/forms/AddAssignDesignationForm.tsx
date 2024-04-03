import {
    Form,
    FormControl,
    FormField,
    FormItem,
  } from "@/components/ui/form"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DialogFooter } from "../ui/dialog"
import { Label } from "../ui/label"
import { useToast } from "../ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllDesignation } from "@/controller/designation"
import { AddAssignDesignationSchema, Designation } from "@/lib/types"
import { AssignDesignationSchema } from "@/schemas"
import { submitAssignDesignation } from "@/controller/assigned"

export function AddAssignDesignationForm(){
    const [designation, setdesignation] = useState<Designation[]>([]);
    const { id } = useParams<{ id: string }>();
    const {toast} = useToast();
    const [isLoading, setIsLoading] = useState<Boolean>(true);


    useEffect(()=> {
        const handleData = async() => {
            try {
                const response = await getAllDesignation()
                console.log(response)
                setdesignation(response);
            }catch(error){
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        handleData()
    }, [])
   
    
    
    const form = useForm<z.infer<typeof AssignDesignationSchema>>()

    const handleSubmit = async (data: z.infer<typeof AssignDesignationSchema>) => {
        try {
            const handledData: AddAssignDesignationSchema = {
                employeeType: data.employeeType,
                status: data.status,
                designation: data.designation,
                employee: id || "",
            };
    
            await submitAssignDesignation(handledData, designation);
    
            // If the promise resolves without throwing an error, it means the submission was successful
            toast({
                variant: "default",
                title: "Data Submitted",
            });
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
    if(isLoading){
        return null
    }
    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="">
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="designation.designationName" className="text-right"> Designation name </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="designation"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a designation" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {designation.map((d,i) =>(
                                                 <SelectItem key={i} value={d.designationName}>{d.designationName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="employeeType" className="text-right"> Employee Type </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="employeeType"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a employee type" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Regular">Regular</SelectItem>
                                            <SelectItem value="Part-Time">Part-Time</SelectItem>
                                            <SelectItem value="Probation">Probation</SelectItem>
                                            <SelectItem value="Probation">Dropped</SelectItem>
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
                                            <SelectItem value="Resigned">Resigned</SelectItem>
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
