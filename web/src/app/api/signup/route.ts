import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hash } from 'bcryptjs'

// Define a custom error handler for consistent responses
const handleError = (message: string, statusCode: number) =>
  new NextResponse(message, { status: statusCode })

export async function POST(req: Request) {
  try {
    // Destructure and validate input data
    const {
      email,
      password,
      confirmPassword,
    }: { email: string; password: string; confirmPassword: string } = await req.json()

    if (!email || !password || !confirmPassword) {
      return handleError('All fields are required', 400)
    }

    // Check for password match
    if (password !== confirmPassword) {
      return handleError('Passwords do not match', 400)
    }

    // Check if the email is already in use
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return handleError('Email already exists', 400)
    }

    // Hash the password and create the user
    const hashedPassword = await hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { user: newUser, message: 'User created successfully' },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error while signing up:', error)
    return handleError('Internal server error', 500)
  }
}
