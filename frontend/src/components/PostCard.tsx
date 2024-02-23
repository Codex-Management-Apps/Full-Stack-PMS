import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from "./ui/button";
import { DeletePostById } from "@/controller/post";
import { PostForm } from "./PostForm";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function PostCard({ id,title, content }: { id:number,title: string; content: string }){
    const [isFormVisible, setFormVisibility] = useState(false);
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        setFormVisibility(true);
    };
    const handleDeleteClick = () => {
        DeletePostById(id)
    }
    

    const handleViewClick = () => {
      navigate(`/view/${id}`);
    };
    
    return(
        <Card>
            <CardHeader>
                <CardTitle> {title} </CardTitle>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardFooter className=" gap-3">
                <Button variant="destructive" onClick={handleDeleteClick}>Delete</Button>
                <Button variant="secondary" onClick={handleUpdateClick}>Update</Button>
                <Button variant="default" onClick={handleViewClick}>View</Button>
                
                <br/>
                
                {isFormVisible && (
                <PostForm
                    initialData={{ id, title, content }}
                    onClose={() => setFormVisibility(false)}
                />
                )}
            </CardFooter>
        </Card>
    )
}