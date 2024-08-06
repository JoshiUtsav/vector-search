'use client'

import React, { FormEvent, useState } from 'react'
import { Button, Input } from '@/components/ui'
import Link from 'next/link'
import axios from 'axios'
import Loader from '@/components/Loader'
import { toast } from 'sonner'
import { FaGithub } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupSchema } from '@/schemas'
import InputError from '@/components/input-description'

interface SignupProps {
  email: string
  password: string
  confirmPassword: string
}

export default function Signup() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>({
    resolver: zodResolver(SignupSchema),
  })

  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSignUp = async (data: SignupProps) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('http://localhost:3000//api/signup', {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })

      // Instead of simply redirecting to the home page, you can handle the email verification here
      toast('Sign up successful!')
      router.push('/c')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || 'Error during signing up. Please try again.')
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
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Sign Up</h1>
        <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
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
          </div>
          {errors.email && <InputError message={errors.email.message || ''} />}
          <div>
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
          </div>
          {errors.password && <InputError message={errors.password.message || ''} />}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm your password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {errors.confirmPassword && <InputError message={errors.confirmPassword.message || ''} />}
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Sign Up
          </Button>
          <div className="flex justify-center items-center mt-4">
            <Button className="flex items-center py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800">
              <FaGithub className="mr-2" />
              Sign Up with GitHub
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center flex gap-2 justify-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link href={'/auth/signin'} className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </div>
    </div>
  )
}
