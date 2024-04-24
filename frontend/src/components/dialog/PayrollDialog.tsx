import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Banknote } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

import { PayrollForm } from "../forms/PayrollForm";
import { PayrollData } from "../sections/PayrollData";
import { useEffect, useState } from "react";
import { getPayrollByEmployeeID } from "@/controller/payroll";
import { Payroll } from "@/lib/types";


export function PayRollDialog(data : any){
    const employee = data.row;
    const [hasPayroll, setHasPayroll] = useState<boolean>(false);
    const [payroll, setPayroll] = useState<PayrollData[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    useEffect(() => {
        const generatePayrollData = async () => {
            try {
                const fetchPayroll = await getPayrollByEmployeeID(employee.id.toString());
                
                if (fetchPayroll) {
                    const newList: PayrollData[] = fetchPayroll.map((payroll: Payroll) => {
                        const { id, signatory, start, end, status } = payroll;

                        return {
                            id: id,
                            signatory: signatory.name,
                            start: start,
                            end: end,
                            status: status,
                        };
                    });
                    setPayroll(newList);
                    setHasPayroll(newList.length > 0);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const validate = async () => {
            try {
                // Your validation logic here, comparing current date to payroll start and end dates
                // For example:
                const currentDate = new Date();
                const isValid = payroll.some((payrollItem) => {
                    const startDate = new Date(payrollItem.start);
                    const endDate = new Date(payrollItem.end);
                    return currentDate >= startDate && currentDate <= endDate;
                });
                setHasPayroll(isValid);
            } catch (error) {
                console.log(error);
            }
        };
    
    // Call the functions inside useEffect and add dependencies to avoid infinite loops
        setIsLoading(true)
        generatePayrollData();
        validate();
        setIsLoading(false)
    }, []);

    if(isLoading){
        return null
    }
    
    return(
        <TooltipProvider>
            <Dialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button size={"icon"} className="h-[40px] w-full p-3">
                                <Banknote/>
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent  side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                        <span className="ml-auto text-primary-foreground">Payroll</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="xl:max-w-7xl lg:max-w-5xl">
                    <DialogHeader>
                        <DialogTitle>Payroll</DialogTitle>
                    </DialogHeader>
                    {hasPayroll ? (
                       <PayrollData data={employee}/>
                       
                    ):(
                        <>
                        <PayrollForm data={employee}/>
                        <PayrollData data={employee}/>
                        </>
                    )}
                    
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
