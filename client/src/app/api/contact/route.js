import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/nodemailer';
import validateContactForm from '@/lib/validation';
import { rateLimit } from '@/lib/rateLimit';
import { clientIp } from '@/lib/clientIp';
import { logger } from '@/lib/logger';

/** Tope real del cuerpo, medido en bytes y no en lo que declara el cliente. */
const MAX_BODY_BYTES = 10_000;

export async function POST(request) {
  try {
    if (!rateLimit(clientIp(request.headers))) {
      return NextResponse.json({ error: 'Demasiados intentos, esperá un momento.' }, { status: 429 });
    }

    // Exigimos JSON explícito. Bloquea POSTs cross-origin de formularios simples
    // (text/plain, form-urlencoded, multipart) que no requieren preflight CORS.
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type no soportado' }, { status: 415 });
    }

    // Corte temprano si el propio cliente declara un cuerpo enorme: ahorra
    // leerlo. No alcanza como defensa —el encabezado se puede mentir, u
    // omitir con `Transfer-Encoding: chunked`— así que abajo se mide de nuevo.
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Payload demasiado grande' }, { status: 413 });
    }

    const raw = await request.text();
    if (Buffer.byteLength(raw) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Payload demasiado grande' }, { status: 413 });
    }

    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      // El mensaje de V8 incluye un fragmento del cuerpo recibido: loguearlo
      // deja escribir en los logs a cualquiera que mande basura.
      logger.warn('Validation fail: malformed JSON');
      return NextResponse.json({ error: 'Formato de datos inválido' }, { status: 400 });
    }

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