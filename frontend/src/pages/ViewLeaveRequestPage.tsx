
import { RequestApprovalDialog } from "@/components/dialog/RequestApprovalDialog";
import PageTittle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getLeaveRequestById } from "@/controller/requestLeave";
import { NormalLayout } from "@/layouts/NormalLayout";
import { LeaveRequest } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewLeaveRequestPage(){

    const { id } = useParams<{ id: string }>();
    const [req, setReq] = useState<LeaveRequest>()
    const [isLoading, setIsLoading] = useState(true);

    

    useEffect(() => {

        const fetchData = async () => {
            try {
               const response = await getLeaveRequestById(id ?? "")
               console.log(response)
               setReq(response)
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false); // Update loading state when fetch completes
            }
        };
        fetchData();
        
    }, []);

    // Handles loading for prevention of infinite look or recured rendered and callbacks
    if (isLoading) {
        return null;
    }

    return(
        <NormalLayout>
            <div className="flex flex-col gap-5">
                <PageTittle title='Leave Application'/>
             
                <div className="flex flex-col gap-3">
                    <PageTittle title='Employee' className="text-xl"/>
                    <Card className='w-full mb-5'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        Name
                                    </TableHead>
                                    <TableHead>
                                        Position
                                    </TableHead>
                                    <TableHead>
                                        Supervisor
                                    </TableHead>
                                    <TableHead>
                                        Designation
                                    </TableHead>
                                    <TableHead>
                                        Department
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        {req?.employee.employee.employee.firstname + " " + req?.employee.employee.employee.lastname}
                                    </TableCell>
                                    <TableCell>
                                        {req?.employee.position.positionName}
                                    </TableCell>
                                    
                                    <TableCell>
                                        { req?.employee.superior !== null ?  req?.employee.superior.id : ""}
                                    </TableCell>
                                    
                                    <TableCell>
                                        {req?.employee.employee.designation.designationName}
                                    </TableCell>
                                    
                                    <TableCell>
                                        {req?.employee.employee.designation.departmentId.departmentName}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>   
                    </Card>
                </div>
                <div className="flex flex-col gap-3">
                    <PageTittle title='Leave Request' className="text-xl"/>
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
                                        {req?.id}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        reason
                                    </TableCell>
                                    <TableCell>
                                        {req?.reason}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Date of Leave
                                    </TableCell>
                                    <TableCell>
                                        {req?.dateOfLeave}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Date of End
                                    </TableCell>
                                    <TableCell>
                                        {req?.dateOfEnd}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Comment
                                    </TableCell>
                                    <TableCell>
                                        {req?.comment}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Status
                                    </TableCell>
                                    <TableCell>
                                        {req?.status}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Created at
                                    </TableCell>
                                    <TableCell>
                                        {req?.created_at}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>   
                    </Card>
                </div>
                <RequestApprovalDialog repData={req!}/>
            </div>     
        </NormalLayout>
    )
}