"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll simulate a successful login with hardcoded credentials
      if (email === "user@example.com" && password === "password") {
        const user = {
          id: "1",
          name: "John Doe",
          email: "user@example.com",
          avatar: "/placeholder-user.jpg",
        }
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll simulate a successful signup
      const user = {
        id: "1",
        name,
        email,
        avatar: "/placeholder-user.jpg",
      }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
