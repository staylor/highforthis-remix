import type { ContentBlock, ContentState } from 'draft-js';
import type { ReactNode } from 'react';

function findLinkEntities(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    if (!entityKey) {
      return false;
    }
    return contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

type Props = {
  contentState: ContentState;
  entityKey: string;
  children: ReactNode;
};

const Link = ({ contentState, entityKey, children }: Props) => {
  const { href } = contentState.getEntity(entityKey).getData();
  return (
    <a href={href} className="text-pink underline">
      {children}
    </a>
  );
};

export default {
  strategy: findLinkEntities,
  component: Link,
};
