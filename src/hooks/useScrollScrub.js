import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollScrub(sectionRef, pendantRef) {
  useLayoutEffect(() => {
    if (!sectionRef.current || !pendantRef.current) return;

    const ctx = gsap.context(() => {
      // ----------------------------
      // Initial States
      // ----------------------------

      gsap.set(".hero-pendant", {
        opacity: 1,
        scale: 1,
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(".exploded-view", {
        opacity: 0,
      });

      gsap.set(
        [".shell-outer", ".shell-inner", ".pcb", ".battery"],
        {
          opacity: 0,
          scale: 0.8,
          x: 0,
          y: 0,
        }
      );

      gsap.set(".connector-dot", {
        scale: 0,
      });

      gsap.set(".connector-line", {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(".annotation", {
        opacity: 0,
        x: -20,
      });

      // ----------------------------
      // Timeline
      // ----------------------------

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      // HERO DISAPPEARS

      tl.to(".hero-pendant", {
        opacity: 0,
        scale: 0.65,
        duration: 0.5,
        ease: "power2.out",
      });

      // SHOW EXPLODED VIEW

      tl.to(
        ".exploded-view",
        {
          opacity: 1,
          duration: 0.2,
        },
        "<"
      );

      // OUTER SHELL

      tl.to(
        ".shell-outer",
        {
          opacity: 1,
          scale: 1,
          x: -280,
          y: -220,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.1"
      );

      // INNER SHELL

      tl.to(
        ".shell-inner",
        {
          opacity: 1,
          scale: 1,
          x: -180,
          y: -60,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.55"
      );

      // PCB

      tl.to(
        ".pcb",
        {
          opacity: 1,
          scale: 1,
          x: -80,
          y: 100,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.55"
      );

      // BATTERY

      tl.to(
        ".battery",
        {
          opacity: 1,
          scale: 1,
          x: 30,
          y: 250,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.55"
      );

      // CONNECTOR DOTS

      tl.to(
        ".connector-dot",
        {
          scale: 1,
          stagger: 0.08,
          duration: 0.2,
          ease: "back.out(2)",
        },
        "-=0.25"
      );

      // CONNECTOR LINES

      tl.to(
        ".connector-line",
        {
          scaleX: 1,
          stagger: 0.08,
          duration: 0.35,
          ease: "power2.out",
        },
        "<"
      );

      // LABELS

      tl.to(
        ".annotation",
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.25"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, pendantRef]);
}