import { User } from '@/types';
'use client'

import AuthButton from '@/components/AuthButton'
import ScheduleForm from '@/components/ScheduleForm'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useEffect, useState } from 'react'



export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>You need to be signed in to view this page.</p>
          <AuthButton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Study Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.email}!</p>
          </div>
          <AuthButton />
        </header>
        
        <div className="mb-8">
          <ScheduleForm />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Upcoming Sessions</h2>
          <p className="text-gray-600">Your scheduled sessions will appear here soon!</p>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}