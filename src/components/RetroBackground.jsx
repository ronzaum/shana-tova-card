/**
 * RetroBackground — fixed layer of pixel art decorations, stars,
 * circuit traces, geometric shapes, and glitch lines that fill
 * the entire viewport edge-to-edge behind every screen.
 */
export default function RetroBackground() {
  return (
    <div className="retro-bg" aria-hidden="true">
      {/* Pixel space invaders */}
      <div className="pixel-invader inv-1" />
      <div className="pixel-invader inv-2" />
      <div className="pixel-invader inv-3" />

      {/* Circuit traces */}
      <div className="circuit circuit-1" />
      <div className="circuit circuit-2" />

      {/* Pixel stars */}
      <div className="pixel-star star-1" />
      <div className="pixel-star star-2" />
      <div className="pixel-star star-3" />
      <div className="pixel-star star-4" />
      <div className="pixel-star star-5" />
      <div className="pixel-star star-6" />
      <div className="pixel-star star-7" />
      <div className="pixel-star star-8" />
      <div className="pixel-star star-9" />
      <div className="pixel-star star-10" />
      <div className="pixel-star star-11" />
      <div className="pixel-star star-12" />
      <div className="pixel-star star-13" />
      <div className="pixel-star star-14" />
      <div className="pixel-star star-15" />

      {/* Pixel crosses */}
      <div className="pixel-cross cross-1" />
      <div className="pixel-cross cross-2" />
      <div className="pixel-cross cross-3" />
      <div className="pixel-cross cross-4" />
      <div className="pixel-cross cross-5" />

      {/* Geometric diamonds */}
      <div className="geo-diamond diamond-1" />
      <div className="geo-diamond diamond-2" />
      <div className="geo-diamond diamond-3" />

      {/* Dotted boxes */}
      <div className="dot-box dot-box-1" />
      <div className="dot-box dot-box-2" />
      <div className="dot-box dot-box-3" />
      <div className="dot-box dot-box-4" />

      {/* Pixel arrows */}
      <div className="pixel-arrow arrow-1" />
      <div className="pixel-arrow arrow-2" />
      <div className="pixel-arrow arrow-3" />

      {/* Corner brackets */}
      <div className="corner-bracket cb-tl" />
      <div className="corner-bracket cb-tr" />
      <div className="corner-bracket cb-bl" />
      <div className="corner-bracket cb-br" />

      {/* Horizontal stripes */}
      <div className="h-stripe stripe-1" />
      <div className="h-stripe stripe-2" />
      <div className="h-stripe stripe-3" />
      <div className="h-stripe stripe-4" />
      <div className="h-stripe stripe-5" />
      <div className="h-stripe stripe-6" />

      {/* Glitch lines */}
      <div className="glitch-line glitch-1" />
      <div className="glitch-line glitch-2" />
      <div className="glitch-line glitch-3" />
    </div>
  );
}
