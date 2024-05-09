

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
import { LoginForm } from "@/schemas"

import { useNavigate } from "react-router-dom"
import { request, setAuthHeader } from "@/api/axios"
import { toast } from "../ui/use-toast"
import { useContext, useEffect, useState } from "react"
import { Auth, AuthContext } from "@/context/AuthProvider"

export function Login() {
  const navigate = useNavigate();
  const {auth, setAuth} = useContext(AuthContext)
  const [response, setResponse] = useState<Auth>()
  const [doneFetching, setDoneFetching] = useState(false)
  const form = useForm<z.infer<typeof LoginForm>>({
    resolver: zodResolver(LoginForm),
    defaultValues: {
        email: "",
        password: ""
    },
  })

  const onSubmit = async(data: z.infer<typeof LoginForm>)=> { 

    try {
      
      const response = await request("POST",'/auth/login',data) as any;
      const userID = response.data.user;
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      const accessLevel = response.data.accessLevel;
      console.log("Unsetted Response: " + response.data)
      const newData = {
        id: String(userID),
        accessLevel: accessLevel,
        accessToken: accessToken,
        refreshToken: refreshToken
      }
      setResponse(newData)
      setDoneFetching(true)
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Unauthorized: Invalid credentials
        toast({
            variant: "destructive",
              title:"Invalid username or password"
            });
      } else {
        // Other errors
        toast({
          variant: "destructive",
        title:"An error occurred while logging in"
        });
      }
      setAuthHeader(null);
      console.error(error);
    } 
  }

  useEffect(() =>{
    if (response && response.accessToken) {
      setAuthHeader(response.accessToken)
      setAuth(response)
      console.log(response)
      if (response.accessLevel === "ADMIN") {

        console.log("Redirecting to admin")
        navigate("/admin/employee");


      } else if(response.accessLevel  === "MANAGER"){

        console.log("Redirecting to employee")
        navigate("/employee");
        
      }
    }
  },[doneFetching])

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
