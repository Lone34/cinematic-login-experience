import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springX = useSpring(0, { stiffness: 300, damping: 30 });
  const springY = useSpring(0, { stiffness: 300, damping: 30 });

  const trailX = useSpring(0, { stiffness: 150, damping: 25 });
  const trailY = useSpring(0, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMove);

    const interactives = document.querySelectorAll("button, a, input, [data-hover]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [springX, springY, trailX, trailY]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Outer glow trail */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          translateX: "-50%",
          translateY: "-50%",
          border: `1.5px solid hsl(175 80% 50% / ${isHovering ? 0.6 : 0.3})`,
          background: `radial-gradient(circle, hsl(175 80% 50% / 0.05), transparent)`,
          transition: "width 0.3s, height 0.3s",
        }}
      />
      {/* Core dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          width: isHovering ? 8 : 6,
          height: isHovering ? 8 : 6,
          translateX: "-50%",
          translateY: "-50%",
          background: "hsl(175 80% 50%)",
          boxShadow: "0 0 12px 4px hsl(175 80% 50% / 0.5)",
          transition: "width 0.2s, height 0.2s",
        }}
      />
    </>
  );
}
