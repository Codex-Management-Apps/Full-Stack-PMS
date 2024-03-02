import { useState } from 'react'
import {
  ChevronRight,
  LayoutDashboard,
  UserRound,
  } from "lucide-react"
import { Nav } from './ui/nav'
import { Button } from './ui/button'
import { useWindowWidth } from '@react-hook/window-size'

type Props = {}

export default function SideNavbar({}: Props) {
  const  [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth()
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar(){
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className='relative min-w-[80px] border-r px-3 pb-10 pt-24 min-h-screen'>

      {!mobileWidth && (
        <div className='absolute right-[-20px] top-7'>
          <Button onClick={toggleSidebar} variant="secondary" className='rounded-full p-2'>
            <ChevronRight/>
          </Button>
        </div>
      )}
        <Nav
            isCollapsed={mobileWidth ? true : isCollapsed}
            links={[
              {
                title: "Dashboard",
                href : "/",
                icon: LayoutDashboard,
                variant: "default",
              },
              {
                title: "Employee",
                href : "/employee",
                icon: UserRound,
                variant: "default",
              },           
            ]}
          />
    </div>
  )
}