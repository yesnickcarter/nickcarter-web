"use client";

import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex gap-3 items-end">
      <textarea
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder || "Ask a question about Nick..."}
        rows={1}
        className="flex-1 resize-none border border-[#e8e4df] px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#a69e95] bg-white focus:outline-none focus:border-[#b45309] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ minHeight: "44px", maxHeight: "120px" }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = Math.min(target.scrollHeight, 120) + "px";
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !text.trim()}
        className="px-5 py-3 bg-[#b45309] text-white text-sm font-medium hover:bg-[#92400e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
      >
        Send
      </button>
    </div>
  );
}
