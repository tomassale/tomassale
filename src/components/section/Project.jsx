const Project = () => {
  return(
    <div className='project'>
      <div className='flip-card'>
        <div className='flip-card-inner'>
          <div className='flip-card-front'>
            <div className='profile-image'>
              <div className='name'>
                Ethan Johnson
              </div>
            </div>
          </div>
          <div className='flip-card-back'>
            <div className='Description'>
              <p className='description'>
                
              </p>
              <div className='socialbar'>
                <a id='github' href='#'></a>
                <a id='instagram' href='#'></a>
                <a id='facebook' href='#'><svg viewBox='0 0 16 16' className='bi bi-facebook' fill='currentColor' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>
            </svg></a>
                <a id='twitter' href='#'><svg viewBox='0 0 16 16' className='bi bi-twitter' fill='currentColor' height='16' width='16' xmlns='http://www.w3.org/2000/svg'>
            </svg></a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project