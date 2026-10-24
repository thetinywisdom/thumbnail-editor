import { ICONS } from "@/assets/thumbnail-icons";
import { cn } from "@/lib/utils";

type Props = {
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
};

export function IconPicker({ selectedSlug, onSelect }: Props) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))" }}>

      {ICONS.map((icon) => (
        <button
          key={icon.slug}
          type="button"
          onClick={() => onSelect(icon.slug)}
          title={icon.name}
          className={cn(
            "aspect-square rounded-md border bg-[#EFEEEA] flex items-center justify-center transition-all hover:scale-105",
            selectedSlug === icon.slug
              ? "border-[#ed612b] ring-2 ring-[#ed612b]"
              : "border-border"
          )}
        >
          <div
            className="w-8 h-8 [&>svg]:w-full [&>svg]:h-full"
            dangerouslySetInnerHTML={{ __html: icon.svg }}
          />
        </button>
      ))}
    </div>
  );
}
