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
  showWordmark = true,
  className = ''
}) => {
  const [imgSrc, setImgSrc] = useState(aureviaLogoImg);

  const iconDimensions = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  }[size];

  const foilEffect = variant === 'brass-foil'
    ? 'filter drop-shadow-[0_2px_10px_rgba(216,182,131,0.5)] brightness-110 contrast-105'
    : 'drop-shadow-sm';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Logo Mark */}
      <div className={`relative ${iconDimensions} flex items-center justify-center shrink-0`}>
        <img
          src={imgSrc}
          alt="Aurevia Aviation Emblem"
          onError={() => setImgSrc(FALLBACK_LOGO_URL)}
          className={`w-full h-full object-contain ${foilEffect} transition-transform duration-300`}
          loading="eager"
        />
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none tracking-tight">
          <span className={`font-display font-medium tracking-wide ${textSize} text-[#F3F0E7]`}>
            Aurevia
          </span>
          <span className="text-[9px] tracking-[0.28em] uppercase font-sans font-medium text-[#B68A4E] mt-0.5">
            Aviation
          </span>
        </div>
      )}
    </div>
  );
};
