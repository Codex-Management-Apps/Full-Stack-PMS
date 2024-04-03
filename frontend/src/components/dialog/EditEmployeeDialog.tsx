import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { EditEmployeeForm } from "../forms/EditEmployeeForm";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Employee } from "@/lib/types";

type Props = {
    employee: Employee | undefined
}


export function EditEmployeeDialog({employee} : Props){
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                
                <Button variant={'outline'}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Employee</DialogTitle>
                    <DialogDescription>Edit employee ID #{employee!.id}</DialogDescription>
                    <DialogDescription>LastUpdate: {employee!.last_update}</DialogDescription>    
                </DialogHeader>
                <EditEmployeeForm data = {employee}/>
                
            </DialogContent>
            
        </Dialog>
    )
}
