"use client";

import { useTypingAnimation } from "@/hooks/useTypeAnimation";

export default function BotMessage({ message }: { message?: string }) {
  const { displayedText, isTyping } = useTypingAnimation(message);

  return (
    <h2 className="leading-tight text-4xl mb-6 text-white">
      {displayedText}
      {isTyping && (
        <span className="inline-block h-8 w-1 bg-zinc-200 animate-blink"></span>
      )}
    </h2>
  );
}
