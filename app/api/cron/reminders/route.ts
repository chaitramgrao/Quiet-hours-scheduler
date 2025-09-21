// File: app/api/cron/reminders/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/database'
import StudySession from '@/models/StudySession'

export async function GET() {
  try {
    console.log('🔄 Starting cron job...')
    
    // Connect to database
    console.log('Connecting to database...')
    await dbConnect()
    console.log('Database connected!')

    // Test database connection by counting sessions
    const sessionCount = await StudySession.countDocuments()
    console.log(`Found ${sessionCount} total sessions in database`)

    // Get current time and 10 minutes from now
    const now = new Date()
    const tenMinutesFromNow = new Date(now.getTime() + 10 * 60 * 1000)
    
    console.log('Current time:', now.toLocaleString())
    console.log('Looking for sessions between:', now.toLocaleString(), 'and', tenMinutesFromNow.toLocaleString())

    // Find upcoming sessions
    const upcomingSessions = await StudySession.find({
      start_time: {
        $gte: now,
        $lte: tenMinutesFromNow
      },
      email_sent: false
    })

    console.log(`Found ${upcomingSessions.length} sessions to notify`)

    // Just log the sessions for now (skip email part)
    if (upcomingSessions.length > 0) {
      console.log('Upcoming sessions:')
      upcomingSessions.forEach(session => {
        console.log(`- ${session.title} at ${session.start_time}`)
      })
    }

    return NextResponse.json({
      message: `Cron job completed successfully. Found ${upcomingSessions.length} sessions.`,
      sessions: upcomingSessions
    })

  } catch (error) {
    console.error('❌ Cron job error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Cron job failed', details: errorMessage },
      { status: 500 }
    )
  }
}