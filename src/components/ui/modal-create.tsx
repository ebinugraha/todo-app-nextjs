"use client"

import { useModal } from "@/hooks/use-modal"
import { Modal } from "./modal"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { z } from "zod"
import { Textarea } from "./textarea"
import { Plus } from "lucide-react"
import { useTodo } from "@/hooks/use-todo"
import { useAuth } from "@/hooks/use-auth"
 
const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2)
})

export const ModalCreateTodo = () => {

  const { isOpen, onClose } = useModal()
  const { addTodo } = useTodo()
  const { user } = useAuth()

      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })
 
  // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if(!user) return
        try{
            await addTodo(user.id, values)
        }catch(error){
            console.log(error)
        }finally{
            onClose()
        }
  }


    return (
        <Modal title="create todo" open={isOpen} onClose={onClose} >
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="input your title" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                        name="description"  
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="input your description" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Add <Plus/></Button>
                </form>
            </Form>
        </Modal>
    )

}