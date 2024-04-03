import { AssignDesignation, AssignPosition, Employee } from "@/lib/types";
import PageTittle from "../PageTitle";
import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { EditAssignDesignationDialog } from "../dialog/EditAssignDesignationDialog";

type ReceiveData = AssignPosition | AssignDesignation | Employee;

// Type guards for us to check if data what type
function isAssignPosition(data: ReceiveData): data is AssignPosition {
    return (data as AssignPosition).employee.designation !== undefined; 
}

function isAssignDesignation(data: ReceiveData): data is AssignDesignation {
    return (data as AssignDesignation).designation !== undefined; 
}

type Props = {
    receiveData: ReceiveData;
    cameFrom: string,
}


export function DesignationSection({receiveData, cameFrom} : Props){

    const [designation, setDesignation] = useState<AssignDesignation>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try{
            if (isAssignPosition(receiveData)) {
                setDesignation(receiveData.employee)
                
            } else if(isAssignDesignation(receiveData)){
                setDesignation(receiveData)
            } 
        } catch (error){
            
        } finally {
            setIsLoading(false);
        }
    },[])
    

    if (isLoading) {
        return null;
    }
    return <>
        <div className='font-bold w-full flex justify-between'>
            <PageTittle title='Designation'/>
            <EditAssignDesignationDialog designation={designation}/>
        </div>

        <Card className='w-full'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            Designation
                        </TableCell>
                        <TableCell>
                           {designation?.designation.designationName}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Employee Type
                        </TableCell>
                        <TableCell>
                            {designation?.employeeType}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Status
                        </TableCell>
                        <TableCell>
                            {designation?.status}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    </>
}