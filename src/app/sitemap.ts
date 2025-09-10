import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://zbukurohu.vercel.app';
  const routes = [
    '/',
    '/find',
    '/brands',
    '/sellers',
    '/categories',
    '/categories/eyes',
    '/categories/face',
    '/categories/haircare',
    '/categories/lips',
    '/categories/makeup',
    '/cart',
    '/checkout',
    '/account',
    '/auth/login',
    '/auth/register',
    '/auth/apply-business',
    '/auth/apply-distributor',
    '/dashboard',
    '/search',
    '/services',
    '/offers',
  ];
  return routes.map((url) => ({ 
    url: `${base}${url}`, 
    lastModified: new Date(),
    changeFrequency: url === '/' ? 'daily' : 'weekly',
    priority: url === '/' ? 1.0 : 0.8
  }));
}
