import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
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

import { RequestFileLeave } from "@/schemas"
import { Input } from "../ui/input"
import { getPositionByEmployeeId } from "@/controller/assignPosition"
import { AddRequestFileLeaveSchema, AssignPosition } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { createFileLeaveRequest } from "@/controller/requestLeave"

export function FileRequestLeaveForm(){

    const [employee, setEmployee] = useState<AssignPosition>();
    const { id } = useParams<{ id: string }>();
    const {toast} = useToast();
    const [isLoading, setIsLoading] = useState<Boolean>(true);


    useEffect(()=> {
        const handleData = async() => {
            try {
                const response = await getPositionByEmployeeId(id || "")
                console.log(response)
                setEmployee(response);
            }catch(error){
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        handleData()
    }, [])
   
    
    
    const form = useForm<z.infer<typeof RequestFileLeave>>()

    const handleSubmit = async (data: z.infer<typeof RequestFileLeave>) => {
        try {
            
            const newData : AddRequestFileLeaveSchema= {
                ...data,
                employee: employee!
            }
            await createFileLeaveRequest(newData)
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
                <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="designation.designationName" className="text-right "> Employee Name </Label>
                    <div className="col-span-3">
                        <Input value={employee?.employee.employee.firstname + " " + employee?.employee.employee.lastname} readOnly/>
                    </div>

                    <Label htmlFor="designation.designationName" className="text-right"> Department</Label>
                    <div className="col-span-3">
                    <Input value={employee?.employee.designation.departmentId.departmentName} readOnly/>
                    </div>
                </div>
                
                <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="designation.designationName" className="text-right"> Designation </Label>
                    <div className="col-span-3">
                        <Input value={employee?.employee.designation.designationName} readOnly/>
                    </div>

                    <Label htmlFor="designation.designationName" className="text-right"> Employement Number</Label>
                    <div className="col-span-3">
                        <Input value={employee?.employee.employee.id} readOnly/>
                    </div>
                </div>

                <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="reason" className="text-right"> Reason </Label>
                    <div className=" col-span-7">
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Reason For Request Leave" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Sick">Sick</SelectItem>
                                            <SelectItem value="Bereavement">Bereavement</SelectItem>
                                            <SelectItem value="Unpaid Leave">Unpaid Leave</SelectItem>
                                            <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                                            <SelectItem value="Maternity/Paternity">Maternity/Paternity</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-8 items-center gap-4">
                    <Label htmlFor="dateOfLeave" className="text-right"> Date Of Leave </Label>
                    <div className="col-span-3">
                       
                        <FormField
                            control={form.control}
                            name="dateOfLeave"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            id="dateOfLeave"
                                            placeholder="Month / Day  / Year"
                                            type="dateOfLeave"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Label htmlFor="dateOfEnd" className="text-right"> Date Of End </Label>
                    <div className="col-span-3">
                       
                        <FormField
                            control={form.control}
                            name="dateOfEnd"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            id="dateOfEnd"
                                            placeholder="Month / Day  / Year"
                                            type="dateOfEnd"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-8 items-center gap-4">
                    <div className="col-span-8">
                    <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Leave a message"
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Write anything you want to say that is important
                        </FormDescription>
                        <FormMessage />
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
