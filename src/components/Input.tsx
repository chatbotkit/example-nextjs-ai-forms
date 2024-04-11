"use client";

import { useTypingAnimation } from "@/hooks/useTypeAnimation";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  message?: string;
}

export default function Input({ message, ...props }: InputProps) {
  const { isTyping } = useTypingAnimation(message);

  return isTyping ? null : (
    <input
      {...props}
      autoFocus
      className="placeholder-current placeholder:opacity-30 w-full bg-transparent focus:outline-none text-2xl text-white"
    />
  );
}
