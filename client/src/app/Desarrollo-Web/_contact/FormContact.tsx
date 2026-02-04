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
  )
}