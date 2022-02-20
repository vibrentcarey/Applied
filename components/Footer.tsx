import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 footer bg-base-300 text-primary footer-center fixed inset-x-0 bottom-0 z-0">
      <div>
        <p>ViBrent Studios © 2022 - 
          <span data-tip="Get In Touch!" className="tooltip tooltip-secondary">
            <a className='link link-secondary mx-1' href='mailto:brentbcarey@gmail.com' target="_blank" rel='noreferrer'> Email Me Here</a>  </span></p>

      </div>
    </footer>

  );
};

export default Footer;