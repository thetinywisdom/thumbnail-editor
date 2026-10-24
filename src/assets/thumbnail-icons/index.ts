// Import all icon SVGs as raw strings via Vite
const modules = import.meta.glob("./*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type ThumbnailIcon = {
  slug: string;
  name: string;
  svg: string;
};

function toName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const ICONS: ThumbnailIcon[] = Object.entries(modules)
  .map(([path, svg]) => {
    const slug = path.replace("./", "").replace(".svg", "");
    return { slug, name: toName(slug), svg };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
