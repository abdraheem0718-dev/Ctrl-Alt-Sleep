import React from 'react';

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
}

export const Ripple: React.FC<RippleProps> = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 6,
  className = ''
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 select-none [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 80;
        const opacity = mainCircleOpacity - i * 0.035;
        const animationDelay = `${i * 0.7}s`;
        const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid';
        const borderColor = i % 2 === 0 ? 'rgba(139, 168, 136, 0.4)' : 'rgba(204, 213, 174, 0.25)';

        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border shadow-inner animate-[ripple_4s_ease-in-out_infinite]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: Math.max(0.04, opacity),
              animationDelay,
              borderStyle,
              borderColor,
              transform: 'translate(-50%, -50%) scale(1)'
            }}
          />
        );
      })}
    </div>
  );
});
