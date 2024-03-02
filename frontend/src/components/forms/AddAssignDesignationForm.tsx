import {
    Form,
    FormControl,
    FormField,
    FormItem,

  } from "@/components/ui/form"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { AssignDesignation } from "@/schemas"
import { z } from "zod"
import { DialogFooter } from "../ui/dialog"
import { Label } from "../ui/label"
import { useToast } from "../ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { newAssignDesignation } from "@/controller/assigned"
import { useParams } from "react-router-dom"


export function AddAssignDesignationForm(){
    
    const { id } = useParams<{ id: string }>();
    const {toast} = useToast();
    const form = useForm<z.infer<typeof AssignDesignation>>({
        defaultValues: {
            empNum: id,
            designationId: "",
            employeeType:  "",
            status:  ""
        }
    });
    const handleSubmit = (data: z.infer<typeof AssignDesignation>) => {
        
        toast({
            variant: "default",
            title: "Data Added, Kindly Refresh the page",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
              ),
        })
        newAssignDesignation(data)// Pass the updated employeeData object to the sumbitEmployeeData function
    }
    
    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="">
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="designationId" className="text-right"> Department name </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="designationId"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a designation" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">Manager</SelectItem>
                                            <SelectItem value="2">Software Engineer</SelectItem>
                                            <SelectItem value="3">Financial Analyst</SelectItem>
                                            <SelectItem value="4">Marketing Specialist</SelectItem>
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
