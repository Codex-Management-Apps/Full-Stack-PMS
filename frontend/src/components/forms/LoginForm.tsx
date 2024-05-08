

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { LoginForm } from "@/schemas"
import axios from "axios"
import { setAuthHeader } from "../api/axios"


export function Login() {

  const form = useForm<z.infer<typeof LoginForm>>({
    resolver: zodResolver(LoginForm),
    defaultValues: {
        email: "",
        password: ""
    },
  })

  const onSubmit = async(data: z.infer<typeof LoginForm>)=> {
    toast({
      variant: "default",
      title: "Data Added, Kindly Refresh the page",
      description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
          ),
  })
    try {
      axios.post('http://localhost:8080/login',data)
      .then((response) => {
        setAuthHeader(response.data.token)

      }).catch((error) => {
        setAuthHeader(null)
      })
      
      
    } catch (error) {
      
    }

    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="example@domain.com" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type = {"password"} {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
