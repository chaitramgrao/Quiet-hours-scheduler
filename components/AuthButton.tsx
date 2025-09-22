// File: components/AuthButton.tsx  
'use client'  

import { User } from '@/types';
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthButton() {
const [user, setUser] = useState<User | null>(null)

  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        router.refresh() // Refresh the page to update content
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github', // You can change this to 'google' if you prefer
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <p>Hello, {user.email}!</p>
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleSignIn}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign In with GitHub
    </button>
  )
}