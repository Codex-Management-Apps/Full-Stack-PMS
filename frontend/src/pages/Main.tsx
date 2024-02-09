
import { Button } from '@/components/ui/button'
import { NormalLayout } from '@/layouts/NormalLayout'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'


export default function Main() {
  const [post, setPosts] = useState();

  useEffect(() => {
    loadUsers()
  });

  const loadUsers = async () => {
    // Get data from the backend using axios.get("http://localhost:5173/posts")
    // 
    // const result = await axios.get()
    // setPosts(result.data)
  }

  return (
    <NormalLayout>
      <div className="flex flex-col gap-5 w-full">
        <div>
          <Link to="/create"> <Button variant="default"> Create +</Button> </Link>
        </div>
        {/* Content */}
      </div>
    </NormalLayout>
  )
}
