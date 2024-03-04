import { default as lexicalComposer } from '@lexical/react/LexicalComposer.js';
import { default as autoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin.js';
import { default as richTextPlugin } from '@lexical/react/LexicalRichTextPlugin.js';
import { default as contentEditable } from '@lexical/react/LexicalContentEditable.js';
import { default as historyPlugin } from '@lexical/react/LexicalHistoryPlugin.js';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary.js';

import InlineToolbarPlugin from './plugins/InlineToolbarPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import theme from './theme';

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
    nodes: [],
    onError(error: Error) {
      throw error;
    },
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner relative">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <InlineToolbarPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
