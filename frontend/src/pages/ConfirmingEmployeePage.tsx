
// import { getPostById } from '@/controller/post';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

import { DataTable } from '@/components/DataTable'
import { AddEmployeeDialog } from '@/components/dialog/AddEmployeeDialog'
import { DeleteEmployeeDataDialog } from '@/components/dialog/DeleteEmployeeDataDialog'
import PageTittle from '@/components/PageTitle'
import { getAssignedEmployeeData } from '@/controller/dataemployee'
import { NormalLayout } from '@/layouts/NormalLayout'
import { EmployeeData } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

type DataEmployeeTable = {
  id: number;
  fullname: string,
  birthday: string;
  contact: string;
  email: string;
  gender: string;
  fullAddress: string
  createdAt: string;
  lastUpdated: string;
}

const columns: ColumnDef<DataEmployeeTable>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },{
    accessorKey: "fullname",
    header: "Fullname",
  },{
    accessorKey: "birthday",
    header: "Birthday",
  },{
    accessorKey: "contact",
    header: "Contact",
  },{
    accessorKey: "gender",
    header: "Gender",
  },{
    accessorKey: "fullAddress",
    header: "FullAddress",
  },{
    accessorKey: "createdAt",
    header: "createdAt",
  },{
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      
      return (
        <div className='flex flex-col gap-3'>
          <AddEmployeeDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""}/>
          <DeleteEmployeeDataDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""} options={0}/>
        </div>
      )
    },
  }
  
]

export default function ConfirmingEmployeePage() {
  const [data, setData] = useState<DataEmployeeTable[]>([]);

  useEffect(()=> {
    const handleData = async () => {
      try{
        const response = await getAssignedEmployeeData(false);
        const newList = response.map((employeeData : EmployeeData) =>{
          const {
            id, 
            firstname, 
            middlename, 
            lastname, 
            birthday, 
            contact,
            email,
            gender,
            addressLine, 
            barangay, 
            country,
            province,
            createdAt,
          } = employeeData
          const fullAddress = `${barangay}, ${addressLine}, ${province}, ${country}`
          const name = `${firstname} ${middlename} ${lastname}`;


          return{
            id,
            fullname: name,
            birthday, 
            contact,
            email,
            gender,
            fullAddress,
            createdAt,
          }
        })
        setData(newList)
      } catch (error){
        console.log(error)
      }
    }
    handleData()
  },[])

  return (
    <NormalLayout>
    
      <div className='flex flex-col gap-5 w-full'>
        <PageTittle title="New Employee"/>
        <DataTable columns={columns} data={data}/>
      </div>
    </NormalLayout> 
  )
}
