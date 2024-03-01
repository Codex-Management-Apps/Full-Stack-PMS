import PageTittle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
              item 2
            </Card>
            <div className=' flex flex-col gap-2 justify-between'>
              <Card>
                item 3
              </Card>
              <div className=' flex gap-5'>
                <Button variant={'outline'}>Add Designation</Button>
                <Button variant={'outline'}>Add Departments</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NormalLayout>
  )
}

