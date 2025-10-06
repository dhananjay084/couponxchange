'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const shapes = ['circle', 'rectangle', 'hemisphere'];

const getRandomShape = () => shapes[Math.floor(Math.random() * shapes.length)];

const Character = ({ mousePos, delay, isClient }) => {
  const [shape, setShape] = useState(getRandomShape());

  useEffect(() => {
    const interval = setInterval(() => {
      setShape(getRandomShape());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const eyePosition = (offsetX, offsetY) => {
    if (!isClient) return { transform: 'translate(0, 0)' };

    const moveX = ((mousePos.x - window.innerWidth / 4) / window.innerWidth) * 10;
    const moveY = ((mousePos.y - window.innerHeight / 2) / window.innerHeight) * 10;

    return {
      transform: `translate(${moveX + offsetX}px, ${moveY + offsetY}px)`,
    };
  };

  let shapeStyles = {
    width: '120px',
    height: '120px',
    backgroundColor: '#f97316',
    borderRadius: '0%',
    margin: '8px',
    position: 'relative',
    transition: 'all 0.4s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  switch (shape) {
    case 'circle':
      shapeStyles.borderRadius = '50%';
      shapeStyles.backgroundColor = '#f97316';
      break;
    case 'rectangle':
      shapeStyles.borderRadius = '12px';
      shapeStyles.height = '160px';
      shapeStyles.backgroundColor = '#8b5cf6';
      break;
    case 'hemisphere':
      shapeStyles.borderTopLeftRadius = '60px';
      shapeStyles.borderTopRightRadius = '60px';
      shapeStyles.borderBottomLeftRadius = '0';
      shapeStyles.borderBottomRightRadius = '0';
      shapeStyles.height = '60px';
      shapeStyles.backgroundColor = '#facc15';
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      style={shapeStyles}
    >
      {/* Eyes */}
      <div
        style={{
          width: '20px',
          height: '20px',
          background: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '30%',
          left: '28%',
          ...eyePosition(-4, -4),
        }}
      />
      <div
        style={{
          width: '20px',
          height: '20px',
          background: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '30%',
          right: '28%',
          ...eyePosition(4, -4),
        }}
      />
    </motion.div>
  );
};

export default function AnimatedCharacters() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isClient) return null; // ⛔ Prevent SSR errors

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '10px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <Character key={i} mousePos={mousePos} delay={i * 0.3} isClient={isClient} />
      ))}
    </div>
  );
}
