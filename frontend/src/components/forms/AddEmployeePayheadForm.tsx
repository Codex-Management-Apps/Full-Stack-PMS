import { Employee, Payhead } from "@/lib/types"
import { AssignPayheadSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "../ui/use-toast";
import { getAllPayheads } from "@/controller/payhead";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getEmployeeById } from "@/controller/employee";
import { Textarea } from "../ui/textarea";
import { createAssignPayhead } from "@/controller/asssignPayhead";


export function AddEmployeePayheadForm(){
    const currentRan = useRef(false);
    const { id } = useParams<{ id: string }>();
    
    const [payhead, setPayhead] = useState<Payhead[]>([])
    const [employee, setEmployee] = useState<Employee>()
    useEffect(() => {
        if(currentRan.current == false){
            const handleData = async() =>{
                try {
                    const fetch = await getAllPayheads();
                    setPayhead(fetch)
                } catch (error) {
                    console.log(error)
                }
            }
            const getEmployee = async() =>{
                try {
                    const fetch = await getEmployeeById(id);
                    setEmployee(fetch)
                } catch (error) {
                    console.log(error)
                }
            }
            currentRan.current = true
            handleData()
            getEmployee()
        }
    },[])

    const form = useForm<z.infer<typeof AssignPayheadSchema>>({
        resolver: zodResolver(AssignPayheadSchema),
        defaultValues: {
            payhead: '',
            amount: '',
            description:'',
        }
    });
    const handleSubmit = async (data : z.infer<typeof AssignPayheadSchema>) => {
        try {
            if(employee){
                const newData = {
                    ...data,
                    payhead: payhead.find(d => d.id === Number(data.payhead)),
                    employee: employee
                }
                createAssignPayhead(newData)
                toast({
                    variant: "default",
                    title: "Data Added, Kindly Refresh the page",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(newData, null, 2)}</code>
                        </pre>
                        ),
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error, null, 2)}</code>
                    </pre>
                    ),
            })
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="payhead"
                            render = {({field}) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                        <Select onValueChange={ field.onChange } defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                    placeholder="Select a payhead" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {payhead.map((d,i) => (
                                                    <SelectItem key={i} value={String(d.id)}>{d.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input 

                                            placeholder="Amount" 
                                            {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                        )}
                        />


                    </div>
                    <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Short Description" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                        )}
                        />
                    <DialogFooter>
                        <Button type="submit"> Submit</Button>
                    </DialogFooter>
                </form>
        </Form>
    )
}