import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { DialogTrigger } from "@radix-ui/react-dialog";

import { Employee } from "@/lib/types";
import { EditEmployeeDataForm } from "../forms/EditEmployeeDataForm";

type Props ={
    data : Employee
}

export function EditEmployeeDataDialog({data} : Props){
    
    return(
        <TooltipProvider>
            <Dialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant={"outline"}>
                                Edit Employee Data
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent  side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                        <span className="ml-auto text-primary-foreground">Edit  Employee Data</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className=" max-w-screen-lg max-h-screen">
                    <DialogHeader>
                        <DialogTitle>Edit Employee Data</DialogTitle>
                    </DialogHeader>
                    <EditEmployeeDataForm data={data}/>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
