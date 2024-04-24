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

export function AddSignatoryDialog(){

    return(
        <TooltipProvider>
            <Dialog >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant={'default'}>Add New Signatory</Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                        <span className="ml-auto text-primary-foreground">Add New Signatory</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="xl:max-w-5xl lg:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Add New Signatory</DialogTitle>    
                    </DialogHeader>
                    <AddSignatoryForm/>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
