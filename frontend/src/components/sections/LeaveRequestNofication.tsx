import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'
import { LeaveRequest } from '@/lib/types'

type Props = {
    leaveRequestData : LeaveRequest[]
}

export function LeaveRequestNofication({leaveRequestData} : Props) {


  return (
    <Link to={"/leave"} className='flex items-center'>
        
        <div className='flex items-center gap-3'>
            <p>Leave Requests</p>
            {leaveRequestData.length}
            <Bell />
        </div>
    </Link>
  )
}

