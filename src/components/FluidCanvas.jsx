import React, { useEffect, useRef } from 'react';

export default function FluidCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with easing
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    // Executive Ambient Lighting: Deep Scuderia Crimson & Subtle Titanium Specular Glow
    const orbs = [
      { x: width * 0.25, y: height * 0.3, radius: 420, color: 'rgba(225, 6, 0, 0.065)', vx: 0.2, vy: 0.12 },
      { x: width * 0.75, y: height * 0.45, radius: 480, color: 'rgba(255, 255, 255, 0.02)', vx: -0.15, vy: 0.18 },
      { x: width * 0.5, y: height * 0.85, radius: 500, color: 'rgba(225, 6, 0, 0.045)', vx: 0.12, vy: -0.15 },
      { x: width * 0.15, y: height * 0.75, radius: 360, color: 'rgba(148, 163, 184, 0.025)', vx: -0.1, vy: 0.1 }
    ];

    const onMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let animationId;
    const render = () => {
      animationId = requestAnimationFrame(render);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Draw and move ambient orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce gently off boundaries
        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        // Subtle interactive pull toward mouse
        const dx = mouse.x - orb.x;
        const dy = mouse.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 500) {
          orb.x += (dx / dist) * 0.3;
          orb.y += (dy / dist) * 0.3;
        }

        // Draw radial gradient orb
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
}
