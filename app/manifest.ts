import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "真题句读｜考研英语精读",
    short_name: "真题句读",
    description: "逐句精读、词组辨析、自测与间隔复习。",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2e9",
    theme_color: "#1c3539",
    lang: "zh-CN",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
