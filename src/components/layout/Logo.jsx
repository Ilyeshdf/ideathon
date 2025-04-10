import React from 'react';

export const LogoSVG = () => (
  <svg 
    width="512" 
    height="512" 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="#FF7043" />
    <path 
      d="M12 12C12 10.8954 12.8954 10 14 10H26C27.1046 10 28 10.8954 28 12V20.5C28 21.6046 27.1046 22.5 26 22.5H14C12.8954 22.5 12 21.6046 12 20.5V12Z" 
      fill="white" 
    />
    <path 
      d="M14 25C14 24.4477 14.4477 24 15 24H25C25.5523 24 26 24.4477 26 25V28C26 28.5523 25.5523 29 25 29H15C14.4477 29 14 28.5523 14 28V25Z" 
      fill="white" 
    />
    <path 
      d="M16 14C16 13.4477 16.4477 13 17 13H23C23.5523 13 24 13.4477 24 14C24 14.5523 23.5523 15 23 15H17C16.4477 15 16 14.5523 16 14Z" 
      fill="#FF5252" 
    />
    <path 
      d="M16 18C16 17.4477 16.4477 17 17 17H23C23.5523 17 24 17.4477 24 18C24 18.5523 23.5523 19 23 19H17C16.4477 19 16 18.5523 16 18Z" 
      fill="#FF5252" 
    />
  </svg>
);

const Logo = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <rect width="40" height="40" rx="8" fill="#FF7043" />
        <path 
          d="M12 12C12 10.8954 12.8954 10 14 10H26C27.1046 10 28 10.8954 28 12V20.5C28 21.6046 27.1046 22.5 26 22.5H14C12.8954 22.5 12 21.6046 12 20.5V12Z" 
          fill="white" 
        />
        <path 
          d="M14 25C14 24.4477 14.4477 24 15 24H25C25.5523 24 26 24.4477 26 25V28C26 28.5523 25.5523 29 25 29H15C14.4477 29 14 28.5523 14 28V25Z" 
          fill="white" 
        />
        <path 
          d="M16 14C16 13.4477 16.4477 13 17 13H23C23.5523 13 24 13.4477 24 14C24 14.5523 23.5523 15 23 15H17C16.4477 15 16 14.5523 16 14Z" 
          fill="#FF5252" 
        />
        <path 
          d="M16 18C16 17.4477 16.4477 17 17 17H23C23.5523 17 24 17.4477 24 18C24 18.5523 23.5523 19 23 19H17C16.4477 19 16 18.5523 16 18Z" 
          fill="#FF5252" 
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-primary leading-none">YumSave</span>
        <span className="text-xs text-gray-500">Save Food. Save Money.</span>
      </div>
    </div>
  );
};

export default Logo; 