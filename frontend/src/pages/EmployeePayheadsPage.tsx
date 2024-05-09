import { DataTable } from "@/components/DataTable";
import { AddEmployeePayheadDialog } from "@/components/dialog/AddEmployeePayheadDialog";
import { DeleteEmployeePayheadDialog } from "@/components/dialog/DeleteEmployeePayheadDialog";
import { EditAssignPayheadDialog } from "@/components/dialog/EditAssignPayheadDialog";
import PageTittle from "@/components/PageTitle";
import {  getAllAssignPayheadUnderEmployeeID } from "@/controller/asssignPayhead";
import { AssignPayhead } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const columns: ColumnDef<AssignPayhead>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },{
        accessorKey: "payhead.name",
        header: "Name",
    },{
        accessorKey: "payhead.type",
        header: "Type",
    },{
        accessorKey: "amount",
        header: "Amount",
    },{
        accessorKey: "description",
        header: "Description",
    },{
        header:"Actions",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {

          return (
            <div>
                <div className="flex flex-col gap-3">
                <EditAssignPayheadDialog data = {row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""}/>
                <DeleteEmployeePayheadDialog row = {row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""} options={2}/>
                </div>
            </div>
          )
        },
      }
]


export function EmployeePayheadPage(){
    const currentRan = useRef(false);
    const { id } = useParams<{ id: string }>();
    const [employeePayhead, setEmployeePayhead] = useState<AssignPayhead[]>([]);
    useEffect(() =>{
        if(currentRan.current === false){{
            const handleData = async() =>{
                const response = await getAllAssignPayheadUnderEmployeeID(id || "");
                console.log(response)
                setEmployeePayhead(response)
            }
            currentRan.current= true
            handleData()
        }}
    })
    return(
        <div className="p-5 flex flex-col gap-5">
            <div className='font-bold w-full flex justify-between'>
                <PageTittle title='Payhead'/>
                <AddEmployeePayheadDialog />
            </div>
            <DataTable columns={columns} data={employeePayhead} />
        </div>
    )
}