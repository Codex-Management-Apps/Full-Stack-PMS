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
import { zodResolver } from "@hookform/resolvers/zod"

import { DialogFooter } from "../ui/dialog"
import { Label } from "../ui/label"
import { useToast } from "../ui/use-toast"
import { sumbitEmployeeData } from "@/controller/employee"
import { setCurrentDate } from "@/lib/utils"

export function AddEmployeeForm(){

    const {toast} = useToast();

    const form = useForm<z.infer<typeof addEmpSchema>>({
        resolver: zodResolver(addEmpSchema),
        defaultValues: {
            last_update: setCurrentDate(),
        }
    });

    const handleSubmit = (data: z.infer<typeof addEmpSchema>) => {
        toast({
            variant: "default",
            title: "Data Added, Kindly Refresh the page",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
              ),
        })
        sumbitEmployeeData(data)
        // Pass the updated employeeData object to the sumbitEmployeeData function
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
                                            placeholder="middlename"
                                            type="middlename"/>
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
                                            placeholder="lastname"
                                            type="lastname"/>
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
                                            placeholder="address_line"
                                            type="addressline"/>
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
                                            placeholder="barangay"
                                            type="barangay"/>
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
                                            placeholder="province"
                                            type="province"/>
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
                                            placeholder="country"
                                            type="country"/>
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
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </div>
            
        </form>
    </Form>
  )
}
