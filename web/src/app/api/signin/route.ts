export default function handler() {
  return new Response('Hello, Next.js!')
}
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'All fields are required' })
  }

  return NextResponse.json({ email, password })
}
