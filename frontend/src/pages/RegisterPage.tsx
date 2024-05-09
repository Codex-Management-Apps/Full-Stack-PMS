import { AddEmployeeDataForm } from "@/components/forms/AddEmployeeDataForm";
import PageTittle from "@/components/PageTitle";
import { ModeToggle } from "@/components/themeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";



export function RegisterPage(){
    return (
        <div className="w-full h-screen flex flex-col">
            <div className="flex h-screen justify-center">
                <ScrollArea className="p-5 max-w-[60rem] max-h-full">
                    
                    <div className="flex flex-col gap-5 p-5 rounded-md border">
                    <PageTittle title="Register Employee Data" />
                    <Separator/>
                    <AddEmployeeDataForm/>
                    </div>

                </ScrollArea>
                
            </div>
            <Toaster />
            <div className=" absolute bottom-0 right-0 mr-6 mb-4">
                <ModeToggle/>
            </div>
        </div>

    )
}