import { Button } from '@/components/ui'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-9xl font-extrabold mb-4 animate-bounce">404</h1>
      <p className="text-2xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/">
        <Button className="py-2 px-6 bg-white text-black rounded-lg shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105">
          Go Home
        </Button>
      </Link>
    </div>
  )
}
