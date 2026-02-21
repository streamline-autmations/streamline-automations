import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';

export type FolderAccent = 'purple' | 'orange' | 'neutral';

export interface FolderProject {
  id: string;
  image: string;
  title: string;
  href?: string;
}

const cn = (...inputs: Array<string | false | null | undefined>) => inputs.filter(Boolean).join(' ');

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200';

const accentRingClass = (accent: FolderAccent) => {
  switch (accent) {
    case 'purple':
      return 'group-hover/card:ring-brand-purple group-hover/card:shadow-brand-purple/30';
    case 'orange':
      return 'group-hover/card:ring-brand-orange group-hover/card:shadow-brand-orange/30';
    default:
      return 'group-hover/card:ring-white/20 group-hover/card:shadow-white/10';
  }
};

const accentGlowClass = (accent: FolderAccent) => {
  switch (accent) {
    case 'purple':
      return 'hover:shadow-brand-purple/20 hover:border-brand-purple/30';
    case 'orange':
      return 'hover:shadow-brand-orange/20 hover:border-brand-orange/30';
    default:
      return 'hover:shadow-white/10 hover:border-white/20';
  }
};

interface ProjectCardProps {
  image: string;
  title: string;
  delay: number;
  isVisible: boolean;
  index: number;
  totalCount: number;
  accent: FolderAccent;
  onClick: () => void;
  isSelected: boolean;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ image, title, delay, isVisible, index, totalCount, accent, onClick, isSelected }, ref) => {
    const middleIndex = (totalCount - 1) / 2;
    const factor = totalCount > 1 ? (index - middleIndex) / middleIndex : 0;
    const rotation = factor * 25;
    const translationX = factor * 85;
    const translationY = Math.abs(factor) * 12;

    return (
      <div
        ref={ref}
        className={cn('absolute w-20 h-28 cursor-pointer group/card', isSelected && 'opacity-0')}
        style={{
          transform: isVisible
            ? `translateY(calc(-100px + ${translationY}px)) translateX(${translationX}px) rotate(${rotation}deg) scale(1)`
            : 'translateY(0px) translateX(0px) rotate(0deg) scale(0.4)',
          opacity: isSelected ? 0 : isVisible ? 1 : 0,
          transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          zIndex: 10 + index,
          left: '-40px',
          top: '-56px',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <div
          className={cn(
            'w-full h-full rounded-lg overflow-hidden shadow-xl bg-[#0F0F0F] border border-white/10 relative',
            'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            'group-hover/card:-translate-y-6 group-hover/card:shadow-2xl group-hover/card:ring-2 group-hover/card:scale-125',
            accentRingClass(accent)
          )}
        >
          <img
            src={image || PLACEHOLDER_IMAGE}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-black uppercase tracking-tighter text-white truncate drop-shadow-md">
            {title}
          </p>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = 'ProjectCard';

interface ImageLightboxProps {
  projects: FolderProject[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  accent: FolderAccent;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  projects,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  accent,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const totalProjects = projects.length;
  const hasNext = currentIndex < totalProjects - 1;
  const hasPrev = currentIndex > 0;
  const currentProject = projects[currentIndex];

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 220);
  }, [onClose]);

  const navigateNext = useCallback(() => {
    if (!hasNext) return;
    onNavigate(currentIndex + 1);
  }, [currentIndex, hasNext, onNavigate]);

  const navigatePrev = useCallback(() => {
    if (!hasPrev) return;
    onNavigate(currentIndex - 1);
  }, [currentIndex, hasPrev, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') navigateNext();
      if (e.key === 'ArrowLeft') navigatePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleClose, isOpen, navigateNext, navigatePrev]);

  if (!isOpen || !currentProject) return null;

  const accentBg =
    accent === 'purple'
      ? 'bg-brand-purple'
      : accent === 'orange'
        ? 'bg-brand-orange'
        : 'bg-white/70';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={handleClose}
      style={{
        opacity: isClosing ? 0 : 1,
        transition: 'opacity 220ms ease',
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-white hover:bg-white/10 transition-all duration-300"
      >
        <X className="w-5 h-5" strokeWidth={2.5} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigatePrev();
        }}
        disabled={!hasPrev}
        className="absolute left-4 md:left-10 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none shadow-2xl"
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={3} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigateNext();
        }}
        disabled={!hasNext}
        className="absolute right-4 md:right-10 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none shadow-2xl"
      >
        <ChevronRight className="w-6 h-6" strokeWidth={3} />
      </button>

      <div
        className="relative z-10 w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 bg-[#0F0F0F] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isClosing ? 'scale(0.98)' : 'scale(1)',
          transition: 'transform 220ms ease',
        }}
      >
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={currentProject.image || PLACEHOLDER_IMAGE}
            alt={currentProject.title}
            className="w-full h-full object-cover select-none"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/45 pointer-events-none" />
        </div>

        <div className="px-6 md:px-8 py-6 border-t border-white/10">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-white tracking-tight truncate">{currentProject.title}</h3>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full border border-white/10">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => onNavigate(idx)}
                      className={cn(
                        'w-1.5 h-1.5 rounded-full transition-all duration-300',
                        idx === currentIndex ? accentBg : 'bg-white/20 hover:bg-white/40'
                      )}
                      aria-label={`Go to item ${idx + 1}`}
                    />
                  ))}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/45">
                  {currentIndex + 1} / {totalProjects}
                </p>
              </div>
            </div>

            {currentProject.href ? (
              <a
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-white/90 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>View</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export interface AnimatedFolderProps {
  title: string;
  subtitle?: string;
  projects: FolderProject[];
  className?: string;
  gradient?: string;
  accent?: FolderAccent;
  onClick?: () => void;
}

export const AnimatedFolder: React.FC<AnimatedFolderProps> = ({
  title,
  subtitle,
  projects,
  className,
  gradient,
  accent = 'neutral',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hiddenCardId, setHiddenCardId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const previewProjects = useMemo(() => projects.slice(0, 5), [projects]);

  const handleProjectClick = (project: FolderProject, index: number) => {
    cardRefs.current[index]?.getBoundingClientRect();
    setSelectedIndex(index);
    setHiddenCardId(project.id);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
    setHiddenCardId(null);
  };

  const handleNavigate = (newIndex: number) => {
    setSelectedIndex(newIndex);
    setHiddenCardId(projects[newIndex]?.id || null);
  };

  const cardBack = gradient || 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))';
  const cardFront = gradient || 'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))';

  return (
    <>
      <button
        type="button"
        data-cursor="pointer"
        className={cn(
          'relative w-full flex flex-col items-center justify-center p-8 rounded-3xl',
          'bg-[#0B0B0B]/70 backdrop-blur-glass border border-white/10',
          'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'hover:shadow-2xl',
          accentGlowClass(accent),
          className
        )}
        style={{
          minHeight: '340px',
          perspective: '1200px',
          transform: isHovered ? 'scale(1.04) rotate(-1.2deg)' : 'scale(1) rotate(0deg)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div
          className="absolute inset-0 rounded-3xl transition-opacity duration-700"
          style={{
            background: gradient
              ? `radial-gradient(circle at 50% 70%, rgba(255,255,255,0.18) 0%, transparent 70%)`
              : 'radial-gradient(circle at 50% 70%, rgba(255,255,255,0.12) 0%, transparent 70%)',
            opacity: isHovered ? 1 : 0,
          }}
        />

        <div className="relative flex items-center justify-center mb-5" style={{ height: '170px', width: '220px' }}>
          <div
            className="absolute w-36 h-24 rounded-xl shadow-md border border-white/10"
            style={{
              background: cardBack,
              transformOrigin: 'bottom center',
              transform: isHovered ? 'rotateX(-20deg) scaleY(1.06)' : 'rotateX(0deg) scaleY(1)',
              transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 10,
            }}
          />
          <div
            className="absolute w-14 h-4 rounded-t-lg border-t border-x border-white/10"
            style={{
              background: cardBack,
              top: 'calc(50% - 50px - 14px)',
              left: 'calc(50% - 72px + 18px)',
              transformOrigin: 'bottom center',
              transform: isHovered ? 'rotateX(-30deg) translateY(-3px)' : 'rotateX(0deg) translateY(0)',
              transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 10,
            }}
          />
          <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}>
            {previewProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                image={project.image}
                title={project.title}
                delay={index * 50}
                isVisible={isHovered}
                index={index}
                totalCount={previewProjects.length}
                accent={accent}
                onClick={() => handleProjectClick(project, index)}
                isSelected={hiddenCardId === project.id}
              />
            ))}
          </div>
          <div
            className="absolute w-36 h-24 rounded-xl shadow-lg border border-white/15"
            style={{
              background: cardFront,
              top: 'calc(50% - 48px + 6px)',
              transformOrigin: 'bottom center',
              transform: isHovered ? 'rotateX(35deg) translateY(12px)' : 'rotateX(0deg) translateY(0)',
              transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 30,
            }}
          />
          <div
            className="absolute w-36 h-24 rounded-xl overflow-hidden pointer-events-none"
            style={{
              top: 'calc(50% - 48px + 6px)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.26) 0%, transparent 60%)',
              transformOrigin: 'bottom center',
              transform: isHovered ? 'rotateX(35deg) translateY(12px)' : 'rotateX(0deg) translateY(0)',
              transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 31,
            }}
          />
        </div>

        <div className="text-center">
          <h3
            className="text-lg font-bold text-white mt-4 transition-all duration-500"
            style={{
              transform: isHovered ? 'translateY(2px)' : 'translateY(0)',
              letterSpacing: isHovered ? '-0.01em' : '0',
            }}
          >
            {title}
          </h3>
          <p className="text-sm font-medium text-white/55 transition-all duration-500" style={{ opacity: isHovered ? 0.85 : 1 }}>
            {subtitle ?? `${projects.length} ${projects.length === 1 ? 'item' : 'items'}`}
          </p>
        </div>

        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/35 transition-all duration-500"
          style={{
            opacity: isHovered ? 0 : 1,
            transform: isHovered ? 'translate(-50%, 10px)' : 'translate(-50%, 0)',
          }}
        >
          <span>Hover</span>
        </div>
      </button>

      <ImageLightbox
        projects={projects}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigate}
        accent={accent}
      />
    </>
  );
};
