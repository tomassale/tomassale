"use client"
import { useState, ChangeEvent, FormEvent } from "react"
import { useSettings } from "../_settings/SettingsProvider"

interface FormData {
  number: string
  email: string
  message: string
}

export default function Contact() {
  const { t } = useSettings()
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
        throw new Error(data.error || t('sendError'))
      }

      setSuccess(true)
      setFormData({
        number: "",
        email: "",
        message: "",
      })
    } catch (error) {
      if(error instanceof Error) {
        setErrorMessage(error.message || t('connectionError'))
      } else {
        setErrorMessage(t('unexpectedError'))
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact" id="contact">
      <h2 className="titleContact">{t('contactMe')}</h2>
      <div className="formContainer">
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t('emailLabel')}</label>
              <input
                name="email"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t('emailPlaceholder')}
              />
              <label htmlFor="phone">{t('phoneLabel')}</label>
              <input
                name="number"
                id="phone"
                type="tel"
                value={formData.number}
                onChange={handleChange}
                required
                placeholder={t('phonePlaceholder')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('messageLabel')}</label>
              <div style={{ position: "relative" }}>
                <textarea
                  cols={50}
                  rows={10}
                  id="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={500}
                  placeholder={t('messagePlaceholder')}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "12px",
                    fontSize: "12px",
                    color: formData.message.length >= 500 ? "#e53e3e" : "#888",
                    pointerEvents: "none",
                  }}
                >
                  {formData.message.length}/500
                </span>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="form-submit-btn" 
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? t('sending') : t('submit')}
            </button>

            {success && (
              <p style={{ color: "green", marginTop: "10px", fontWeight: "bold" }}>
                {t('success')}
              </p>
            )}

            {errorMessage && (
              <p style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
                {t('errorLabel')}: {errorMessage}
              </p>
            )}

          </form>
        </div>
      </div>
    </div>
  )
}