'use client'

import { useState } from 'react'

export default function LogPage() {
  const [formData, setFormData] = useState({
    userId: 'user123', // Default user ID for demo
    date: new Date().toISOString().split('T')[0], // Today's date
    intakeMl: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('http://localhost:3001/water/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          date: formData.date,
          intakeMl: parseInt(formData.intakeMl)
        }),
      })

      if (response.ok) {
        setMessage('Water intake logged successfully! 💧')
        setMessageType('success')
        setFormData(prev => ({ ...prev, intakeMl: '' }))
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.message || 'Failed to log water intake'}`)
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Error: Unable to connect to the server')
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Log Water Intake 💧
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="intakeMl" className="block text-sm font-medium text-gray-700 mb-2">
              Water Intake (ml)
            </label>
            <input
              type="number"
              id="intakeMl"
              name="intakeMl"
              value={formData.intakeMl}
              onChange={handleInputChange}
              min="0"
              step="1"
              placeholder="e.g., 1500"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Daily goal: 2,000 ml
            </p>
          </div>

          {message && (
            <div className={`p-3 rounded-md ${
              messageType === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Logging...' : 'Log Water Intake'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium text-blue-900 mb-2">💡 Tips for staying hydrated:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Drink 8 glasses of water per day</li>
            <li>• Carry a water bottle with you</li>
            <li>• Set reminders on your phone</li>
            <li>• Drink water before, during, and after exercise</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 