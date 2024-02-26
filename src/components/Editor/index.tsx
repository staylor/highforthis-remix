import type { SyntheticEvent } from 'react';
import { useEffect, useReducer, useRef } from 'react';
import { gql } from 'graphql-tag';
import type {
  BlockMap,
  ContentBlock,
  ContentState,
  DraftEditorCommand,
  RawDraftContentState,
} from 'draft-js';
import {
  Editor as DraftEditor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  getVisibleSelectionRect,
} from 'draft-js';
import cn from 'classnames';

import VideoModal from '@/components/Admin/Modals/Video';
import MediaModal from '@/components/Admin/Modals/Media';
import Video from '@/components/Videos/Video';
import type { SelectedImage, SelectedVideo } from '@/types/admin';
import type { AudioUpload } from '@/types/graphql';

import BlockStyleControls from './Controls/BlockStyle';
import InlineStyleControls from './Controls/InlineStyle';
import Toolbar from './Toolbar';
import BlockButton from './BlockButton';
import styleMap from './styleMap';
import { blockRenderer, blockStyle } from './Blocks';
import {
  getSelectedBlockElement,
  defaultEditorState,
  setStyle,
  getEditorBoundary,
  convertToJSON,
} from './utils';

const TOOLBAR_WIDTH = 250;
const TOOLBAR_HEIGHT = 32;

interface EditorProps {
  editorKey: string;
  content?: RawDraftContentState;
  placeholder?: string;
  className?: string;
}

interface EditorReducer {
  readOnly: boolean;
  blockToolbar: boolean;
  mediaModal: boolean;
  videoModal: boolean;
  editorState: EditorState;
}

const reducer = (a: EditorReducer, b: Partial<EditorReducer>) => ({ ...a, ...b });

function Editor({ editorKey, content, placeholder, className }: EditorProps) {
  const [state, setState] = useReducer(reducer, {
    readOnly: false,
    blockToolbar: false,
    mediaModal: false,
    videoModal: false,
    editorState: defaultEditorState(content),
  });

  const blockButtonRef = useRef<HTMLDivElement>(null);
  const blockToolbarRef = useRef<HTMLDivElement>(null);
  const inlineToolbarRef = useRef<HTMLElement>(null);
  const editorRef = useRef<HTMLElement>(null);

  const focus = () => editorRef.current && (editorRef.current as HTMLElement).focus();

  useEffect(() => {
    focus();
  }, []);

  useEffect(() => {
    if (state.readOnly) {
      return;
    }

    const selection = state.editorState.getSelection();
    const anchorOffset = selection.get('anchorOffset');
    const focusOffset = selection.get('focusOffset');

    const hideBlockToolbar = (hideButton = true) => {
      if (hideButton) {
        setStyle(blockButtonRef, {
          transform: 'scale(0)',
        });
      }

      setStyle(blockToolbarRef, {
        transform: 'scale(0)',
      });
      if (state.blockToolbar) {
        setState({ blockToolbar: false });
      }
    };

    const showBlockButton = () => {
      const editorBoundary = getEditorBoundary(editorRef);
      if (!editorBoundary) {
        return;
      }
      const selected = getSelectedBlockElement();
      if (!selected) {
        hideBlockToolbar();
        return;
      }
      const bounds = selected.getBoundingClientRect();
      const topOffset = bounds.top - editorBoundary.top;

      setStyle(blockButtonRef, {
        top: `${topOffset}px`,
        transform: 'scale(1)',
      });

      if (state.blockToolbar) {
        setStyle(blockToolbarRef, {
          // $TODO: Magic Number
          top: `${topOffset - 40}px`,
          transform: 'scale(1)',
        });
      } else {
        hideBlockToolbar(false);
      }
    };

    const showInlineToolbar = () => {
      const selectionBoundary = getVisibleSelectionRect(window);
      if (!selectionBoundary) {
        return;
      }

      const editorBoundary = getEditorBoundary(editorRef);
      if (!editorBoundary) {
        return;
      }
      // ensure that toolbar is positioned in the middle
      // and above the selection, regardless of toolbar state
      if (!inlineToolbarRef.current) {
        return;
      }

      const widthDiff = selectionBoundary.width - TOOLBAR_WIDTH;
      let leftOffset;
      if (widthDiff >= 0) {
        leftOffset = Math.max(widthDiff / 2, 0);
      } else {
        const left = selectionBoundary.left - editorBoundary.left;
        leftOffset = Math.max(left + widthDiff / 2, 0);
      }
      // this class allows us to style the toolbar arrow with CSS
      if (leftOffset === 0) {
        inlineToolbarRef.current.classList.add('Toolbar-flush');
      } else {
        inlineToolbarRef.current.classList.remove('Toolbar-flush');
      }
      setStyle(inlineToolbarRef, {
        left: `${leftOffset}px`,
        top: `${
          selectionBoundary.top -
          editorBoundary.top -
          TOOLBAR_HEIGHT -
          // $TODO: Magic Number
          10
        }px`,
        transform: 'scale(1)',
        width: `${TOOLBAR_WIDTH}px`,
      });
    };

    if (anchorOffset === 0 && focusOffset === 0) {
      setStyle(inlineToolbarRef, {
        transform: 'scale(0)',
      });
      showBlockButton();
      return;
    }

    hideBlockToolbar();

    // empty selection
    if (anchorOffset === focusOffset) {
      setStyle(inlineToolbarRef, {
        transform: 'scale(0)',
      });
      return;
    }

    showInlineToolbar();
  }, [state.readOnly, state.editorState, state.blockToolbar]);

  const onChange = (editorState: EditorState) => {
    setState({ editorState });
  };

  const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const toggleBlockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(state.editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(state.editorState, inlineStyle));
  };

  const setEntityData = (ENTITY: string) => (data: SelectedImage | SelectedVideo | AudioUpload) => {
    const currentContent = state.editorState.getCurrentContent();
    const contentStateWithEntity = currentContent.createEntity(ENTITY, 'IMMUTABLE', data);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(state.editorState, {
      currentContent: contentStateWithEntity,
    });

    const insertedState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    const contentState = insertedState.getCurrentContent();
    const blockMap: BlockMap = contentState.getBlockMap();
    const lastKey = blockMap.last().getKey();
    const cleanBlockMap = blockMap.filter(
      (block?: ContentBlock) =>
        typeof block !== 'undefined' &&
        (block.getKey() === lastKey || block.getType() !== 'unstyled' || block.getText() !== '')
    );
    const mergedContent = contentState.merge({
      blockMap: cleanBlockMap,
    });

    setState({
      editorState: EditorState.set(state.editorState, {
        currentContent: mergedContent,
        selection: (mergedContent as ContentState).getSelectionAfter(),
        forceSelection: true,
      }),
    });
  };

  const contentState = state.editorState.getCurrentContent();

  return (
    <div className={cn('relative bg-white', className)}>
      <input type="hidden" name={editorKey} value={convertToJSON(contentState)} />
      <BlockButton
        ref={blockButtonRef as any}
        active={state.blockToolbar}
        onMouseDown={() => {
          setState({
            blockToolbar: !state.blockToolbar,
          });
        }}
      />
      <Toolbar ref={blockToolbarRef as any} className="-left-7 after:left-1 after:right-auto">
        <BlockStyleControls
          openMediaModal={() => setState({ mediaModal: true })}
          openVideoModal={() => setState({ videoModal: true })}
          editorState={state.editorState}
          onToggle={toggleBlockType}
        />
      </Toolbar>
      <div
        className={cn('relative z-10 cursor-text text-base', {
          hidePlaceholder:
            !contentState.hasText() && contentState.getBlockMap().first().getType() !== 'unstyled',
        })}
        onClick={focus}
      >
        <DraftEditor
          ref={editorRef as any}
          readOnly={state.readOnly}
          editorState={state.editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand as any}
          blockRendererFn={blockRenderer}
          blockStyleFn={blockStyle as any}
          customStyleMap={styleMap}
          editorKey={editorKey}
          placeholder={placeholder}
        />
        <Toolbar ref={inlineToolbarRef as any}>
          <InlineStyleControls
            onChange={onChange}
            editorState={state.editorState}
            onToggle={toggleInlineStyle}
          />
        </Toolbar>
      </div>
      {state.mediaModal && (
        <MediaModal
          selectImage={setEntityData('IMAGE')}
          selectAudio={setEntityData('AUDIO')}
          onClose={(e) => {
            e.preventDefault();
            setState({ mediaModal: false });
          }}
        />
      )}
      {state.videoModal && (
        <VideoModal
          selectVideo={setEntityData('VIDEO')}
          onClose={(e: SyntheticEvent) => {
            e.preventDefault();
            setState({ videoModal: false });
          }}
        />
      )}
    </div>
  );
}

Editor.fragments = {
  contentState: gql`
    fragment Editor_contentState on ContentState {
      blocks {
        key
        text
        type
        depth
        inlineStyleRanges {
          offset
          length
          style
        }
        entityRanges {
          offset
          length
          key
        }
      }
      entityMap {
        type
        mutability
        data {
          ... on LinkData {
            href
            target
          }
          ... on EmbedData {
            url
            html
          }
          ... on ImageData {
            imageId
            image {
              destination
              crops {
                width
                fileName
              }
            }
            size
          }
          ... on VideoData {
            videoId
            video {
              ...Video_video
            }
          }
        }
      }
    }
    ${Video.fragments.video}
  `,
};

export default Editor;
