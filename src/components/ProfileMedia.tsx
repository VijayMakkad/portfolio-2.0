'use client';

import { cn } from '@/lib/utils';

const sizeMap = {
  s: 32,
  m: 40,
  l: 56,
  xl: 128,
} as const;

type ProfileMediaProps = {
  src?: string;
  size?: keyof typeof sizeMap;
  className?: string;
  mirror?: boolean;
};

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.ogg'];

export function ProfileMedia({
  src = '/profile.mp4',
  size = 'xl',
  className,
  mirror = false,
}: ProfileMediaProps) {
  const dimension = sizeMap[size];
  const isVideo = VIDEO_EXTENSIONS.some(ext =>
    src.toLowerCase().endsWith(ext)
  );

  const sharedClassName = cn(
    'rounded-full object-cover border c-border',
    mirror && '-scale-x-100',
    className
  );
  const sharedStyle = { width: dimension, height: dimension };

  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Vijay Makkad profile video"
        className={sharedClassName}
        style={sharedStyle}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Vijay Makkad"
      className={sharedClassName}
      style={sharedStyle}
    />
  );
}
