import { motion } from 'framer-motion';
import VideoCard from '../ui/VideoCard';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BLOM_WALKTHROUGH_VIDEO =
  'https://res.cloudinary.com/dy1gw7dr2/video/upload/q_auto/f_auto/v1778654284/Blom-Cosmetics_1_t38yyk.mp4';
const BLOM_WALKTHROUGH_POSTER =
  'https://res.cloudinary.com/dy1gw7dr2/video/upload/q_auto,f_jpg,so_0/v1778654284/Blom-Cosmetics_1_t38yyk.jpg';
const AMELI_WALKTHROUGH_VIDEO =
  'https://res.cloudinary.com/dy1gw7dr2/video/upload/q_auto/f_auto/v1778654284/Ameli-Walkthrough_1_idpjwy.mp4';
const AMELI_WALKTHROUGH_POSTER =
  'https://res.cloudinary.com/dy1gw7dr2/video/upload/q_auto,f_jpg,so_0/v1778654284/Ameli-Walkthrough_1_idpjwy.jpg';

/**
 * FeaturedWork — two silent looping walkthroughs (BLOM + Ameli) that
 * auto-play when each card enters the viewport and pause when it
 * leaves. Reduced-motion users see the poster image instead. Lives on
 * white background — sits between StatsStrip and RentalCallout on the
 * homepage.
 */
export default function FeaturedWork() {
  return (
    <section className="relative bg-white py-24 md:py-32" aria-label="Featured walkthroughs">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="block text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
            See it move
          </span>
          <h2 className="text-[32px] sm:text-[42px] md:text-[52px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.03em] leading-[1.06] max-w-[22ch] mx-auto">
            Not screenshots.{' '}
            <span className="font-['Instrument_Serif'] italic font-normal">
              Live walkthroughs.
            </span>
          </h2>
          <p className="mt-5 text-[15.5px] md:text-[16.5px] font-['DM_Sans'] text-[#3D3D47] leading-[1.55] max-w-[52ch] mx-auto">
            Two short tours of real client builds — recorded straight off the live sites.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
          <VideoCard
            videoSrc={BLOM_WALKTHROUGH_VIDEO}
            posterSrc={BLOM_WALKTHROUGH_POSTER}
            label="Walkthrough"
            headline="BLOM Cosmetics — the full stack."
            body="Store, admin, course platform, automations. One unified system."
            linkHref="/portfolio#blom"
          />
          <VideoCard
            videoSrc={AMELI_WALKTHROUGH_VIDEO}
            posterSrc={AMELI_WALKTHROUGH_POSTER}
            label="Walkthrough"
            headline="Ameli Designs — 4 days from brief to live."
            body="Clean portfolio, automated lead capture, ready to convert."
            linkHref="/portfolio#ameli"
          />
        </div>
      </div>
    </section>
  );
}
