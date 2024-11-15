'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setUsername(storedUsername)
      localStorage.removeItem('username')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempted with:', { username, password })
    
    try {
      const response = await fetch(`http://localhost:8080/users?username=${username}&password=${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {

        const data = await response.json()

        if (data.users == "User not found" || data.users == "Incorrect password") {
          throw data.users
        }

        setError('')
        
        localStorage.setItem('username', username);

        window.location.href = '/home'
      } else {
        const errorData = await response.json()
        throw errorData.error
      }

    } catch (error) {
      setError("" + error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">Welcome Back</CardTitle>
          <CardDescription>Please enter your credentials to log in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit">
              Log in
            </Button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
