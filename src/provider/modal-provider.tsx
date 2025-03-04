import { ModalCreateTodo } from "@/components/ui/modal-create"
import { useEffect, useState } from "react"

export const ModalProvider = ({children} : {children: React.ReactNode}) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    return (
        <>
            <ModalCreateTodo/>
        </>
    )

}