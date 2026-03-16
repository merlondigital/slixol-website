"use client";

import { motion } from "framer-motion";
import { useHydrated } from "@/app/hooks/useHydrated";

interface AnimatedTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}

export default function AnimatedText({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
}: AnimatedTextProps) {
  const hydrated = useHydrated();

  return (
    <motion.div
      initial={hydrated ? { opacity: 0, y: 30 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}
