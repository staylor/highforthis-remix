import lexicalCode from '@lexical/code';
import lexicalList from '@lexical/list';
import lexicalRichText from '@lexical/rich-text';
import lexicalComposer from '@lexical/react/LexicalComposer.js';
import autoFocusPlugin from '@lexical/react/LexicalAutoFocusPlugin.js';
import richTextPlugin from '@lexical/react/LexicalRichTextPlugin.js';
import contentEditable from '@lexical/react/LexicalContentEditable.js';
import historyPlugin from '@lexical/react/LexicalHistoryPlugin.js';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary.js';

import InlineToolbarPlugin from './plugins/InlineToolbarPlugin';
import BlockToolbarPlugin from './plugins/BlockToolbarPlugin';
import VideoNode from './plugins/VideoNode';
import theme from './theme';

const { CodeNode } = lexicalCode;
const { ListNode, ListItemNode } = lexicalList;
const { HeadingNode, QuoteNode } = lexicalRichText;
const { LexicalComposer } = lexicalComposer;
const { ContentEditable } = contentEditable;
const { HistoryPlugin } = historyPlugin;
const { AutoFocusPlugin } = autoFocusPlugin;
const { RichTextPlugin } = richTextPlugin;

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export default function Editor() {
  const editorConfig = {
    namespace: 'HighForThis',
    theme,
    nodes: [HeadingNode, QuoteNode, CodeNode, ListNode, ListItemNode, VideoNode],
    onError(error: Error) {
      throw error;
    },
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
        <InlineToolbarPlugin />
        <BlockToolbarPlugin />
      </div>
    </LexicalComposer>
  );
}
