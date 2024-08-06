import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* Hero Section */}
        <header className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Foundgpt</h1>
            <p className="text-base sm:text-lg mb-8">
              Your AI companion for learning and productivity.
            </p>
            <Link href="/auth">
              <Button
                variant="outline"
                className="text-primary bg-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
          <div className="container mx-auto text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to Foundgpt</h1>
            <p className="text-base sm:text-lg">
              This is a sample page using Next.js, TypeScript, Shadcn, and Tailwind CSS.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
