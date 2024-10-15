import BackgroundVideo from '../background/backgroundVideo'
import PostHook from '../../../hook/PostHook'
import { useState } from 'react'

const Contact = () => {

  const [submitData, setSubmitData] = useState(null)
  const [formData, setFormData] = useState({
    number: '',
    email: '',
    message: ''
  })

  const { data } = PostHook('http://localhost:8080/form', submitData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value})
  }

  const handleSubmit = () => {
    setSubmitData(formData)
    setFormData({
      number: '',
      email: '',
      message: ''
    })
  }

  return(
    <div className='contact' id='contact'>
      <h2 className='titleContact'>Contact Me</h2>
      <div className='formContainer'>
        <div className='form-container'>
          <form className='form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input name='email' id='email' type='email' value={formData.email} onChange={handleChange} required/>
              <label htmlFor='number'>Phone</label>
              <input name='number' id='phone' type='tel' value={formData.number} onChange={handleChange} required/>
            </div>
            <div className='form-group'>
              <label htmlFor='message'>How Can I Help You?</label>
              <textarea cols='50' rows='10' id='textarea' name='message' value={formData.message} onChange={handleChange} required/>
            </div>
            <button type='submit' className='form-submit-btn'>Submit</button>
            {data && <p>Datos enviados: {JSON.stringify(data)}</p>}
          </form>
        </div>
      </div>
      <BackgroundVideo video='backgroundContact.mp4'/>
    </div>
  )
}

export default Contact