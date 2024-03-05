import DashCard, { CardContent } from '@/components/DashCard'
import PageTittle from '@/components/PageTitle'
import { AddDeparmentsDialog } from '@/components/dialog/AddDepartmentsDialog'
import { AddDesignationDialog } from '@/components/dialog/AddDesignationDialog'

import { Card } from '@/components/ui/card'
import { NormalLayout } from '@/layouts/NormalLayout'
import { useEffect, useState } from 'react'

import { getTopNAssignDesignation } from '@/controller/assigned'
import { getTopNDesignation } from '@/controller/designation'
import { getTopNDepartment } from '@/controller/department'
import { AssignDesignation, Department, Designation } from '@/lib/types'


export default function Dashboard() {
  const [assignedEmployee, setAssignedEmployee] = useState<AssignDesignation[]>([]);
  const [designation, setDesignation] = useState<Designation[]>([]);
  const [departments, setDepartment] = useState<Department[]>([]);
  const count = "5";

  useEffect(() =>{
    handleData()
  },[])

  const handleData = async () => {
    try {
      const employeData = await getTopNAssignDesignation(count);
      const designationData = await getTopNDesignation(count);
      const departmentData = await getTopNDepartment(count);

      setAssignedEmployee(employeData);
      setDesignation(designationData);
      setDepartment(departmentData);
    } catch(error){
      console.log(error)
    }
  }
  return (
    <NormalLayout>
      <div className='flex flex-col gap-5'>
        <PageTittle title="Dashboard" />
        <div className='grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 w-full'>
          <CardContent className='flex flex-col gap-2 '>
            <section>
            <p className=" pb-4 font-semibold"> Recent Employee</p>
            </section>
            {assignedEmployee.map((d,i)=>(
              <DashCard key={i}
                name={d.employee.firstname}
                description={d.designation.designationName}
                status={d.status}/>
            ))}
          </CardContent>
          <div className='flex flex-col gap-5'>
          <CardContent className='  flex flex-col gap-2 justify-between'>
              <p className="pb-4 font-semibold"> Recent Designation</p>
              {designation.map((d,i)=>(
                <DashCard key={i}
                  name={d.designationName}
                  status={d.status}/>
              ))}
            </CardContent>

            <CardContent className=' flex flex-col gap-2 justify-between'>
              <section><p className="pb-4 font-semibold"> Recent Departments</p></section>
              {departments.map((d,i)=>(
                <DashCard key={i}
                  name={d.departmentName}
                  status={d.status}/>
              ))}
            </CardContent>
            <div className=' flex gap-5'>
              <AddDesignationDialog/>
              <AddDeparmentsDialog/>
            </div>

          </div>
        </div>
      </div>
    </NormalLayout>
  )
}

