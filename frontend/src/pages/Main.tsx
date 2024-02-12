import { Button } from '@/components/ui/button'
import { NormalLayout } from '@/layouts/NormalLayout'
import axios from 'axios';
import { AlignCenter } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { PostForm } from '@/components/PostForm';

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
      <PostForm/>

      {/* <hr className='h-[2.5px] my-[8px] bg-gray-500 border-100 dark:bg-gray-700'></hr> */}
    </NormalLayout>
  )
}

