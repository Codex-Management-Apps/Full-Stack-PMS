
import { DataTable } from '@/components/DataTable'
import PageTittle from '@/components/PageTitle'
import { getAllPaySlip } from '@/controller/payslip'
import { NormalLayout } from '@/layouts/NormalLayout'
import { Payslip } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

export type PayslipData = {
  id: string,
  issued_date: string,
  create_at: string,
  last_updated: string,
}

const columns: ColumnDef<PayslipData>[]=[
  {
    accessorKey: "id",
    header: "ID",
  },{
    accessorKey: "empNum",
    header: "EmpNum",
  },{
    accessorKey: "fullname",
    header: "fullname",
  },{
    accessorKey: "issued_date",
    header: "issued_date",
  },{
    accessorKey: "start",
    header: "ID",
  },{
    accessorKey: "total_earnings",
    header: "total_earnings",
  },{
    accessorKey: "total_deductions",
    header: "total_deductions",
  },{
    accessorKey: "net_pay",
    header: "net_pay",
  },
]

export default function SalarySlipPage() {
  const [payslip, setPayslip] = useState<PayslipData[]>([])

  useEffect( () => {
    const handleData = async () => {
      try {
        const fetchData = await getAllPaySlip()
        const newList : PayslipData[] = fetchData.map((payslip:Payslip) => {
          const {id, payroll, issued_date, total_earnings, total_deductions, net_pay} = payslip
          const {employee, start, end} = payroll
          const {empNum, employeeData} = employee
          const {firstname, middlename, lastname} = employeeData
          const fullname = `${lastname}, ${firstname} ${middlename}`
          return {
            id,
            empNum,
            fullname,
            issued_date,
            start,
            end,
            total_earnings,
            total_deductions,
            net_pay,
          }
        })
        setPayslip(newList)
      } catch (error) {
        console.log(error)
      }
    }
    handleData()
  },[])
  return (
    <NormalLayout>
      <div className='flex flex-col gap-5 w-full'>
        <PageTittle title="Salary Slips"/>
        <DataTable columns={columns} data={payslip}/>
      </div>
    </NormalLayout>
  )
}

