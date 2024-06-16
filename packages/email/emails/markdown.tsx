import {
  Markdown,
  Html,
  Head,
  Preview,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface NewMarkDownEmailProps {
  markdownContent: string;
  title: string;
}

export default function NewMarkDownEmail({
  markdownContent,
  title,
}: NewMarkDownEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Tailwind>
        <Markdown
          markdownCustomStyles={{
            h1: { color: "red" },
            h2: { color: "blue" },
            codeInline: { background: "grey" },
          }}
          markdownContainerStyles={{
            padding: "12px",
            border: "solid 1px black",
          }}
        >
          {markdownContent}
        </Markdown>
      </Tailwind>
    </Html>
  );
}
