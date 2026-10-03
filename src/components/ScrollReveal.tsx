import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'header' | 'text' | 'subtle' | 'card';
  delay?: number; // milliseconds
  duration?: number; // milliseconds
  distance?: number; // pixels
  className?: string;
  as?: React.ElementType;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'text',
  delay = 0,
  duration,
  distance,
  className = '',
  as: Component = 'div',
  once = true
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const defaultDistance = distance !== undefined
    ? distance
    : variant === 'header'
    ? 28
    : variant === 'subtle'
    ? 12
    : variant === 'card'
    ? 22
    : 18;

  const defaultDuration = duration !== undefined
    ? duration
    : variant === 'header'
    ? 900
    : variant === 'subtle'
    ? 700
    : 800;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    // Check if element is already within viewport on initial mount
    const rect = el.getBoundingClientRect();
    const isInInitialViewport = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;

    if (isInInitialViewport) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, Math.max(delay, 20));
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delay, once]);

  return (
    <Component
      ref={elementRef}
      className={`${className} transition-all will-change-[transform,opacity]`}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translateY(0)' : `translateY(${defaultDistance}px)`,
        transitionDuration: `${defaultDuration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </Component>
  );
};
