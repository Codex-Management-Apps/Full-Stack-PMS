import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { AddDepartmentsForm } from "../forms/AddDepartmentsForm";


export function AddDeparmentsDialog(){
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'}>Add Departments</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Departments </DialogTitle>
                </DialogHeader>
                <AddDepartmentsForm/>
            </DialogContent>
            
        </Dialog>
    )
}
