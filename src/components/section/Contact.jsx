const Contact = () => {
  return(
    <div className='contact'>
      <div className=''></div>
      <div className='form'>
        <div class='form-container'>
          <form class='form'>
            <div class='form-group'>
              <label for='email'>Email</label>
              <input name='email' id='email' type='text' required/>
              <label for='number'>Phone</label>
              <input name='number' id='phone' type='text' required/>
            </div>
            <div class='form-group'>
              <label for='textarea'>How Can I Help You?</label>
              <textarea cols='50' rows='10' id='textarea' name='textarea' required/>
            </div>
            <button type='submit' class='form-submit-btn'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact