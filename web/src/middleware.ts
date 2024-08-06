import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublic = ['/signin', '/signup'].includes(path)
  const token = request.cookies.get('token')?.value

  if (isPublic && token) {
    return NextResponse.redirect('/c')
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/signin', '/signup', '/c/:path*'],
}
