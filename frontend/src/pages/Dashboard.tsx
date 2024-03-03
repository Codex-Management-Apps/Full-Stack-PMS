import PageTittle from '@/components/PageTitle'
import { AddDeparmentsDialog } from '@/components/dialog/AddDepartmentsDialog'
import { AddDesignationDialog } from '@/components/dialog/AddDesignationDialog'

import { Card } from '@/components/ui/card'
import { NormalLayout } from '@/layouts/NormalLayout'


export default function Dashboard() {
  
  return (
    <NormalLayout>
      <div className='flex flex-col gap-5'>
        <PageTittle title="Dashboard" />
        <div className='grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 w-full'>
          <Card>
            <p className="p-4 font-semibold"> Recent Employee</p>
          </Card>
          <div className='flex flex-col gap-5'>
            <Card>
              <p className="p-4 font-semibold"> Recent Designation</p>
            </Card>
            <div className=' flex flex-col gap-2 justify-between'>
              <Card>
                <p className="p-4 font-semibold"> Recent Departments</p>
              </Card>
              <div className=' flex gap-5'>
                <AddDesignationDialog/>
                <AddDeparmentsDialog/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NormalLayout>
  )
}

