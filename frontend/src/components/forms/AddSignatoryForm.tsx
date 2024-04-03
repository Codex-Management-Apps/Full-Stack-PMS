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

import { useEffect, useState } from "react"
import { AddPositionSchema, AddSignatorySchema, AssignPosition, Position, SignatorySubmissionSchema } from "@/lib/types"
import { getAllPosition } from "@/controller/position"
import { createSignatory, getAllSuperior, getSignatoryBySuperiorID } from "@/controller/signatory"
import { SignatorySchema } from "@/schemas"
import { DataTable } from "../DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { useParams } from "react-router-dom"
import { submitAssignPosition } from "@/controller/assignPosition"
import { getAssignDesignationByEmployeeId } from "@/controller/assigned"



const columns: ColumnDef<AssignPosition>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "position.positionName",
      header: "Status",
    },
    {
      accessorKey: "employee.employee.firstname",
      header: "Firstname",
    },
    {
        accessorKey: "employee.employee.lastname",
        header: "Lastname",
    },

  ]

export function AddSignatoryForm(){
    const [positions, setPositions] = useState<Position[]>([]);
    const { id } = useParams<{ id: string }>();
    const [superiors, setSuperiors] = useState<AssignPosition[]>([]);
    const {toast} = useToast();
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(()=> {
        const handleData = async() => {
            try {
                const fetchedPositions = await getAllPosition()
                const fetchSuperiors = await getAllSuperior()
                
                setPositions(fetchedPositions)
                setSuperiors(fetchSuperiors)
            }catch(error){
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        handleData()
    }, [])
   
    
    
    const form = useForm<z.infer<typeof SignatorySchema>>()

    const handleSubmit = async (data: z.infer<typeof SignatorySchema>) => {
        try {
            
            // Task 1 : Creating a role of the selected user
            const handledData: AddPositionSchema = {
                superior: data.superior,
                position: data.position,
                status: data.status,
            };
            
            await submitAssignPosition(handledData, positions, id || "");

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
    useEffect(() => {
        console.log(positions)
    })
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
                    <Label htmlFor="position" className="text-right"> Position </Label>
                    <div className=" col-span-3">
                        <FormField
                            control={form.control}
                            name="position"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Position" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {positions.map((d,i) =>(
                                                 <SelectItem key={i} value={d.positionName}>{d.positionName}</SelectItem>
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
                                            <SelectValue placeholder="Select a Status" />
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="superior" className="text-right">Superior</Label>
                        <div className=" col-span-3">
                            <FormField
                                control={form.control}
                                name="superior"
                                render={({field}) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Superior" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {superiors.map((d,i) =>(
                                                    <SelectItem key={i} value={d.id}>{d.id}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <DataTable columns={columns} data={superiors} isEmployee={false} isRequest={false}/>
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
