import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useEffect, useState } from "react";
import { getEmployeeDataById } from "@/controller/dataemployee";
import { Department, Designation, EmployeeData } from "@/lib/types";
import { getEmployeeCount, sumbitEmployeeData } from "@/controller/employee";
import { z } from "zod";
import { EmployeeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllDesignation } from "@/controller/designation";
import { getAllDepartments } from "@/controller/department";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Table, TableCell, TableRow, TableBody } from "../ui/table";
import { Card } from "../ui/card";

export function AddEmployeeForm({id} :any){
    
    const {toast} = useToast();
    const [dataEmployee, setDataEmployee] = useState<EmployeeData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [employeeCount, setEmployeeCount] = useState<Number>();

    const [department, setDepartment] = useState<Department[]>([]);
    const [designation, setDesignation] = useState<Designation[]>([]);
    
    useEffect(() => {
        const handleData = async () => {
            try{
                const fetch = await getEmployeeDataById(id);
                setDataEmployee(fetch);
            } catch(error){
                console.log(error)
            }
        }
        const employeeCount = async() => {
            try{
                const fetch = await getEmployeeCount();
                setEmployeeCount(fetch);
            } catch(error){
                console.log(error)
            }
        }
        const getDepartments = async() =>{
            try {
                const fetch = await getAllDepartments();
                setDepartment(fetch);
            } catch (error) {
                console.log(error)
            }
        }
        const getDesignations = async() =>{
            try {
                const fetch = await getAllDesignation();
                setDesignation(fetch);
            } catch (error) {
                console.log(error)
            }
        }
        handleData();
        employeeCount();
        getDepartments();
        getDesignations();
    },[])
    const form = useForm<z.infer<typeof EmployeeSchema>>({
        resolver: zodResolver(EmployeeSchema),
        defaultValues:{
            department : '',
            designation : '',
            employeeType: '',
            status: 'Active'
        }
    });
    // empNum: `EMP${String(employeeCount).padStart(3, '0')}`, 
    const handleSubmit = (data:z.infer<typeof EmployeeSchema>) => {
        setIsSubmitting(true)
        try{
            
            const newData = {
                empNum: `EMP${String(employeeCount).padStart(3, '0')}`, // Filter
                employeeData: dataEmployee,
                department: department.find(d => d.id === Number(data.department)),
                designation: designation.find(d => d.id === Number(data.designation)),
                employeeType: data.employeeType,
                status: data.status
            }
            sumbitEmployeeData(newData)
            toast({
                variant: "default",
                title: "Data Added, Kindly Refresh the page",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(newData, null, 2)}</code>
                    </pre>
                    ),
            })
        } catch (error){
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error, null, 2)}</code>
                    </pre>
                    ),
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    
    return(
        <div className="grid grid-cols-2 gap-5">
            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="department"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Department</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value} disabled={isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Choose a Department" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {department.map((d,i) => (
                                                <SelectItem key={i} value={String(d.id)}>{d.departmentName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="designation"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Designation</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value} disabled={isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Choose a Designation" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {designation.map((d,i) => (
                                                <SelectItem key={i} value={String(d.id)}>{d.designationName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="employeeType"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Employee Type</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value} disabled ={isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Choose a Designation" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Full-time">Full-time</SelectItem>
                                            <SelectItem value="Part-time">Part-time</SelectItem>
                                            <SelectItem value="Contractor">Contractor</SelectItem>
                                            <SelectItem value="Temporary">Temporary</SelectItem>
                                            <SelectItem value="Intern">Intern</SelectItem>
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value} disabled ={isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>Submit</Button>
                </form>
            </Form>
            <div className="flex flex-col">
                <Card className="p-5">
                    <p>Employee Data</p>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Employee ID</TableCell>
                                <TableCell>{`EMP${String(employeeCount).padStart(3, '0')}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Full Name</TableCell>
                                <TableCell>{`${dataEmployee?.lastname}, ${dataEmployee?.firstname} ${dataEmployee?.middlename}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Contact</TableCell>
                                <TableCell>{`${dataEmployee?.contact}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>BOD</TableCell>
                                <TableCell>{`${dataEmployee?.birthday}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{`${dataEmployee?.email}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Gender</TableCell>
                                <TableCell>{`${dataEmployee?.gender}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Full Adress</TableCell>
                                <TableCell>{`${dataEmployee?.barangay}, ${dataEmployee?.addressLine}, ${dataEmployee?.province}, ${dataEmployee?.country}`}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    )
}