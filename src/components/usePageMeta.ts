import { useEffect } from 'react';

export const SITE_URL = 'https://estone.rw';
const SITE_NAME = 'ESTONE Design & Construction';
const DEFAULT_TITLE = 'ESTONE Design & Construction | ESTONE Ltd';
const DEFAULT_DESCRIPTION =
  'ESTONE Design & Construction Ltd is a Kigali, Rwanda based firm offering building design, construction, structural analysis, GIS, interior design and landscape architecture.';
const DEFAULT_IMAGE = `${SITE_URL}/images/project-commercial-building-2.jpg`;

interface PageMeta {
  /** Page-specific part of the title; the site name is appended. Omit for the home page. */
  title?: string;
  description?: string;
  /** Path of the page's own URL, e.g. '/projects'. Query strings are left out on purpose. */
  path: string;
  image?: string;
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
};

const toAbsolute = (url: string) => (/^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`);

/**
 * Sets the title, description, canonical URL and link-preview tags for the current page,
 * so each page appears in search results and shared links under its own name.
 */
export const usePageMeta = ({ title, description, path, image }: PageMeta) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    const desc = description?.trim() ? description.trim().replace(/\s+/g, ' ').slice(0, 160) : DEFAULT_DESCRIPTION;
    const url = `${SITE_URL}${path}`;
    const img = image ? toAbsolute(image) : DEFAULT_IMAGE;

    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, image]);
};
