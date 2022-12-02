import type { SyntheticEvent } from 'react';
import cn from 'classnames';
import { gql } from '@apollo/client';
import Link from '@/components/Link';
import TextTitle from '@/components/TextTitle';

const VideoLink = ({ className, children, ...props }: any) => (
  <Link {...props} className={cn('mb-6 block max-w-full', className)}>
    {children}
  </Link>
);

type Thumbnail = {
  width: number;
  height: number;
  url: string;
  className?: string;
};

type Props = {
  video: {
    dataId: string;
    title: string;
    slug: string;
    thumbnails: Array<Thumbnail>;
  };
  single?: boolean;
  embed?: boolean;
};

const maxWidth = 640;

const findThumb = (thumbs: Thumbnail[]) => {
  const sizes = [640, 480, 320];
  let thumb;

  for (let i = 0; i < sizes.length; i += 1) {
    const size = sizes[i];
    thumb = thumbs.find((t) => t.width === size);
    if (thumb) {
      break;
    }
  }
  return thumb;
};

function Video({ video, single = false, embed = false }: Props) {
  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();

    const iframe = document.createElement('iframe');
    //iframe.type = 'text/html';
    iframe.className = 'w-full aspect-video';
    //iframe.border = '0';
    iframe.src = `https://www.youtube.com/embed/${video.dataId}?autoplay=1`;

    e.currentTarget.innerHTML = iframe.outerHTML;
  };

  const thumb = findThumb(video.thumbnails);

  const placeholder = (
    <figure
      className={cn(
        'relative inline-block max-w-full overflow-hidden',
        'before:bg-pink before:absolute before:z-20 before:rounded-xl hover:before:bg-black',
        'before:w-19 before:h-13 before:-ml-12.5 before:left-1/2 before:top-1/2 before:-mt-5',
        'after:border-y-[10px] after:border-l-[20px] after:border-y-transparent after:border-l-white',
        'after:absolute after:left-1/2 after:top-1/2 after:z-30 after:-mt-1 after:-ml-5 after:h-0 after:w-0'
      )}
    >
      {thumb && (
        <img
          src={thumb.url}
          alt={video.title}
          className={cn('w-160 relative z-10 my-[-9.375%]', thumb.className)}
        />
      )}
      <figcaption className="hidden">{video.title}</figcaption>
    </figure>
  );

  if (embed) {
    return (
      <>
        <VideoLink
          to={`/video/${video.slug}`}
          onClick={onClick}
          width={thumb ? thumb.width : maxWidth}
          className="m-0"
        >
          {placeholder}
        </VideoLink>
        <h3 className="font-stylized mb-6 text-base tracking-wide">
          {single ? video.title : <Link to={`/video/${video.slug}`}>{video.title}</Link>}
        </h3>
      </>
    );
  }

  return (
    <article className="max-w-screen-sm">
      {single ? (
        <TextTitle>{video.title}</TextTitle>
      ) : (
        <h1 className="font-text xs:text-xl mb-2.5 text-base font-semibold">
          <Link to={`/video/${video.slug}`}>{video.title}</Link>
        </h1>
      )}

      <VideoLink to={`/video/${video.slug}`} onClick={onClick}>
        {placeholder}
      </VideoLink>
    </article>
  );
}

Video.fragments = {
  video: gql`
    fragment Video_video on Video {
      dataId
      title
      slug
      thumbnails {
        width
        height
        url
      }
    }
  `,
};

export default Video;
