import {
    Form,
    FormControl,
    FormField,
    FormItem,

    FormLabel,

    FormMessage,
  } from "@/components/ui/form"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Employee, EmployeeData } from "@/lib/types";
import { z } from "zod";
import { DataEmployeeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { UpdateEmployee } from "@/controller/employee";

type Props = {
    data : Employee
}

export function EditEmployeeDataForm({data} : Props){
    const {toast} = useToast();
    const [employeeData, setEmployeeData] = useState<EmployeeData>(data.employeeData)
    const form = useForm<z.infer<typeof DataEmployeeSchema>>({
        resolver: zodResolver(DataEmployeeSchema),
        defaultValues:{
            firstname: employeeData.firstname,
            middlename: employeeData.middlename,
            lastname: employeeData.lastname,
            birthday: employeeData.birthday,
            contact: Number(employeeData.contact),
            email: employeeData.email,
            gender: employeeData.gender,
            addressLine: employeeData.addressLine,
            barangay: employeeData.barangay,
            country: employeeData.country,
            province: employeeData.province,
        }
    });

    const handleSubmit = async (output:any) => {
        try{
            const newOutput =  {
                ...output,
                id: employeeData.id,
            }
            data.employeeData = newOutput

            await UpdateEmployee(data, String(data.id))
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
                                    <Select onValueChange={ field.onChange } defaultValue={field.value}>
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
