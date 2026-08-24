// Rate limiter in-memory por IP para el endpoint de contacto.
// Nota: un Map en memoria no persiste entre instancias serverless. Para
// producción con tráfico real, combinar con un captcha (Turnstile/hCaptcha)
// validado server-side, que es la defensa robusta contra bots.

const hits = new Map(); // ip -> { count, resetAt }
const WINDOW_MS = 60_000; // ventana de 1 minuto
const MAX = 3; // máximo de envíos por IP por ventana
const MAX_ENTRIES = 10_000; // techo defensivo del Map (evita crecimiento ilimitado)

// Purga las entradas expiradas. Sin esto, un atacante que rota IPs (o spoofea
// x-forwarded-for) haría crecer el Map indefinidamente => DoS por memoria.
function sweep(now) {
  for (const [key, entry] of hits) {
    if (now > entry.resetAt) hits.delete(key);
  }
}

export function rateLimit(ip) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    // Barremos oportunísticamente al superar el techo para acotar la memoria.
    if (hits.size >= MAX_ENTRIES) {
      sweep(now);
      // Si el barrido no liberó nada, todas las entradas están vigentes: es
      // una avalancha en curso. Acá se rechaza en vez de seguir insertando —
      // el techo tiene que ser duro o no es un techo. Cuesta que un visitante
      // legítimo no pueda escribir durante el ataque; la alternativa es que
      // el Map crezca sin límite y se lleve puesta la función.
      if (hits.size >= MAX_ENTRIES) return false;
    }
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX) return false;

  entry.count++;
  return true;
}
