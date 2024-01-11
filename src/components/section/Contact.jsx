const Contact = () => {
  return(
    <div className='contact' id='contact'>
      <h2 className='titleContact'>Contact Me</h2>
      <div className='form'>
        <div className='form-container'>
          <form className='form'>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input name='email' id='email' type='text' required/>
              <label htmlFor='number'>Phone</label>
              <input name='number' id='phone' type='text' required/>
            </div>
            <div className='form-group'>
              <label htmlFor='textarea'>How Can I Help You?</label>
              <textarea cols='50' rows='10' id='textarea' name='textarea' required/>
            </div>
            <button type='submit' className='form-submit-btn'>Submit</button>
          </form>
        </div>
      </div>
      <div className='backgroundVideo'>
        <video src="./video/background/backgroundContact.mp4" autoPlay muted loop disablePictureInPicture/>
      </div>
    </div>
  )
}

export default Contact