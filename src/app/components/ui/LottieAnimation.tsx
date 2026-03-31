"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import Lottie from "lottie-react";

interface LottieAnimationProps {
  src: string;
  className?: string;
}

export default function LottieAnimation({ src, className }: LottieAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Preload 800px before entering viewport
  const isInView = useInView(ref, { once: true, margin: "0px 0px 800px 0px" });
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    if (!isInView || animationData) return;
    fetch(src)
      .then((r) => r.json())
      .then((data) => setAnimationData(data))
      .catch(() => {
        // Silently fail — blank area on failure is acceptable over crash
      });
  }, [isInView, src, animationData]);

  return (
    <div ref={ref} className={className}>
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div className="w-full h-full rounded-xl bg-dark-card/60" />
      )}
    </div>
  );
}
