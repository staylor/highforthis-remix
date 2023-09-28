import cn from 'classnames';
import type { ContentBlock } from 'draft-js';

import { headingBase, heading2, heading3, heading4 } from '@/components/Heading';
import { paragraphBase } from '@/components/Paragraph';
import { orderedListBase, unorderedListBase } from '@/components/List';
import { blockquoteBase } from '@/components/Blockquote';

import Media from './Media';

export function blockRenderer(block: ContentBlock) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

export function blockStyle(block: ContentBlock) {
  switch (block.getType()) {
    case 'blockquote':
      return blockquoteBase;
    case 'unstyled':
      return paragraphBase;
    case 'header-two':
      return cn(headingBase, heading2);
    case 'header-three':
      return cn(headingBase, heading3);
    case 'header-four':
      return cn(headingBase, heading4);
    case 'ordered-list-item':
      return orderedListBase;
    case 'unordered-list-item':
      return unorderedListBase;
    default:
      return null;
  }
}
