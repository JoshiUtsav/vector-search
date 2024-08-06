import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-black text-white py-4 px-6 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold">Foundgpt</div>
            <div className="space-x-4">
              <Link href="/auth">
                <Button
                  variant="outline"
                  className="text-black border-white bg-white hover:bg-gray-100"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-grow py-8 px-6">
          <div className="container mx-auto text-center md:text-left">
            <h1 className="text-4xl font-bold text-black mb-4">Welcome to Foundgpt</h1>
            <p className="text-lg text-gray-700">
              This is a sample page using Next.js, TypeScript, Shadcn, and Tailwind CSS.
            </p>
          </div>
        </main>
        <footer className="bg-black text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} YourApp. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
