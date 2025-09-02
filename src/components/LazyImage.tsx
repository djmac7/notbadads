'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Skeleton } from '@mui/material';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  onError?: () => void;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  onError,
  fill = false,
  objectFit = 'cover',
  priority = false
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always load priority images immediately
    if (priority) {
      setIsInView(true);
      return;
    }

    const element = imgRef.current;
    if (!element) return;

    // Check if element is already in viewport on mount
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect();
      const isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );

      if (isVisible) {
        setIsInView(true);
        return true;
      }
      return false;
    };

    // Check immediately on mount
    if (checkInitialVisibility()) {
      return; // Element is already visible, no need for observer
    }

    // Set up intersection observer for elements not initially visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError();
    }
  };

  // For fill mode
  if (fill) {
    return (
      <div ref={imgRef} className={`relative w-full h-full ${className}`} style={style}>
        {/* Show skeleton while loading */}
        {isLoading && !hasError && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              bgcolor: 'grey.200',
            }}
          />
        )}

        {/* Always render the Image component when in view or priority */}
        {(isInView || priority) && !hasError && (
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit }}
            className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onLoad={handleLoad}
            onError={handleError}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Show placeholder when not in view and not priority */}
        {!isInView && !priority && !hasError && (
          <div className="absolute inset-0 bg-gray-100" />
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Failed to load image</span>
          </div>
        )}
      </div>
    );
  }

  // For fixed dimensions
  return (
    <div ref={imgRef} className={`relative ${className}`} style={style}>
      {/* Show skeleton while loading */}
      {isLoading && !hasError && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          animation="wave"
          sx={{ bgcolor: 'grey.200' }}
        />
      )}

      {/* Always render the Image component when in view or priority */}
      {(isInView || priority) && !hasError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="bg-gray-100 flex items-center justify-center" style={{ width, height }}>
          <span className="text-gray-400 text-xs">Failed to load</span>
        </div>
      )}
    </div>
  );
}
