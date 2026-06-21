import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { Loader2 } from "lucide-react";
import { useYjs } from "../../hooks/useYjs";

/**
 * CodeEditor — Monaco Editor bound to the room's shared Yjs document.
 *
 * All Yjs lifecycle (Y.Doc, SocketIOProvider, awareness) is managed
 * by the YjsContext provider. This component only handles:
 *   1. Mounting the Monaco Editor
 *   2. Creating a MonacoBinding when both editor and ytext are ready
 *   3. Cleaning up the binding on unmount
 *
 * @param {{ language?: string, theme?: string }} props
 */
export default function CodeEditor({ language = "javascript", theme = "vs-dark" }) {
  const [editor, setEditor] = useState(null);
  const { ytext, awareness } = useYjs();
  const bindingRef = useRef(null);

  // Create MonacoBinding when both editor and ytext are available
  useEffect(() => {
    if (!editor || !ytext) return;

    // Clean up any existing binding first
    if (bindingRef.current) {
      bindingRef.current.destroy();
    }

    // Bind Yjs Y.Text to the Monaco Editor model
    const monacoBinding = new MonacoBinding(
      ytext,
      editor.getModel(),
      new Set([editor]),
      awareness
    );

    bindingRef.current = monacoBinding;
    console.log("[CodeEditor] MonacoBinding created");

    // Cleanup on unmount or when dependencies change
    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy();
        bindingRef.current = null;
        console.log("[CodeEditor] MonacoBinding destroyed");
      }
    };
  }, [editor, ytext, awareness]);

  const handleEditorDidMount = (editorInstance, monaco) => {
    setEditor(editorInstance);
  };

  return (
    <div className="w-full h-full relative">
      <Editor
        height="100%"
        width="100%"
        language={language}
        theme={theme}
        loading={
          <div className="flex items-center justify-center h-full text-text-muted">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Loading Editor...
          </div>
        }
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          padding: { top: 16 },
          cursorBlinking: "smooth",
          smoothScrolling: true,
          formatOnPaste: true,
        }}
      />
    </div>
  );
}
