import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { DialogTrigger } from "@radix-ui/react-dialog";

import { EditAssignPayheadForm } from "../forms/EditAssignPayheadForm";

type Props ={
    data : any
}

export function EditAssignPayheadDialog({data} : Props){
    return(
        <TooltipProvider>
            <Dialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant={"default"}>
                                Update Data
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent  side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                        <span className="ml-auto text-primary-foreground">Edit  Employee Data</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Employee Data</DialogTitle>
                    </DialogHeader>
                    <EditAssignPayheadForm data={data}/>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
