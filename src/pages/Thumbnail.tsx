import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ICONS } from "@/assets/thumbnail-icons";
import { IconPicker } from "@/components/thumbnail/IconPicker";
import {
  CANVAS_H,
  CANVAS_W,
  ThumbnailCanvas,
} from "@/components/thumbnail/ThumbnailCanvas";
import { exportThumbnail } from "@/lib/thumbnail-export";
import { toast } from "sonner";

const PLACEHOLDER = "Write your headline here\n(two lines work best)";

export default function Thumbnail() {
  const [text, setText] = useState(PLACEHOLDER);
  const [iconSlug, setIconSlug] = useState<string>("book");
  const [exporting, setExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const previewWrapRef = useRef<HTMLDivElement>(null);
  const [previewWidth, setPreviewWidth] = useState(720);

  useEffect(() => {
    const el = previewWrapRef.current;
    if (!el) return;
    const update = () => setPreviewWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const iconSvg = useMemo(
    () => ICONS.find((i) => i.slug === iconSlug)?.svg ?? null,
    [iconSlug]
  );

  const handleExport = async (format: "png" | "jpg") => {
    if (!canvasRef.current) return;
    try {
      setExporting(true);
      await exportThumbnail(canvasRef.current, format, text);
      toast.success(`Downloaded ${format.toUpperCase()}`);
    } catch (e) {
      console.error(e);
      toast.error("Export failed");
    } finally {
      setExporting(false);
    }
  };

  // Scale preview to fit its container, but cap at 720 so it doesn't blur
  const scale = Math.min(1, previewWidth / CANVAS_W);
  const previewW = CANVAS_W * scale;
  const previewH = CANVAS_H * scale;

  return (
    <main className="flex-1" style={{ background: '#EFEEEA' }}>
      <div className="max-w-6xl mx-auto px-4 py-6 pb-24 sm:px-6 sm:py-8 sm:pb-28 lg:pb-28 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-6 lg:gap-8">


        {/* Preview */}
        <div className="space-y-4 w-full min-w-0" ref={previewWrapRef}>
          <div
            className="mx-auto rounded-lg shadow-lg overflow-hidden border"
            style={{
              width: previewW,
              height: previewH,
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: CANVAS_W,
                height: CANVAS_H,
              }}
            >
              <ThumbnailCanvas ref={canvasRef} text={text} iconSvg={iconSvg} />
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Exports at {CANVAS_W} × {CANVAS_H}
          </p>
        </div>

        {/* Controls */}
        <div className="space-y-6 min-w-0">
          <div className="space-y-2">
            <Label htmlFor="text">Headline</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Your headline. Use line breaks to control wrapping."
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Icon</Label>
            <IconPicker selectedSlug={iconSlug} onSelect={setIconSlug} />
          </div>

        </div>
      </div>

      {/* Fixed CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4 border-t z-50"
        style={{ background: '#EFEEEA', borderColor: 'hsl(var(--border))' }}
      >
        <div className="max-w-6xl mx-auto flex gap-2">
          <Button
            onClick={() => handleExport("png")}
            disabled={exporting}
            className="flex-1"
          >
            Download PNG
          </Button>
          <Button
            onClick={() => handleExport("jpg")}
            disabled={exporting}
            variant="secondary"
            className="flex-1"
          >
            Download JPG
          </Button>
        </div>
      </div>
    </main>
  );
}
