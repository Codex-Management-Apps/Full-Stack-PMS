

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
import { useAuth } from "@/context/AuthProvider"

export function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const form = useForm<z.infer<typeof LoginForm>>({
    resolver: zodResolver(LoginForm),
    defaultValues: {
        username: "",
        password: ""
    },
  })

  const onSubmit = async(data: z.infer<typeof LoginForm>)=> {

   
    try {
      const response = await request("POST",'/api/auth/login',data) as any;
      const accessToken = response?.data.accessToken;
      const roles =response.data.department[0].departmentName
      setAuthHeader(accessToken)
      console.log(roles)
      
      
      setAuth({data,accessToken, roles})
      if (roles === "Marketing") {
        console.log("Redirecting to employee")
        navigate("/employee");
      } else if(roles === "HR"){
        console.log("Redirecting to admin")
        navigate("/admin/employee");
      }
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
        <FormField
          control={form.control}
          name="username"
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
