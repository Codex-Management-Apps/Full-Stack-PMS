
import { DataTable } from '@/components/DataTable'
import PageTittle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getAllTypeUnderEmployeeID } from '@/controller/asssignPayhead'
import { getPayrollByID } from '@/controller/payroll'
import { NormalLayout } from '@/layouts/NormalLayout'
import { AssignPayhead, Payroll } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { PlusIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const columns: ColumnDef<AssignPayhead>[] = [
  {
      accessorKey: "id",
      header: "ID",
  },{
      accessorKey: "payhead.name",
      header: "Name",
  },{
      accessorKey: "payhead.type",
      header: "Type",
  },{
      accessorKey: "amount",
      header: "Amount",
  },
]


export default function PayrollPage() {
  const currentRan = useRef(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [payroll, setPayroll] = useState<Payroll>();

  const [employeeEarnings, setEmployeeEarnings] = useState<AssignPayhead[]>([]);
  const [employeeDeductions, setEmployeeDeductions] = useState<AssignPayhead[]>([]);

    useEffect(() =>{
        if(currentRan.current === false){{
            const handleData = async() => {
              try {
                const fetchdata = await getPayrollByID( id || "")
        
                setPayroll(fetchdata)
              } catch (error) {
                console.log(error)
              }
            }
            
            currentRan.current= true
            handleData()
        }}
    },[])
    useEffect(()=>{
      const getAllEarnings = async() =>{
          try {
              const earnings = await getAllTypeUnderEmployeeID(String(payroll?.employee.id ), "earnings")
              
              setEmployeeEarnings(earnings)
              
          } catch (error) {
              console.log(error)
          }
      }

      const getAllDeduction = async() => {
        try {
            const deductions = await getAllTypeUnderEmployeeID(String(payroll?.employee.id ), "deduction")
            setEmployeeDeductions(deductions)
        } catch (error) {
            console.log(error)
        }
      }
        getAllEarnings()
        getAllDeduction()
    },[payroll])
  return (
    <NormalLayout>
      <div className='flex flex-col gap-5 w-full py-3'>
        <PageTittle title="Payroll"/>
       
        <Card className='grid grid-cols-2 w-full h-full max-h-[450px]'>
          <div className=' border-b col-span-2'>
            <Table>
            <TableBody>
              <TableRow>
                <TableCell>Employee Code</TableCell>
                <TableCell>{payroll?.employee.empNum}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>
                  {payroll?.employee.employeeData.firstname} 
                  {payroll?.employee.employeeData.middlename} 
                  {payroll?.employee.employeeData.lastname}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Designation</TableCell>
                <TableCell>{payroll?.employee.designation.designationName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell>{payroll?.employee.employeeData.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>
                  {payroll?.employee.employeeData.barangay}, {payroll?.employee.employeeData.addressLine}, {payroll?.employee.employeeData.province}, {payroll?.employee.employeeData.country}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>{payroll?.employee.department.departmentName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date of Joining</TableCell>
                <TableCell>{payroll?.employee.createdAt}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </div>
        </Card>
        <Separator/>
        <Card className=' flex flex-col p-5 gap-5'>
          <div className='flex justify-between'>
            <PageTittle title="Payheads"/>
            <Button onClick={() => navigate(`/p/admin/employee/${id}/payheads`)}>Configure</Button>
          </div>

          <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col gap-5'>
              <PageTittle title='Earnings'/>
              <DataTable columns={columns} data={employeeEarnings} />
            </div>
              
            <div className='flex flex-col gap-5'>
              <PageTittle title='Deductions'/>
              <DataTable columns={columns} data={employeeDeductions} />
            </div>
          </div>
        </Card>
        
       

        <div className='flex justify-between py-10'>
          <Card className='p-5'>
            Net Salary Pay: $$$$$
          </Card>
          <Button className=' flex gap-3 items-center'><PlusIcon/>Generate Payslip</Button>
        </div>

      </div>
    </NormalLayout>
  )
}

