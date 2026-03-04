import React from 'react';

export function DeviceFrame({
  src,
  alt,
  className,
  frameClassName,
}: {
  src: string;
  alt: string;
  className: string;
  frameClassName?: string;
}) {
  return (
    <div
      className={
        `relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_30px_90px_rgba(0,0,0,0.65)] ${
          frameClassName || ''
        }`
      }
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/40" />
      <img
        src={src}
        alt={alt}
        className={`relative z-10 h-full w-full ${className}`}
        loading="lazy"
      />
    </div>
  );
}
