import React from 'react';
import hero from '../../img/Logos-container.png';
function LandingPage() {
  return (
    <div className='landingpage'>
      <div className='landingpage__container'>
        <div className='landingpage__row'>
          <div className='landingpage__col landingpage__col-50'>
            <div className='landingpage__text'>
              <div className='landingpage__text-h1'>
                Discover breakpoints used by the world's top companies
              </div>
              <div className='landingpage__text-h2 marg-tb-xs'>
                save hours of research time with Responsively's curated
                collection of the best in-production web interfaces and
                screenshots
              </div>
              <button className='landingpage__text-button'>
                <a href='/signup'>Start free</a>
              </button>
            </div>
          </div>
          <div className='landingpage__col landingpage__col-50'>
            <img src={hero} alt='hero-images' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
