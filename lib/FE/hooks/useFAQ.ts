"use client";

import { useState } from "react";
import { faqSection } from "../api";

interface Message {
  question: string;
  answer?: string;
  isLoading?: boolean;
}

export function useFAQ() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async (question: string) => {
    setIsLoading(true);
    const newMessage: Message = { question, isLoading: true };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await faqSection(question);
      const answer = response.data.answer;
      setMessages((prev) =>
        prev.map((msg) => (msg === newMessage ? { question, answer } : msg))
      );
      console.log(answer);
    } catch (error) {
      console.log(error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg === newMessage
            ? {
                question,
                answer:
                  "Sorry, I couldn't process your question. Please try again.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    askQuestion,
  };
}
