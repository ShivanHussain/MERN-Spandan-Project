import React, { useEffect, useRef } from 'react';

interface InteractiveTextProps {
  children: React.ReactNode;
  className?: string;
}

const InteractiveText: React.FC<InteractiveTextProps> = ({ children, className }) => {
  const textRef = useRef<HTMLDivElement>(null);

  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      targetRotation.current = {
        x: Math.max(Math.min(deltaY / 20, 20), -20),
        y: Math.max(Math.min(-deltaX / 20, 20), -20),
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const animate = () => {
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;

      const { x, y } = currentRotation.current;

      el.style.transform = `perspective(1000px) rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg) scale(1.03)`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div
      ref={textRef}
      className={className}
      style={{
        display: 'block', // important to keep layout!
        background: 'none',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default InteractiveText;
