import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getAllTypeUnderEmployeeID } from "@/controller/asssignPayhead";
import { AssignPayhead } from "@/lib/types";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";

import { BookDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DataTable } from "../DataTable";
import { Card } from "../ui/card";
import { ColumnDef } from "@tanstack/react-table";
import PageTittle from "../PageTitle";
import { useNavigate } from "react-router-dom";

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
    },
]


export function PayHeadDialog({row}: any){
    console.log(row)
    const currentRan = useRef(false);
    const navigate = useNavigate();
    const [employeeEarnings, setEmployeeEarnings] = useState<AssignPayhead[]>([]);
    const [employeeDeductions, setEmployeeDeductions] = useState<AssignPayhead[]>([]);

    useEffect(() =>{
        if(currentRan.current === false){{
            const handleData = async() =>{
                try {
                    const earnings = await getAllTypeUnderEmployeeID(row.id, "earnings")
                    
                    setEmployeeEarnings(earnings)
                    
                } catch (error) {
                    console.log(error)
                }
            }

            const getAllDeduction = async() => {
                try {
                    const deductions = await getAllTypeUnderEmployeeID(row.id, "deductions")
                    setEmployeeDeductions(deductions)
                } catch (error) {
                    console.log(error)
                }
            }
            currentRan.current= true
            handleData()
            getAllDeduction()
        }}
    })

    return(
        <TooltipProvider>
            <Dialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant={"outline"} size={"icon"} className="h-[40px] w-full p-3">
                                <BookDown />
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent  side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                        <span className="ml-auto text-primary-foreground">Payhead</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="sm:max-w-7xl">
                    <DialogHeader>
                        <DialogTitle>Employee Payheads</DialogTitle>
                    </DialogHeader>
                    <div className="p-5 flex flex-col gap-14">
                        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
                            <Card className="p-5 flex flex-col gap-5">
                            <PageTittle title='Earnings'/>
                                <DataTable columns={columns} data={employeeEarnings} />
                            </Card>
                            <Card className="p-5 flex flex-col gap-5">
                            <PageTittle title='Deductions'/>
                                <DataTable columns={columns} data={employeeDeductions} />
                            </Card>
                        </div>
                        <Button onClick={() => navigate(`/admin/employee/${row.id}/payheads`)}>Configure</Button>
                    </div>
                    
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
