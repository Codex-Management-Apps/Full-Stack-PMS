import PageTittle from "../PageTitle";
import { AssignPosition, Signatory } from "@/lib/types";
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getAssignPositionEmployeeUnderItsSuperior } from "@/controller/assignPosition";
import { getSignatoryByAssignPositionId } from "@/controller/signatory";

type Props = {
    receiveData: AssignPosition;
}

export const columns: ColumnDef<AssignPosition>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "employee.employee.id",
      header: "Employee ID",
    },
    {
      accessorKey: "employee.employee.firstname",
      header: "Firstname",
    },
    {
        accessorKey: "employee.employee.lastname",
        header: "Lastname",
    },
    {
        accessorKey: "employee.status",
        header: "Status",
    },
  ]

export function SignatorySection({receiveData}: Props){

    const [employee, setEmployee] = useState<AssignPosition[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
       const fetchdata = async () => {
            try {
                if(  receiveData.superior === null ){
                    const getSignatoryId:Signatory = await getSignatoryByAssignPositionId(receiveData.id)

                    const fetchdata = await getAssignPositionEmployeeUnderItsSuperior(getSignatoryId.id)
                    setEmployee(fetchdata)
                }
            } catch (error) {
                
            } finally{
                setIsLoading(false)
            }
       }
       fetchdata();
    },[])

    if (isLoading) {
        return null;
    }

    return (
        <>
            <PageTittle title='Signatory'/>
            {
                 receiveData.superior !== null && (
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        Position
                                    </TableHead>
                                    <TableHead>
                                        Firstname
                                    </TableHead>
                                    <TableHead>
                                        Middlename
                                    </TableHead>
                                    <TableHead>
                                        Lastname
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            <TableRow>
                                    <TableCell>
                                        {receiveData.superior.superior.position.positionName}
                                    </TableCell>
                                    <TableCell>
                                        {receiveData.superior.superior.employee.employee.firstname}
                                    </TableCell>
                                    <TableCell>
                                        {receiveData.superior.superior.employee.employee.middlename}
                                    </TableCell>
                                    <TableCell>
                                        {receiveData.superior.superior.employee.employee.lastname}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                 )
            }
            {
               receiveData.superior === null && 
                (
                    <div className='flex flex-col gap-5 w-full'>
                        <div className='flex w-full justify-between'>
                        
                            <div className='flex gap-3'>
                                {/* <Button variant={'outline'} onClick={backClick}>Accept Changes</Button> */}
                                {/* <EditEmployeeDialog {...hadAssigned ? data.employee : data2}/> */}
                            </div>
                        </div>
                        <DataTable columns={columns} data={employee} isEmployee={false}/>
                    </div>
                )
            }
        </>
    )
}