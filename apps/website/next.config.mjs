import "./env.mjs";
import { env } from "./env.mjs";
import { withAxiom } from "next-axiom";
import createMDX from "@next/mdx";

if (env.NODE_ENV === "development") {
  process.env.VERCEL_URL = "http://localhost:3000";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*" }],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
};

const withAxiomConfig = withAxiom(nextConfig);

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(withAxiomConfig);
