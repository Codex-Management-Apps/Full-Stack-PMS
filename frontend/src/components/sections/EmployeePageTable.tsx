import { getAllEmployee } from "@/controller/employee";
import { useEffect, useRef, useState } from "react"
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { PayHeadDialog } from "../dialog/PayHeadsDialog";
import { PayRollDialog } from "../dialog/PayrollDialog";
import { Employee } from "@/lib/types";
import { Button } from "../ui/button";
import { SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeleteEmployeeDialog } from "../dialog/DeleteEmployeeDialog";

export type EmployeeTable = {
    id: number,
    empnum: string,
    name: string,
    email:string,
    contact:string,
    gender: string,
    department: string,
    designation:string,
    employeeType : string,
    joined: string,
}
  
  const columns: ColumnDef<EmployeeTable>[] = [
    {
      accessorKey: "empnum",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },{
      accessorKey: "email",
      header: "Email",
    },{
      accessorKey: "contact",
      header: "Contact",
    },{
      accessorKey: "gender",
      header: "Gender",
    },{
      accessorKey: "department",
      header: "Department",
    },{
      accessorKey: "designation",
      header: "Designation",
    },{
      accessorKey: "joined",
      header: "Joined",
    },{
      accessorKey: "employeeType",
      header: "EmployeeType",
    },{
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const navigate = useNavigate();
        const viewData = (data : any)=>{
          const dataId = data.id
          navigate(`/p/admin/employee/${dataId}`)
      }
        return (
          <div className="grid grid-cols-2 gap-2">
            <PayRollDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""}/>
            <PayHeadDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""}/>
            <Button variant="secondary" onClick={()=> {viewData(row.getVisibleCells().find((cell) => cell.row.original)?.row.original || "")}}><SquarePen /></Button>
            <DeleteEmployeeDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""} options={1}/>
        </div>
        )
      },
    }
  ]

export function EmployeePageTable(){
    const currentRan = useRef(false)
    const [Employee, setEmployee] = useState<EmployeeTable[]>([]);
     const [isLoading, setIsLoading] = useState<Boolean>(true);
    useEffect(()=>{
      if(currentRan.current === false){
          const getData = async () =>{
              try {
                const data = await getAllEmployee();
                const newList: EmployeeTable[] = data.map((employee: Employee) => {
                  const { id, empNum, employeeData, department, designation, employeeType, createdAt } = employee;
                
                  const { firstname, middlename, lastname, email, contact, gender } = employeeData;
                  const name = `${firstname} ${middlename} ${lastname}`;
                  
                  return {
                    id,
                    empnum: empNum,
                    name,
                    email,
                    contact,
                    gender,
                    department: department.departmentName,
                    designation: designation.designationName,
                    employeeType,
                    joined: createdAt
                  }
                });
                  setEmployee(newList);
                  console.log(newList)
              } catch (error) {
                console.log(error)
              } finally {
                setIsLoading(false)
              }
            }
            currentRan.current = true
            getData()
      }
    },[])
    return(
        <div>
            {isLoading ? (
            <div>Loading...</div>
            ) : (
            <DataTable columns={columns} data={Employee} />
            )}
        </div>
    )
}