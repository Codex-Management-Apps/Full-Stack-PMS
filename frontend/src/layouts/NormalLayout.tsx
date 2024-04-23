
import { Toaster } from "@/components/ui/toaster"
import { Menu } from 'lucide-react';

import SideNavbar from "@/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/themeToggle";


export function NormalLayout({
    children
} : Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <div className="w-full h-screen flex">
            <SideNavbar/>
            <div className="flex flex-col w-full">
                <header className="flex h-14 sticky items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[51px] lg:px-6">
                    <button className="flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 shrink-0 md:hidden">
                        <Menu />
                    </button>
                    {/* <div className="w-full flex-1">
                        <Input className="flex h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"/>
                    </div> */}

                </header>
                <ScrollArea className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}    
                </ScrollArea>
            </div>
            <Toaster />
            <div className=" absolute bottom-0 right-0 mr-6 mb-4 p-2">
                <ModeToggle/>
            </div>
        </div>
    )
}

