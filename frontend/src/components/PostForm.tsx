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
import axios from "axios"



export function PostForm() {
    
    const form = useForm<z.infer<typeof postSchema>>();

    const onSubmit = async(data:z.infer<typeof postSchema>) =>{
       try{
            const response = await axios.post("http://localhost:8080/post", data);
            console.log(response.data); 
        }
       catch(error){
        console.error("Error sending data: ", error);
       }
    }
    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
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
        </form>
    </Form>
    
  )
}
