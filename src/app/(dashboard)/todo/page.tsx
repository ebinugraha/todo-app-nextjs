"use client"

import { TodoList } from "@/components/todo-list"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useModal } from "@/hooks/use-modal"
import { useTodo } from "@/hooks/use-todo"
import { Plus } from "lucide-react"

const TodoPage = () => {
    
    const { onOpen } = useModal()
    const { todo } = useTodo()

    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-col w-full">
                <div className="flex w-full items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold">Todo Items</h1>
                    <Button onClick={() => onOpen()}>Add Todo <Plus/></Button>
                </div>
                <Separator />
            </div>
            <div className="w-full">
                <TodoList todo={todo}/>
            </div>
        </div>
    )
}

export default TodoPage