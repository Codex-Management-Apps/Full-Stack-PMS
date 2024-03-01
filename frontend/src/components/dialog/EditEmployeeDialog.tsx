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
import { Employee } from "@/controller/employee";


export function EditEmployeeDialog(data: Employee){
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                
                <Button variant={'outline'}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Employee</DialogTitle>
                    <DialogDescription>Edit employee ID #{data.id}</DialogDescription>
                    <DialogDescription>LastUpdate: {data.last_update}</DialogDescription>    
                </DialogHeader>
                <EditEmployeeForm {...data}/>
                
            </DialogContent>
            
        </Dialog>
    )
}
