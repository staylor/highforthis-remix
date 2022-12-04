import cn from 'classnames';
import type { PropsWithChildren } from 'react';

import {
  YOUTUBE_USERNAME,
  INSTAGRAM_USERNAME,
  TWITTER_USERNAME,
  TIKTOK_USERNAME,
} from '@/constants';
import type { SocialSettings } from '@/types/graphql';

type IconProps = PropsWithChildren<{
  url: string;
  className: string;
}>;

const SocialIcon = ({ url, className, children }: IconProps) => (
  <a
    className={cn(
      'font-icons inline-block text-center leading-none',
      'xs:w-10 w-8 text-xl md:text-2xl',
      className
    )}
    href={url}
  >
    <span className="sr-only">{children}</span>
  </a>
);

export default function SocialIcons({ socialSettings }: { socialSettings: SocialSettings }) {
  const { youtubeUsername, instagramUsername, twitterUsername, tiktokUsername } =
    socialSettings || {};
  const youtube = youtubeUsername || YOUTUBE_USERNAME;
  const insta = instagramUsername || INSTAGRAM_USERNAME;
  const twitter = twitterUsername || TWITTER_USERNAME;
  const tiktok = tiktokUsername || TIKTOK_USERNAME;

  return (
    <>
      <SocialIcon className="icons-youtube" url={`https://youtube.com/${youtube}`}>
        YouTube
      </SocialIcon>
      <SocialIcon className="icons-instagram" url={`https://instagram.com/${insta}`}>
        Instagram
      </SocialIcon>
      <SocialIcon className="icons-twitter" url={`https://twitter.com/${twitter}`}>
        Twitter
      </SocialIcon>
      <SocialIcon className="icons-tiktok" url={`https://www.tiktok.com/${tiktok}`}>
        TikTok
      </SocialIcon>
    </>
  );
}
