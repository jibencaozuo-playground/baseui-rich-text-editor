import * as React from "react";
import { useAsync } from "@react-hookz/web";

import { Editor, extensions } from "components/Editor";
import type { IEditorRef } from "components/Editor"

const getExtensions = async () => {
  // TypeScript only allow 10 items at the same time.
  const result = await Promise.all([
    Promise.all([
      extensions.bold(),
      extensions.italic(),
      extensions.strike(),
      extensions.sup(),
      extensions.sub(),
      extensions.h1(),
      extensions.h2(),
      extensions.h3(),
      extensions.ul(),
      extensions.ol()
    ]),
    Promise.all([
      extensions.quote(),
      extensions.code(),
      extensions.hr(),
      extensions.link(),
      extensions.image()
    ])
  ]);

  return [...result[0], ...result[1]] as const;
};

export const Index: React.FC = () => {
  const [extensions, extensionActions] = useAsync(getExtensions, []);
  const editorRef = React.useRef<IEditorRef>(null);

  React.useEffect(() => {
    extensionActions.execute();
  }, [extensionActions]);

  React.useEffect(() => {
    window.addEventListener('click', () => {
      if (editorRef.current) {
        console.log(editorRef.current.value);
      }
    });
  }, []);

  if (!extensions.result) {
    return <>Loading</>;
  }
  return <Editor ref={editorRef} extensions={extensions.result} />;
};
