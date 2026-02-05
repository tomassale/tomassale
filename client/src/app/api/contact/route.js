import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/nodemailer';
import validateContactForm from '@/lib/validation';
import { logger } from '@/lib/logger';

export async function POST(request) {
  try {
    const body = await request.json();

    
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await sendEmail(body);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    logger.error('Error in API Route: ' + error.message);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}