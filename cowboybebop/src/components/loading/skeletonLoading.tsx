import { SkeletonProps } from '@/entities/types/loading';
import React from 'react';

const SkeletonItem: React.FC<Omit<SkeletonProps, 'count'>> = ({
  width = 'w-full',
  height = 'h-4',
  shape = 'rect',
  animate = true,
  className = '',
}) => {
  const shapeClass = shape === 'circle' ? 'rounded-full' : shape === 'text' ? 'rounded-sm' : 'rounded-md';
  const animClass = animate ? 'animate-pulse' : '';

  return (
    <div
      className={`
        ${shapeClass} ${animClass}
        bg-zinc-800/70 border border-zinc-700/40
        ${width} ${height} ${className}
      `.trim().replace(/\s+/g, ' ')}
      data-testid="skeleton-item"
    />
  );
};

const SkeletonLoading: React.FC<SkeletonProps> & { Item: typeof SkeletonItem } = ({
  width,
  height,
  shape,
  count = 1,
  animate = true,
  className = '',
}) => {
  // Garante número seguro para renderização determinística
  const safeCount = Math.max(1, Math.floor(count || 1));

  if (safeCount <= 1) {
    return (
      <SkeletonItem
        width={width}
        height={height}
        shape={shape}
        animate={animate}
        className={className}
      />
    );
  }

  return (
    <div role="status" aria-busy="true" className={className} data-testid="skeleton-group">
      {Array.from({ length: safeCount }).map((_, i) => (
        <SkeletonItem
          key={i}
          width={width}
          height={height}
          shape={shape}
          animate={animate}
          className="mb-2 last:mb-0"
        />
      ))}
      <span className="sr-only">Carregando conteúdo...</span>
    </div>
  );
};

SkeletonLoading.Item = SkeletonItem;
export default SkeletonLoading;