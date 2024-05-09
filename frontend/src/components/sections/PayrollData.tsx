
import { DialogDescription } from "@radix-ui/react-dialog";
import { DataTable } from "../DataTable";
import { DialogTitle } from "../ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getPayrollByEmployeeID } from "@/controller/payroll";
import { Payroll } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { EmployeeTable } from "./EmployeePageTable";

export type PayrollData = {
    id:string,
    signatory: string,
    start: string,
    end:string,
    status:string,
}

const columns : ColumnDef<PayrollData>[] =[
    {
        accessorKey: "id",
        header: "ID",
    },{
        accessorKey: "signatory",
        header: "Signatory",
    },{
        accessorKey: "start",
        header: "Start Date",
    },{
        accessorKey: "end",
        header: "End Date",
    },{
        accessorKey: "status",
        header: "Status",
    }, {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const navigate = useNavigate();
            const viewData = (data : any)=>{
                const dataId = data.id
                navigate(`/admin/employee/payroll/${dataId}`)
                
            }
            return (
                <Button onClick={() => viewData(row.getVisibleCells().find((cell) => cell.row.original)?.row.original || "")}>View</Button>
            )
        },
        }
]

type EmpData = {
    data: EmployeeTable
}


export function PayrollData({data}: EmpData){
    console.log(data)
    const [payroll,setPayroll] = useState<PayrollData[]>([])

    useEffect(()=> {
        const handleData = async() =>{
            try {
                const fetchPayroll = await getPayrollByEmployeeID(data.id.toString())
                console.log(fetchPayroll)
                if(fetchPayroll){
                    const newList: PayrollData[] = fetchPayroll.map( (payroll : Payroll) =>{
                        const {id, signatory,start,end, status} = payroll
    
                        return {
                            id:id,
                            signatory: signatory.name,
                            start: start,
                            end:end,
                            status:status,
                        }
                    })
                    setPayroll(newList)
                }
                
            } catch (error) {
                console.log(error)
            } 
        }
        handleData()
    },[])

    return(
        <div className="w-full flex flex-col gap-5">
           <DialogTitle>Payroll History</DialogTitle>
           <DialogDescription>Data is sorted recent - oldest</DialogDescription>
           <DataTable columns={columns} data={payroll}/>
        </div>  
    )
}