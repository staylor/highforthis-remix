import type { ContentBlock } from 'draft-js';
import type { ReactNode } from 'react';

import { findWithRegex } from '../utils';

const HANDLE_REGEX = /@[\w]+/g;

function handleStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

interface RedraftHandleProps {
  decoratedText: string;
  children: ReactNode;
}

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

interface HandleSpanProps {
  offsetKey: string;
  children: ReactNode;
}

const HandleSpan = ({ offsetKey, children }: HandleSpanProps) => (
  <span className="text-pink" data-offset-key={offsetKey}>
    {children}
  </span>
);

export default {
  strategy: handleStrategy,
  component: HandleSpan,
};
