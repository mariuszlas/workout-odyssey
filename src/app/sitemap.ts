import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://workoutodyssey.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://workoutodyssey.com/login',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://workoutodyssey.com/signup',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
    ];
}
