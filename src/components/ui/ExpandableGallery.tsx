import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
}

interface ExpandableGalleryProps {
  images: GalleryImage[];
}

export default function ExpandableGallery({ images }: ExpandableGalleryProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            layoutId={`card-${index}`}
            onClick={() => setSelectedId(index)}
            className="cursor-pointer relative overflow-hidden rounded-2xl group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover shadow-lg"
            />
            {/* Hover Overlay Hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-opacity duration-300">
                View Full
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId !== null && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-[#020205] border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={24} />
              </button>
              
              <motion.img
                src={images[selectedId].src}
                alt={images[selectedId].alt}
                className="w-full h-full object-contain max-h-[90vh]"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
