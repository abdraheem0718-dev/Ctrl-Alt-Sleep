import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ShimmerButtonProps extends HTMLMotionProps<'button'> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.1em',
      shimmerDuration = '2.5s',
      borderRadius = '16px',
      background = 'linear-gradient(135deg, #2D4A22 0%, #1A2E11 100%)',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background
          } as React.CSSProperties
        }
        className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3.5 text-white [background:var(--bg)] [border-radius:var(--radius)] shadow-[0_8px_24px_-4px_rgba(45,74,34,0.4)] border border-[#8BA888]/30 transition-all duration-300 hover:shadow-[0_12px_32px_-4px_rgba(45,74,34,0.6)] ${className}`}
        {...props}
      >
        {/* Spark/shimmer container */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px -z-10 [border-radius:var(--radius)] overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full animate-[shimmer-sweep_3s_infinite_linear] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.18)_50%,transparent_100%)] opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </div>
      </motion.button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
