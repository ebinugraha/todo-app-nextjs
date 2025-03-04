"use client"

import { create } from 'zustand'

interface UpdateTodoType {
    isOpen: boolean
    onOpen: (id: string) => void
    onClose: () => void
    todoId: string | null
}

export const useUpdateTodoModal = create<UpdateTodoType>((set) => ({
    isOpen: false,
    todoId: null,
    onOpen: (id: string) => set({isOpen: true, todoId: id}),
    onClose: () => set({isOpen: false, todoId: null}),
}))