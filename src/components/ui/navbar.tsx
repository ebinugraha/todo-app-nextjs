"use client"

import { useAuth } from "@/hooks/use-auth";
import { ClipboardList, Pencil } from "lucide-react";
import Link from "next/link"
import { Button } from "./button";

export const Navbar = () => {

    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                  <ClipboardList size={20} />
                    <h1>
                        Todo App
                    </h1>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {isAuthenticated && (
                    <Link
                      href="/todos"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      My Todos
                    </Link>
                  )}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Hello, {user?.name || user?.email}
                    </span>
                    <Button
                      onClick={logout}
                      className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Button variant={"outline"} asChild>
                        <Link
                        href="/login"
                        className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Login
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link
                        href="/register"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Register
                        </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
    )
}