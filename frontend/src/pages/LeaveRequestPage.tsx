import { NormalLayout } from '@/layouts/NormalLayout'
import PageTittle from '@/components/PageTitle';
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react';

import { getAllLeaveRequest } from '@/controller/requestLeave';
import { LeaveRequest } from '@/lib/types';

type LeaveRequestData = {
  id: String,
  empNum: String,
  comment: String,
  leaveType: String,
  dateOfLeave: String,
  dateOfEnd: String,
  status: String,
}

const columns: ColumnDef<LeaveRequestData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  }, {
    accessorKey: "empNum",
    header: "empNum",
  },{
    accessorKey: "comment",
    header: "comment",
  },{
    accessorKey: "leaveType",
    header: "leaveType",
  },{
    accessorKey: "dateOfLeave",
    header: "dateOfLeave",
  },{
    accessorKey: "dateOfEnd",
    header: "dateOfEnd",
  },{
    accessorKey: "status",
    header: "status",
  },
  
]

export default function LeaveRequestPage() {
  
  const [LeaveRequests, setLeaveRequests] = useState<LeaveRequestData[]>([]);

  useEffect(() => {
    const getData = async () =>{
      try {
        const req = await getAllLeaveRequest();
        const newList : LeaveRequestData[] = req.map((leave : LeaveRequest ) =>{
          const {id, employee, comment, leaveType, dateOfLeave,dateOfEnd,status} = leave
          

          return {
            id,
            empNum: employee.empNum,
            comment,
            leaveType,
            dateOfLeave,
            dateOfEnd,
            status,
          }
        })
        setLeaveRequests(newList)
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
        <DataTable columns={columns} data={LeaveRequests}/>
      </div>
    </NormalLayout>
  )
}
