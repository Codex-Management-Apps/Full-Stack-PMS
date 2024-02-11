import { Button } from '@/components/ui/button'
import { NormalLayout } from '@/layouts/NormalLayout'
import axios from 'axios';
import { AlignCenter } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react';

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
        {/* Content */}
        <div className='grid grid-cols-3 '>
            <textarea className='p-1 bg-white-500 outline outline-offset-[2] outline-[4] rounded-lg border-solid border-[2] border-gray-[500] min-h-[50]px my-[74px] mx-[30px] mr-[150px] h-[40px]' placeholder='Title...'></textarea>
        </div>

        <div className='grid grid-cols-2'>
            <textarea className='p-1 bg-white-500 outline outline-offset-[2] outline-[4] rounded-lg shadow-xl min-h-[50]px mx-[30px] my-[-80px] w-[1000px]' placeholder='type something here...'></textarea>
         </div>

         <div className='grid grid-cols-2'>
         <button className='bg-gray-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded min-h-[30px] w-[100px] ml-[930px] mt-[80px]' >
            <p className='p-Button'>Button</p>
         </button>
        </div>
      </div>

      <hr className='h-[2.5px] my-[8px] bg-gray-500 border-100 dark:bg-gray-700'></hr>
    </NormalLayout>
  )
}

