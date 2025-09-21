// File: lib/email.ts
export async function sendReminderEmail(
  email: string,
  sessionTitle: string,
  startTime: Date
) {
  try {
    // For now, we'll just log the email instead of actually sending it
    console.log('📧 EMAIL REMINDER:')
    console.log('To:', email)
    console.log('Subject:', `Reminder: ${sessionTitle} starts soon!`)
    console.log('Message:', `Your "${sessionTitle}" session starts at ${startTime.toLocaleString()}`)
    console.log('---')
    
    return true // Simulate success
    
  } catch (error) {
    console.error('Email error:', error)
    return false
  }
}