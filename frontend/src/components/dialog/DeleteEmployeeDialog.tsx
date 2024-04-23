
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { useToast } from "../ui/use-toast";
import { DeleteEmployeeById } from "@/controller/employee";
type props = {
    row : any, 
    options: number 
}
export function DeleteEmployeeDialog(data : props){
    const {toast} = useToast();

    const handleData = async() =>{
        try {
            await DeleteEmployeeById(data.row.id)
            toast({
                variant: "default",
                title: "Data deleted, Kindly Refresh the page",
                
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something when wrong",
                
            })
        }
    }
    return(
        <TooltipProvider>
            <Dialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            {data.options== 1 ? (
                                <Button variant="destructive"><Trash2 /></Button>
                            ) :(
                                <Button variant="destructive">Cancel</Button>
                            )}
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent  side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                        <span className="ml-auto text-primary-foreground">Delete</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                    </DialogHeader>

                        <DialogTrigger className="flex justify-around">
                            <Button className="px-16" onClick={handleData}> Confirm </Button>
                            <Button className="px-16" variant={"destructive"}> Cancel </Button>
                        </DialogTrigger>

                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
