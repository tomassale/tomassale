export default function FormContact(){
  return(
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
    <button type="submit" className="form-submit-btn" disabled={loading}>
      {loading ? "Enviando..." : "Submit"}
    </button>
    {error && <p style={{ color: "red" }}>Error al enviar: {error.message || "Error desconocido"}</p>}
    {data !== null && <p style={{ color: "green" }}>Datos enviados exitosamente: {JSON.stringify(data, null, 2)}</p>}
  </form>
  )
}