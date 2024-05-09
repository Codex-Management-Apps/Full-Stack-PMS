import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { AddSignatoryForm } from "../forms/AddSignatoryForm"
import { Employee } from "@/lib/types"
import { EditSignatoryForm } from "../forms/EditSignatoryForm"
type Props ={
    data : any,
}

export function EditSignatoryDialog({data} : Props){
    return(
        <TooltipProvider>
            <Dialog >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant={'default'}>Edit</Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                        <span className="ml-auto text-primary-foreground">Edit Signatory</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="xl:max-w-5xl lg:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Edit Signatory</DialogTitle>    
                    </DialogHeader>
                    <EditSignatoryForm data={data}/>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
