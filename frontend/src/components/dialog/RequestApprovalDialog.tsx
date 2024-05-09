
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LeaveRequest } from "@/lib/types"
import { useToast } from "../ui/use-toast"
import { updateLeaveRequest } from "@/controller/requestLeave"

type Props = {
    repData: LeaveRequest
}

export function RequestApprovalDialog({repData} : Props){
    const {toast} = useToast();

    const handleOnClick = async () => {
        try {
           
            const handleData = {
                ...repData,
                status: "Approved"
            }
            await updateLeaveRequest(handleData)
            
            // If the promise resolves without throwing an error, it means the submission was successful
            toast({
                variant: "default",
                title: "Data Submitted",
            });
        } catch (error) {
            // If an error occurs during submission, handle it here
            console.error("Error submitting data:", error);
    
            toast({
                variant: "destructive",
                title: "Error submitting data",
                description: "An error occurred while submitting the data. Please try again later.",
            });
        } 
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button>Approve</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure? </DialogTitle>
                </DialogHeader>
                <Button onClick={handleOnClick}>
                    Yes
                </Button>
                <DialogClose> 
                    <Button type="button" variant={"destructive"} >
                        No
                    </Button>
                </DialogClose>
            </DialogContent>
            
        </Dialog>
    )
}
