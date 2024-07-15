import axios from 'axios'
import { useState, useEffect } from 'react'

/**
 * The main App component.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App(): JSX.Element {
  const [inputText, setInputText] = useState<string>('')

  /**
   * Handles the form submission by sending a POST request to the backend with the input text.
   *
   * @returns {Promise<void>} A promise that resolves when the request is complete.
   */
  const handleSubmit = async (): Promise<void> => {
    try {
      const request = await axios.post('http://localhost:3000/api', { text: inputText })
      console.log('Request successful:', request.data)
    } catch (error) {
      console.error('Error making request:', error)
    }
  }

  return (
    <>
      {/* Faster and more efficient basic post request to backend */}
      <h1>Faster and more efficient basic post request to backend</h1>

      <input
        type="text"
        placeholder="Enter text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          setInputText(e.target.value)
        }}
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  )
}

export default App
