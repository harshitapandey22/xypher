import React from "react";
import { LuBotMessageSquare, LuVolume2 } from "react-icons/lu";
import { useChatBot } from "../context/ChatBotContext";
import PongGame from "./PongGame";

export default function ChatBot() {
  const {
    open,
    setOpen,
    messages,
    input,
    setInput,
    loading,
    bottomRef,
    allowHistory,
    setAllowHistory,
    sendBotMessage,
    showGame,
  } = useChatBot();

  const sendMessage = (e) => {
    e.preventDefault();
    sendBotMessage(input);
  };

  const handleSpeak = (msg) => {
    if (msg?.speak) msg.speak();
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="chatbot-toggle-btn fixed bottom-6 right-6 w-16 h-16 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 rounded-full text-white flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75"
      >
        <LuBotMessageSquare size={30} />
      </button>

      {open && (
        <div className="fixed bottom-28 right-6 w-[480px] h-[650px] bg-gray-900 text-gray-100 p-6 rounded-xl shadow-2xl flex flex-col border border-purple-700/50 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-700">
            <h2 className="font-bold text-xl text-white">Finance Bot</h2>
            <label className="text-xs flex items-center text-gray-400 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={allowHistory}
                onChange={() => setAllowHistory((h) => !h)}
                className="mr-2 h-4 w-4 rounded form-checkbox accent-purple-600 focus:ring-purple-500 transition-colors duration-200"
              />
              Share transactions
            </label>
          </div>

          <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`my-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`relative max-w-full flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`relative px-5 py-3 rounded-2xl text-base shadow ${
                      m.role === "user"
                        ? "bg-purple-600 text-white inline-block whitespace-pre-wrap max-w-fit"
                        : "bg-gray-700 text-gray-200 inline-block whitespace-pre-wrap max-w-[70%]"
                    }`}
                  >
                    {m.content}
                    {m.role === "ai" && m.speak && (
                      <button
                        onClick={() => handleSpeak(m)}
                        className="absolute bottom-2 right-3 text-gray-400 hover:text-white transition"
                      >
                        <LuVolume2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-center text-gray-400 text-sm my-3 animate-pulse">
                💭 Finance advisor thinking...
              </div>
            )}

            {showGame && <PongGame />}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={sendMessage}
            className="flex space-x-3 pt-5 border-t border-gray-700"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-600 rounded-lg px-4 py-3 text-sm bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-200"
              placeholder="Ask a question..."
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white px-5 py-3 rounded-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75"
              disabled={loading}
            >
              Send
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #222;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8b5cf6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7c3aed;
        }
      `}</style>
    </>
  );
}
