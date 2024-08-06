import React from 'react'
import { TriangleAlert } from 'lucide-react'

interface InputProps {
  message: string
}

const InputError: React.FC<InputProps> = ({ message }: { message: string }) => {
  if (!message) return null

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <TriangleAlert />
      <p className="text-red-500 text-sm">{message}</p>
    </div>
  )
}

export default InputError
 