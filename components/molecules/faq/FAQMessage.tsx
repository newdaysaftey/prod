"use client";

import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

interface Message {
  question: string;
  answer?: string;
  isLoading?: boolean;
}

interface FAQMessageProps {
  message: Message;
}

export function FAQMessage({ message }: FAQMessageProps) {
  return (
    <div className="space-y-4">
      {/* User Question */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 items-start"
      >
        <div className="bg-indigo-500 p-2 rounded-full">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-3">
          <p className="text-gray-800 dark:text-gray-200">{message.question}</p>
        </div>
      </motion.div>

      {/* Bot Answer */}
      {(message.answer || message.isLoading) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 items-start"
        >
          <div className="bg-gray-500 p-2 rounded-full">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-gray-900/30 rounded-lg p-3">
            {message.isLoading ? (
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            ) : (
              <p className="text-gray-800 dark:text-gray-200">
                {message.answer}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
