// File: app/api/sessions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/database'
import StudySession from '@/models/StudySession'

export async function POST(request: NextRequest) {
  try {
    console.log('Connecting to database...')
    
    // Connect to database
    await dbConnect()
    console.log('Database connected successfully')

    // Get data from request
    const body = await request.json()
    console.log('Request data:', body)
    
    const { title, start_time, end_time, user_id } = body

    // Create new study session
    const newSession = new StudySession({
      title,
      start_time: new Date(start_time),
      end_time: new Date(end_time),
      user_id,
      email_sent: false,
    })

    console.log('Saving session:', newSession)
    
    // Save to database
    await newSession.save()
    console.log('Session saved successfully')

    return NextResponse.json(
      { message: 'Session created successfully!', session: newSession },
      { status: 201 }
    )
  } catch (error) {
    // Handle the error properly
    console.error('Error creating session:', error)
    
    // Check if error has a message property
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return NextResponse.json(
      { error: 'Failed to create session', details: errorMessage },
      { status: 500 }
    )
  }
}