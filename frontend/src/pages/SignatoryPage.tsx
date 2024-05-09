

import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import PageTittle from "@/components/PageTitle";
import { getAllSignatory } from "@/controller/signatory";
import { DataTable } from "@/components/DataTable";
import { Signatory } from "@/lib/types";

import { AddSignatoryDialog } from "@/components/dialog/AddSignatoryDialog";
import { EditSignatoryDialog } from "@/components/dialog/EditSignatoryDialog";
import { DeleteSignatoryDialog } from "@/components/dialog/DeleteSignatoryDialog";



export type SignatoryData = {
  id: string,
  employeeId: string,
  signatoryName: string,
  fullname: string,
  status: string,
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
        accessorKey: "status",
        header: "Status",
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
            <div className="flex gap-5">
                <EditSignatoryDialog data={row.getVisibleCells().find((cell) => cell.row.original.id)?.row.original || ""}/>
                <DeleteSignatoryDialog row={row.getVisibleCells().find((cell) => cell.row.original.id)?.row.original || ""}/>
            </div>
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
                  const { id, name, employee,status } = signatory
                  const {employeeData, department, designation } = employee;
      
                  const { firstname, middlename, lastname } = employeeData;
                  const fullname = `${firstname} ${middlename} ${lastname}`;

                  return{
                      id: id,
                      employeeId: employee.id,
                      signatoryName: name,
                      fullname: fullname,
                      status,
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

        <div className="w-full flex flex-col gap-5">
            <div className='flex justify-between'>
            <PageTittle title="Signatory"/>
            <AddSignatoryDialog/>
            </div>
            <DataTable columns={columns} data={signatory}/>
        </div>  

    )
}