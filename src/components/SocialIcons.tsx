/* eslint-disable react/prop-types */
import cn from 'classnames';
import type { ReactNode } from 'react';

interface IconProps {
  url: string;
  className: string;
  children: ReactNode;
}

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

export default function SocialIcons({ socialSettings }: any) {
  return (
    <>
      {socialSettings.youtubeUsername && (
        <SocialIcon
          className="icons-youtube"
          url={`https://youtube.com/${socialSettings.youtubeUsername}`}
        >
          YouTube
        </SocialIcon>
      )}
      {socialSettings.instagramUsername && (
        <SocialIcon
          className="icons-instagram"
          url={`https://instagram.com/${socialSettings.instagramUsername}`}
        >
          Instagram
        </SocialIcon>
      )}
      {socialSettings.twitterUsername && (
        <SocialIcon
          className="icons-twitter"
          url={`https://twitter.com/${socialSettings.twitterUsername}`}
        >
          Twitter
        </SocialIcon>
      )}
      {socialSettings.facebookUrl && (
        <SocialIcon className="icons-facebook" url={socialSettings.facebookUrl}>
          Facebook
        </SocialIcon>
      )}
    </>
  );
}
