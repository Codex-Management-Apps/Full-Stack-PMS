import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";

import { BookDown } from "lucide-react";

export function PayHeadDialog(row: any){
    return(
        <TooltipProvider>
            <Dialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant={"outline"} size={"icon"} className="h-[40px] w-full p-3">
                                <BookDown />
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent  side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                        <span className="ml-auto text-primary-foreground">Payhead</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Payhead</DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
