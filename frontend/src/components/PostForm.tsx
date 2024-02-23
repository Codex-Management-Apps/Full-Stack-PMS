import {
    Form,
    FormControl,
    FormField,
    FormItem,

    FormMessage,
  } from "@/components/ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useForm } from "react-hook-form"

import { postSchema } from "@/schemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { sumbitPostData } from "@/controller/post"
import axios from "axios"

export function PostForm({
    initialData,
    onClose,
  }: {
    initialData?: { id?: number; title?: string; content?: string };
    onClose: () => void;
  }){
    
    const isEditing = !!initialData?.id;

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: initialData?.title || '',
            content: initialData?.content || ''
        }
    });

    
    const handleSubmitData = async (data: z.infer<typeof postSchema>) => {
        try {
        if (isEditing) {
            // Handle update logic
            const response = await axios.put(`http://localhost:8080/post/${initialData?.id}`, data);
            console.log(response.data);
        } else {
            // Handle create logic
            const response = await axios.post("http://localhost:8080/post", data);
            console.log(response.data);
        }
        onClose();
        } catch (error) {
        console.error("Error sending data: ", error);
        }
    };
    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmitData)}
            className="space-y-6">
            <div className="space-y-4">
                <FormField 
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    {...field}
                                    placeholder="Title"
                                    type="title"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control}
                    name="content"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                            <Textarea 
                            {...field}
                            placeholder="Type your message here"
                            />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={onClose}>
                Cancel
            </Button>
        </form>
    </Form>
    
  )
}
