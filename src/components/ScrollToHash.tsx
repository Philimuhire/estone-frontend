import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_RETRIES = 10;
const RETRY_INTERVAL_MS = 100;

/**
 * React Router does not scroll to `#section` targets on client-side navigation, so
 * `<Link to="/#work">` from another route would land at the top of the home page.
 * Sections whose content arrives from the API may not exist on the first frame,
 * hence the bounded retry.
 */
const ScrollToHash: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.slice(1);
    let attempts = 0;

    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        clearInterval(interval);
        return;
      }
      if (++attempts >= SCROLL_RETRIES) {
        clearInterval(interval);
      }
    };

    const interval = setInterval(scrollToTarget, RETRY_INTERVAL_MS);
    scrollToTarget();

    return () => clearInterval(interval);
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
