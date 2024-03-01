import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddDesignationForm } from "../forms/AddDesignationForm";


export function AddDesignationDialog(){
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'}>Add Designation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Designation </DialogTitle>
                </DialogHeader>
                <AddDesignationForm/>
            </DialogContent>
            
        </Dialog>
    )
}
