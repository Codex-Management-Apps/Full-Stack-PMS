import { updateAssignPayhead } from "@/controller/asssignPayhead";
import { AssignPayhead } from "@/lib/types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import { AssignPayheadSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Card } from "../ui/card";
import { Table, TableBody, TableRow, TableCell } from "../ui/table";

export function EditAssignPayheadForm({data}:any){
    const {toast} = useToast();
    const [payhead, setPayhead] = useState<AssignPayhead>(data)
    const form = useForm<z.infer<typeof AssignPayheadSchema>>({
        resolver: zodResolver(AssignPayheadSchema),
        defaultValues:{
            amount: payhead.amount || '',
            description: payhead.description || ''
        }
    });
    const handleSubmit = async(output: z.infer<typeof AssignPayheadSchema>) =>{
        try {
            console.log(output)
            const newData = {
                ...data,
                amount: output.amount,
                description: output.description
            }
            updateAssignPayhead(String(payhead.id),newData)
            toast({
                variant: "default",
                title: "Data Added, Kindly Refresh the page",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(newData, null, 2)}</code>
                    </pre>
                    ),
            })
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
                className="flex flex-col gap-10">
                <Card>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <span className="font-bold">Name</span>
                                </TableCell>
                                <TableCell>
                                    {payhead?.payhead.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <span className="font-bold">Type</span>
                                </TableCell>
                                <TableCell>
                                    {payhead?.payhead.type}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
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
                    <Button type="submit">Submit</Button>
                    </DialogFooter>
            </form>
        </Form>
    )
}