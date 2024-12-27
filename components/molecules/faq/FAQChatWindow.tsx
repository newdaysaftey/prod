"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FAQMessage } from "./FAQMessage";
import { useFAQ } from "@/lib/FE/hooks/useFAQ";

interface FAQChatWindowProps {
  onClose: () => void;
}

export function FAQChatWindow({ onClose }: FAQChatWindowProps) {
  const [question, setQuestion] = useState("");
  const { askQuestion, messages, isLoading } = useFAQ();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    await askQuestion(question);
    setQuestion("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="absolute bottom-16 right-0 w-[400px] sm:w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-indigo-500 p-4">
        <h2 className="text-white font-semibold">FAQ Chat</h2>
        <p className="text-indigo-100 text-sm">Ask us anything!</p>
      </div>

      {/* Messages */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <p>Welcome! How can we help you today?</p>
            <p className="text-sm mt-2">Try asking about:</p>
            <ul className="text-sm mt-1">
              <li>• Product sizes and fit</li>
              <li>• Shipping information</li>
              <li>• Return policy</li>
            </ul>
          </div>
        ) : (
          messages.map((message, index) => (
            <FAQMessage key={index} message={message} />
          ))
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t dark:border-gray-700"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!question.trim() || isLoading}
            className="bg-indigo-500 text-white p-2 rounded-lg disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
