
import { Toaster } from "@/components/ui/toaster"

import SideNavbar from "@/components/Sidebar";
import { cn } from "@/lib/utils";


export function NormalLayout({
    children
} : Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <div className={cn('min-h-screen w-full bg-white text-black flex',
        {'debug-creens' : process.env.NODE_ENV === 'development'})}>
            <SideNavbar/>
            <div className="p-8 w-full">
            {children}
            </div>
            <Toaster />
        </div>
    )
}