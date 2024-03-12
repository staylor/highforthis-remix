import context from '@lexical/react/LexicalComposerContext.js';
import { useEffect, useState } from 'react';

const { useLexicalComposerContext } = context;

export default function HiddenFieldPlugin() {
  const [fieldValue, setFieldValue] = useState('');
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      setFieldValue(JSON.stringify(editorState.toJSON()));
    });
  }, [editor]);

  return <input type="hidden" name="editorState" value={fieldValue} />;
}
