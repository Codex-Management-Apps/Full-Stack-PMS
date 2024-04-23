import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { getAssignedEmpoloyeeDataCount } from "@/controller/dataemployee";
import { Button } from "../ui/button";


export function EmployeePageHeading(){
    const currentRan = useRef(false)
    const [employeDataCount, setEmployeDataCounter] = useState<Number>();
  
    const navigate = useNavigate();

    useEffect( () => {
        if(currentRan.current === false){
            const getNewEmployeeData = async () => {
                try {
                  // False = not assigned & True = Assigned Employee
                  const count = await getAssignedEmpoloyeeDataCount(false)
                  setEmployeDataCounter(count)
                  currentRan.current = true;
                } catch (error) {
                  console.log(error)
                }
              }
          
              getNewEmployeeData();
        }
      },[]);
    return(
        <div className='flex gap-3 items-center mx-1'>
            <div className='relative p-2'>
            <Button onClick={()=>{
                navigate("/p/admin/employee/new")
                }}> 
                New Employee
                {employeDataCount != 0 && (
                    <div className='absolute top-0 right-0 px-2 bg-red-500 rounded-full text-white'>
                    {String(employeDataCount)}
                    </div>
                )}
            </Button>
            </div>
            <Input placeholder='Search Employee'/>
        </div>
    )
}