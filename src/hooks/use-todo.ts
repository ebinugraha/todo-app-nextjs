"use client";

import { TodoContext } from "@/context/todo-context"
import { useContext } from "react"

export const useTodo = () => {
    const context = useContext(TodoContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}