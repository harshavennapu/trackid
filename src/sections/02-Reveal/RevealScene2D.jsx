import { forwardRef } from "react";
import { ASSETS } from "../../content/assets";
import { REVEAL_COPY } from "../../content/copy";

const PARTS = [
  {
    cls: "shell-outer",
    image: ASSETS.exploded.shellOuter,
    label: REVEAL_COPY.labels.outerShell,
    size: "w-40",
  },
  {
    cls: "shell-inner",
    image: ASSETS.exploded.shellInner,
    label: REVEAL_COPY.labels.innerShell,
    size: "w-32",
  },
  {
    cls: "pcb",
    image: ASSETS.exploded.pcb,
    label: REVEAL_COPY.labels.pcb,
    size: "w-24",
  },
  {
    cls: "battery",
    image: ASSETS.exploded.battery,
    label: REVEAL_COPY.labels.battery,
    size: "w-24",
  },
];

const RevealScene2D = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center"
    >
      {/* Title */}

      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40">
        <h2 className="text-4xl font-bold text-white tracking-wide">
          {REVEAL_COPY.title}
        </h2>
      </div>

      {/* Hero Pendant */}

      <img
        src={ASSETS.pendants.classicTeardrop.heroImage}
        alt="Pendant"
        className="hero-pendant absolute left-1/2 top-1/2 w-[340px] -translate-x-1/2 -translate-y-1/2 object-contain z-20"
      />

      {/* Exploded View */}

      <div className="exploded-view absolute inset-0">

        {PARTS.map((part) => (
          <div
            key={part.cls}
            className={`${part.cls} exploded-part absolute left-1/2 top-1/2`}
          >
            <div className="flex items-center gap-8">

              <img
                src={part.image}
                alt={part.label}
                className={`${part.size} object-contain`}
              />

              <div className="connector">
                <div className="connector-dot"></div>
                <div className="connector-line"></div>
              </div>

              <div className="annotation">
                {part.label}
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
});

RevealScene2D.displayName = "RevealScene2D";

export default RevealScene2D;