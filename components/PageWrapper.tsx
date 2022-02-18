import React from 'react';

const PageWrapper = ({children}) => {
  return (
    <div className='px-4 sm:px-8 md:px-12 w-full bg-base-200'>
      {children}
    </div>
  );
};

export default PageWrapper;