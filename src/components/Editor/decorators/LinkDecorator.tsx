import type { ContentBlock, ContentState } from 'draft-js';
import type { PropsWithChildren } from 'react';

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

type LinkProps = PropsWithChildren<{
  contentState: ContentState;
  entityKey: string;
}>;

const Link = ({ contentState, entityKey, children }: LinkProps) => {
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
