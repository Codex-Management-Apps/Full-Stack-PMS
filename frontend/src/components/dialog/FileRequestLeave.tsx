import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FileRequestLeaveForm } from "../forms/FileRequestForm";


export function FileRequestLeaveDialog(){
    
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"destructive"}>File Request</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Request File Leave </DialogTitle>
                </DialogHeader>
                <FileRequestLeaveForm/>
            </DialogContent>
            
        </Dialog>
    )
}
