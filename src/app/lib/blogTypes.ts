export type Section =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "img"; src: string; alt?: string; caption?: string }
  | { type: "callout"; text: string };

export type Blog = {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  // structured body:
  intro?: string;
  sections?: Section[];
  // optional legacy:
  content?: string;
};
