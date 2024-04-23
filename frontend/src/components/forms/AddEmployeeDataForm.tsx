import {
    Form,
    FormControl,
    FormField,
    FormItem,

    FormLabel,

    FormMessage,
  } from "@/components/ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useToast } from "../ui/use-toast"
import { Separator } from "../ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { DataEmployeeSchema } from "@/schemas"
import { sumbitEmployeeData } from "@/controller/dataemployee"
import { useState } from "react"

export function AddEmployeeDataForm(){
    
    const {toast} = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm<z.infer<typeof DataEmployeeSchema>>({
        resolver: zodResolver(DataEmployeeSchema),
        defaultValues :{
            firstname: "",
            middlename: "",
            lastname: "",
            birthday: "",
            email: "",
            gender:"",
            addressLine: "",
            barangay: "",
            country: "",
            province: "",
        },        
        

    });

    const handleSubmit = async (data: z.infer<typeof DataEmployeeSchema>) => {
        setIsSubmitting(true)
        try{
            await sumbitEmployeeData(data)
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
            // If an error occurs during submission, handle it here
            console.error("Error submitting data:", error);
    
            toast({
                variant: "destructive",
                title: "Error submitting data",
                description: "An error occurred while submitting the data. Please try again later.",
            });
        } finally{
            setIsSubmitting(false)
        }
        
    }
    
    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-20">
            <div className="flex flex-col gap-5">
                {/* User Information */}
                <div className="grid grid-cols-3 gap-5">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Firstname</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="Firstname" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="middlename"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Middlename</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="Middlename" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lastname</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="Lastname" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Birthdate</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="MM/DD/YYYY" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}
                    /> 
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value} disabled = {isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Select gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value = {"Male"}>Male</SelectItem>
                                            <SelectItem value = {"Female"}>Female</SelectItem>
                                            <SelectItem value = {"Other"}>Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                    )}
                    />


                </div>
                {/* Contact Information */}
                <Separator/>
                <div className="grid grid-cols-3 gap-5">
                    <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact #</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="09343256782" 
                                        {...field}
                                        value={field.value || ''}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const parsedValue = parseInt(value);

                                            if (!isNaN(parsedValue)) {
                                                field.onChange(parsedValue);
                                            } else {
                                                field.onChange(value);
                                            }
                                        }}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="example@example.com" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}
                    />
                </div>
                {/* Adress / Location Information */}
                <Separator/>
                <div className="grid grid-cols-3 gap-5">
                    <FormField
                        control={form.control}
                        name="addressLine"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address line</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="street something" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="barangay"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Barangay</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="District X" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Province</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="Province X" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="Country X" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                    )}
                    />
                </div>
            
            </div>

            <Button type="submit">Submit</Button>
        </form>
    </Form>
  )
}


