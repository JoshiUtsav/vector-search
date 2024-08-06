import { NextResponse } from 'next/server'

const handleError = (message: string, statusCode: number) =>
  new NextResponse(message, { status: statusCode })

export async function GET() {
  try {
    const responses = NextResponse.json({
      success: true,
      message: 'User logged out successfully',
    })
    responses.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    return responses
  } catch (error) {
    console.error('Error while signing up:', error)
    return handleError('Internal server error', 500)
  }
}
