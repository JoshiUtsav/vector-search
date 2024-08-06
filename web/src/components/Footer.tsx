'use client'

import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-16">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h5 className="text-xl font-bold mb-4">Our Research</h5>
          <ul>
            <li>
              <Link href="/">Overview</Link>
            </li>
            <li>
              <Link href="/">Index</Link>
            </li>
            <li>
              <Link href="/">Latest Advancements</Link>
            </li>
            <li>
              <Link href="/">GPT-4</Link>
            </li>
            <li>
              <Link href="/">GPT-4o mini</Link>
            </li>
            <li>
              <Link href="/">DALL-E 3</Link>
            </li>
            <li>
              <Link href="/">Sora</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-xl font-bold mb-4">ChatGPT</h5>
          <ul>
            <li>
              <Link href="/">For Everyone</Link>
            </li>
            <li>
              <Link href="/">For Teams</Link>
            </li>
            <li>
              <Link href="/">For Enterprises</Link>
            </li>
            <li>
              <Link href="/">ChatGPT Login</Link>
            </li>
            <li>
              <Link href="/">Download</Link>
            </li>
          </ul>
          <h5 className="text-xl font-bold mt-8 mb-4">API</h5>
          <ul>
            <li>
              <Link href="/">Platform Overview</Link>
            </li>
            <li>
              <Link href="/">Pricing</Link>
            </li>
            <li>
              <Link href="/">Documentation</Link>
            </li>
            <li>
              <Link href="/">API Login</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-xl font-bold mb-4">Safety</h5>
          <ul>
            <li>
              <Link href="/">Safety Overview</Link>
            </li>
            <li>
              <Link href="/">Safety Standards</Link>
            </li>
            <li>
              <Link href="/">Teams</Link>
            </li>
            <li>
              <Link href="/">Safety Systems</Link>
            </li>
            <li>
              <Link href="/">Preparedness</Link>
            </li>
            <li>
              <Link href="/">Superalignment</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-xl font-bold mb-4">Company</h5>
          <ul>
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/">News</Link>
            </li>
            <li>
              <Link href="/">Our Charter</Link>
            </li>
            <li>
              <Link href="/">Security</Link>
            </li>
            <li>
              <Link href="/">Residency</Link>
            </li>
            <li>
              <Link href="/">Careers</Link>
            </li>
          </ul>
          <h5 className="text-xl font-bold mt-8 mb-4">Terms & Policies</h5>
          <ul>
            <li>
              <Link href="/">Terms of Use</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">Brand Guidelines</Link>
            </li>
            <li>
              <Link href="/">Other Policies</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between mt-16 px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4">
          <Link href="https://facebook.com">
            <FaFacebook size={24} />
          </Link>
          <Link href="https://twitter.com">
            <FaTwitter size={24} />
          </Link>
          <Link href="https://instagram.com">
            <FaInstagram size={24} />
          </Link>
          <Link href="https://linkedin.com">
            <FaLinkedin size={24} />
          </Link>
          <Link href="https://github.com">
            <FaGithub size={24} />
          </Link>
        </div>
        <p className="text-center md:text-left mb-4">
          © {new Date().getFullYear()} Foundgpt. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
