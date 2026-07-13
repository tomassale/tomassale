import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/nodemailer';
import validateContactForm from '@/lib/validation';
import { rateLimit } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: 'Demasiados intentos, esperá un momento.' }, { status: 429 });
    }

    // Exigimos JSON explícito. Bloquea POSTs cross-origin de formularios simples
    // (text/plain, form-urlencoded, multipart) que no requieren preflight CORS.
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type no soportado' }, { status: 415 });
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 10_000) {
      return NextResponse.json({ error: 'Payload demasiado grande' }, { status: 413 });
    }

    const body = await request.json();

    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Pasamos el objeto saneado, no el body crudo (evita campos extra).
    await sendEmail(validation.data);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    logger.error('Error in API Route: ' + error.message);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}