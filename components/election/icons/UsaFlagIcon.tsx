import React from 'react';

const UsaFlagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 10" className={className}>
    <defs>
      <g id="r">
        <rect width="19" height="1" fill="#b22234"/>
        <rect y="2" width="19" height="1" fill="#b22234"/>
        <rect y="4" width="19" height="1" fill="#b22234"/>
        <rect y="6" width="19" height="1" fill="#b22234"/>
        <rect y="8" width="19" height="1" fill="#b22234"/>
      </g>
    </defs>
    <rect width="19" height="10" fill="#fff"/>
    <use href="#r"/>
    <rect width="19" y="6" height="1" fill="#b22234"/>
    <rect width="19" y="8" height="1" fill="#b22234"/>
    <rect width="9" height="5" fill="#3c3b6e"/>
  </svg>
);

export default UsaFlagIcon;
