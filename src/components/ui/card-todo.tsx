import { cn } from "@/lib/utils"
import { Todo } from "@/types"
import { Checkbox } from "./checkbox";
import { Button } from "./button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { DotIcon, Eclipse, Ellipsis, MenuIcon, Pencil, Trash } from "lucide-react";
import { Separator } from "./separator";
  
interface CardTodoProps {
    todo: Todo
    onClick: (id: string) => void
    onClickButton: (id: string) => void
    onUpdate: (id: string) => void
    onDelete: (id: string) => void
}

export const CardTodo = ({todo, onClick, onClickButton, onUpdate, onDelete } : CardTodoProps) => {
    
    const dateStr = todo.createdAt;
    const date = new Date(dateStr.replace(" ", "T")); // Ensure it's a valid ISO format
    const formattedDate = date.toLocaleDateString("en-US"); // MM/DD/YYYY format

    return (
        <div
      onClick={() => onClick(todo.id)}
      className={cn(
        "h-full border-2 rounded-xl flex flex-col items-center justify-between p-4 pb-6 min-h-[317px] min-w-[200px]",
      )}
    >
      <div className="flex flex-col justify-between h-full w-full">
        <div className="flex h-full">
          <p className="font-bold truncate w-full">{todo.title}</p>
          <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger className="ml-3">
                    <Ellipsis size={15}/>
                 </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onUpdate(todo.id)}><Pencil className="text-blue-500"/> Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(todo.id)}><Trash className="text-red-500"/> Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex h-full max-h-28">
          <p className="max-w-full whitespace-normal break-words truncate">
            {todo.description}
          </p>
        </div>
        
        <div className="flex h-full">
            <div className="flex w-full justify-between items-end">
                <div>
                    <Button className="cursor-pointer" disabled={todo.completed} onClick={() => onClickButton(todo.id)} >{todo.completed? "Completed" : "Done"}</Button>
                </div>
                <div>
                    {formattedDate}
                </div>
            </div>
        </div>
      </div>
    </div>
    )
}