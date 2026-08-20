"use client"
import { useState, ChangeEvent, FormEvent } from "react"
import { useSettings } from "../_settings/SettingsProvider"
import { translateLink } from "@/lib/i18n"
import { safeHref } from "@/lib/url"
import headerData from "../../../../public/data/header.json"

interface FormData {
  number: string
  email: string
  message: string
}

const MESSAGE_MAX_LENGTH = 500

// El servidor rechazó el envío con un motivo que ya es mostrable al usuario.
// Se distingue de una falla de red, que no dice nada útil y va traducida.
class ContactError extends Error {}

export default function Contact() {
  const { t, lang } = useSettings()
  const [formData, setFormData] = useState<FormData>({
    number: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // El botón queda con aria-disabled y no disabled: un botón deshabilitado
    // mientras tiene el foco lo pierde, y el recorrido por teclado vuelve al
    // principio de la página. El envío repetido se corta acá.
    if (loading) return
    setLoading(true)
    setErrorMessage(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new ContactError(data.error || t('sendError'))
      }

      setSuccess(true)
      setFormData({
        number: "",
        email: "",
        message: "",
      })
    } catch (error) {
      if (error instanceof ContactError) {
        setErrorMessage(error.message)
      } else if (error instanceof TypeError) {
        // fetch solo tira TypeError cuando la petición no llegó a salir:
        // el "Failed to fetch" del navegador no le sirve a nadie.
        setErrorMessage(t('connectionError'))
      } else {
        setErrorMessage(t('unexpectedError'))
      }

    } finally {
      setLoading(false)
    }
  }

  const messageLength = formData.message.length
  const messageIsFull = messageLength >= MESSAGE_MAX_LENGTH

  return (
    <section className="panel" id="contact">
      <div className="panel__inner">
        <h2 className="panel__title">{t('contactMe')}</h2>

        <div className="contact">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__row">
              <div className="form-group">
                <label htmlFor="email">{t('emailLabel')}</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t('emailPlaceholder')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">{t('phoneLabel')}</label>
                <input
                  name="number"
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  placeholder={t('phonePlaceholder')}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('messageLabel')}</label>
              <div className="form__field">
                {/* El límite se anuncia antes de escribir: si no, el campo
                    deja de aceptar letras sin explicar por qué. */}
                <span id="messageLimit" className="visually-hidden">
                  {t('messageLimit').replace('{max}', String(MESSAGE_MAX_LENGTH))}
                </span>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={MESSAGE_MAX_LENGTH}
                  aria-describedby="messageLimit"
                  placeholder={t('messagePlaceholder')}
                />
                <span className={`form__counter${messageIsFull ? ' form__counter--full' : ''}`}>
                  {messageLength}/{MESSAGE_MAX_LENGTH}
                </span>
              </div>
            </div>

            <button type="submit" className="boltLink boltLink--solid" aria-disabled={loading}>
              {loading ? t('sending') : t('submit')}
            </button>

            {/* Regiones permanentes: un aria-live que se inserta junto con
                su mensaje no llega a anunciarse, y quien no ve la pantalla se
                queda sin saber si el mensaje salió. Los avisos de abajo son
                los que se ven; estos son los que se escuchan. El resultado
                informa y el error interrumpe: no son el mismo aviso. */}
            <p className="visually-hidden" role="status">
              {loading ? t('sending') : ''}
              {success ? t('success') : ''}
            </p>
            <p className="visually-hidden" role="alert">
              {errorMessage ? `${t('errorLabel')}: ${errorMessage}` : ''}
            </p>

            {success && (
              <p className="form__feedback">
                {t('success')}
              </p>
            )}

            {errorMessage && (
              <p className="form__feedback form__feedback--error">
                {t('errorLabel')}: {errorMessage}
              </p>
            )}
          </form>

          <aside className="contact__direct">
            <p className="contact__directTitle">{t('directLinks')}</p>
            {headerData.icons.map((icon) => (
              <a
                className="boltLink"
                key={icon.id}
                href={safeHref(icon.ref) ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                draggable="false"
                {...(icon.load ? { download: icon.load } : {})}
              >
                {translateLink(lang, icon.alt, icon.alt)}
              </a>
            ))}
          </aside>
        </div>
      </div>
    </section>
  )
}
