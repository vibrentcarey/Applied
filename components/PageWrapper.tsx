import React from 'react';
interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper = ({children}: PageWrapperProps) => {
  return (
    <div className='px-4 sm:px-8 md:px-12 w-full bg-base-200 z-10'>
      {children}
    </div>
  );
};

export default PageWrapper;