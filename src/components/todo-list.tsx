import { Todo, UpdateTodoInput } from "@/types"
import { Separator } from "./ui/separator"
import { CardTodo } from "./ui/card-todo"
import { useTodo } from "@/hooks/use-todo"
import { useAuth } from "@/hooks/use-auth"

export const TodoList = ({todo}: {todo: Todo[]}) => {

    const {user} = useAuth()
    const {updateTodo, deleteTodo, toggleCompleted} = useTodo()

    const uncompletedTodo = todo.filter((item) => item.completed === false)
    const completedTodo = todo.filter((item) => item.completed === true)

    if(!user) return null

    const handleDelete = (id: string) => { 
        deleteTodo(user.id, id)
    } 

    const handleToggleComplete = (id: string) => {

        const updatedComplete = todo.find((item) => item.id == id)

        const updatedTodo: UpdateTodoInput = {
            title: updatedComplete?.title,
            description: updatedComplete?.description,
            completed: !updatedComplete?.completed
        }

        console.log(updatedTodo)

        toggleCompleted(user.id, id, updatedTodo)
    }

    return (
        <>
            <div>
                <h1 className="text-xl my-3">Uncompleted</h1>
                <div  className="pt-6 grid grid-cols-1 lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 mb-3">
                    {uncompletedTodo.map((item) => (<CardTodo todo={item} key={item.id} onClick={() => {}} onClickButton={(id) => handleToggleComplete(id)} onUpdate={() => {}} onDelete={(id) => handleDelete(id)}/>))}
                </div>
            </div>
            <Separator/>
            <div>
                <h1 className="text-xl my-3">Completed</h1>
                <div  className="pt-6 grid grid-cols-1 lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 mb-3">
                    {completedTodo.map((item) => (<CardTodo todo={item} key={item.id} onClick={() => {}} onClickButton={() => {}} onUpdate={() => {}} onDelete={(id) => handleDelete(id)}/>))}
                </div>
            </div>
        </>
    )
}