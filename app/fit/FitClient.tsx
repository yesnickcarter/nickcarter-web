"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FitInput from "./FitInput";
import ChatMessage from "@/app/chat/ChatMessage";
import ChatInput from "@/app/chat/ChatInput";
import type { Message } from "@/app/chat/ChatMessage";
import { parseReasoningBlock } from "@/lib/chat-context";

const MAX_MESSAGES = 15;

const SESSION_END_MESSAGE: Message = {
  role: "assistant",
  content:
    "This session's wrapped. If the assessment was useful, Nick would love to connect — nick.carter@hey.com or LinkedIn.",
  reasoning: null,
};

type Phase = "input" | "conversation";

export default function FitClient() {
  const [phase, setPhase] = useState<Phase>("input");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [consent, setConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [showConsentToast, setShowConsentToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const atLimit = userMessageCount >= MAX_MESSAGES;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string, isInitialJD = false) => {
      if (isStreaming || atLimit) return;

      const userMessage: Message = { role: "user", content: text };
      const updatedMessages = [...messages, userMessage];

      if (isInitialJD) {
        setPhase("conversation");
      }

      setMessages(updatedMessages);
      setIsStreaming(true);

      const streamingMessage: Message = {
        role: "assistant",
        content: "",
        reasoning: null,
      };
      setMessages([...updatedMessages, streamingMessage]);

      try {
        const apiMessages = updatedMessages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: apiMessages,
            consent,
            selectedDocs: [],
            mode: "fit",
          }),
        });

        if (!response.ok) {
          const err = await response
            .json()
            .catch(() => ({ error: "Request failed" }));
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: err.error || "Something went wrong. Please try again.",
              reasoning: null,
            };
            return updated;
          });
          setIsStreaming(false);
          return;
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let fullText = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6);
            try {
              const event = JSON.parse(jsonStr);
              if (event.type === "delta") {
                fullText += event.text;
                const reasoningIdx = fullText.indexOf("---reasoning---");
                const displayText =
                  reasoningIdx !== -1
                    ? fullText.slice(0, reasoningIdx).trim()
                    : fullText;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: displayText,
                    reasoning: null,
                  };
                  return updated;
                });
              } else if (event.type === "done") {
                const { answer, reasoning } = parseReasoningBlock(
                  event.text || fullText
                );
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: answer,
                    reasoning,
                  };
                  return updated;
                });
              } else if (event.type === "error") {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: "Something went wrong. Please try again.",
                    reasoning: null,
                  };
                  return updated;
                });
              }
            } catch {
              // skip malformed JSON
            }
          }
        }

        if (!showConsent) {
          setShowConsent(true);
          setShowConsentToast(true);
        }

        if (userMessageCount + 1 >= MAX_MESSAGES) {
          setMessages((prev) => [...prev, SESSION_END_MESSAGE]);
        }
      } catch {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content:
              "Connection error. Please refresh the page and try again.",
            reasoning: null,
          };
          return updated;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming, atLimit, consent, showConsent, userMessageCount]
  );

  if (phase === "input") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="py-12"
      >
        <FitInput
          onSubmit={(jd) => sendMessage(jd, true)}
          disabled={isStreaming}
        />
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)]">
      <div className="md:hidden mb-4">
        <h1 className="text-xl font-[family-name:var(--font-serif)] text-[#1a1a1a]">
          Check Fit
        </h1>
        <p className="mt-1 text-xs text-[#6b6560]">
          Honest fit assessment based on the job description you provided.
        </p>
      </div>

      <div className="hidden md:block mb-6">
        <h1 className="text-xl font-[family-name:var(--font-serif)] text-[#1a1a1a]">
          Check Fit
        </h1>
        <p className="mt-1 text-xs text-[#6b6560]">
          Honest fit assessment based on the job description you provided.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-4">
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            message={msg}
            isStreaming={
              isStreaming && i === messages.length - 1 && msg.role === "assistant"
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* CTA to /chat — shown after assessment completes */}
      {messages.length >= 2 && !isStreaming && !atLimit && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="border border-[#e8e4df] px-4 py-3 mb-4 flex items-center justify-between"
        >
          <p className="text-xs text-[#6b6560]">
            Want to explore Nick&apos;s full background beyond this role?
          </p>
          <Link
            href="/chat"
            className="text-xs font-medium text-[#b45309] hover:text-[#92400e] transition-colors whitespace-nowrap ml-4"
          >
            Chat with AI &rarr;
          </Link>
        </motion.div>
      )}

      <div className="border-t border-[#e8e4df] pt-4 pb-2">
        <ChatInput
          onSend={(text) => sendMessage(text)}
          disabled={isStreaming || atLimit}
          placeholder={
            atLimit
              ? "Session limit reached — reach out to Nick directly"
              : "Ask a follow-up about the assessment..."
          }
        />
        <div className="flex items-center justify-between mt-2 text-[11px] text-[#a69e95]">
          <span>
            {userMessageCount} / {MAX_MESSAGES}
          </span>
          {showConsent && (
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="accent-[#b45309] w-3 h-3"
              />
              <span>Share for improvements</span>
            </label>
          )}
        </div>
      </div>

      {/* Consent toast */}
      <AnimatePresence>
        {showConsentToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 bg-white border border-[#e8e4df] shadow-lg px-5 py-4 max-w-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1a1a1a]">
                  Share this conversation?
                </p>
                <p className="text-xs text-[#6b6560] leading-relaxed mt-1">
                  Help Nick improve this tool — opt in to share for quality
                  improvements. Nothing is logged without your consent.
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => {
                      setConsent(true);
                      setShowConsentToast(false);
                    }}
                    className="text-xs font-medium text-white bg-[#b45309] hover:bg-[#92400e] px-4 py-1.5 transition-colors"
                  >
                    Opt in
                  </button>
                  <button
                    onClick={() => setShowConsentToast(false)}
                    className="text-xs text-[#a69e95] hover:text-[#6b6560] transition-colors"
                  >
                    No thanks
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowConsentToast(false)}
                className="text-[#a69e95] hover:text-[#1a1a1a] transition-colors text-lg leading-none shrink-0"
              >
                &times;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
