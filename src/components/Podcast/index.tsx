import type { ReactNode } from 'react';
import Title from '@/components/Title';
import AppleLogo from './Apple';
import SpotifyLogo from './Spotify';

interface PodcastProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function Podcast({ title, description, children }: PodcastProps) {
  return (
    <article className="my-0 mx-auto w-auto md:w-4/5 lg:mx-0 lg:w-2/3">
      <Title>{title}</Title>
      <p className="mb-6">{description}</p>
      {children}
      <footer className="mt-10 sm:flex">
        <a
          href="https://podcasts.apple.com/us/podcast/high-for-this/id1461883255"
          className="mb-3 sm:mb-0 sm:mr-3"
        >
          <AppleLogo className="h-12 w-auto" />
        </a>
        <a
          href="https://open.spotify.com/show/7FDueRQTovjtNdcqEzfGgV"
          className="mb-3 sm:mb-0 sm:mr-3"
        >
          <SpotifyLogo className="h-12 w-auto" />
        </a>
      </footer>
    </article>
  );
}
