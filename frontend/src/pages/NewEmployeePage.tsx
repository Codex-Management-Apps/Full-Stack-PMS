
// import { getPostById } from '@/controller/post';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

import PageTittle from '@/components/PageTitle';
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react';
import { Employee } from '@/lib/types';
import { getAllEmployee } from '@/controller/employee';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export type EmployeeTable = {
  id: number,
  empnum: string,
  name: string,
  email:string,
  contact:string,
  gender: string,
  department: string,
  designation:string,
  employeeType : string,
  joined: string,
}

const columns: ColumnDef<EmployeeTable>[] = [
  {
    accessorKey: "empnum",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },{
    accessorKey: "email",
    header: "Email",
  },{
    accessorKey: "contact",
    header: "Contact",
  },{
    accessorKey: "gender",
    header: "Gender",
  },{
    accessorKey: "department",
    header: "Department",
  },{
    accessorKey: "designation",
    header: "Designation",
  },{
    accessorKey: "joined",
    header: "Joined",
  },{
    accessorKey: "employeeType",
    header: "EmployeeType",
  },
]

export default function EmployeePage() {
  
  const [Employee, setEmployee] = useState<EmployeeTable[]>([]);
  const [employeDataCount, setEmployeDataCounte] = useState<Number>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect( () => {
    const getData = async () =>{
      try {
        const data = await getAllEmployee();
        const newList: EmployeeTable[] = data.map((employee: Employee) => {
          const { id, empNum, employeeData, department, designation, employeeType, createdAt } = employee;
        
          const { firstname, middlename, lastname, email, contact, gender } = employeeData;
          const name = `${firstname} ${middlename} ${lastname}`;
        
          return {
            id,
            empnum: empNum,
            name,
            email,
            contact,
            gender,
            department: department.departmentName,
            designation: designation.designationName,
            employeeType,
            joined: createdAt
          }
        });
        
         setEmployee(newList);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    const getNewEmployeeData = async () => {
      try {
        
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    setIsLoading(true)
    getData();
  },[]);

  return (
   
   
      <div className='flex flex-col gap-5 w-full'>
        <div className='flex w-full justify-between items-center'>
            <PageTittle title="Employees"/>

            <div className='flex gap-3 items-center mx-1'>
              <div className='relative p-2'>
              <Button> 
                New Employee
                <div className='absolute top-0 right-0 px-2 bg-red-500 rounded-full text-white'>
                  1
                </div>
              </Button>
              </div>
              <Input placeholder='Search Employee'/>
            </div>
            
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <DataTable columns={columns} data={Employee}/>
        )}
      </div>

  )
}
