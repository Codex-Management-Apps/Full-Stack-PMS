import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { AddEmployeeForm } from "../forms/AddEmployeeForm";

export function AddEmployeeDialog(){
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'}>Add Employee</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Employee</DialogTitle>    
                </DialogHeader>
                <AddEmployeeForm/>
            </DialogContent>
        </Dialog>
    )
}
