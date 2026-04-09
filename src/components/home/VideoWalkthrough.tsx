import { motion } from 'framer-motion';
import { Play, Loader } from 'lucide-react';
import { springStagger, bentoCard, viewport } from '../../lib/motion';
import GradientText from '../ui/GradientText';

const videos = [
  {
    title: 'How Our Websites Work',
    subtitle: 'See the full build — from strategy call to launch',
    tag: 'Web Design',
    color: '#774CFC',
    coming: true,
  },
  {
    title: 'Inside a Real Automation System',
    subtitle: 'Live walkthrough of WhatsApp bot + CRM + dashboard',
    tag: 'Systems',
    color: '#F26A3D',
    coming: true,
  },
];

export default function VideoWalkthrough() {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-2">
          <span className="label">See It In Action</span>
        </div>
        <h2 className="h2 text-center mb-12">
          Watch how we <GradientText>build.</GradientText>
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={springStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {videos.map((video, i) => (
            <motion.div
              key={i}
              variants={bentoCard}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/15 transition-colors duration-300"
            >
              {/* Thumbnail placeholder */}
              <div className="relative aspect-video flex items-center justify-center bg-gradient-to-br from-white/[0.03] to-transparent">
                {/* Grid lines effect */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Glow behind play button */}
                <div
                  className="absolute w-32 h-32 rounded-full blur-2xl"
                  style={{ background: `${video.color}15` }}
                />

                {/* Play button */}
                <div
                  className="relative w-14 h-14 rounded-full border flex items-center justify-center backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
                  style={{
                    borderColor: `${video.color}40`,
                    backgroundColor: `${video.color}15`,
                  }}
                >
                  <Play size={18} style={{ color: video.color }} className="ml-0.5" />
                </div>

                {/* Coming soon badge */}
                {video.coming && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    <Loader size={10} className="text-white/30 animate-spin" />
                    <span className="text-white/30 text-[10px] font-mono uppercase tracking-widest">
                      Coming soon
                    </span>
                  </div>
                )}

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
                    style={{
                      color: video.color,
                      borderColor: `${video.color}40`,
                      backgroundColor: `${video.color}12`,
                    }}
                  >
                    {video.tag}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5">
                <h3 className="font-bebas text-xl text-white/80 mb-1">{video.title}</h3>
                <p className="text-white/40 text-sm">{video.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
