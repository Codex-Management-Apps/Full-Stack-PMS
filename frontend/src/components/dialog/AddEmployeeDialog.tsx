import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

import { AddEmployeeForm } from "../forms/AddEmployeeForm";

export function AddEmployeeDialog({row} : any){
    
    return(
        <TooltipProvider>
            <Dialog >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant={'default'}>Add as Employee</Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                        <span className="ml-auto text-primary-foreground">Add as Employee</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="xl:max-w-5xl lg:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Add Employee</DialogTitle>    
                    </DialogHeader>
                    <AddEmployeeForm id={row.id}/>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
