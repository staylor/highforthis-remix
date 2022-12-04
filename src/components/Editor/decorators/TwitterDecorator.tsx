import type { ContentBlock } from 'draft-js';
import type { PropsWithChildren } from 'react';

import { findWithRegex } from '../utils';

const HANDLE_REGEX = /@[\w]+/g;

function handleStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

type RedraftHandleProps = PropsWithChildren<{
  decoratedText: string;
}>;

const RedraftHandle = ({ children, decoratedText }: RedraftHandleProps) => (
  <a
    key={decoratedText}
    target="_blank"
    rel="noopener noreferrer"
    href={`https://twitter.com/${decoratedText.substring(1)}`}
  >
    {children}
  </a>
);

export const TwitterRedraftDecorator = {
  strategy: handleStrategy,
  component: RedraftHandle,
};

type HandleSpanProps = PropsWithChildren<{
  offsetKey: string;
}>;

const HandleSpan = ({ offsetKey, children }: HandleSpanProps) => (
  <span className="text-pink" data-offset-key={offsetKey}>
    {children}
  </span>
);

export default {
  strategy: handleStrategy,
  component: HandleSpan,
};
