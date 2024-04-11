"use client";

import { useContext } from "react";

import BotMessage from "@/components/functions/BotMessage";
import { useTypingAnimation } from "@/hooks/useTypeAnimation";

import { ConversationContext } from "@chatbotkit/react";

export default function YesNoSelectInput({ message }: { message: string }) {
  const { request } = useContext(ConversationContext);
  const { isTyping } = useTypingAnimation(message);

  return (
    <>
      <BotMessage message={message} />
      {!isTyping && (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              request("captureYesNo", {
                answer: true,
              });
            }}
            className="text-white hover:bg-white/20 border border-zinc-500 h-16 rounded-lg px-20"
          >
            Yes
          </button>
          <button
            onClick={(e) => {
              request("captureYesNo", {
                answer: false,
              });
            }}
            className="text-white hover:bg-white/20 border border-zinc-500 h-16 rounded-lg px-20"
          >
            No
          </button>
        </div>
      )}
    </>
  );
}
