"use client";

import { ChangeEvent, useContext, useState } from "react";

import BotMessage from "@/components//functions/BotMessage";
import Input from "@/components/Input";

import { ConversationContext } from "@chatbotkit/react";

export default function WebsiteInput({ message }: { message: string }) {
  const [value, setValue] = useState("");
  const { request } = useContext(ConversationContext);

  return (
    <>
      <BotMessage message={message} />
      <Input
        message={message}
        type="text"
        placeholder="https://"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            request("captureWebsite", {
              website: value,
            });
          }
        }}
      />
    </>
  );
}
