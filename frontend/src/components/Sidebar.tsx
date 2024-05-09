
import {
  AppWindow,
  Bell,
  CircleUserRound,

  } from "lucide-react"
import { Nav } from './ui/nav'
import { Button } from "./ui/button"
import { request, setAuthHeader } from "@/api/axios"
import { useNavigate } from "react-router-dom"


type Props = {
  layout : any
}

export default function SideNavbar({layout}: Props) {
  const navigate = useNavigate();

  const handleOnclick = async () => {
    setAuthHeader(null)
    localStorage.removeItem("auth")
    await request("POST","/auth/logout")
    navigate("/login")
  }
// relative min-w-[280px] border-r px-3 h-full fmax-h-screen lex flex-col gap-2 bg-muted/40 
  return (
    <div className='hidden border-r bg-muted/40 md:block h-full'>
      <div className="flex h-full max-h-screen flex-col gap-2 w-[300px]">
        <div className="flex h-14 items-center justify-between px-4 border-b">
          <a className="flex items-center gap-2 font-semibold">
            <AppWindow />
            <span>Event Driven Program</span>
          </a>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground ml-auto h-8 w-8">
            <Bell />
          </button>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div>
            {/* User Profile */}
            <div className="m-3 flex gap-3 ">
              <button className="flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 w-10 rounded-full">
                    <CircleUserRound />
              </button>
              <div className="flex flex-col">
                <span>Username</span>
                <span className=" text-xs">Admin</span>
              </div>
            </div>
            <Nav
                links={layout}
              />
          </div>
          <div className="m-5">
            <Button variant={"outline"} className="w-full" onClick={handleOnclick}>Log out</Button>
          </div>
        </div>
      </div>
    </div>
  )
}