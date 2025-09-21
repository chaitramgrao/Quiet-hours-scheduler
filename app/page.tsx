// File: app/page.tsx
import AuthButton from '@/components/AuthButton'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function Home() {
  // Get the current user session
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-full max-w-4xl px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Quiet Hours Scheduler</h1>
        <p className="text-xl mb-8">Schedule your focused study time and get reminders</p>
        
        {/* Show different content based on login status */}
        {session ? (
          <div>
            <p className="mb-4">Welcome! Head to your dashboard to schedule study sessions.</p>
            <Link 
              href="/dashboard" 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div>
            <p className="mb-4">Sign in to get started with your study schedule</p>
            <AuthButton />
          </div>
        )}
      </main>
    </div>
  )
}