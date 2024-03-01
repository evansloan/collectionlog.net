import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '',
    },
    sitemap: 'https://collectionlog.net/sitemap.xml',
  };
};

export default robots;
