import * as React from "react";
import { useAsync } from "@react-hookz/web";
import { useForm } from 'react-hook-form';

import { Editor, extensions } from "components/Editor";
import { Button } from "baseui/button";

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
      extensions.image(),
      extensions.undo(),
      extensions.redo()
    ])
  ]);

  return [...result[0], ...result[1]] as const;
};

const initialJSON = {
  "type": "doc",
  "content": [{
    "type": "paragraph",
    "content": [{
      "type": "text",
      "text": "123123"
    },
    {
      "type": "text",
      "marks": [{
        "type": "italic"
      }],
      "text": "2223"
    }]
  }]
};

export const Index: React.FC = () => {
  const [extensions, extensionActions] = useAsync(getExtensions, []);
  const { register, handleSubmit, setValue } = useForm()
  const onSubmit = (data:any) => console.log(data);
  const onClick = () => setValue('text', initialJSON);

  const [editable, setEditable] = React.useState(true);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    extensionActions.execute();
  }, [extensionActions]);

  if (!extensions.result) {
    return <>Loading</>;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Editor
        extensions={extensions.result}
        {...register('text', { value: initialJSON })}
        editable={editable}
        onWordCountChange={(count) => setCount(count)}
        overrides={{
          ToolbarButton: {
            BaseButton: {
              style: ({ $isSelected }) => {
                return {
                  ':hover': {
                    backgroundColor: 'rgba(255, 143, 0, 0.2)',
                    color: '#FF8F00',
                  }
                }
              }
            },
          },
        }}
        events={{
          onImageUpload: async (src: string) => {
            console.log(src);
            return src;
          },
        }}
      />
      <Button type="submit">submit</Button>
      <Button
        type="button"
        onClick={onClick}
      >
        reset
      </Button>
      <Button
        type="button"
        onClick={() => { setEditable(!editable) }}
      >
        editable: {editable ? 'true' : 'false'}
      </Button>
      <p>
        text count: {count}
      </p>
    </form>
  );
};
