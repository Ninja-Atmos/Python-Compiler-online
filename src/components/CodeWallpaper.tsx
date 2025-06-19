import React, { useEffect, useRef } from 'react';

const CodeWallpaper = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // --- Gradient Overlay Animation ---
    const gradientCanvas = gradientRef.current;
    if (gradientCanvas) {
      const gctx = gradientCanvas.getContext('2d');
      let t = 0;
      const resizeGradient = () => {
        gradientCanvas.width = window.innerWidth;
        gradientCanvas.height = window.innerHeight;
      };
      resizeGradient();
      window.addEventListener('resize', resizeGradient);
      const animateGradient = () => {
        if (!gctx) return;
        const w = gradientCanvas.width;
        const h = gradientCanvas.height;
        gctx.clearRect(0, 0, w, h);
        const grad = gctx.createLinearGradient(
          w / 2 + Math.sin(t / 80) * w / 3,
          h / 2 + Math.cos(t / 100) * h / 3,
          w / 2 + Math.cos(t / 60) * w / 3,
          h / 2 + Math.sin(t / 120) * h / 3
        );
        grad.addColorStop(0, 'rgba(0,255,180,0.18)');
        grad.addColorStop(0.5, 'rgba(0,128,255,0.18)');
        grad.addColorStop(1, 'rgba(128,0,255,0.18)');
        gctx.fillStyle = grad;
        gctx.fillRect(0, 0, w, h);
        t++;
        requestAnimationFrame(animateGradient);
      };
      animateGradient();
      return () => {
        window.removeEventListener('resize', resizeGradient);
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters to use in the animation
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 32;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = [];

    // Initialize drops
    const initDrops = () => {
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
      }
    };
    initDrops();
    window.addEventListener('resize', initDrops);

    // Animation function
    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(0,0,0,0.13)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.filter = 'blur(2.5px) brightness(1.2)';
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.shadowColor = `rgba(0,255,180,0.9)`;
        ctx.shadowBlur = 18;
        ctx.font = `bold ${fontSize}px Fira Mono, monospace`;
        ctx.fillStyle = `rgba(${100 + Math.floor(Math.random()*155)},255,${180 + Math.floor(Math.random()*75)},0.95)`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      ctx.restore();
    };
    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', initDrops);
    };
  }, []);

  return (
    <>
      {/* Gradient overlay */}
      <canvas
        ref={gradientRef}
        className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none"
        style={{ opacity: 0.85, transition: 'opacity 0.5s' }}
      />
      {/* Code rain */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{ opacity: 0.85, transition: 'opacity 0.5s' }}
      />
    </>
  );
};

export default CodeWallpaper; 