import React, { useCallback, useEffect, useState } from 'react';

interface ProjectMediaProps {
  image: string;
  gallery: string[];
  title: string;
  /** Shown in the right half when the project has no gallery photos. */
  fallback?: React.ReactNode;
}

// Tailwind needs complete class names, so each gallery size has its own layout.
// On phones the gallery is a row of thumbnails under the main photo; from lg up it
// fills the right half at the same height as the main photo.
const galleryLayouts: Record<number, { grid: string; tile: (index: number) => string }> = {
  1: {
    grid: 'grid-cols-1',
    tile: () => 'aspect-[4/3] lg:aspect-auto',
  },
  2: {
    grid: 'grid-cols-2 lg:grid-cols-1 lg:grid-rows-2',
    tile: () => 'aspect-[4/3] lg:aspect-auto',
  },
  3: {
    grid: 'grid-cols-3 lg:grid-cols-2 lg:grid-rows-2',
    tile: (index) => (index === 0 ? 'aspect-square lg:aspect-auto lg:col-span-2' : 'aspect-square lg:aspect-auto'),
  },
};

/**
 * Main project photo on the left half with the gallery photos on the right. Every
 * photo opens in a full-screen viewer that steps through all of them.
 */
const ProjectMedia: React.FC<ProjectMediaProps> = ({ image, gallery, title, fallback }) => {
  const photos = [image, ...gallery];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrevious = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (openIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPrevious();
      if (e.key === 'ArrowRight') showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [openIndex, close, showPrevious, showNext]);

  const tileClass =
    'group relative overflow-hidden rounded-2xl bg-secondary-100 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';
  const imageClass = 'absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105';

  const layout = galleryLayouts[Math.min(gallery.length, 3)];

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-3 lg:gap-4">
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className={`${tileClass} aspect-[4/3]`}
          aria-label={`Open photo 1 of ${photos.length}`}
        >
          <img src={image} alt={title} className={imageClass} />
        </button>

        {layout ? (
          <div className={`grid gap-3 lg:gap-4 ${layout.grid}`}>
            {gallery.slice(0, 3).map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setOpenIndex(index + 1)}
                className={`${tileClass} ${layout.tile(index)}`}
                aria-label={`Open photo ${index + 2} of ${photos.length}`}
              >
                <img src={src} alt={`${title} - photo ${index + 2}`} className={imageClass} />
              </button>
            ))}
          </div>
        ) : (
          fallback
        )}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo ${openIndex + 1} of ${photos.length}`}
        >
          <img
            src={photos[openIndex]}
            alt={`${title} - photo ${openIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 px-4 py-2 text-white/90 hover:text-white text-sm font-medium bg-white/10 hover:bg-white/20 rounded-lg"
          >
            Close
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 text-3xl leading-none text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 text-3xl leading-none text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full"
                aria-label="Next photo"
              >
                ›
              </button>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80">
                {openIndex + 1} / {photos.length}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectMedia;
