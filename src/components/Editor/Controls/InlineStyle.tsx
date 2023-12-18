import type { SyntheticEvent, ChangeEvent } from 'react';
import { useReducer, useRef } from 'react';
import type { EditorState as DraftEditorState } from 'draft-js';
import draftJs from 'draft-js';
import cn from 'classnames';

import StyleButton from './StyleButton';
import Controls from './Controls';

const { RichUtils, EditorState } = draftJs;

const linkActionClass = cn('cursor-pointer block absolute top-0 right-0 h-8 w-8 leading-8');

const INLINE_STYLES = [
  { label: '', style: 'BOLD', className: 'dashicons dashicons-editor-bold' },
  {
    label: '',
    style: 'ITALIC',
    className: 'dashicons dashicons-editor-italic',
  },
  {
    label: '',
    style: 'UNDERLINE',
    className: 'dashicons dashicons-editor-underline',
  },
  {
    label: '',
    style: 'STRIKETHROUGH',
    className: 'dashicons dashicons-editor-strikethrough',
  },
  {
    label: (
      <>
        X<sup>2</sup>
      </>
    ),
    style: 'SUPERSCRIPT',
    className: '',
  },
  {
    label: (
      <>
        X<sub>2</sub>
      </>
    ),
    style: 'SUBSCRIPT',
    className: '',
  },
  { label: '', style: 'CODE', className: 'dashicons dashicons-editor-code' },
  { label: '', style: 'LINK', className: 'dashicons dashicons-admin-links' },
];

interface ControlProps {
  editorState: DraftEditorState;
  onChange: (e: DraftEditorState) => void;
  onToggle: (value: string) => void;
}

interface ControlState {
  mode: string;
  urlValue: string;
}

const reducer = (a: ControlState, b: Partial<ControlState>) => ({ ...a, ...b });

export default function InlineStyleControls({ editorState, onChange, onToggle }: ControlProps) {
  const linkInput = useRef(null);
  const [state, setState] = useReducer(reducer, {
    mode: '',
    urlValue: '',
  });

  // event propagation is already handled
  const showLink = () => {
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    const contentState = editorState.getCurrentContent();
    const blockWithLink = contentState.getBlockForKey(selection.getStartKey());
    const linkKey = blockWithLink.getEntityAt(selection.getStartOffset());

    let urlValue = '';
    let mode = 'ADD_LINK';
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey);
      urlValue = linkInstance.getData().href;
      mode = 'EDIT_LINK';
    }

    setState({ mode, urlValue });
    setTimeout(() => (linkInput as any).current.focus(), 0);
  };

  const addLink = (e: SyntheticEvent) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
      type: 'LINK',
      href: state.urlValue,
      target: null,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const selection = editorState.getSelection();
    const newEditorState = RichUtils.toggleLink(editorState, selection, entityKey);
    const selectionState = EditorState.forceSelection(newEditorState, selection);

    setState({ mode: '', urlValue: '' });
    onChange(selectionState);
  };

  const removeLink = (e: SyntheticEvent) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }

    setState({ mode: '', urlValue: '' });
    const newEditorState = RichUtils.toggleLink(editorState, selection, null);
    const selectionState = EditorState.forceSelection(newEditorState, selection);
    onChange(selectionState);
  };

  const cancelLink = (e: SyntheticEvent) => {
    e.preventDefault();

    setState({ mode: '', urlValue: '' });
  };

  const onLinkInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ urlValue: e.target.value });
  };

  const onLinkInputKeyDown = (e: KeyboardEvent) => {
    if (e.which === 13) {
      addLink(e as any);
    }
  };

  const onLinkInputMouseDown = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const block = contentState.getBlockForKey(selection.getStartKey());
  if (!block) {
    return null;
  }
  const currentStyle = editorState.getCurrentInlineStyle();

  let linkKey = '';
  if (!selection.isCollapsed()) {
    linkKey = block.getEntityAt(selection.getStartOffset());
  }

  return (
    <Controls>
      {!selection.isCollapsed() && ['ADD_LINK', 'EDIT_LINK'].includes(state.mode) ? (
        <>
          <input
            className="block h-5 w-50 border-0 bg-transparent p-1.5 text-base focus:outline-none"
            ref={linkInput}
            placeholder="Type a URL and press Enter"
            value={state.urlValue}
            onChange={onLinkInputChange}
            onKeyDown={onLinkInputKeyDown as any}
            onMouseDown={onLinkInputMouseDown}
            onClick={onLinkInputMouseDown}
            type="text"
          />
          {state.mode === 'EDIT_LINK' && (
            <span
              className={cn('dashicons dashicons-editor-unlink', linkActionClass)}
              onClick={removeLink}
            />
          )}
          {state.mode === 'ADD_LINK' && (
            <span
              className={cn('dashicons dashicons-no-alt', linkActionClass)}
              onClick={cancelLink}
            />
          )}
        </>
      ) : (
        INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.style}
            className={type.className}
            active={currentStyle.has(type.style) || (type.style === 'LINK' && linkKey !== '')}
            label={type.label}
            onToggle={type.style === 'LINK' ? showLink : onToggle}
            style={type.style}
          />
        ))
      )}
    </Controls>
  );
}
