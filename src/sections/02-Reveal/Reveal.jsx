import { useRef } from "react";
import RevealScene2D from "./RevealScene2D";
import useScrollScrub from "../../hooks/useScrollScrub";

function Reveal() {
  const sectionRef = useRef(null);
  const pendantRef = useRef(null);

  useScrollScrub(sectionRef, pendantRef);

  return (
    <section
      id="reveal"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      <RevealScene2D ref={pendantRef} />
    </section>
  );
}

export default Reveal;