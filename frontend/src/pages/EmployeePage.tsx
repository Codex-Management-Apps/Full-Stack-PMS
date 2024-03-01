
// import { getPostById } from '@/controller/post';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

import { NormalLayout } from '@/layouts/NormalLayout'
import PageTittle from '@/components/PageTitle';
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddEmployeeDialog } from '@/components/dialog/AddEmployeeDialog';
import { getAllEmployee } from '@/controller/employee';

type Employee = {
  id: number,
  firstname: string,
  lastname: string,
  lastUpdate: string,
}

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstname",
    header: "Firstname",
  },
  {
    accessorKey: "lastname",
    header: "Lastname",
  },
  {
    accessorKey: "lastUpdate",
    header: "Last Update",
  },
]

export default function EmployeePage() {
  
  const [Employee, setEmployee] = useState<Employee[]>([]);
  
  useEffect(() => {
    getData();
  },[]);

  const getData = async () =>{
    const data = await getAllEmployee();
    setEmployee(data);
  }

  return (
    <NormalLayout>
    {/* <Button className='absolute top-20 right-80 bg-white-500 text-white-500 border border-gray-400 rounded-md px-8 py-2'>Add</Button> */}
      <div className='flex flex-col gap-5 w-full'>
        <div className='flex w-full justify-between'>
          <PageTittle title="Employees"/>
          <AddEmployeeDialog/>
        </div>
        <DataTable columns={columns} data={Employee} />
      </div>
    </NormalLayout>
  )
}
