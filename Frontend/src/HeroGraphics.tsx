import React, { useEffect, useRef } from 'react';

const graphics = [
  // Left side group
  { id: 1, className: 'top-[25%] left-[15%]', src: '/src/assets/1.png' },
  { id: 2, className: 'top-[50%] left-[9%]', src: '/src/assets/2.png' },
  { id: 3, className: 'top-[75%] left-[20%]', src: '/src/assets/3.png' },

  // Right side group
  { id: 4, className: 'top-[30%] right-[7%]', src: '/src/assets/4.png' },
  { id: 5, className: 'top-[50%] right-[27%]', src: '/src/assets/5.png' },
  { id: 6, className: 'top-[80%] right-[20%]', src: '/src/assets/6.png' },
]


const HeroGraphics = () => {
  const refs = useRef<(HTMLImageElement | null)[]>([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targets = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const speed = 0.2;
    const ease = 0.3;

    const animate = () => {
      const dx = (mouse.current.x - centerX) * speed;
      const dy = (mouse.current.y - centerY) * speed;

      targets.current.x += (dx - targets.current.x) * ease;
      targets.current.y += (dy - targets.current.y) * ease;

      refs.current.forEach((el) => {
        if (el) {
          el.style.transform = `translate(${targets.current.x}px, ${targets.current.y}px)`;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {graphics.map((graphic, i) => (
        <img
          key={graphic.id}
          ref={(el) => (refs.current[i] = el)}
          src={graphic.src}
          alt={`graphic-${graphic.id}`}
          className={`w-100 h-36 absolute object-contain ${graphic.className} opacity-50 will-change-transform`}
        />
      ))}
    </div>
  );
};

export default HeroGraphics;
