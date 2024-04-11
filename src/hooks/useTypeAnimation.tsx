import { useState, useEffect } from "react";

export function useTypingAnimation(text: string | undefined) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (text) {
      let currentText = "";
      let index = 0;
      const intervalId = setInterval(() => {
        currentText += text[index];
        setDisplayedText(currentText);
        index++;
        if (index === text.length) {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, 20); // Typing speed
      return () => clearInterval(intervalId);
    }
  }, [text]);

  return { displayedText, isTyping };
}
