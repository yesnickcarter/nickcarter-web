"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DocumentModalProps {
  docId: string;
  title: string;
  onClose: () => void;
}

export default function DocumentModal({ docId, title, onClose }: DocumentModalProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/deep-dive/${docId}.txt`)
      .then((r) => (r.ok ? r.text() : Promise.reject("Not found")))
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent("Document not available.");
        setLoading(false);
      });
  }, [docId]);

  function handleDownload() {
    if (!content) return;
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${docId}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-[#faf9f7] w-full max-w-2xl max-h-[80vh] mx-4 flex flex-col shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e4df]">
            <h3 className="font-[family-name:var(--font-serif)] text-lg text-[#1a1a1a]">
              {title}
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                disabled={!content}
                className="text-xs text-[#b45309] hover:text-[#92400e] transition-colors disabled:opacity-40"
              >
                Download
              </button>
              <button
                onClick={onClose}
                className="text-[#a69e95] hover:text-[#1a1a1a] transition-colors text-lg leading-none"
              >
                &times;
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {loading ? (
              <p className="text-sm text-[#a69e95]">Loading...</p>
            ) : (
              <pre className="text-sm text-[#4a4540] leading-[1.7] whitespace-pre-wrap font-[family-name:var(--font-inter)]">
                {content}
              </pre>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
