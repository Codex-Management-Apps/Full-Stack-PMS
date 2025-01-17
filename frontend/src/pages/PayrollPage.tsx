
import { DataTable } from '@/components/DataTable'
import PageTittle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { getAllTypeUnderEmployeeID } from '@/controller/asssignPayhead'
import { getPayrollByID } from '@/controller/payroll'
import { createPaySlip } from '@/controller/payslip'
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
  const {toast} = useToast();
  const currentRan = useRef(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [payroll, setPayroll] = useState<Payroll>();
  
  const [employeeEarnings, setEmployeeEarnings] = useState<AssignPayhead[]>([]);
  const [employeeDeductions, setEmployeeDeductions] = useState<AssignPayhead[]>([]);

  const [netPay, setNetPay] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);

  useEffect(() =>{
      if(currentRan.current === false){{
          const handleData = async() => {
            try {
              if (id){
                const fetchdata = await getPayrollByID( id )

                setPayroll(fetchdata)
              }
      

            } catch (error) {
              console.log(error)
            }
          }
          
          currentRan.current= true
          handleData()
      }}
      console.log("pass")
  },[])
  useEffect(()=>{
    if(payroll){
      const getAllEarnings = async() =>{
        try {
            const earnings = await getAllTypeUnderEmployeeID(String(payroll.employee.id ), "Earnings")
            
            setEmployeeEarnings(earnings)
            
        } catch (error) {
            console.log(error)
        }
      }

      const getAllDeduction = async() => {
        try {
            const deductions = await getAllTypeUnderEmployeeID(String(payroll.employee.id ), "Deductions")
            setEmployeeDeductions(deductions)
        } catch (error) {
            console.log(error)
        }
      }
      getAllEarnings()
      getAllDeduction()
    }
  },[payroll])

  useEffect(() =>{
    if(employeeEarnings.length != 0 && employeeDeductions.length != 0){
      let totalEarnings = 0;
      for (const earning of employeeEarnings) {
        totalEarnings += Number(earning.amount);
      }
      console.log(totalEarnings)
      setTotalEarnings(totalEarnings);
  
      let totalDeductions = 0;
      for (const deduction of employeeDeductions) {
        totalDeductions += Number(deduction.amount);
      }
      console.log(totalDeductions)
      setTotalDeductions(totalDeductions);

      setNetPay(totalEarnings - totalDeductions);
    }
  }, [employeeEarnings, employeeDeductions])
  
  const handleOnlick = async() =>{
    try {
      if(payroll){
        const data = {
          payroll : payroll,
          total_earnings: totalEarnings,
          total_deductions:  totalDeductions,
          net_pay: netPay,
        }
        // payroll.status ="Inactive"
        // await UpdatePayroll(payroll, String(payroll.id))
        console.log(data)
        await createPaySlip(data)
        
        toast({
          variant: "default",
          title: "Data Added, Kindly Refresh the page",
          description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{JSON.stringify(data, null, 2)}</code>
              </pre>
              ),
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(error, null, 2)}</code>
            </pre>
            ),
    })
    }
  }
  return (

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
            <Button onClick={() => navigate(`/p/admin/employee/${payroll?.employee.id}/payheads`)}>Configure</Button>
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
            Net Salary Pay: ${netPay}
          </Card>
          <Button onClick={handleOnlick} className=' flex gap-3 items-center'><PlusIcon/>Generate Payslip</Button>
        </div>

      </div>

  )
}

