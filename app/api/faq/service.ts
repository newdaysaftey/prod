import { BaseService } from "@/app/api/services/base.service";
import { FAQ, FAQResponse } from "@/app/types/global";

// In a real app, this would come from a database
const faqs: FAQ[] = [
  {
    keywords: ["shipping", "delivery", "ship", "receive", "arrive"],
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days.",
  },
  {
    keywords: ["return", "refund", "exchange", "send back"],
    question: "What is your return policy?",
    answer:
      "We offer 30-day returns for unworn items with original packaging. Returns are free for store credit.",
  },
  {
    keywords: ["track", "tracking", "order status", "where", "package"],
    question: "How do I track my order?",
    answer:
      "You can track your order using the tracking link in your shipping confirmation email.",
  },
  {
    keywords: ["payment", "pay", "card", "credit card", "debit"],
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, American Express, and PayPal.",
  },
  {
    keywords: ["size", "sizing", "fit", "measurement", "size chart"],
    question: "How do I find my right size?",
    answer:
      "You can find detailed size charts on each product page. Measure yourself and compare with our size guide for the best fit.",
  },
  {
    keywords: ["cancel", "cancellation", "cancel order"],
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled within 1 hour of placement. After that, please wait for delivery and initiate a return.",
  },
  {
    keywords: ["international", "abroad", "overseas", "country"],
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping typically takes 10-15 business days.",
  },
  {
    keywords: ["discount", "coupon", "promo", "code", "offer"],
    question: "How do I use a discount code?",
    answer:
      "Enter your discount code at checkout in the 'Promo Code' field and click 'Apply' to see your savings.",
  },
  {
    keywords: ["account", "login", "password", "sign in"],
    question: "How do I create an account?",
    answer:
      "Click 'Sign Up' in the top right corner, enter your email and create a password. You can also sign up during checkout.",
  },
  {
    keywords: ["gift", "gift card", "gift certificate"],
    question: "Do you offer gift cards?",
    answer:
      "Yes, digital gift cards are available from $25 to $500. They can be emailed directly to the recipient.",
  },
  {
    keywords: ["warranty", "guarantee", "defect", "damaged"],
    question: "What is your warranty policy?",
    answer:
      "Our products come with a 90-day warranty against manufacturing defects. Contact support with photos of any issues.",
  },
  {
    keywords: ["stock", "availability", "restock", "sold out"],
    question: "When will sold out items be restocked?",
    answer:
      "Sign up for restock notifications on the product page. Most items are restocked within 2-4 weeks.",
  },
  {
    keywords: ["modify", "change", "edit", "update order"],
    question: "Can I modify my order after placing it?",
    answer:
      "Order modifications are possible within 1 hour of placement. Contact customer service immediately for assistance.",
  },
  {
    keywords: ["express", "expedited", "fast shipping", "quick delivery"],
    question: "Is express shipping available?",
    answer:
      "Yes, express shipping (2-3 business days) is available for an additional fee. Select at checkout.",
  },
  {
    keywords: ["bulk", "wholesale", "business", "large order"],
    question: "Do you offer bulk or wholesale pricing?",
    answer:
      "Yes, we offer wholesale pricing for orders over $1000. Contact our business team for a quote.",
  },
];

export class FAQService extends BaseService {
  // Move these to private static class properties
  private static readonly complexityIndicators = [
    "how can i",
    "why does",
    "explain",
    "what happens",
    "technical",
    "problem with",
    "issues with",
    "error",
  ];

  private static readonly greetings = [
    "hello",
    "hi",
    "hey",
    "good morning",
    "good afternoon",
    "good evening",
    "greetings",
  ];

  private static readonly greetingResponses = [
    "Hello! How can I help you today?",
    "Hi there! What can I assist you with?",
    "Hey! What would you like to know?",
    "Welcome! How may I assist you?",
    "Hello! Feel free to ask me any questions about our services.",
  ];

  async getAllFAQs(): Promise<Omit<FAQ, "keywords">[]> {
    try {
      // Simulating database call with Promise
      return Promise.resolve(
        faqs.map(({ question, answer }) => ({
          question,
          answer,
        }))
      );
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      throw new Error("Failed to fetch FAQs");
    }
  }

  async findAnswer(question: string): Promise<FAQResponse> {
    try {
      const userQuestion = question.toLowerCase().trim();

      // Check for greetings first
      if (
        FAQService.greetings.some((greeting) => userQuestion.includes(greeting))
      ) {
        return Promise.resolve({
          answer: this.getRandomGreeting(),
        });
      }

      // Find matching FAQ based on partial keyword matches
      const matchedFAQ = faqs.find((faq) =>
        faq.keywords.some(
          (keyword) =>
            keyword.toLowerCase().includes(userQuestion) ||
            userQuestion.includes(keyword.toLowerCase())
        )
      );

      if (matchedFAQ) {
        return Promise.resolve({
          question: matchedFAQ.question,
          answer: matchedFAQ.answer,
        });
      }

      // Check if question seems complex
      const seemsComplex = FAQService.complexityIndicators.some((indicator) =>
        userQuestion.includes(indicator)
      );

      if (seemsComplex) {
        return Promise.resolve({
          answer:
            "This seems like a complex question. Please contact our support team at support@example.com for detailed assistance.",
        });
      }

      // Default response
      return Promise.resolve({
        answer:
          "I'm sorry, I couldn't find an answer to your question. Please contact our support team for help.",
      });
    } catch (error) {
      console.error("Error processing question:", error);
      throw new Error("Failed to process question");
    }
  }

  private getRandomGreeting(): string {
    const randomIndex = Math.floor(
      Math.random() * FAQService.greetingResponses.length
    );
    return FAQService.greetingResponses[randomIndex];
  }
}

// Export a singleton instance
export const faqService = new FAQService();
