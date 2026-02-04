"use client"
import { useState, ChangeEvent, FormEvent } from "react"

interface FormData {
  number: string
  email: string
  message: string
}

export default function Contact() {
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
    setFormData({ ...formData, [name]: value })
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
        throw new Error(data.error || 'Hubo un error al enviar el mensaje.')
      }

      setSuccess(true)
      setFormData({
        number: "",
        email: "",
        message: "",
      })
    } catch (error) {
      if(error instanceof Error) {
        setErrorMessage(error.message || 'Error de conexión')
      } else {
        setErrorMessage('Ocurrio un error inesperado')
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact" id="contact">
      <h2 className="titleContact">Contact Me</h2>
      <div className="formContainer">
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
              <label htmlFor="phone">Phone</label>
              <input
                name="number" 
                id="phone"
                type="tel"
                value={formData.number}
                onChange={handleChange}
                required
                placeholder="+54 11..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">How Can I Help You?</label>
              <textarea
                cols={50}
                rows={10}
                id="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>
            
            <button 
              type="submit" 
              className="form-submit-btn" 
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Enviando..." : "Submit"}
            </button>

            {success && (
              <p style={{ color: "green", marginTop: "10px", fontWeight: "bold" }}>
                ¡Mensaje enviado exitosamente!
              </p>
            )}
            
            {errorMessage && (
              <p style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
                Error: {errorMessage}
              </p>
            )}

          </form>
        </div>
      </div>
    </div>
  )
}