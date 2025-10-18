import React from 'react';

const KurdistanFlagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480" className={className}>
    <rect width="720" height="480" fill="#007a3d" />
    <rect width="720" height="320" fill="#fff" />
    <rect width="720" height="160" fill="#ce1126" />
    <g transform="translate(360 240)">
      <circle r="60" fill="#f9d616" />
      <g id="sun-ray">
        <path d="M 0,-85 L 12,-60 -12,-60 z" fill="#f9d616" />
        <use href="#sun-ray" transform="rotate(17.14)" />
        <use href="#sun-ray" transform="rotate(34.28)" />
        <use href="#sun-ray" transform="rotate(51.42)" />
        <use href="#sun-ray" transform="rotate(68.56)" />
        <use href="#sun-ray" transform="rotate(85.7)" />
        <use href="#sun-ray" transform="rotate(102.84)" />
        <use href="#sun-ray" transform="rotate(120)" />
        <use href="#sun-ray" transform="rotate(137.14)" />
        <use href="#sun-ray" transform="rotate(154.28)" />
        <use href="#sun-ray" transform="rotate(171.42)" />
        <use href="#sun-ray" transform="rotate(188.56)" />
        <use href="#sun-ray" transform="rotate(205.7)" />
        <use href="#sun-ray" transform="rotate(222.84)" />
        <use href="#sun-ray" transform="rotate(240)" />
        <use href="#sun-ray" transform="rotate(257.14)" />
        <use href="#sun-ray" transform="rotate(274.28)" />
        <use href="#sun-ray" transform="rotate(291.42)" />
        <use href="#sun-ray" transform="rotate(308.56)" />
        <use href="#sun-ray" transform="rotate(325.7)" />
        <use href="#sun-ray" transform="rotate(342.84)" />
      </g>
    </g>
  </svg>
);

export default KurdistanFlagIcon;
