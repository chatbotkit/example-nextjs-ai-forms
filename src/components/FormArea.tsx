"use client";

import { useContext } from "react";

import Loader from "@/components/Loader";

import { ConversationContext } from "@chatbotkit/react";
import Link from "next/link";

export default function FormArea(): JSX.Element {
  const { thinking, message, messages, submit } =
    useContext(ConversationContext);

  return (
    <div className="bg-zinc-950 relative w-full h-full px-6 flex-col rounded-xl shadow-xl border border-zinc-200 overflow-hidden">
      {/* Video credit to https://www.pexels.com/@spacetraveler/ */}
      <video
        className="h-full w-full absolute object-cover left-0 opacity-70"
        autoPlay
        muted
        loop
        src="https://videos.pexels.com/video-files/1851190/1851190-uhd_3840_2160_25fps.mp4"
      ></video>
      {!messages.length && (
        <form
          // @ts-ignore
          onSubmit={() => submit("start")}
          className="text-white flex items-center flex-col justify-center h-full pb-20 z-20 relative"
        >
          <h1 className="text-6xl sm:text-8xl tracking-tighter font-semibold text-center max-w-4xl mx-auto text-balance">
            Generative UI with ChatBotKit SDK
          </h1>
          <p className="text-xl opacity-70 text-center mt-4 mb-10 text-balance">
            An example showcasing generative UI using the ChatBotKit SDK
          </p>
          <button
            className="bg-white hover:bg-opacity-70 transition duration-300 hover:scale-95 rounded-full py-2 px-6 text-black font-semibold"
            type="submit"
          >
            Get Started
          </button>
        </form>
      )}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto min-h-[18rem] max-w-[44rem] px-6">
        <div className="relative pb-12">
          {!thinking &&
            !message &&
            messages
              .filter(({ type, children }) => type === "bot" && children)
              .slice(-1)
              .map(({ id, children }) => <div key={id}>{children}</div>)}
          {thinking && <Loader />}
        </div>
      </div>

      <Link
        target="_blank"
        rel="follow"
        href="https://chatbotkit.com/"
        className="absolute bottom-4 left-4 text-center text-xs text-zinc-500 z-30 bg-zinc-600/40 p-3 rounded-xl group"
      >
        <span className="">Made with ❤️ by</span>{" "}
        <span className="font-semibold text-white group-hover:text-zinc-500">
          ChatBotKit
        </span>
      </Link>
    </div>
  );
}
