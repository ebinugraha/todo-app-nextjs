"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const DashboardPage = () => {
    
    const path = usePathname();
    const { user, loading } = useAuth()

    useEffect(() => {
        if (user && !loading) {
            if (path !== `/todo/${user.id}`) {
                window.location.href = `/todo` 
            }
        }
    }, [path, user, loading])

    return (
        <Card className="max-w-sm mx-auto mt-10">
        <CardHeader>
          <CardTitle>Make a todo</CardTitle>
            <CardDescription>    
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
                Todo App
            </h1>
            </CardDescription>
        </CardHeader>
        <CardContent>
            buatlah todo list anda
        </CardContent>
        <CardFooter>
            <div className="w-full flex-row justify-center items-center">
                <Button className="w-full mb-2">
                    Login
                </Button>
                <Button className="w-full">
                    Register
                </Button>
            <div>
            </div>
            </div>
        </CardFooter>
      </Card>
      
    )
}

export default DashboardPage