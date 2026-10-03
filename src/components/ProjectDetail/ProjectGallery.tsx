import React, { useCallback, useEffect, useState } from 'react';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

/** Thumbnail grid of a project's extra photos; clicking one opens it full screen. */
const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, title }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrevious = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
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

  if (images.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-heading font-bold text-secondary-900 mb-4">Project Gallery</h3>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={`Open photo ${index + 1} of ${images.length}`}
          >
            <img
              src={src}
              alt={`${title} - photo ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo ${openIndex + 1} of ${images.length}`}
        >
          <img
            src={images[openIndex]}
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

          {images.length > 1 && (
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
                {openIndex + 1} / {images.length}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
