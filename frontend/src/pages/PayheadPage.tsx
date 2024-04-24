
import { DataTable } from '@/components/DataTable';
import PageTittle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { getAllPayheads } from '@/controller/payhead';
import { NormalLayout } from '@/layouts/NormalLayout'
import { Payhead } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table'
import { useState, useEffect } from 'react';


 
const columns : ColumnDef<Payhead>[] =[
    {
        accessorKey: "id",
        header: "ID",
    },{
        accessorKey: "name",
        header: "Name",
    },{
        accessorKey: "type",
        header: "Type",
    },{
        header:"Actions",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
         
          return (
            <Button variant={"destructive"}>Delete</Button>
          )
        },
      }
    
]
 

export default function PayHeadsPage() {
    const [payhead, setPayhead] = useState<Payhead[]>([]);


    useEffect(()=> {
      const handleData = async() => {
          try {
              const fetchSignatory = await getAllPayheads()
              
              
              setPayhead(fetchSignatory)
          }catch(error){
              console.log(error)
          } 
      }

      handleData()
  }, [])

  return(
    <NormalLayout>
      <div className="w-full flex flex-col gap-5">
        <div className='flex justify-between'>
        <PageTittle title="Payheads"/>
        <Button>Add New Payhead</Button>
        </div>
        <DataTable columns={columns} data={payhead}/>
      </div>  
    </NormalLayout>
  )
}

