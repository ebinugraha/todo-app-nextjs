export interface User {
    id: string,
    name?: string,
    email: string,
    password: string
}

export interface AuthResponse {
    name?: string
    user: User
    access_token: string
}

export interface Todo {
    id: string,
    title: string,
    description?: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string
}

export interface CreateTodoInput {
    title: string;
    description?: string;
}

export interface UpdateTodoInput {
    title?: string;
    description?: string;
    completed?: boolean
}