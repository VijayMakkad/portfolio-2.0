"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle, Sparkles } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";

interface ChatConfig {
  modelName: string;
  modelConfig: Record<string, unknown>;
  botName: string;
  initialPrompt: string;
}

interface Message {
  role: "user" | "bot";
  content: string;
}

const quickPrompts = [
  "What are Vijay's skills?",
  "Tell me about his projects",
  "Work experience?",
  "How to contact him?",
];

const initialHistory: Message[] = [
  {
    role: "bot",
    content:
      "Hey! I'm VM Bot 👋 — ask me anything about Vijay's background, skills, projects, or experience!",
  },
];

const formatMessage = (text: string): string => {
  let formatted = text;
  formatted = formatted.replace(/^# (.*$)/gm, "<h3 class='font-bold text-base mt-3 mb-1'>$1</h3>");
  formatted = formatted.replace(/^## (.*$)/gm, "<h4 class='font-semibold text-sm mt-2 mb-1'>$1</h4>");
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(
    /\b((https?:\/\/|www\.)[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)/g,
    (url) => {
      let href = url;
      if (!href.startsWith("http")) href = `https://${href}`;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-[var(--brand-strong)] underline underline-offset-2">${url}</a>`;
    }
  );

  const lines = formatted.split("\n");
  let inList = false;
  const result: string[] = [];
  let listItems: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("*")) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      listItems.push(`<li class="ml-4 text-sm">${trimmed.substring(1).trim()}</li>`);
    } else {
      if (inList) {
        result.push(`<ul class="list-disc my-1">${listItems.join("")}</ul>`);
        listItems = [];
        inList = false;
      }
      if (trimmed) result.push(`<p class="text-sm leading-relaxed">${trimmed}</p>`);
    }
  }
  if (inList) result.push(`<ul class="list-disc my-1">${listItems.join("")}</ul>`);

  return result.join("");
};

const ChatBot: React.FC<{ config: ChatConfig }> = ({ config }) => {
  const [messages, setMessages] = useState<Message[]>(initialHistory);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<ReturnType<Awaited<ReturnType<GoogleGenerativeAI["getGenerativeModel"]>>["startChat"]> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  const handleFabMove = (e: React.MouseEvent) => {
    if (!fabRef.current) return;
    const rect = fabRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    fabRef.current.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
  };

  const handleFabLeave = () => {
    if (fabRef.current) {
      fabRef.current.style.transform = "translate(0px, 0px)";
    }
  };

  useEffect(() => {
    const initGemini = async () => {
      try {
        const genAI = new GoogleGenerativeAI(
          process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
        );
        const model = genAI.getGenerativeModel({
          model: config.modelName,
          generationConfig: config.modelConfig as Parameters<typeof model.generateContent>[0] extends { generationConfig: infer C } ? C : never,
        });
        const session = model.startChat({
          history: [
            { role: "user", parts: [{ text: config.initialPrompt }] },
            { role: "model", parts: [{ text: "I am now ready to function as VM Bot!" }] },
          ],
        });
        setChatSession(session);
      } catch (error) {
        console.error("Error initializing Gemini:", error);
      }
    };
    initGemini();
  }, [config]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen]);

  const handleSubmit = async (text?: string) => {
    const userMessage = (text || input).trim();
    if (!userMessage || !chatSession) return;

    setShowQuickPrompts(false);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    try {
      const result = await chatSession.sendMessage(userMessage);
      const response = await result.response;
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: response.text() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I'm having trouble responding. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] rounded-2xl glass-panel overflow-hidden flex flex-col shadow-2xl neon-glow ring-1 ring-[var(--brand-strong)]/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-strong)] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {config.botName}
                  </p>
                  <p className="text-[10px] text-[var(--text-secondary)] font-mono">
                    Powered by Gemini
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsChatOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-[var(--text-secondary)]" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[50vh]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-[var(--brand-strong)] text-white rounded-br-md"
                        : "bg-[var(--surface-elevated)] text-[var(--text-primary)] rounded-bl-md"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(msg.content),
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Quick Prompts */}
              {showQuickPrompts && messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {quickPrompts.map((prompt) => (
                    <motion.button
                      key={prompt}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSubmit(prompt)}
                      className="px-3 py-1.5 text-xs rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--brand-strong)] hover:text-[var(--brand-strong)] transition-colors cursor-pointer"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[var(--surface-elevated)] px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[var(--brand-strong)]"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleFormSubmit}
              className="p-3 border-t border-[var(--border-subtle)] flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Vijay..."
                disabled={!chatSession}
                className="flex-1 bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] text-sm px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] focus:border-[var(--brand-strong)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-strong)] transition-all"
              />
              <motion.button
                type="submit"
                disabled={!chatSession || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-[var(--brand-strong)] text-white disabled:opacity-30 cursor-pointer transition-opacity"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB — magnetic pointer-follow + pulsing ring */}
      <motion.button
        ref={fabRef}
        onClick={() => setIsChatOpen(!isChatOpen)}
        onMouseMove={handleFabMove}
        onMouseLeave={handleFabLeave}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-[var(--brand-strong)] text-white flex items-center justify-center shadow-neon cursor-pointer will-change-transform"
        whileTap={{ scale: 0.9 }}
        style={{
          transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        aria-label="Toggle chat"
      >
        {/* Pulse ring */}
        {!isChatOpen && (
          <span className="absolute inset-0 rounded-2xl bg-[var(--brand-strong)] animate-pulse-ring" />
        )}
        <AnimatePresence mode="wait">
          {isChatOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ChatBot;