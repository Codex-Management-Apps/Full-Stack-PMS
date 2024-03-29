import { NormalLayout } from '@/layouts/NormalLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import PageTittle from '@/components/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { EditEmployeeDialog } from '@/components/dialog/EditEmployeeDialog'
import { AddAssignDesignationDialog } from '@/components/dialog/AddAssignDesignationDialog'
import { getAssignDesignationByEmployeeId, isEmployeeAssigned } from '@/controller/assigned'
import { getEmployeeById } from '@/controller/employee'
import { EditAssignDesignationDialog } from '@/components/dialog/EditAssignDesignationDialog'
import { AssignDesignation, Employee } from '@/lib/types'
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function EmployeePortal(){

    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hadAssigned, setHadAssigned] = useState<Boolean>(false);
    const [data, setData] = useState<AssignDesignation>({
        id: "",
        employeeType: "",
        status: "",
        employee: {
            firstname: "",
            lastname: "",
            middlename: "",
            address_line: '',
            barangay: '',
            country: '',
            province: '',
            last_update: ''
        },
        designation: {
            designationName: "",
            id: '',
            departmentId: {
                departmentName: '',
                status: '',
                id: ''
            },
            status: ''
        } // Replace with the actual value for designation_id
    })
    const [data2, setData2] = useState<Employee>({
        firstname: "",
        lastname: "",
        middlename: "",
        address_line: '',
        barangay: '',
        country: '',
        province: '',
        last_update: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isExist = await isEmployeeAssigned(id ?? '');
                console.log(isExist);
                if(isExist){
                    setHadAssigned(true);
                    const assignedData = await getAssignDesignationByEmployeeId(id ?? '');
                    setData(assignedData);
                } else {
                    const responsedData = await getEmployeeById(id);
                    setData2(responsedData);
                }
            } catch (error) {
                console.error("Error fetching post data: ", error);
            }
        }
        fetchData()
    }, [id])

    const backClick = () => {
        navigate("/employee")
    }
    return(
        <NormalLayout>
            <div className='w-full flex flex-col gap-2'>

            {/* Manager Table Data */}
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
                                    {hadAssigned ? data.employee.id : data2.id}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Position
                                </TableCell>
                                <TableCell>
                                    {data.designation.designationName}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>   
                </Card>

                {/* Signatories Section */}

                <div className='font-bold w-full flex justify-between'>
                    <PageTittle title='Signatories'/>
                    <div className='flex gap-3'>
                        <Button variant={'outline'} onClick={backClick}>Accept Changes</Button>
                        <EditEmployeeDialog {...hadAssigned ? data.employee : data2}/>
                    </div>
                </div>
                <Card className='w-full mb-5'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Employee
                                </TableHead>
                                <TableHead>
                                    Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    John Doe
                                </TableCell>
                                <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Status</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Types of Leaves</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                    checked={showStatusBar}
                                    onCheckedChange={setShowStatusBar}
                                    >
                                    Sick Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showActivityBar}
                                    onCheckedChange={setShowActivityBar}
                                    disabled
                                    >
                                    Paternity Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showPanel}
                                    onCheckedChange={setShowPanel}
                                    >
                                    Emergency Leave
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                                </DropdownMenu>{/* I added dropdown-menu Change this status function Bossing AJ :( */}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    John Doe
                                </TableCell>
                                <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Status</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Types of Leaves</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                    checked={showStatusBar}
                                    onCheckedChange={setShowStatusBar}
                                    >
                                    Sick Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showActivityBar}
                                    onCheckedChange={setShowActivityBar}
                                    disabled
                                    >
                                    Paternity Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showPanel}
                                    onCheckedChange={setShowPanel}
                                    >
                                    Emergency Leave
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                                </DropdownMenu>{/* I added dropdown-menu Change this status function Bossing AJ :( */}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    John Doe
                                </TableCell>
                                <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Status</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Types of Leaves</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                    checked={showStatusBar}
                                    onCheckedChange={setShowStatusBar}
                                    >
                                    Sick Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showActivityBar}
                                    onCheckedChange={setShowActivityBar}
                                    disabled
                                    >
                                    Paternity Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showPanel}
                                    onCheckedChange={setShowPanel}
                                    >
                                    Emergency Leave
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                                </DropdownMenu>{/* I added dropdown-menu Change this status function Bossing AJ :( */}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    John Doe
                                </TableCell>
                                <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Status</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Types of Leaves</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                    checked={showStatusBar}
                                    onCheckedChange={setShowStatusBar}
                                    >
                                    Sick Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showActivityBar}
                                    onCheckedChange={setShowActivityBar}
                                    disabled
                                    >
                                    Paternity Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showPanel}
                                    onCheckedChange={setShowPanel}
                                    >
                                    Emergency Leave
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                                </DropdownMenu>{/* I added dropdown-menu Change this status function Bossing AJ :( */}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    John Doe
                                </TableCell>
                                <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Status</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Types of Leaves</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                    checked={showStatusBar}
                                    onCheckedChange={setShowStatusBar}
                                    >
                                    Sick Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showActivityBar}
                                    onCheckedChange={setShowActivityBar}
                                    disabled
                                    >
                                    Paternity Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showPanel}
                                    onCheckedChange={setShowPanel}
                                    >
                                    Emergency Leave
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                                </DropdownMenu>{/* I added dropdown-menu Change this status function Bossing AJ :( */}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    John Doe
                                </TableCell>
                                <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Status</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Types of Leaves</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                    checked={showStatusBar}
                                    onCheckedChange={setShowStatusBar}
                                    >
                                    Sick Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showActivityBar}
                                    onCheckedChange={setShowActivityBar}
                                    disabled
                                    >
                                    Paternity Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showPanel}
                                    onCheckedChange={setShowPanel}
                                    >
                                    Emergency Leave
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                                </DropdownMenu>{/* I added dropdown-menu Change this status function Bossing AJ :( */}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    John Doe
                                </TableCell>
                                <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Status</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Types of Leaves</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                    checked={showStatusBar}
                                    onCheckedChange={setShowStatusBar}
                                    >
                                    Sick Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showActivityBar}
                                    onCheckedChange={setShowActivityBar}
                                    disabled
                                    >
                                    Paternity Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showPanel}
                                    onCheckedChange={setShowPanel}
                                    >
                                    Emergency Leave
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                                </DropdownMenu>{/* I added dropdown-menu Change this status function Bossing AJ :( */}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    John Doe
                                </TableCell>
                                <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Status</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Types of Leaves</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem
                                    checked={showStatusBar}
                                    onCheckedChange={setShowStatusBar}
                                    >
                                    Sick Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showActivityBar}
                                    onCheckedChange={setShowActivityBar}
                                    disabled
                                    >
                                    Paternity Leave
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                    checked={showPanel}
                                    onCheckedChange={setShowPanel}
                                    >
                                    Emergency Leave
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                                </DropdownMenu>{/* I added dropdown-menu Change this status function Bossing AJ :( */}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>   
                </Card>

                <div className='flex justify-end gap-3 '>
                    <Button variant={'outline'} onClick={backClick}>Previous</Button>
                    <Button variant={'outline'} onClick={backClick}>Next</Button>
                </div>

                {/* About Section */}
                <div className='font-bold w-full flex justify-between'>
                    <PageTittle title='About'/>
                    <div className='flex gap-3'>
                        <Button>Edit</Button>
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
                                <TableCell className='ml-[20px]'>
                                    {hadAssigned ? data.employee.id : data2.id}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Firstname
                                </TableCell>
                                <TableCell>
                                    {hadAssigned ? data.employee.firstname : data2.firstname}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Middlename
                                </TableCell>
                                <TableCell>
                                    {hadAssigned ? data.employee.middlename : data2.middlename}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Lastname
                                </TableCell>
                                <TableCell>
                                {hadAssigned ? data.employee.lastname : data2.lastname}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Address Line
                                </TableCell>
                                <TableCell>
                                    {hadAssigned ? data.employee.address_line : data2.address_line}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Brgy
                                </TableCell>
                                <TableCell>
                                    {hadAssigned ? data.employee.barangay : data2.barangay}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Province
                                </TableCell>
                                <TableCell>
                                    {hadAssigned ? data.employee.province : data2.province}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Country
                                </TableCell>
                                <TableCell>
                                    {hadAssigned ? data.employee.country : data2.country}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>   
                </Card>
                    
                {/* Assign Designation Section */}
                <div className='font-bold w-full flex justify-between'>
                <PageTittle title='Assign Designation'/>
                {hadAssigned ? (
                    <EditAssignDesignationDialog
                        id= {data.id}
                        empNum={data.employee}
                        designation={data.designation}
                        employeeType={data.employeeType}
                        status={data.status}
                    />
                    ) : (
                    <AddAssignDesignationDialog />
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
                                    {data.designation.designationName}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Employee Type
                                </TableCell>
                                <TableCell>
                                    {data.employeeType}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    {data.status}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </div>

            <div className='flex justify-center mt-[20px]'>
                <Button>File Leave</Button>
            </div>

        </NormalLayout>
    )
}