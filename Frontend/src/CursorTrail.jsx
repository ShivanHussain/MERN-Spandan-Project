import React, { useEffect, useRef } from 'react';
import './CursorTrail.css';

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const maxLength = 20;

  const handleMouseMove = (e) => {
    points.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points.current[0].x, points.current[0].y);

        for (let i = 1; i < points.current.length; i++) {
          const current = points.current[i];
          const prev = points.current[i - 1];

          const controlX = (prev.x + current.x) / 2;
          const controlY = (prev.y + current.y) / 2;

          // Golden glow effect
          ctx.strokeStyle = `rgba(255, 215, 0, ${current.alpha})`; // Golden color
          ctx.lineWidth = 6;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          // Glow using shadow
          ctx.shadowColor = 'rgba(255, 223, 70, 0.8)';
          ctx.shadowBlur = 15;

          ctx.quadraticCurveTo(prev.x, prev.y, controlX, controlY);
        }

        ctx.stroke();
      }

      points.current = points.current.filter(p => p.alpha > 0);
      points.current.forEach(point => {
        point.alpha -= 0.02;
      });

      if (points.current.length > maxLength) {
        points.current.shift();
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-canvas" />;
};

export default CursorTrail;
