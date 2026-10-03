import React, { useState } from 'react';
import aureviaLogoImg from '../assets/images/aurevia_logo.png';

const FALLBACK_LOGO_URL = 'https://i.ibb.co/svw7XbpK/Gemini-Generated-Image-5k8rf5k8rf5k8rf5-removebg-preview.png';

interface AureviaLogoProps {
  variant?: 'default' | 'brass-foil' | 'monochrome' | 'gold-pure';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  className?: string;
}

export const AureviaLogo: React.FC<AureviaLogoProps> = ({
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const [imgSrc, setImgSrc] = useState(aureviaLogoImg);

  // 2x Dimensions for increased presence and visual impact
  const iconDimensions = {
    sm: 'h-14 w-14',
    md: 'h-[72px] w-[72px]',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32'
  }[size];

  const foilEffect = variant === 'brass-foil'
    ? 'filter drop-shadow-[0_2px_12px_rgba(216,182,131,0.55)] brightness-110 contrast-105'
    : 'drop-shadow-md';

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      {/* 2X Brand Logo Mark without accompanying text */}
      <div className={`relative ${iconDimensions} flex items-center justify-center shrink-0`}>
        <img
          src={imgSrc}
          alt="Aurevia Aviation"
          onError={() => setImgSrc(FALLBACK_LOGO_URL)}
          className={`w-full h-full object-contain ${foilEffect} transition-transform duration-300 hover:scale-105`}
          loading="eager"
        />
      </div>
    </div>
  );
};
