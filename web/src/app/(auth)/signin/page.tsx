'use client'

import React, { FormEvent, useState } from 'react'
import { Button, Input } from '@/components/ui'
import Link from 'next/link'
import axios from 'axios'
import Loader from '@/components/Loader'
import { toast } from 'sonner'

export default function Signin() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('/api/signin', { email, password })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || 'Error during signing in. Please try again.')
      } else {
        setError('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
      toast('Sign in successful!')
    }
  }

  if (loading) return <Loader />

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Sign In</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <Button
            onClick={handleSignIn}
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Sign In
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don&apos;t have an account?</p>
          <Link href={'/signup'} className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
        <div className="text-red-500 text-center">{error}</div>
      </div>
    </div>
  )
}
