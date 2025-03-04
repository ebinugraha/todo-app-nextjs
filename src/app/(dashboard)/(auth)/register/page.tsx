"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { Key, Loader, Mail, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

const formSchema = z.object({
  name: z.string({message: "Name is required"}).min(2, "Name must be at least 2 characters").max(50),
  email: z.string({message: "Email is required"}).min(2).max(50).email(),
  password: z.string({message: "Password is required"}).min(2).max(50),
})



export default function RegisterForm() {

    const { register, loading } = useAuth()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    })
   
    // 2. Define a submit handler.
    async function handleLogin(values: z.infer<typeof formSchema>) {
      try{
        await register(values.email, values.password, values.name)
      }catch(error){
        console.error(error)
      }
    }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-stone-800">Name <User size={15} /></FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} disabled={loading}/>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-stone-800">Email <Mail size={15} /></FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} disabled={loading} type="email"/>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-stone-800">Password <Key size={15} /></FormLabel>
                      <FormControl>
                        <Input placeholder="password" type="password" {...field} disabled={loading}/>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            <Button type="submit" disabled={loading}> {loading ? <Loader className="animate-spin" size={15} /> : "Register" }</Button>
            <p className="text-sm">Doesn't have an account? <Link href="/register" className="text-indigo-600">Login</Link></p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
