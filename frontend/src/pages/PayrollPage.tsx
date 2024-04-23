
import PageTittle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getPayrollByID } from '@/controller/payroll'
import { NormalLayout } from '@/layouts/NormalLayout'
import { Payroll } from '@/lib/types'
import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PayrollPage() {
  const { id } = useParams<{ id: string }>();
  const [payroll, setPayroll] = useState<Payroll>();
  const [earnings, setEarnings] = useState();
  const [deduction, setDeduction] = useState();

  useEffect(()=> {
    const handleData = async() => {
      try {
        const fetchdata = await getPayrollByID(id || "")

        setPayroll(fetchdata)
      } catch (error) {
        console.log(error)
      }
    }
    handleData()
  },[])
       
  return (
    <NormalLayout>
      <div className='flex flex-col gap-5 w-full py-3'>
        <PageTittle title="Payroll"/>
      </div>
      <div className='w-full h-full'>
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
          <div className='p-5 border-r'>
            Earnings
          </div>
          <div className='p-5'>
            Deductions
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

