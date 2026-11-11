/**
 * Writes dist/sitemap.xml after the production build, listing the public pages plus
 * one entry per project fetched from the API. Projects added later appear after the
 * next deploy. If the API can't be reached the sitemap still lists the fixed pages,
 * so a sleeping backend never fails the build.
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://estone.rw';
const API_BASE_URL = process.env.API_BASE_URL || 'https://estone-web-backend.onrender.com/api';
const FETCH_TIMEOUT_MS = 60000; // the free Render backend can take a while to wake up

const staticPages = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/projects', changefreq: 'weekly', priority: '0.8' },
];

const escapeXml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = await response.json();
    return Array.isArray(body.data) ? body.data : [];
  } catch (error) {
    console.warn(`[sitemap] Could not load projects (${error.message}); listing fixed pages only.`);
    return [];
  }
};

const main = async () => {
  const projects = await fetchProjects();

  const entries = [
    ...staticPages.map((page) => ({ ...page, lastmod: undefined })),
    ...projects
      .filter((p) => p.id)
      .map((p) => ({
        loc: `/project/${p.id}`,
        changefreq: 'monthly',
        priority: '0.7',
        lastmod: p.updatedAt ? new Date(p.updatedAt).toISOString().slice(0, 10) : undefined,
      })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((e) =>
      [
        '  <url>',
        `    <loc>${escapeXml(SITE_URL + e.loc)}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        `    <changefreq>${e.changefreq}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    ),
    '</urlset>',
    '',
  ].join('\n');

  const outDir = path.resolve(__dirname, '..', 'dist');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml);
  console.log(`[sitemap] Wrote ${entries.length} URLs (${projects.length} projects).`);
};

main();
