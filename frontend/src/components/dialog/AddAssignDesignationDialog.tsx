import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { AddAssignDesignationForm } from "../forms/AddAssignDesignationForm";


export function AddAssignDesignationDialog(){
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'}>Assign Designation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Assign Designation </DialogTitle>
                </DialogHeader>
                <AddAssignDesignationForm/>
            </DialogContent>
            
        </Dialog>
    )
}
