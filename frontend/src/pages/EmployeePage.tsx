
import { NormalLayout } from '@/layouts/NormalLayout'
import PageTittle from '@/components/PageTitle';
import { EmployeePageHeading } from '@/components/sections/EmployeePageHeading';
import { EmployeePageTable } from '@/components/sections/EmployeePageTable';

export default function EmployeePage() {
  return (
    <NormalLayout>
    {/* <Button className='absolute top-20 right-80 bg-white-500 text-white-500 border border-gray-400 rounded-md px-8 py-2'>Add</Button> */}
      <div className='flex flex-col gap-5 w-full'>
        <div className='flex w-full justify-between items-center'>
            <PageTittle title="Employees"/>
            <EmployeePageHeading/>
        </div>
        <EmployeePageTable/>
      </div>
    </NormalLayout> 
  )
}
