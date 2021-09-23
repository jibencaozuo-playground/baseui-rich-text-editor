import * as React from "react";
import { useAsync } from "@react-hookz/web";

import { Editor } from "components/Editor";
import { extensions } from "components/Editor/extensions";

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

  React.useEffect(() => {
    extensionActions.execute();
  }, [extensionActions]);

  if (!extensions.result) {
    return <>Loading</>;
  }
  return <Editor extensions={extensions.result} />;
};
