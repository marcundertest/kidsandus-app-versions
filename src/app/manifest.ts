import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kids&Us Apps Versions',
    short_name: 'Kids&Us Apps',
    description: 'Dashboard for monitoring Kids&Us mobile and desktop apps versions across stores.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/assets/favicon-dark.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
