import { NormalLayout } from '@/layouts/NormalLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'

import PageTittle from '@/components/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Employee, getEmployeeById } from '@/controller/employee'
import { EditEmployeeDialog } from '@/components/dialog/EditEmployeeDialog'
import { EditAssignDesignationDialog } from '@/components/dialog/EditAssignDesignationDialog'
  

export default function ViewEmployee(){
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<Employee>({
        id: "",
        firstname: "",
        middlename: "",
        lastname: "",
        address_line: "",
        barangay:"",
        country: "",
        province: "",
        last_update: "",
    });
    useEffect(() => {
        const fetchData = async ()=>{
        try {
            const employeeData = await getEmployeeById(id);
            setData(employeeData);
        } catch (error) {
            console.error("Error fetching post data: ", error);
        }
        }
        fetchData()
    },[id])
    const backClick = () => {
        navigate("/employee")
    }
    return(
        <NormalLayout>
            <div className='w-full flex flex-col gap-2'>
                
                <div className='font-bold w-full flex justify-between'>
                    <PageTittle title='View User'/>
                    <div className='flex gap-3'>
                        <Button variant={'outline'} onClick={backClick}>Back</Button>
                        <EditEmployeeDialog {...data} />
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
                                    {data.id}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Firstname
                                </TableCell>
                                <TableCell>
                                    {data.firstname}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Middlename
                                </TableCell>
                                <TableCell>
                                    {data.middlename}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Lastname
                                </TableCell>
                                <TableCell>
                                    {data.lastname}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Address Line
                                </TableCell>
                                <TableCell>
                                    {data.address_line}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Brgy
                                </TableCell>
                                <TableCell>
                                    {data.barangay}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Province
                                </TableCell>
                                <TableCell>
                                    {data.province}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Country
                                </TableCell>
                                <TableCell>
                                    {data.country}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>   
                </Card>
                    

                <div className='font-bold w-full flex justify-between'>
                <PageTittle title='Assign Designation'/>
                    <EditAssignDesignationDialog/>
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
                                    {/* {data.} */}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Employee Type
                                </TableCell>
                                <TableCell>
                                    {/* {data.} */}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    {/* {data.} */}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </NormalLayout>
    )
}