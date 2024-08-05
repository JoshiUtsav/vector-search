'use client'

import axios from 'axios'
import { useState } from 'react'
import { Button, Input, Table } from '@/components/ui/index'

/**
 * The main App component.
 *
 * @returns {JSX.Element} The rendered App component.
 */
export default function Home(): JSX.Element {
  const [inputText, setInputText] = useState<string>('')
  const [outputText, setOutputText] = useState<string>('')

  /**
   * Handles the form submission by sending a POST request to the backend with the input text.
   *
   * @returns {Promise<void>} A promise that resolves when the request is complete.
   */
  const handleSubmit = async (): Promise<void> => {
    try {
      const request = await axios.post('http://localhost:3000/api', { text: inputText })
      setOutputText(request.data.Text)
    } catch (error) {
      console.error('Error making request:', error)
    }
  }

  return (
    <>
      <Input
        type="text"
        placeholder="Enter text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          setInputText(e.target.value)
        }}
      />
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>

      <div>
        <h1>Response from backend</h1>
        <div>{outputText}</div>
      </div>
    </>
  )
}
