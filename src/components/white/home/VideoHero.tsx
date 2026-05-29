import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';

// Placeholder Cloudinary URLs — swap in the real walkthrough after upload.
const HERO_VIDEO =
  'https://res.cloudinary.com/dnlgohkcc/video/upload/v0/streamline-site/showreel/blom-walkthrough.mp4';
const HERO_POSTER =
  'https://res.cloudinary.com/dnlgohkcc/image/upload/v0/streamline-site/showreel/blom-walkthrough-poster.jpg';

interface Props {
  /** Override the default Cloudinary video source. */
  videoSrc?: string;
  /** Override the default poster fallback. */
  posterSrc?: string;
}

export default function VideoHero({
  videoSrc = HERO_VIDEO,
  posterSrc = HERO_POSTER,
}: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      className="relative w-full min-h-[100svh] overflow-hidden bg-black"
      aria-label="Showreel"
    >
      {/* Video layer (z-0) — static poster only when reduced motion is on */}
      {reduced ? (
        <img
          src={posterSrc}
          alt="Streamline Automations client work walkthrough"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
      ) : (
        <video
          className="absolute inset-0 z-0 w-full h-full object-cover"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}

      {/* Subtle darken overlay (z-10) — keeps the video clear but readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.35))',
        }}
      />

      {/* Bottom fade into the white page below (z-20) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #FFFFFF, transparent)',
        }}
      />
    </section>
  );
}
