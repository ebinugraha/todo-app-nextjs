"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateTodoModal } from "@/hooks/use-modal-update";
import { useTodo } from "@/hooks/use-todo";
import { Modal } from "./modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./textarea";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2),
});

export const ModalUpdateTodo = () => {
  const { isOpen, onClose, todoId } = useUpdateTodoModal();
  const { todo, updateTodo } = useTodo();

  // Cari data todo yang akan diupdate
  const updateTodoData = todo.find((item) => item.id === todoId);

  // Gunakan useForm dengan resolver dan default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Reset form setiap kali `todoId` berubah
  useEffect(() => {
    if (updateTodoData) {
      form.reset({
        title: updateTodoData.title,
        description: updateTodoData.description,
      });
    }
  }, [todoId, updateTodoData, form]);

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Modal title="Update Todo" open={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Input your title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Input your description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Update <Pencil />
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
