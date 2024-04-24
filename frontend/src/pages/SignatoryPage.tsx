

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import PageTittle from "@/components/PageTitle";
import { getAllSignatory } from "@/controller/signatory";
import { DataTable } from "@/components/DataTable";
import { Signatory } from "@/lib/types";
import { NormalLayout } from "@/layouts/NormalLayout";
import { Button } from "@/components/ui/button";



export type SignatoryData = {
  id: string,
  employeeId: string,
  signatoryName: string,
  fullname: string,
  designation: string,
  department: string,
 }
 
 const columns : ColumnDef<SignatoryData>[] =[
     {
         accessorKey: "id",
         header: "ID",
     },{
         accessorKey: "signatoryName",
         header: "Signatory",
     },{
         accessorKey: "fullname",
         header: "Fullname",
     },{
         accessorKey: "designation",
         header: "Designation",
     },{
         accessorKey: "department",
         header: "Department",
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
 


export function SignatoryPage(){
    const [signatory, setSignatory] = useState<SignatoryData[]>([]);


    useEffect(()=> {
      const handleData = async() => {
          try {
              const fetchSignatory = await getAllSignatory()
              
              const newList: SignatoryData[] = fetchSignatory.map( (signatory : Signatory) => {
                  const { id, name, employee } = signatory
                  const {employeeData, department, designation } = employee;
      
                  const { firstname, middlename, lastname } = employeeData;
                  const fullname = `${firstname} ${middlename} ${lastname}`;

                  return{
                      id: id,
                      employeeId: employee.id,
                      signatoryName: name,
                      fullname: fullname,
                      designation: designation.designationName,
                      department: department.departmentName,
                  }
              })
              setSignatory(newList)
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
            <Button>Add New Signatory</Button>
            </div>
            <DataTable columns={columns} data={signatory}/>
        </div>  
      </NormalLayout>
    )
}