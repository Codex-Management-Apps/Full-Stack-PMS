
import { Employee } from "@/lib/types";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { EditEmployeeDepartmentForm } from "../forms/EditEmployeeDepartmentForm";

type Props ={
    data : Employee
}
export function EditEmployeeDepartmentDialog({data} : Props){
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                
                <Button variant={'outline'}>Edit Department</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Department</DialogTitle>
                </DialogHeader>
                <EditEmployeeDepartmentForm data ={data}/>
                
            </DialogContent>
            
        </Dialog>
    )
}