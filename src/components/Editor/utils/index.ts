import type { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import type { ContentBlock, ContentState, RawDraftContentState, RawDraftEntity } from 'draft-js';
import { EditorState, CompositeDecorator, convertFromRaw, convertToRaw } from 'draft-js';

import LinkDecorator from '../decorators/LinkDecorator';
import TwitterDecorator from '../decorators/TwitterDecorator';

export const setStyle = (
  ref: React.MutableRefObject<HTMLElement | null>,
  styles: CSSProperties
) => {
  if (!ref?.current) {
    return;
  }

  Object.keys(styles).forEach((key) => {
    // @ts-ignore
    (ref.current as HTMLElement).style[key] = styles[key];
  });
};

export const getEditorBoundary = (editorRef: React.MutableRefObject<Element | null>) => {
  // Draft does the same thing internally #dark
  // eslint-disable-next-line react/no-find-dom-node
  const editor = ReactDOM.findDOMNode(editorRef.current);
  if (!editor) {
    return;
  }
  return (editor as Element).getBoundingClientRect();
};

export function findWithRegex(
  regex: RegExp,
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) {
  const text = contentBlock.getText();
  let matchArr;
  let start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

// these are taken from:
// https://github.com/brijeshb42/medium-draft/blob/master/src/util/index.js

export const getSelection = (root: Window | any) => {
  let t = null;
  if (root.getSelection) {
    t = root.getSelection();
  } else if (root.document.getSelection) {
    t = root.document.getSelection();
  } else if (root.document.selection) {
    t = root.document.selection.createRange().text;
  }
  return t;
};

export const getSelectedBlockElement = () => {
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

export const defaultEditorState = (content?: RawDraftContentState) => {
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

export const convertToJSON = (content: ContentState) => {
  const converted = convertToRaw(content);
  const value: RawDraftContentState = {
    blocks: [...converted.blocks],
    entityMap: { ...converted.entityMap },
  };
  const entityMap = Object.keys(value.entityMap).map((i) => {
    const entity = { ...value.entityMap[i] };
    const entityData: any = { type: entity.type };
    if (entityData.type === 'LINK') {
      ['href', 'target'].forEach((key) => {
        entityData[key] = entity.data[key] || '';
      });
    } else if (entityData.type === 'EMBED') {
      ['url', 'html'].forEach((key) => {
        entityData[key] = entity.data[key] || '';
      });
    } else if (entityData.type === 'IMAGE') {
      ['imageId', 'size'].forEach((key) => {
        entityData[key] = entity.data[key] || '';
      });
    } else if (entityData.type === 'VIDEO') {
      ['videoId'].forEach((key) => {
        entityData[key] = entity.data[key] || '';
      });
    }
    return {
      ...entity,
      data: entityData,
    };
  });
  // @ts-ignore
  value.entityMap = entityMap;
  return JSON.stringify(value);
};
