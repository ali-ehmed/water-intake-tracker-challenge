'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

interface WaterSummaryItem {
  date: string
  totalIntake: number
  percentageOfGoal: number
}

interface WaterSummary {
  userId: string
  summary: WaterSummaryItem[]
}

export default function SummaryPage() {
  const [summary, setSummary] = useState<WaterSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState('user123')

  const fetchSummary = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`http://localhost:3001/water/summary/${userId}`)
      
      if (response.ok) {
        const data = await response.json()
        setSummary(data)
      } else {
        setError('Failed to fetch water summary')
      }
    } catch (error) {
      setError('Unable to connect to the server')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [userId])

  const chartData = summary?.summary.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  })) || []

  const daysMeetingGoal = summary?.summary.filter(item => item.totalIntake >= 2000).length || 0
  const totalDays = summary?.summary.length || 0

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading water summary...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchSummary}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Weekly Water Intake Summary 📊
      </h1>

      <div className="mb-6">
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
          User ID
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={fetchSummary}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Load
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Last 7 Days</h2>
          
          {daysMeetingGoal >= 5 && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🎉</span>
                <div>
                  <h3 className="font-semibold text-green-900">Well done!</h3>
                  <p className="text-green-800">
                    You met or exceeded your goal on {daysMeetingGoal} out of {totalDays} days!
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {summary?.summary.reduce((sum, item) => sum + item.totalIntake, 0) || 0}
              </div>
              <div className="text-sm text-blue-800">Total ml</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {daysMeetingGoal}
              </div>
              <div className="text-sm text-green-800">Days meeting goal</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((daysMeetingGoal / totalDays) * 100)}%
              </div>
              <div className="text-sm text-purple-800">Success rate</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round((summary?.summary.reduce((sum, item) => sum + item.totalIntake, 0) || 0) / totalDays)}
              </div>
              <div className="text-sm text-orange-800">Average ml/day</div>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value} ml`, 'Intake']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <ReferenceLine y={2000} stroke="#ef4444" strokeDasharray="3 3" label="Goal (2000ml)" />
              <Bar dataKey="totalIntake" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Breakdown</h3>
          <div className="space-y-2">
            {summary?.summary.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(item.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-sm text-gray-600">
                    {item.totalIntake} ml
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.percentageOfGoal >= 100 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(item.percentageOfGoal, 100)}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${
                    item.percentageOfGoal >= 100 ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {item.percentageOfGoal}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 