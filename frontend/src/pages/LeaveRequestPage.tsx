import { NormalLayout } from '@/layouts/NormalLayout'
import PageTittle from '@/components/PageTitle';
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react';

import { LeaveRequest } from '@/lib/types';
import { getAllLeaveRequest } from '@/controller/requestLeave';
import { Card } from '@/components/ui/card';

type Employee = {
  id: number,
  firstname: string,
  lastname: string,
  lastUpdate: string,
}

const columns: ColumnDef<LeaveRequest>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "employee.employee.employee.firstname",
    header: "Firstname",
  },
  {
    accessorKey: "employee.employee.employee.lastname",
    header: "Lastname",
  },
  {
    accessorKey: "employee.superior.id",
    header: "Supervisor",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]

export default function LeaveRequestPage() {
  
  const [LeaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const getData = async () =>{
      try {
        const req = await getAllLeaveRequest();
      
        setLeaveRequests(req)
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  },[]);

 

  return (
    <NormalLayout>
    {/* <Button className='absolute top-20 right-80 bg-white-500 text-white-500 border border-gray-400 rounded-md px-8 py-2'>Add</Button> */}
      <div className='flex flex-col gap-5 w-full'>
        <PageTittle title="Leave Requests"/>
        <DataTable columns={columns} data={LeaveRequests} isEmployee={false} isRequest={true}/>
      </div>
    </NormalLayout>
  )
}
