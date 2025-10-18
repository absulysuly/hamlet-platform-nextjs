import React from 'react';

const IraqFlagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className={className}>
    <rect width="900" height="600" fill="#fff" />
    <rect width="900" height="200" fill="#ce1126" />
    <rect y="400" width="900" height="200" fill="#000" />
    <text
      x="450"
      y="355"
      fontFamily="Kufi, Noto Sans Arabic"
      fontSize="120"
      fill="#007a3d"
      textAnchor="middle"
      fontWeight="bold"
    >
      الله أكبر
    </text>
  </svg>
);

export default IraqFlagIcon;
