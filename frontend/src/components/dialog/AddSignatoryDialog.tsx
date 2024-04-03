import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { AddSignatoryForm } from "../forms/AddSignatoryForm"

export function AddSignatoryDialog(){
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Role</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Role </DialogTitle>
                </DialogHeader>
                <AddSignatoryForm />
            </DialogContent>
            
        </Dialog>
    )
}
