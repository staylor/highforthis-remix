import { useCallback, useEffect, useRef } from 'react';
import lexical from 'lexical';
import context from '@lexical/react/LexicalComposerContext.js';
import * as utils from '@lexical/utils';

import Toolbar from '@/components/Editor/Toolbar';
import Controls from '@/components/Editor/Controls/Controls';

const { useLexicalComposerContext } = context;
const { SELECTION_CHANGE_COMMAND } = lexical;
const { mergeRegister } = utils;

const BLOCK_TYPES = [
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  {
    label: '',
    style: 'atomic-image',
    className: 'dashicons dashicons-format-image',
  },
  {
    label: '',
    style: 'atomic-video',
    className: 'dashicons dashicons-format-video',
  },
  {
    label: '',
    style: 'blockquote',
    className: 'dashicons dashicons-editor-quote',
  },
  {
    label: '',
    style: 'unordered-list-item',
    className: 'dashicons dashicons-editor-ul',
  },
  {
    label: '',
    style: 'ordered-list-item',
    className: 'dashicons dashicons-editor-ol',
  },
  {
    label: '',
    style: 'code-block',
    className: 'dashicons dashicons-editor-code',
  },
];

const LowPriority = 1;

export default function BlockToolbarPlugin() {
  const blockToolbarRef = useRef(null);
  const [editor] = useLexicalComposerContext();

  const updateToolbar = useCallback(() => {}, [editor]);

  useEffect(() => {
    mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  return (
    <Toolbar ref={blockToolbarRef as any} className="-left-7 after:left-1 after:right-auto">
      <Controls>{BLOCK_TYPES.map(() => null)}</Controls>
    </Toolbar>
  );
}
