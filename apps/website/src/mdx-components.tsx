import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
// https://nextjs.org/docs/app/building-your-application/configuring/mdx#custom-elements
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.

    h1: ({ children }) => (
      <h1 className="py-2 text-step1 font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="py-2 text-step--2 font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="py-2 text-step--3 font-bold">{children}</h3>
    ),
    ol: ({ children }) => (
      <ol className="py-2 list-decimal pl-5">{children}</ol>
    ),
    ul: ({ children }) => <ul className="py-2 list-disc pl-5 text-base">{children}</ul>,
    // li: ({ children }) => <li className="py-2 text-step--3 text-base">{children}</li>,
    p: ({ children }) => <p className="py-2 text-step--3 text-base">{children}</p>,
    a: ({ children, ...props }) => (
      <Link
        className="text-yellow underline underline-offset-0"
        {...(props as LinkProps)}
      >
        {children}
      </Link>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  };
}
