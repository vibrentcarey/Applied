import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 footer bg-base-300 text-primary footer-center fixed bottom-0 ">
      <div>
        <p>ViBrent Studios © 2022 - 
          <div data-tip="Get In Touch!" className="tooltip tooltip-secondary">
            <a className='link link-secondary mx-1' href='mailto:brentbcarey@gmail.com' target="_blank" rel='noreferrer'> Email Me Here</a>  </div></p>

      </div>
    </footer>

  );
};

export default Footer;