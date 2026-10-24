import { forwardRef } from "react";
import logoUrl from "@/assets/tiny-wisdom-logo.svg";

export const CANVAS_W = 1200;
export const CANVAS_H = 675;

type Props = {
  text: string;
  iconSvg: string | null;
};

// Fixed font size for all titles.
function getFontSize(_text: string): number {
  return 64;
}

export const ThumbnailCanvas = forwardRef<HTMLDivElement, Props>(
  ({ text, iconSvg }, ref) => {
    const fontSize = getFontSize(text);
    return (
      <div
        ref={ref}
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          background: "#EFEEEA",
          position: "relative",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 56,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Logo top-center */}
        <img
          src={logoUrl}
          alt=""
          style={{
            height: 64,
            width: "auto",
            marginBottom: 8,
          }}
        />

        {/* Headline */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: "'Zichtbaar', 'DM Sans', system-ui, sans-serif",
              fontWeight: 700,
              color: "#1a1a1a",
              fontSize,
              lineHeight: 1.15,
              textAlign: "center",
              letterSpacing: "-0.01em",
              whiteSpace: "pre-wrap",
            }}
          >
            {text || "Your headline here"}
          </h1>
        </div>

        {/* Icon */}
        <div
          style={{
            width: 200,
            marginBottom: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          // Icon SVGs already use the brand orange (#F26025); inline them as-is.
          dangerouslySetInnerHTML={
            iconSvg
              ? {
                  __html: iconSvg
                    .replace(/<svg([^>]*?)\bwidth="[^"]*"/, '<svg$1width="200"')
                    .replace(/<svg([^>]*?)\bheight="[^"]*"/, '<svg$1'),
                }
              : { __html: "" }
          }
        />
      </div>
    );
  }
);
ThumbnailCanvas.displayName = "ThumbnailCanvas";
