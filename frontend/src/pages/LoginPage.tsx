import { Login } from "@/components/forms/LoginForm";
import PageTittle from "@/components/PageTitle";
import { ModeToggle } from "@/components/themeToggle";
import { Toaster } from "@/components/ui/toaster";
import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect } from "react";



export function LoginPage(){
    const {auth} = useContext(AuthContext)
    useEffect(() => {
        if(!auth.accessLevel){
            console.log("has already been authenticated")
        }
    })
    return (
        <div className="w-full h-screen flex flex-col">
            <div className="flex h-screen justify-center items-center">
                    <div className="flex flex-col h-3/6 w-2/6 gap-5 p-5 rounded-md border">
                        <PageTittle title="Login" />
                        <Login/>
                    </div>
                
            </div>
            <Toaster />
            <div className=" absolute bottom-0 right-0 mr-6 mb-4">
                <ModeToggle/>
            </div>
        </div>

    )
}