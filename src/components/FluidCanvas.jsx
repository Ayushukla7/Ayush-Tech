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

    // Floating ambient colored light blobs
    const orbs = [
      { x: width * 0.2, y: height * 0.3, radius: 360, color: 'rgba(0, 242, 254, 0.12)', vx: 0.3, vy: 0.2 },
      { x: width * 0.8, y: height * 0.4, radius: 420, color: 'rgba(59, 130, 246, 0.14)', vx: -0.2, vy: 0.3 },
      { x: width * 0.5, y: height * 0.8, radius: 460, color: 'rgba(139, 92, 246, 0.10)', vx: 0.2, vy: -0.3 },
      { x: width * 0.15, y: height * 0.7, radius: 340, color: 'rgba(204, 255, 0, 0.06)', vx: -0.15, vy: 0.15 }
    ];

    const onMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let animationId;
    const render = () => {
      animationId = requestAnimationFrame(render);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw and move ambient orbs
      orbs.forEach((orb, i) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce on boundary
        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        // Influence slightly by mouse
        const dx = mouse.x - orb.x;
        const dy = mouse.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 600) {
          orb.x += (dx / dist) * 0.6;
          orb.y += (dy / dist) * 0.6;
        }

        const grad = ctx.createRadialGradient(orb.x, orb.y, 10, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Interactive cursor glow spotlight
      const cursorGrad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 280);
      cursorGrad.addColorStop(0, 'rgba(0, 242, 254, 0.08)');
      cursorGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)');
      cursorGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = cursorGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 280, 0, Math.PI * 2);
      ctx.fill();
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
