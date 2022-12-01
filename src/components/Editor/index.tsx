/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import type { MutableRefObject, SyntheticEvent } from 'react';
import { useEffect, useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';
import { gql } from '@apollo/client';
import type { BlockMap, ContentBlock, DraftEditorCommand } from 'draft-js';
import {
  Editor as DraftEditor,
  EditorState,
  CompositeDecorator,
  RichUtils,
  AtomicBlockUtils,
  convertFromRaw,
  getVisibleSelectionRect,
} from 'draft-js';
import cn from 'classnames';
import Video from '@/components/Videos/Video';
import MediaModal from '@/components/Admin/Modals/Media';
import VideoModal from '@/components/Admin/Modals/Video';
import BlockStyleControls from './Controls/BlockStyle';
import InlineStyleControls from './Controls/InlineStyle';
import LinkDecorator from './decorators/LinkDecorator';
import TwitterDecorator from './decorators/TwitterDecorator';
import Toolbar from './Toolbar';
import BlockButton from './BlockButton';
import styleMap from './styleMap';
import { blockRenderer, blockStyle } from './Blocks';
import { getSelection } from './utils';
import { reducer } from '../Admin/ListTable/utils';

const getSelectedBlockElement = () => {
  const selection = getSelection(window);
  if (selection.rangeCount === 0) {
    return null;
  }
  let node = selection.getRangeAt(0).startContainer;
  do {
    if (node.getAttribute && node.getAttribute('data-block') === 'true') {
      return node;
    }
    node = node.parentNode;
  } while (node != null);
  return null;
};

function Editor({ content, onChange: onChangeProp, ...rest }: any) {
  const defaultEditorState = () => {
    const decorator = new CompositeDecorator([LinkDecorator, TwitterDecorator]);

    let contentState;
    if (content) {
      contentState = convertFromRaw(content);
    } else {
      // EditorState.createEmpty() throws errors upon focus, seems to only
      // happen when decorators are added
      contentState = convertFromRaw({
        entityMap: {},
        blocks: [
          {
            text: '',
            key: 'foo',
            type: 'unstyled',
            entityRanges: [],
            inlineStyleRanges: [],
            depth: 1,
          },
        ],
      });
    }
    return EditorState.createWithContent(contentState, decorator);
  };
  const [state, setState] = useReducer(reducer, {
    readOnly: false,
    blockToolbar: false,
    mediaModal: false,
    videoModal: false,
    editorState: defaultEditorState(),
  });

  const blockButtonRef = useRef<HTMLElement>(null);
  const blockToolbarRef = useRef<HTMLElement>(null);
  const inlineToolbarRef = useRef<HTMLElement>(null);
  const editorRef = useRef<HTMLElement>(null);

  const focus = () => editorRef.current && (editorRef.current as HTMLElement).focus();
  const setStyle = (ref: React.MutableRefObject<HTMLElement | null>, styles: any) => {
    if (!ref?.current) {
      return;
    }

    Object.entries(styles).forEach(([key, value]: any) => {
      (ref.current as HTMLElement).style[key] = value;
    });
  };

  useEffect(() => {
    if (onChangeProp) {
      onChangeProp(state.editorState.getCurrentContent());
    }
    focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.readOnly) {
      // console.log('--- READ ONLY ---');
      return;
    }

    const selection = state.editorState.getSelection();
    const anchorOffset = selection.get('anchorOffset');
    const focusOffset = selection.get('focusOffset');
    const hideBlockButton = () => {
      hideBlockToolbar();

      setStyle(blockButtonRef, {
        transform: 'scale(0)',
      });
    };

    const showBlockButton = () => {
      // Draft does the same thing internally #dark
      // eslint-disable-next-line react/no-find-dom-node
      const editor = ReactDOM.findDOMNode(editorRef.current);
      const editorBoundary = editor.getBoundingClientRect();
      const selected = getSelectedBlockElement();
      if (!selected) {
        hideBlockButton();
        // console.log('--- NO SELECTED BLOCK ---');
        return;
      }
      const bounds = selected.getBoundingClientRect();
      const topOffset = bounds.top - editorBoundary.top;
      if (blockButtonRef.current) {
        blockButtonRef.current.style.top = `${topOffset}px`;
        blockButtonRef.current.style.transform = 'scale(1)';
      }

      if (state.blockToolbar) {
        showBlockToolbar(topOffset);
      } else {
        hideBlockToolbar();
      }
    };

    const hideBlockToolbar = () => {
      if (!blockToolbarRef.current) {
        return;
      }

      blockToolbarRef.current.style.transform = 'scale(0)';
      if (state.blockToolbar) {
        setState({ blockToolbar: false });
      }
    };

    if (anchorOffset === 0 && focusOffset === 0) {
      hideInlineToolbar();
      showBlockButton();
      return;
    }

    hideBlockButton();

    if (anchorOffset === focusOffset) {
      hideInlineToolbar();
      // console.log('--- EMPTY SELECTION ---');
      return;
    }

    showInlineToolbar();
  }, [state.readOnly, state.editorState, state.blockToolbar]);

  const onChange = (editorState: EditorState) => {
    setState({ editorState });
    if (onChangeProp) {
      onChangeProp(editorState.getCurrentContent());
    }
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

  const showBlockToolbar = (topOffset: number) => {
    if (!blockToolbarRef.current) {
      return;
    }

    // $TODO: Magic Number
    blockToolbarRef.current.style.top = `${topOffset - 40}px`;
    blockToolbarRef.current.style.transform = 'scale(1)';
  };

  const showInlineToolbar = () => {
    const selectionBoundary = getVisibleSelectionRect(window);
    if (!selectionBoundary) {
      return;
    }

    const TOOLBAR_WIDTH = 250;
    const TOOLBAR_HEIGHT = 32;

    // Draft does the same thing internally #dark
    // eslint-disable-next-line react/no-find-dom-node
    const editor = ReactDOM.findDOMNode(editorRef.current);
    const editorBoundary = editor.getBoundingClientRect();
    // ensure that toolbar is positioned in the middle
    // and above the selection, regardless of toolbar state
    if (!inlineToolbarRef.current) {
      return;
    }
    inlineToolbarRef.current.style.width = `${TOOLBAR_WIDTH}px`;
    inlineToolbarRef.current.style.top = `${
      selectionBoundary.top -
      editorBoundary.top -
      TOOLBAR_HEIGHT -
      // $TODO: Magic Number
      10
    }px`;

    const widthDiff = selectionBoundary.width - TOOLBAR_WIDTH;
    let leftOffset;
    if (widthDiff >= 0) {
      leftOffset = Math.max(widthDiff / 2, 0);
    } else {
      const left = selectionBoundary.left - editorBoundary.left;
      leftOffset = Math.max(left + widthDiff / 2, 0);
    }
    inlineToolbarRef.current.style.left = `${leftOffset}px`;
    // this class allows us to style the toolbar arrow with CSS
    if (leftOffset === 0) {
      inlineToolbarRef.current.classList.add('Toolbar-flush');
    } else {
      inlineToolbarRef.current.classList.remove('Toolbar-flush');
    }
    inlineToolbarRef.current.style.transform = 'scale(1)';
  };

  const hideInlineToolbar = () => {
    if (!inlineToolbarRef.current) {
      return;
    }
    inlineToolbarRef.current.style.transform = 'scale(0)';
  };

  const setEntityData = (ENTITY: string) => (data: any) => {
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
        selection: mergedContent.getSelectionAfter(),
        forceSelection: true,
      }),
    });
  };

  const contentState = state.editorState.getCurrentContent();

  return (
    <div className="relative bg-white">
      <BlockButton
        ref={blockButtonRef}
        active={state.blockToolbar}
        onMouseDown={() => {
          setState({
            blockToolbar: !state.blockToolbar,
          });
        }}
      />
      <Toolbar ref={blockToolbarRef} className="-left-7 after:left-1 after:right-auto">
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
          ref={editorRef}
          readOnly={state.readOnly}
          editorState={state.editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          blockRendererFn={blockRenderer}
          blockStyleFn={blockStyle}
          customStyleMap={styleMap}
          {...rest}
        />
        <Toolbar ref={inlineToolbarRef}>
          <InlineStyleControls
            editor={editorRef.current}
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
