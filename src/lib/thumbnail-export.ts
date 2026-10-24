import { toPng, toJpeg } from "html-to-image";

export function slugifyFilename(text: string): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  return slug || "thumbnail";
}

async function download(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function exportThumbnail(
  node: HTMLElement,
  format: "png" | "jpg",
  text: string
) {
  const base = slugifyFilename(text);
  const opts = {
    pixelRatio: 1,
    cacheBust: true,
    width: node.offsetWidth,
    height: node.offsetHeight,
  };
  const dataUrl =
    format === "png"
      ? await toPng(node, opts)
      : await toJpeg(node, { ...opts, quality: 0.95, backgroundColor: "#EFEEEA" });
  await download(dataUrl, `${base}.${format}`);
}
