import { motion } from 'framer-motion';

const nodes = [
  { id: 1, top: '12%', left: '8%',  size: 6, duration: 3.2, delay: 0 },
  { id: 2, top: '28%', left: '22%', size: 4, duration: 4.1, delay: 0.5 },
  { id: 3, top: '55%', left: '5%',  size: 8, duration: 3.8, delay: 1.1 },
  { id: 4, top: '72%', left: '18%', size: 4, duration: 5.0, delay: 0.3 },
  { id: 5, top: '15%', left: '80%', size: 6, duration: 4.4, delay: 0.8 },
  { id: 6, top: '40%', left: '90%', size: 4, duration: 3.5, delay: 1.4 },
  { id: 7, top: '65%', left: '75%', size: 8, duration: 4.8, delay: 0.2 },
  { id: 8, top: '85%', left: '88%', size: 4, duration: 3.1, delay: 1.7 },
];

// Lines connect node pairs by their top/left percentages (SVG viewBox 0 0 100 100)
const lines = [
  { x1: 8,  y1: 12, x2: 22, y2: 28 },
  { x1: 22, y1: 28, x2: 5,  y2: 55 },
  { x1: 5,  y1: 55, x2: 18, y2: 72 },
  { x1: 80, y1: 15, x2: 90, y2: 40 },
  { x1: 90, y1: 40, x2: 75, y2: 65 },
  { x1: 75, y1: 65, x2: 88, y2: 85 },
];

const nodeColors = ['#774CFC', '#774CFC', '#F26A3D', '#774CFC', '#F26A3D', '#774CFC', '#F26A3D', '#774CFC'];

export default function HeroParticleField() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* SVG connection lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1}
            x2={l.x2} y2={l.y2}
            stroke="rgba(119,76,252,0.12)"
            strokeWidth="0.15"
          />
        ))}
      </svg>

      {/* Floating nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full"
          style={{
            top: node.top,
            left: node.left,
            width: node.size,
            height: node.size,
            backgroundColor: nodeColors[i],
            opacity: 0.5,
            boxShadow: `0 0 ${node.size * 2}px ${nodeColors[i]}66`,
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: node.duration,
            delay: node.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
