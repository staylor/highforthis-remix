import type { ReactNode } from 'react';
import { Fragment } from 'react';
import cn from 'classnames';

import Video from '@/components/Videos/Video';
import { TwitterRedraftDecorator } from '@/components/Editor/decorators/TwitterDecorator';
import { Heading2, Heading3, Heading4 } from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import { OrderedList, UnorderedList } from '@/components/List';
import Blockquote from '@/components/Blockquote';
import { uploadUrl } from '@/utils/media';

import PostTitle from './PostTitle';

interface Meta {
  [key: string]: any;
}

// just a helper to add a <br /> after a block
const addBreaklines = (children: ReactNode[]) => children.map((child) => [child, <br key="br" />]);

export default {
  /**
   * These callbacks will be called recursively to render a nested structure
   */
  inline: {
    // The key passed here is just an index based on rendering order inside a block
    BOLD: (children: ReactNode[], { key }: Meta) => <strong key={key}>{children}</strong>,
    ITALIC: (children: ReactNode[], { key }: Meta) => <em key={key}>{children}</em>,
    UNDERLINE: (children: ReactNode[], { key }: Meta) => <u key={key}>{children}</u>,
    CODE: (children: ReactNode[], { key }: Meta) => <code key={key}>{children}</code>,
  },
  /**
   * Blocks receive children and depth
   * Note that children are an array of blocks with same styling,
   */
  blocks: {
    unstyled: (children: ReactNode[], { keys }: Meta) =>
      children.map((child: any, i) => {
        if (child[1] && child[1].props && child[1].props.video) {
          return <Fragment key={keys[i]}>{child}</Fragment>;
        }
        return <Paragraph key={keys[i]}>{child}</Paragraph>;
      }),
    blockquote: (children: ReactNode[], { keys }: Meta) => (
      <Blockquote key={keys.join('|')}>{addBreaklines(children)}</Blockquote>
    ),
    'header-one': (children: ReactNode[], { keys }: Meta) =>
      children.map((child, i) => <PostTitle key={keys[i]}>{child}</PostTitle>),
    'header-two': (children: ReactNode[], { keys }: Meta) =>
      children.map((child, i) => <Heading2 key={keys[i]}>{child}</Heading2>),
    'header-three': (children: ReactNode[], { keys }: Meta) =>
      children.map((child, i) => <Heading3 key={keys[i]}>{child}</Heading3>),
    'header-four': (children: ReactNode[], { keys }: Meta) =>
      children.map((child, i) => <Heading4 key={keys[i]}>{child}</Heading4>),
    // You can also access the original keys of the blocks
    'code-block': (children: ReactNode[], { keys }: Meta) => (
      <pre key={keys[0]}>{addBreaklines(children)}</pre>
    ),
    // or depth for nested lists
    'unordered-list-item': (children: ReactNode[], { depth, keys }: Meta) => (
      <UnorderedList key={keys[keys.length - 1]} className={cn(`ul-level-${depth}`)}>
        {children.map((child, index) => (
          <li key={keys[index]}>{child}</li>
        ))}
      </UnorderedList>
    ),
    'ordered-list-item': (children: ReactNode[], { depth, keys }: Meta) => (
      <OrderedList key={keys.join('|')} className={cn(`ol-level-${depth}`)}>
        {children.map((child, index) => (
          <li key={keys[index]}>{child}</li>
        ))}
      </OrderedList>
    ),

    // If your blocks use meta data it can also be accessed like keys
    // atomic: (children, { keys, data }) => children.map((child, i) => <Atomic key={keys[i] {...data[i]} />),
    // atomic: (children, data) =>
    //   children.map((child, i) => {
    //     console.log(data);
    //   }),
  },
  entities: {
    // key is the entity key value from raw
    LINK: (children: ReactNode[], data: Meta, { key }: Meta) => (
      <a key={key} href={data.href} className="text-pink">
        {children}
      </a>
    ),
    EMBED: (_: Meta, data: Meta, { key }: Meta) => (
      <div className="my-5" key={key} dangerouslySetInnerHTML={{ __html: data.html }} />
    ),
    IMAGE: (_: Meta, data: Meta, { key }: Meta) => {
      const { image } = data;
      let crop = image.crops.find((c: Meta) => c.width === 640);
      if (!crop) {
        [crop] = image.crops;
      }
      return (
        <img
          className="my-2.5"
          alt=""
          key={key}
          src={uploadUrl(image.destination, crop.fileName)}
        />
      );
    },
    VIDEO: (_: Meta, data: Meta, { key }: Meta) => {
      const { video } = data;
      return <Video key={key} video={video} embed />;
    },
  },
  decorators: [TwitterRedraftDecorator],
};
