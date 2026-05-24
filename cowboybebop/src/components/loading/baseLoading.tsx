import { LoadingProps, LoadingSize } from '@/entities/types/loading';
import React from 'react';

const sizeMap: Record<LoadingSize, string> = {
  sm: 'h-6 w-6 border-2',
  md: 'h-10 w-10 border-2',
  lg: 'h-14 w-14 border-4',
};

const BaseLoading: React.FC<LoadingProps> = ({
  text = 'Carregando...',
  size = 'md',
  fullScreen = false,
  className = '',
}) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/95'
    : 'inline-flex flex-col items-center justify-center gap-2';

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={text}
      className={`${containerClass} select-none ${className}`}
      data-testid="loading-component"
    >
      <div
        className={`animate-spin rounded-full border-solid border-zinc-700/30 border-t-orange-500 ${sizeMap[size]}`}
      />
      {text && (
        <p className="text-sm font-medium tracking-wide text-zinc-100/90">
          {text}
        </p>
      )}
    </div>
  );
};

export default BaseLoading;