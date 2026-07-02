import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

// Long-form essays — add a .md file to src/content/words/ to publish.
const words = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/words" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    lang: z.enum(["en", "zh"]).default("en"),
  }),
});

// Short thoughts — one line at a time.
const fragments = defineCollection({
  loader: file("./src/content/fragments.json"),
  schema: z.object({
    id: z.string(),
    text: z.string(),
    date: z.coerce.date(),
    lang: z.enum(["en", "zh"]).default("en"),
  }),
});

// The commonplace book.
const quotes = defineCollection({
  loader: file("./src/content/quotes.json"),
  schema: z.object({
    id: z.string(),
    zh: z.string().optional(),
    en: z.string().optional(),
    who: z.string(),
    source: z.string().optional(),
  }),
});

// A photo log. `kind` picks an illustrated placeholder; set `img` to use a real photo.
const moments = defineCollection({
  loader: file("./src/content/moments.json"),
  schema: z.object({
    id: z.string(),
    caption: z.string(),
    date: z.coerce.date(),
    kind: z.string().default("sun"),
    img: z.string().optional(),
  }),
});

// The bunnies' diary.
const bunnyDiary = defineCollection({
  loader: file("./src/content/bunny-diary.json"),
  schema: z.object({
    id: z.string(),
    date: z.coerce.date(),
    title: z.string(),
    body: z.string(),
    kind: z.string().default("bunny"),
  }),
});

export const collections = { words, fragments, quotes, moments, bunnyDiary };
