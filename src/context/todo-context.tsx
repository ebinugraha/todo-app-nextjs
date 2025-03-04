"use client";

import { useAuth } from "@/hooks/use-auth";
import api from "@/lib/axios";
import { CreateTodoInput, Todo, UpdateTodoInput } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TodoContextType {
    todo: Todo[]
    loading: boolean
    error: string | null
    fetchTodos: (userid: string) => Promise<void>
    addTodo: (userid: string, todo: CreateTodoInput) => Promise<void>
    deleteTodo: (userid: string, id: string) => Promise<void>
    updateTodo: (userid: string, id: string, todo: Todo) => Promise<void>
    toggleCompleted: (userid: string, id: string, todo: UpdateTodoInput) => Promise<void>
}


export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({children} : {children: ReactNode}) => {

    const [todo, setTodo] = useState<Todo[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { isAuthenticated, user } = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
          fetchTodos(user?.id || '');
        }
      }, [isAuthenticated]);
    
    // Mengambil todo
    const fetchTodos = async (userId: string) => {
        
        if(!isAuthenticated) return;

        try{
            setLoading(true)

            const response = await api.get<Todo[]>(`/todo/${userId}`)
            setTodo(response.data) 

        }catch(error) {
            console.error('Error fetching todos:', error);
            setError('Failed to fetch todos');
            toast.error('Failed to load todos');
        }finally{
            setLoading(false)
        }
    }

    // add todo
    const addTodo = async (userId:string, todoInput: CreateTodoInput) => {
        if(!isAuthenticated) return;

        try{
            setLoading(true)

            const response = await api.post<Todo>(`/todo/${userId}`, todoInput)
            setTodo([...todo, response.data])

            toast.success('Todo berhasil ditambahkan')
        }catch(error) {

            console.error(error)
            toast.error('Gagal menambah todo')

        }finally{
            setLoading(false)
        }
    }
    // delete todo
    const deleteTodo = async (userId: string, id: string) => {
        if(!isAuthenticated) return;

        try{    
            setLoading(true)

            const response = await api.delete<Todo>(`/todo/${userId}/${id}`)
            setTodo(todo.filter(todo => todo.id !== id))

            toast.success('Todo berhasil dihapus')
        }catch(error) {

            console.error(error)
            toast.error('Gagal menghapus todo')

        }finally{
            setLoading(false)

        }
    }


    // update todo
    const updateTodo = async (userId: string, id: string, todoInput: UpdateTodoInput) => {
        if(!isAuthenticated) return;


        try{

            setLoading(true)

            const response = await api.put(`/todo/${userId}/${id}`, todoInput)
            setTodo((prevTodo) => prevTodo.map((todo) => todo.id === id ? response.data : todo))

            toast.success('Todo berhasil diupdate')

        }catch(error) {

            console.error(error)
            toast.error('Gagal mengupdate todo')

        }finally{

            setLoading(false)

        }
    }

    // toggle completed
    const toggleCompleted = async (userId: string, id: string, todoInput: UpdateTodoInput) => {
        if(!isAuthenticated) return;

        try{

            setLoading(true)
        
            await updateTodo(userId, id, todoInput)

        }catch(error) {

            console.error(error)
        }finally{

            setLoading(false)
        }

    }

    const value = {
        todo,
        loading,
        error,
        fetchTodos,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleCompleted
    }


    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;

}