import React from 'react'
import { Button } from '@/components/ui'
import Link from 'next/link'

export default function Authentication() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xs">
        <Link href="/auth/signin">
          <Button className="w-full mb-4">Signin</Button>
        </Link>
        <Link href="/auth/signup">
          <Button className="w-full">Signup</Button>
        </Link>
      </div>
    </div>
  )
}
