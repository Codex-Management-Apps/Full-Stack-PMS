import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EditAssignDesignationForm } from "../forms/EditAssignDesignationForm"

import { Employee,Designation, AssignDesignation } from "@/lib/types";

export type Props = {
    designation : AssignDesignation | undefined
}

export function EditAssignDesignationDialog({designation}: Props){
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                {/* Put conditional statement here if Employee has not assigned yet */}
                <Button variant={'outline'}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Assign Designation</DialogTitle>
                    <DialogDescription>LastUpdate: ????</DialogDescription>    
                </DialogHeader>
                <EditAssignDesignationForm data={designation} />
                
            </DialogContent>
            
        </Dialog>
    )
}
