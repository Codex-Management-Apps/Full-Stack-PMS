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

import { addEmpSchema} from "@/schemas"
import { z } from "zod"

import { DialogFooter } from "../ui/dialog"
import { Label } from "../ui/label"
import { useToast } from "../ui/use-toast"
import { Employee, UpdateEmployee } from "@/controller/employee"
import { setCurrentDate } from "@/lib/utils"


export function EditEmployeeForm(data:Employee){
    const {toast} = useToast();
    const form = useForm<z.infer<typeof addEmpSchema>>({
        defaultValues: {
            firstname: data.firstname, 
            middlename: data.middlename,
            lastname: data.lastname,
            address_line: data.address_line,
            barangay: data.barangay,
            province: data.province,
            country: data.country,
            last_update: setCurrentDate(),
        }
    });
    // use default values in forms and never use value or default value in input
    // It makes the form values static and unable to edit
    const handleSubmit = (Submitdata: z.infer<typeof addEmpSchema>) => {
       
        console.log(Submitdata)
        if(data.id !== '' || data.id !== undefined) {
            
            UpdateEmployee(Submitdata, data.id ?? '')// Pass the updated employeeData object to the sumbitEmployeeData function
            toast({
                variant: "default",
                title: "Data Updated, Kindly Refresh the page",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                      <code className="text-white">{JSON.stringify(Submitdata, null, 2)}</code>
                    </pre>
                  ),
            })
        }else{
            toast({
                variant: "destructive",
                title: "Failed to Submit data",
                description: "Something when wrong when submitting"
            })
        }
        
    }
    
    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="">
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="firstname" className="text-right"> Firstname </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="firstname"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            id="firstname"
                                            name="firstname"
                                            placeholder="firstname"
                                            type="firstname"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="middlename" className="text-right"> Middlename </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="middlename"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                    <Input 
                                    {...field}
                                    id="middlename"
                                    name="middlename"
                                    placeholder="middlename"
                                    type="text"
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lastname" className="text-right"> Lastname </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="lastname"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                    <Input 
                                        {...field}
                                        id="lastname"
                                        name="lastname"
                                        placeholder="lastname"
                                        type="text"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address_line" className="text-right"> Address Line </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="address_line"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                    <Input 
                                        {...field}
                                        id="address_line"
                                        name="address_line"
                                        placeholder="address_line"
                                        type="text"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="barangay" className="text-right"> Barangay </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="barangay"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            id="barangay"
                                            name="barangay"
                                            placeholder="barangay"
                                            type="text"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="province" className="text-right"> Province </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="province"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            id="province"
                                            name="province"
                                            placeholder="province"
                                            type="text"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="country" className="text-right"> Country </Label>
                    <div className=" col-span-3">
                        <FormField
                            
                            control={form.control}
                            name="country"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            id="country"
                                            name="country"
                                            placeholder="country"
                                            type="text"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                
            </div>
            <div>
                <DialogFooter>
                    <Button type="submit">Edit</Button>
                </DialogFooter>
            </div>
            
        </form>
    </Form>
    
  )
}
