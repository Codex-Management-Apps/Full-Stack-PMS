import axios from "axios"
import { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import { PostCard } from "./PostCard";

export interface Post {
  id: number;
  title: string;
  content: string;
}

export function PostList() {
  const [post,setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    getAllPosts();
  },[]);

  async function getAllPosts() {
    try{
      const response = await axios.get("http://localhost:8080/post")
      setPosts(response.data);
    } catch(error){
        console.log(error)
    }
  }
  return (
    <div>
      <PageTitle title={"Post List"}/>
      {post.map((data : Post, index : number)=> (
        <PostCard key={index} id={data.id} title= {data.title} content={data.content} />
      ))}
    </div>
  )
}
