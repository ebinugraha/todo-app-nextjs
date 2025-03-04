"use client";


import api from "@/lib/axios";
import { AuthResponse, User } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setCookie } from 'cookies-next';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter();


    useEffect(() => {

        const token = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if(token && storedUser) {
            try{
                setUser(JSON.parse(storedUser))
            }catch(error) {
                console.error('Error parsing user data:', error)
            }
        }

        setLoading(false)   

    }, [])


    const login = async (email: string, password: string) => {
        try{
            setLoading(true)
            const response = await api.post<AuthResponse>('/auth/login', {
                email,
                password
            })

            const { user, access_token } = response.data

            localStorage.setItem('token', access_token)
            localStorage.setItem('user', JSON.stringify(user))

            setCookie('auth-token', JSON.stringify({
                id: user.id,
                authenticated: true
            }),{
                maxAge: 60 * 60 * 24 * 7,
                path: '/'
            })

            setUser(user)

            toast.success('Login sukses')
            router.push(`/todo/`)

        }catch(error){
            console.error(error)
            toast.error('Login gagal')
        }finally{
            setLoading(false)
        }
    }


    const register = async (email: string, password: string, name: string) => {
        try{
            setLoading(true)

            const response = await api.post<AuthResponse>('/auth/register', {
                name,
                email,
                password
            })

            if(response){
                toast.success('Register sukses')
                router.push('/login')
            }

        }catch(error){
            console.error(error)
            toast.error('Register gagal')
        }finally{
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        toast.success('Logout sukses')
        router.push('/login')
    }

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}