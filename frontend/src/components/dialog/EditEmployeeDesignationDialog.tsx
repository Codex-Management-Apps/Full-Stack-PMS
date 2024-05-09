
import { Employee } from "@/lib/types";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { EditEmployeeDesignationForm } from "../forms/EditEmployeeDesignationForm";

type Props ={
    data : Employee
}
export function EditEmployeeDesignationDialog({data} : Props){
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                
                <Button variant={'outline'}>Edit Designation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Designation</DialogTitle>
                </DialogHeader>
                <EditEmployeeDesignationForm data={data}/>
            </DialogContent>
            
        </Dialog>
    )
}