import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'

import PageTittle from '@/components/PageTitle'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Employee } from '@/lib/types'

import { getEmployeeById } from '@/controller/employee'
import { EditEmployeeDataDialog } from '@/components/dialog/EditEmployeeDataDialog'
import { EditEmployeeDesignationDialog } from '@/components/dialog/EditEmployeeDesignationDialog'
import { EditEmployeeDepartmentDialog } from '@/components/dialog/EditEmployeeDepartmentDialog'
import { EditEmployeeDialog } from '@/components/dialog/EditEmployeeDialog'

  

export default function ViewEmployee(){
    const currentRun = useRef(false)
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<Employee>();

    useEffect(()=>{
        if(currentRun.current === false){
            const fetchData = async () => {
                try {
                    const data = await getEmployeeById(id);

                    setEmployee(data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            currentRun.current = true;
            fetchData()
        }
    })
    return(
        <div className='grid grid-cols-2 gap-5'>
            <div className=' col-span-2 w-full flex flex-col gap-5'>
                <div className='font-bold w-full flex justify-between'>
                        <PageTittle title='View'/>
                        {employee && (
                            <EditEmployeeDialog data={employee}/>
                        )}
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
                                    ID
                                </TableCell>
                                <TableCell>
                                    {employee?.id}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Emp #
                                </TableCell>
                                <TableCell>
                                    {employee?.empNum}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    EmployeeType
                                </TableCell>
                                <TableCell>
                                    {employee?.employeeType}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    {employee?.status}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>   
                </Card>
            </div>
            <div className=' col-span-2 w-full flex flex-col gap-5'>
                <div className='font-bold w-full flex justify-between'>
                    <PageTittle title='Employee'/>
                    {employee && (
                        <EditEmployeeDataDialog data={employee}/>
                    )}
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
                                    ID
                                </TableCell>
                                <TableCell>
                                    {employee?.employeeData.id}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Employee #
                                </TableCell>
                                <TableCell>
                                    {employee?.empNum}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Fullname
                                </TableCell>
                                <TableCell>
                                {`${employee?.employeeData.lastname}, ${employee?.employeeData.firstname} ${employee?.employeeData.middlename}`}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Contact
                                </TableCell>
                                <TableCell>
                                    {employee?.employeeData.contact}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                {employee?.employeeData.email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Full Address
                                </TableCell>
                                <TableCell>
                                {`${employee?.employeeData.barangay}, ${employee?.employeeData.addressLine}, ${employee?.employeeData.province}, ${employee?.employeeData.country}`}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    {employee?.status}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>   
                </Card>
            </div>
            
            
            <div className='w-full flex flex-col gap-5'>
                <div className='font-bold w-full flex justify-between'>
                    <PageTittle title='Designation'/>
                    {employee && (
                        <EditEmployeeDesignationDialog data={employee}/>
                    )}
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
                                    {employee?.designation.designationName}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    {employee?.designation.status}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </div>
            <div className='w-full flex flex-col gap-5'>
                <div className='font-bold w-full flex justify-between'>
                    <PageTittle title='Department'/>
                    {employee && (
                        <EditEmployeeDepartmentDialog data={employee}/>
                    )}
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
                                    Department Name
                                </TableCell>
                                <TableCell>
                                    {employee?.department.departmentName}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    {employee?.department.status}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>

    )
}