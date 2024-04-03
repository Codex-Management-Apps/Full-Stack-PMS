import { AssignDesignation, AssignPosition, Employee } from "@/lib/types";
import PageTittle from "../PageTitle";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { EditEmployeeDialog } from "../dialog/EditEmployeeDialog";

type ReceiveData = AssignPosition | AssignDesignation | Employee;

// Type guards for us to check if data what type
// Uses try catch because of null pointers some doesnt exists and it breaks
function isAssignPosition(data: ReceiveData): data is AssignPosition {
    try {
        return (data as AssignPosition).employee.employee !== undefined; 
    } catch (error){
        return false
    }
}

function isAssignDesignation(data: ReceiveData): data is AssignDesignation {
    try {
        return (data as AssignDesignation).employee !== undefined; 
    } catch (error){
        return false
    }
}

type Props = {
    receiveData: ReceiveData;
    cameFrom: string,
}

export function AboutSection({receiveData, cameFrom} : Props){

    const [employee, setEmployee] = useState<Employee>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try{
           
            if (isAssignPosition(receiveData)) {
               
                setEmployee(receiveData.employee.employee)
                
            } else if (isAssignDesignation(receiveData)) {
               
                setEmployee(receiveData.employee)

            } else{
                
                setEmployee(receiveData)
                
            }
        } catch (error){
            console.error("Error in useEffect:", error);
        } finally {
            setIsLoading(false);
        }
    },[])
    
    // Handles loading for prevention of infinite look or recured rendered and callbacks
    if (isLoading) {
        return null;
    }
    return <>
        <div className='font-bold w-full flex justify-between'>
                    <PageTittle title='About'/>
                    <div className='flex gap-3'>
                        <EditEmployeeDialog employee={employee}/>
                    </div>
                </div>
                <Card className='w-full mb-5'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Category
                                </TableHead>
                                <TableHead>
                                    Value
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Id
                                </TableCell>
                                <TableCell>
                                    {employee?.id}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Firstname
                                </TableCell>
                                <TableCell>
                                    {employee?.firstname}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Middlename
                                </TableCell>
                                <TableCell>
                                    {employee?.middlename}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Lastname
                                </TableCell>
                                <TableCell>
                                    {employee?.lastname}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Address Line
                                </TableCell>
                                <TableCell>
                                    {employee?.address_line}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Brgy
                                </TableCell>
                                <TableCell>
                                    {employee?.barangay}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Province
                                </TableCell>
                                <TableCell>
                                    {employee?.province}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Country
                                </TableCell>
                                <TableCell>
                                    {employee?.country}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>   
                </Card>
                    
    </>
}