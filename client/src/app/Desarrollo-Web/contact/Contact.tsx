"use client"
import { useState, ChangeEvent, FormEvent } from "react"

interface FormData {
  number: string
  email: string
  message: string
}

export default function Contact () {
  const [submitData, setSubmitData] = useState<FormData | null>(null)
  const [formData, setFormData] = useState<FormData>({
    number: "",
    email: "",
    message: "",
  })

  const { data, loading, error } = fetch('/api/contact', submitData)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitData(formData)
    setFormData({
      number: "",
      email: "",
      message: "",
    })
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
              />
              <label htmlFor="phone">Phone</label>
              <input
                name="number"
                id="phone"
                type="tel"
                value={formData.number}
                onChange={handleChange}
                required
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
              />
            </div>
            <button type="submit" className="form-submit-btn">
              Submit
            </button>
            {data !== null && <p style={{ color: "green" }}>Datos enviados exitosamente: {JSON.stringify(res, null, 2)}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}