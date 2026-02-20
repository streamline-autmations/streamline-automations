import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface FeaturedProjectProps {
  title: string;
  subtitle: string;
  tags: string[];
  imageSrc: string;
  videoSrc?: string;
  color: string;
  align?: 'left' | 'right';
  linkTo?: string;
  objectFit?: 'cover' | 'contain';
  containerHeight?: string;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  title,
  subtitle,
  tags,
  imageSrc,
  videoSrc,
  color,
  align = 'left',
  linkTo = '/portfolio',
  objectFit = 'cover',
  containerHeight = 'h-[500px] md:h-[600px]'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(err => console.log('Video play failed:', err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && videoSrc) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const getGlowColor = () => {
    if (color.includes('purple')) return 'shadow-brand-purple/30';
    return 'shadow-white/10';
  };

  const getAccentColor = () => {
    if (color.includes('purple') || color.includes('orange')) return 'text-accent';
    return 'text-white';
  };

  const getTagBorderColor = () => {
    if (color.includes('purple') || color.includes('orange')) return 'border-[color:var(--purple-border)] bg-[color:var(--purple-dim)]';
    return 'border-white/30 bg-white/10';
  };

  return (
    <Link to={linkTo}>
      <div
        className={`group relative w-full ${containerHeight} rounded-3xl overflow-hidden border border-white/10 bg-[#0F0F0F] hover:border-white/20 transition-all duration-500 cursor-pointer hover:shadow-2xl ${getGlowColor()}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Media Layer */}
        <div className="absolute inset-0 z-0">
          {/* Video (if exists) */}
          {videoSrc && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src={videoSrc}
            />
          )}

          {/* Spotlight Backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-white/15 via-white/5 to-transparent opacity-60 blur-3xl pointer-events-none z-[1]"></div>

          {/* Static Image */}
          <img
            src={imageSrc}
            alt={title}
            className={`absolute inset-0 w-full h-full transition-all duration-700 group-hover:scale-105 ${
              objectFit === 'cover' ? 'object-cover' : 'object-contain'
            } ${
              videoSrc ? 'group-hover:opacity-0' : ''
            } z-[2]`}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>

        {/* Ambient Glow Effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[5] ${
          color.includes('purple') || color.includes('orange') ? 'bg-gradient-to-br from-purple-500/20 via-transparent to-transparent' :
          'bg-gradient-to-br from-white/10 via-transparent to-transparent'
        }`}></div>

        {/* Content Layer */}
        <div className={`absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10 ${
          align === 'right' ? 'items-end text-right' : 'items-start text-left'
        }`}>
          {/* Tags */}
          <div className={`flex flex-wrap gap-2 mb-4 md:mb-6 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-ubuntu font-medium border backdrop-blur-sm ${getTagBorderColor()} text-white`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold text-white mb-3 md:mb-4 leading-tight ${
            align === 'right' ? 'max-w-xl ml-auto' : 'max-w-xl'
          }`}>
            {title}
          </h3>

          {/* Subtitle */}
          <p className={`text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed font-inter mb-6 md:mb-8 ${
            align === 'right' ? 'max-w-xl ml-auto' : 'max-w-xl'
          }`}>
            {subtitle}
          </p>

          {/* CTA Button - Slides in from bottom on hover */}
          <div className={`transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ${
            align === 'right' ? 'flex justify-end' : ''
          }`}>
            <div className={`inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full backdrop-blur-md border transition-all duration-300 ${
              color.includes('purple')
                ? 'bg-brand-purple/20 border-brand-purple/50 hover:bg-brand-purple/30'
                : color.includes('orange')
                ? 'bg-brand-purple/20 border-brand-purple/50 hover:bg-brand-purple/30'
                : 'bg-white/20 border-white/50 hover:bg-white/30'
            }`}>
              <span className={`font-ubuntu font-bold text-sm md:text-base ${getAccentColor()}`}>
                View Case Study
              </span>
              <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 ${getAccentColor()}`} />
            </div>
          </div>
        </div>

        {/* Corner Accent Indicator */}
        <div className={`absolute top-4 right-4 w-3 h-3 rounded-full animate-pulse z-30 ${
          color.includes('purple') ? 'bg-brand-purple' :
          color.includes('orange') ? 'bg-brand-purple' :
          'bg-white'
        }`}></div>

        {/* Video Indicator */}
        {videoSrc && (
          <div className="absolute top-4 left-4 z-30 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full">
            <span className="text-xs font-ubuntu font-medium text-white uppercase tracking-wider">
              Hover to Preview
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default FeaturedProject;
