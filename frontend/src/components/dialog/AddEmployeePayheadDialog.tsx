import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { AddEmployeePayheadForm } from "../forms/AddEmployeePayheadForm"

export function AddEmployeePayheadDialog(){
    
    return(
        <TooltipProvider>
            <Dialog >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant={'default'}>Add Employee Payhead</Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                        <span className="ml-auto text-primary-foreground">Add as Employee</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Add Payhead</DialogTitle>    
                    </DialogHeader>
                    <AddEmployeePayheadForm/>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
