import { CollectionLogAPI } from '@/lib/api/collection-log/collection-log-api';
import { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const topCloggers = await CollectionLogAPI.getHiscores(1, 'ALL');
  return [
    {
      url: 'https://collectionlog.net',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://collectionlog.net/hiscores',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.5,
    },
    ...topCloggers.map(({ username }): {
        url: string;
        lastModified: Date;
        changeFrequency: 'daily';
        priority: number;
      } => ({
        url: `https://collectionlog.net/log/${username}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.3,
      })
    ),
  ];
};

export default sitemap;
