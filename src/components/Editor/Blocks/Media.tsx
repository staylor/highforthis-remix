import React from 'react';
import type { ContentBlock, ContentState } from 'draft-js';

import Video from '@/components/Videos/Video';

import Image from './Image';

interface MediaProps {
  contentState: ContentState;
  block: ContentBlock;
}

function Media({ contentState, block }: MediaProps) {
  const entityKey = block.getEntityAt(0);
  if (!entityKey) {
    return null;
  }
  const entity = contentState.getEntity(entityKey);
  const type = entity.getType();

  if (type === 'EMBED') {
    const { html } = entity.getData();
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }

  if (type === 'IMAGE') {
    const { image, size } = entity.getData();
    return React.createElement(Image, { image, size });
  }

  if (type === 'VIDEO') {
    const { video } = entity.getData();
    return <Video video={video} embed />;
  }

  return null;
}

export default Media;
