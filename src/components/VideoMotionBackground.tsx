import React, { useEffect, useRef, useState, useCallback } from 'react';

export type AtmosphereTheme = 'stratosphere' | 'golden_hour' | 'midnight';

interface VideoMotionBackgroundProps {
  initialTheme?: AtmosphereTheme;
  className?: string;
}

interface CloudCluster {
  x: number;
  y: number;
  baseRadius: number;
  speed: number;
  layer: number;
  opacity: number;
  puffs: Array<{
    dx: number;
    dy: number;
    rx: number;
    ry: number;
    phase: number;
  }>;
}

export const VideoMotionBackground: React.FC<VideoMotionBackgroundProps> = ({
  initialTheme = 'stratosphere',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [theme, setTheme] = useState<AtmosphereTheme>(initialTheme);
  const animStateRef = useRef({
    time: 0,
    scrollY: 0,
    targetScrollY: 0,
    scrollProgress: 0,
    scrollVelocity: 0,
    lastScrollY: 0,
    lastScrollTime: Date.now(),
    tilt: 0,
    themeProgress: 0,
    activeParticles: [] as Array<{
      x: number;
      y: number;
      z: number;
      speed: number;
      length: number;
      opacity: number;
    }>,
    cloudClusters: [] as CloudCluster[]
  });

  // Track window scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, currentY / maxScroll));
      
      const now = Date.now();
      const dt = Math.max(1, now - animStateRef.current.lastScrollTime);
      const dy = currentY - animStateRef.current.lastScrollY;
      const velocity = dy / dt; // pixels per ms

      animStateRef.current.targetScrollY = currentY;
      animStateRef.current.scrollProgress = progress;
      animStateRef.current.scrollVelocity = Math.min(15, Math.max(-15, velocity * 2.5));
      animStateRef.current.lastScrollY = currentY;
      animStateRef.current.lastScrollTime = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initialize atmospheric particles and clouds
  const initSimulation = useCallback((width: number, height: number) => {
    const particles = [];
    for (let i = 0; i < 54; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2, // depth factor
        speed: Math.random() * 1.6 + 1.2,
        length: Math.random() * 80 + 35,
        opacity: Math.random() * 0.35 + 0.1
      });
    }

    const clusters: CloudCluster[] = [];
    // 3 Layers of organic volumetric cloud formations
    for (let layer = 0; layer < 3; layer++) {
      const count = layer === 0 ? 8 : layer === 1 ? 12 : 16;
      for (let i = 0; i < count; i++) {
        const baseRadius = Math.random() * 160 + 130 + layer * 70;
        const puffCount = Math.floor(Math.random() * 3) + 4; // 4 to 6 organic sub-puffs
        const puffs = [];

        for (let p = 0; p < puffCount; p++) {
          const angle = (p / puffCount) * Math.PI * 2 + (Math.random() * 0.5);
          const dist = Math.random() * (baseRadius * 0.6);
          puffs.push({
            dx: Math.cos(angle) * dist,
            dy: Math.sin(angle) * (dist * 0.5),
            rx: baseRadius * (Math.random() * 0.45 + 0.7),
            ry: (baseRadius * 0.48) * (Math.random() * 0.3 + 0.75),
            phase: Math.random() * Math.PI * 2
          });
        }

        clusters.push({
          x: Math.random() * (width * 1.8) - width * 0.4,
          y: (height * 0.15) + Math.random() * (height * 0.95),
          baseRadius,
          speed: (0.16 + layer * 0.14) * (Math.random() * 0.4 + 0.85),
          layer,
          opacity: 0.24 + layer * 0.12,
          puffs
        });
      }
    }

    animStateRef.current.activeParticles = particles;
    animStateRef.current.cloudClusters = clusters;
  }, []);

  // Main 60fps render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isDisposed = false;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initSimulation(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (isDisposed || !ctx || !canvas) return;

      const state = animStateRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Smooth lerp scroll position (damping inertia)
      state.scrollY += (state.targetScrollY - state.scrollY) * 0.08;
      state.scrollVelocity *= 0.92; // decay scroll velocity impulse

      // Smooth camera tilt based on scroll velocity
      const targetTilt = state.scrollVelocity * 0.15;
      state.tilt += (targetTilt - state.tilt) * 0.1;

      // Accumulate time if playing
      if (isPlaying) {
        state.time += 0.016 + Math.abs(state.scrollVelocity) * 0.003;
      }

      const t = state.time;
      const scrollRatio = state.scrollProgress;
      const scrollYOffset = state.scrollY * 0.15; // Vertical camera parallax drift

      // ----------------------------------------------------
      // 1. SKY GRADIENT BASE (Atmospheric Altitude Rendering)
      // ----------------------------------------------------
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);

      if (theme === 'stratosphere') {
        // Deep indigo cosmic navy fading into golden edge
        skyGrad.addColorStop(0, '#090B12');
        skyGrad.addColorStop(0.35, '#0E111C');
        skyGrad.addColorStop(0.7, '#161B29');
        skyGrad.addColorStop(0.88, '#24202B');
        skyGrad.addColorStop(1, '#4A3423');
      } else if (theme === 'golden_hour') {
        // Warm amber dusk
        skyGrad.addColorStop(0, '#0C0E17');
        skyGrad.addColorStop(0.3, '#1B1724');
        skyGrad.addColorStop(0.65, '#3B2421');
        skyGrad.addColorStop(0.85, '#683B20');
        skyGrad.addColorStop(1, '#8A5328');
      } else {
        // Midnight cruise
        skyGrad.addColorStop(0, '#05070B');
        skyGrad.addColorStop(0.4, '#0A0D15');
        skyGrad.addColorStop(0.75, '#121622');
        skyGrad.addColorStop(0.92, '#181C2C');
        skyGrad.addColorStop(1, '#1A2138');
      }

      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Save context for camera parallax & tilt transform
      ctx.save();
      // Pivot around center of screen
      ctx.translate(width / 2, height / 2);
      ctx.rotate((state.tilt * Math.PI) / 180);
      // Parallax translation
      const parallaxY = -(state.scrollY * 0.12) % height;
      ctx.translate(-width / 2, -height / 2 + parallaxY * 0.25);

      // ----------------------------------------------------
      // 2. STARS & STRATOSPHERIC SPECULAR SHIMMER
      // ----------------------------------------------------
      // Stars appear prominently when at high altitude (top of page)
      const starVisibility = Math.max(0, 1 - scrollRatio * 1.5);
      if (starVisibility > 0.05) {
        ctx.fillStyle = `rgba(243, 240, 231, ${0.45 * starVisibility})`;
        for (let i = 0; i < 35; i++) {
          const starX = ((i * 137.5) % width);
          const starY = ((i * 89.3) % (height * 0.55));
          const twinkle = Math.sin(t * 2 + i) * 0.3 + 0.7;
          ctx.beginPath();
          ctx.arc(starX, starY, 1.1 * twinkle, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ----------------------------------------------------
      // 3. HORIZON GLOW & ANAMORPHIC LIGHT BEAM
      // ----------------------------------------------------
      const horizonY = height * 0.72 - scrollYOffset * 0.3;
      const horizonGlow = ctx.createRadialGradient(
        width * 0.5,
        horizonY,
        width * 0.05,
        width * 0.5,
        horizonY,
        width * 0.75
      );
      horizonGlow.addColorStop(0, 'rgba(216, 182, 131, 0.28)');
      horizonGlow.addColorStop(0.25, 'rgba(182, 138, 78, 0.16)');
      horizonGlow.addColorStop(0.6, 'rgba(142, 85, 45, 0.08)');
      horizonGlow.addColorStop(1, 'rgba(18, 20, 28, 0)');

      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, horizonY - 140, width, 280);

      // Anamorphic horizontal streak across the flight deck horizon
      const beamGrad = ctx.createLinearGradient(0, horizonY, width, horizonY);
      beamGrad.addColorStop(0, 'rgba(216, 182, 131, 0)');
      beamGrad.addColorStop(0.2, 'rgba(216, 182, 131, 0.15)');
      beamGrad.addColorStop(0.5, 'rgba(255, 248, 230, 0.35)');
      beamGrad.addColorStop(0.8, 'rgba(216, 182, 131, 0.15)');
      beamGrad.addColorStop(1, 'rgba(216, 182, 131, 0)');

      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, horizonY - 1.5, width, 3);

      // ----------------------------------------------------
      // 4. VOLUMETRIC DRIFTING CLOUDS (PARALLAX + MOTION)
      // ----------------------------------------------------
      const clusters = state.cloudClusters;
      const cloudBaseColor = theme === 'golden_hour' 
        ? 'rgba(216, 160, 110, ' 
        : theme === 'midnight' 
        ? 'rgba(25, 32, 48, ' 
        : 'rgba(200, 185, 165, ';

      for (let i = 0; i < clusters.length; i++) {
        const c = clusters[i];
        
        // Continuous horizontal drifting speed boosted dynamically by user scroll
        if (isPlaying) {
          c.x += c.speed * (0.85 + Math.abs(state.scrollVelocity) * 0.45);
        }
        
        // Wrap around smoothly
        if (c.x - c.baseRadius * 1.5 > width * 1.35) {
          c.x = -c.baseRadius * 1.5;
        }

        // Parallax vertical movement based on layer depth with smooth infinite coordinate wrapping
        const layerParallax = (c.layer + 1) * 0.35;
        const totalWorldHeight = height * 2.2;
        const rawY = c.y - state.scrollY * layerParallax;
        const wrappedY = ((rawY % totalWorldHeight) + totalWorldHeight) % totalWorldHeight - height * 0.35;

        // Render each sub-puff with organic radial gradients
        const currentOpacity = c.opacity * (theme === 'midnight' ? 0.65 : 0.95);

        for (let p = 0; p < c.puffs.length; p++) {
          const puff = c.puffs[p];
          const billow = Math.sin(t * 0.7 + puff.phase) * 0.08;
          const px = c.x + puff.dx;
          const py = wrappedY + puff.dy;
          const rx = puff.rx * (1 + billow);
          const ry = puff.ry * (1 + billow * 0.6);

          const grad = ctx.createRadialGradient(
            px,
            py,
            rx * 0.1,
            px,
            py,
            rx
          );

          grad.addColorStop(0, `${cloudBaseColor}${currentOpacity})`);
          grad.addColorStop(0.4, `${cloudBaseColor}${currentOpacity * 0.55})`);
          grad.addColorStop(0.8, `${cloudBaseColor}${currentOpacity * 0.15})`);
          grad.addColorStop(1, `${cloudBaseColor}0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ----------------------------------------------------
      // 5. JET CRUISING PARTICLES & SLIPSTREAM STREAKS
      // ----------------------------------------------------
      const particles = state.activeParticles;
      const speedMultiplier = 1 + Math.abs(state.scrollVelocity) * 0.5;

      ctx.lineWidth = 1.2;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isPlaying) {
          p.x += p.speed * p.z * 3.5 * speedMultiplier;
          // Downward tilt on scroll down
          p.y += (state.scrollVelocity * 0.3 + 0.2) * p.z;
        }

        // Reset if moved past edge
        if (p.x > width + 100) {
          p.x = -100;
          p.y = Math.random() * height;
        }
        if (p.y > height + 50) p.y = -50;
        if (p.y < -50) p.y = height + 50;

        const streakLength = p.length * (1 + Math.abs(state.scrollVelocity) * 0.4);
        const pGrad = ctx.createLinearGradient(p.x - streakLength, p.y, p.x, p.y);
        pGrad.addColorStop(0, 'rgba(216, 182, 131, 0)');
        pGrad.addColorStop(0.7, `rgba(216, 182, 131, ${p.opacity * 0.4})`);
        pGrad.addColorStop(1, `rgba(255, 255, 255, ${p.opacity * 0.85})`);

        ctx.strokeStyle = pGrad;
        ctx.beginPath();
        ctx.moveTo(p.x - streakLength, p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      ctx.restore();

      // ----------------------------------------------------
      // 6. CINEMATIC VIGNETTE & FILM GRAIN OVERLAY
      // ----------------------------------------------------
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.35,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      vignette.addColorStop(0, 'rgba(18, 20, 28, 0)');
      vignette.addColorStop(0.75, 'rgba(18, 20, 28, 0.45)');
      vignette.addColorStop(1, 'rgba(10, 12, 18, 0.88)');

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Loop frame
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, theme, initSimulation]);

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block object-cover will-change-transform"
      />
      {/* Soft atmospheric gradient sheen on top to bind typography */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12141C]/40 via-transparent to-[#12141C]/80 pointer-events-none" />
    </div>
  );
};
