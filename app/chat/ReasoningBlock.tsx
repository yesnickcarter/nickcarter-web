"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReasoningBlockProps {
  reasoning: string;
}

export default function ReasoningBlock({ reasoning }: ReasoningBlockProps) {
  const [open, setOpen] = useState(false);

  const lines = reasoning.split("\n").filter((l) => l.trim());
  const sources = lines.find((l) => l.startsWith("Sources:"))?.replace("Sources:", "").trim() || "";
  const confidence = lines.find((l) => l.startsWith("Confidence:"))?.replace("Confidence:", "").trim() || "";
  const gaps = lines.find((l) => l.startsWith("Gaps:"))?.replace("Gaps:", "").trim() || "";

  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs text-[#a69e95] hover:text-[#6b6560] transition-colors flex items-center gap-1"
      >
        <span
          className="inline-block transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▸
        </span>
        How I arrived at this
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 pl-3 border-l border-[#e8e4df] text-xs text-[#6b6560] space-y-1">
              {sources && (
                <p>
                  <span className="font-medium text-[#4a4540]">Sources:</span>{" "}
                  {sources}
                </p>
              )}
              {confidence && (
                <p>
                  <span className="font-medium text-[#4a4540]">Confidence:</span>{" "}
                  {confidence}
                </p>
              )}
              {gaps && (
                <p>
                  <span className="font-medium text-[#4a4540]">Gaps:</span>{" "}
                  {gaps}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
