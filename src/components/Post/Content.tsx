import type { ContentState } from 'draft-js';

import redraft from '@/redraft';

import renderers from './renderers';

export default function Content({ contentState }: { contentState: Partial<ContentState> }) {
  return (
    <>
      {redraft(contentState, renderers, {
        cleanup: { after: 'all', types: 'all', trim: true },
      })}
    </>
  );
}
