
import { getPostById } from '@/controller/post';
import { NormalLayout } from '@/layouts/NormalLayout'

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export default function ViewPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState({
    id: "",
    title: "",
    content: "",
  });
  useEffect(() => {
    const fetchData = async ()=>{
      try {
        const postData = await getPostById(id);
        setData(postData);
      } catch (error) {
        console.error("Error fetching post data: ", error);
      }
    }
    fetchData()
  },[id])

  return (
    <NormalLayout>
      <div>
        <h1>Title: {data.title}</h1>
        <p>Content: {data.content}</p>
      {/* Render other components based on the fetched data */}
      </div>
    </NormalLayout>
  )
}
