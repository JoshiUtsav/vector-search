'use client'

import React, { useState } from 'react'
import { Button, Input } from '@/components/ui'
import Link from 'next/link'
import axios from 'axios'
import Loader from '@/components/Loader'
import { toast } from 'sonner'
import { FaGithub } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SigninSchema } from '@/schemas'
import InputError from '@/components/input-description'

interface SigninProps {
  email: string
  password: string
}

export default function Signin() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninProps>({
    resolver: zodResolver(SigninSchema),
  })

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSignIn = async (data: SigninProps) => {
    setLoading(true)
    setError(null)
    try {
      await axios.post('/api/signin', {
        email: data.email,
        password: data.password,
      })
      toast('Sign in successful!')
      router.push('/c')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || 'Error during signing in. Please try again.')
      } else {
        setError('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Sign In</h1>
        <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.email && <InputError message={errors.email.message || ''} />}
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Enter your password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.password && <InputError message={errors.password.message || ''} />}
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Sign In
          </Button>
          <div className="flex justify-center items-center mt-4">
            <Button className="flex items-center py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800">
              <FaGithub className="mr-2" />
              Sign Up with GitHub
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center flex gap-2 justify-center">
          <p className="text-gray-600">Don&apos;t have an account?</p>
          <Link href={'/auth/signup'} className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </div>
    </div>
  )
}
