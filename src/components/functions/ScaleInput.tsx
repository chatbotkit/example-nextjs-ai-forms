"use client";

import { useContext } from "react";

import BotMessage from "@/components/functions/BotMessage";
import { useTypingAnimation } from "@/hooks/useTypeAnimation";

import { ConversationContext } from "@chatbotkit/react";

export default function ScaleInput({ message }: { message: string }) {
  const { request } = useContext(ConversationContext);
  const { isTyping } = useTypingAnimation(message);

  return (
    <>
      <BotMessage message={message} />

      {!isTyping && (
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 10 }).map((item, index) => (
            <button
              onClick={(e) => {
                request("captureScale", {
                  scale: index,
                });
              }}
              className="text-white border border-zinc-500 rounded-lg h-16 w-16 flex items-center justify-center hover:bg-white/20"
            >
              {index}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
