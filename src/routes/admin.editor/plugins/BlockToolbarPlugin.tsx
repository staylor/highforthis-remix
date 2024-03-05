import { useCallback, useEffect, useRef, useState } from 'react';
import type { LexicalNode, RangeSelection } from 'lexical';
import lexical from 'lexical';
import type { HeadingTagType } from '@lexical/rich-text';
import lexicalRichText from '@lexical/rich-text';
import lexicalSelection from '@lexical/selection';
import context from '@lexical/react/LexicalComposerContext.js';
import * as utils from '@lexical/utils';

import Toolbar from '@/components/Editor/Toolbar';
import Controls from '@/components/Editor/Controls/Controls';
import StyleButton from '@/components/Editor/Controls/StyleButton';
import BlockButton from '@/components/Editor/BlockButton';

import { getNodeFromSelection, getStyleFromNode, setStyle } from './utils';

const { useLexicalComposerContext } = context;
const { $getSelection, $getNearestNodeFromDOMNode, $isRangeSelection, SELECTION_CHANGE_COMMAND } =
  lexical;
const { $createHeadingNode } = lexicalRichText;
const { $setBlocksType } = lexicalSelection;
const { mergeRegister } = utils;

interface BlockType {
  label: string;
  nodeType?: string;
  style: string;
  className?: string;
}

const BLOCK_TYPES: BlockType[] = [
  { label: 'H2', nodeType: 'heading', style: 'h2' },
  { label: 'H3', nodeType: 'heading', style: 'h3' },
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
const ALL_TYPES = BLOCK_TYPES.map((type) => type.nodeType).filter(Boolean);

const BLOCK_OFFSET = 7;
const BLOCK_TOOLBAR_OFFSET = 40;

const LowPriority = 1;

export default function BlockToolbarPlugin() {
  const [activeStyle, setActiveStyle] = useState('');
  const [toolbarActive, setToolbarActive] = useState(false);
  const blockButtonRef = useRef(null);
  const blockToolbarRef = useRef(null);
  const [editor] = useLexicalComposerContext();

  const getTopOffset = useCallback(() => {
    const editorRef = editor.getRootElement();
    const editorBoundary = editorRef?.getBoundingClientRect();
    if (!editorBoundary) {
      return;
    }

    const selected = window.getSelection() as Selection;
    const bounds = selected.getRangeAt(0).getBoundingClientRect();
    if (bounds.x === 0 && bounds.y === 0) {
      return;
    }
    return bounds.top - editorBoundary.top - BLOCK_OFFSET;
  }, [editor]);

  const hideToolbar = useCallback(() => {
    setStyle(blockToolbarRef, {
      transform: 'scale(0)',
    });
  }, []);

  const showToolbar = useCallback(() => {
    const offset = getTopOffset();
    if (offset) {
      setStyle(blockToolbarRef, {
        top: `${offset - BLOCK_TOOLBAR_OFFSET}px`,
        transform: 'scale(1)',
      });
    } else {
      hideToolbar();
    }
  }, [getTopOffset, hideToolbar]);

  const hideButton = useCallback(() => {
    setStyle(blockButtonRef, {
      transform: 'scale(0)',
    });
    setToolbarActive(false);
    setActiveStyle('');
  }, [setToolbarActive, setActiveStyle]);

  const showButton = useCallback(() => {
    const topOffset = getTopOffset();
    if (topOffset) {
      setStyle(blockButtonRef, {
        top: `${topOffset}px`,
        transform: 'scale(1)',
      });
    } else {
      hideButton();
    }
  }, [getTopOffset, hideButton]);

  const updateButton = useCallback(() => {
    const selection = $getSelection() as RangeSelection;
    if (!selection) {
      hideButton();
      return;
    }

    const range = selection as RangeSelection;
    const anchorOffset = range.anchor.offset;
    const focusOffset = range.focus.offset;

    if (anchorOffset === 0 && focusOffset === 0) {
      showButton();

      editor.update(() => {
        const selectedNode = getNodeFromSelection();
        if (!selectedNode) {
          return;
        }

        let node = $getNearestNodeFromDOMNode(selectedNode) as LexicalNode;
        if (!node) {
          return;
        }
        if (ALL_TYPES.includes(node.__type)) {
          const style = getStyleFromNode(node) as string;

          setToolbarActive(true);
          setActiveStyle(style);
        } else {
          setToolbarActive(false);
          setActiveStyle('');
        }
      });
    } else {
      hideButton();
    }
  }, [editor, showButton, hideButton]);

  useEffect(() => {
    if (!blockToolbarRef.current) {
      return;
    }

    if (toolbarActive) {
      showToolbar();
    } else {
      hideToolbar();
    }
  }, [toolbarActive, blockToolbarRef, showToolbar, hideToolbar]);

  useEffect(() => {
    mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateButton();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateButton();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateButton]);

  const onToggle = useCallback(
    (type: BlockType) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          switch (type.nodeType) {
            case 'heading':
              $setBlocksType(selection, () => $createHeadingNode(type.style as HeadingTagType));
              setActiveStyle(type.style);
              break;
          }
        }
      });
    },
    [editor, setActiveStyle]
  );

  return (
    <>
      <BlockButton
        ref={blockButtonRef as any}
        active={toolbarActive}
        onMouseDown={() => {
          setToolbarActive(!toolbarActive);
        }}
      />
      <Toolbar ref={blockToolbarRef} className="-left-7 after:left-1 after:right-auto">
        <Controls>
          {BLOCK_TYPES.map((type) => (
            <StyleButton
              key={type.style}
              className={type.className as string}
              active={activeStyle === type.style}
              label={type.label}
              onToggle={() => {
                onToggle(type);
              }}
              style={type.style}
            />
          ))}
        </Controls>
      </Toolbar>
    </>
  );
}
