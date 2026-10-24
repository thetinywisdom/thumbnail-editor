import { Link } from "react-router-dom";
import logo from "@/assets/tiny-wisdom-logo.png";

const BRAND_BG = "#EFEEEA";
const BRAND_ORANGE = "#ed612b";
const BRAND_DARK = "#1a1a1a";

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: BRAND_BG }}>
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: BRAND_BG, borderColor: "hsl(var(--border))" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="The Tiny Wisdom" className="h-8 w-auto" />
          </div>
          <span
            className="text-xs px-2.5 py-1 rounded font-semibold uppercase tracking-wider"
            style={{ background: BRAND_ORANGE, color: BRAND_BG }}
          >
            Start
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-5xl md:text-6xl mb-4" style={{ color: BRAND_DARK }}>
          The Tiny Wisdom Boilerplate
        </h1>
        <p className="text-base md:text-lg mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
          Design system, fonts, and tokens are ready. Build your idea from here.
        </p>
        <Link
          to="/thumbnail"
          className="inline-block px-6 py-3 rounded font-semibold"
          style={{ background: BRAND_ORANGE, color: BRAND_BG }}
        >
          Open Blog Thumbnail Generator →
        </Link>
      </main>
    </div>
  );
};

export default Index;
