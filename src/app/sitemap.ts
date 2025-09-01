import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://localhost:3000';
  const routes = [
    '/',
    '/find',
    '/brands',
    '/sellers',
    '/categories',
    '/cart',
    '/checkout',
    '/account',
  ];
  return routes.map((url) => ({ url: `${base}${url}`, lastModified: new Date() }));
}
