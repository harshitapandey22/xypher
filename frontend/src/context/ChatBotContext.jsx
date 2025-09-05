import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { getTransactions } from "../api/transaction";

const ChatBotContext = createContext();
export const useChatBot = () => useContext(ChatBotContext);

const realityChecks = [
  "💸 You spend like your money insults your ancestors.",
  "📉 Your wallet’s on a spiritual retreat—it might never return.",
  "🧠 Your budgeting strategy is just hope and denial.",
  "🪦 RIP to your savings. They never stood a chance.",
  "🧃 You treat Starbucks like a basic need. It's not.",
  "🛒 You shop like the apocalypse is tomorrow and everything's 70% off.",
  "📆 Reminder: Rent exists. Just like consequences.",
  "📱 Your screen time is high, but so is your food delivery bill.",
  "🧾 You don’t need a financial advisor. You need an intervention.",
  "🎢 Your expenses have more plot twists than a Netflix series.",
  "🧸 You treat money like a toy, and now it's broken.",
  "👛 Your wallet is emptier than your fridge. Impressive.",
  "🐷 Even your piggy bank gave up on you.",
  "🚫 'Essential purchase' doesn't mean anime merch every week.",
  "🧙‍♂️ Swiping your card won’t make your debt disappear, wizard.",
  "🦴 Your budget is running on hopes, dreams, and Maggi.",
  "🧯 Your financial situation is a fire drill with no exits.",
  "📦 You order online like it’s your cardio.",
  "🚀 Your spending habits are ready for a moon mission—no return.",
  "🕳 Your bank account is a black hole. Money goes in. Nothing comes out.",
  "🍕 You could’ve bought stock, but you bought stuffed crust.",
  "🦑 Your expenses have more tentacles than logic.",
  "🧊 Your financial plan is just vibes and iced coffee.",
  "🔮 Even astrologers can’t predict your next impulse buy.",
  "🥲 Your 'treat yourself' budget is a self-destruct button.",
  "💰 Your bank balance cosplays as zero daily.",
  "💀 Even your calculator flinched at your expense log.",
  "🐍 You subscribed to more things than you actually use.",
  "🧾 You read your statements like horror stories.",
  "📉 Your savings chart is an Olympic-level dive.",
  "🪑 Your spending habits deserve a TED Talk… on what not to do.",
  "🐌 Your savings grow slower than government paperwork.",
  "📺 Netflix is chill. Your wallet is in therapy.",
  "📦 You order packages like Amazon is a life partner.",
  "🥵 You bought a ₹10k skincare kit. Still broke. Still ugly.",
  "🎉 Congrats! You just impulse-bought another regret.",
  "🧍 Your savings plan is standing still. Like literally—no motion.",
  "🍔 Your food budget is bigger than your future goals.",
  "🕵️‍♂️ Even Sherlock couldn't find your emergency fund.",
  "🛑 Your idea of budgeting is saying 'oops' after checkout.",
  "💵 Your wallet does cardio every time you open Swiggy.",
  "😬 Your credit card is one swipe from cardiac arrest.",
  "🫥 Your money disappears faster than your motivation.",
  "🎈 Your savings popped. Like a balloon. Instantly.",
  "🤹‍♀️ You’re juggling dreams, debt, and delusions.",
  "💡 You don’t need light bulbs—you just keep burning money.",
  "🧽 Your bank account got cleaned harder than your room.",
  "👻 Ghosting responsibilities won’t ghost your bills.",
  "📬 Your account balance sends you emotional damage.",
  "🍟 You had 99 problems, and 98 of them are fries-related.",
  "🫠 Your spending habits are the villain in your own origin story."
];

export function ChatBotProvider({ children }) {
  const { user, accessToken } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi, how can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [allowHistory, setAllowHistory] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [showGame, setShowGame] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    if (open) {
      getTransactions(accessToken).then((r) => setTransactions(r.data));
    }
  }, [open, accessToken]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendBotMessage = async (text) => {
    if (!text) return;
    const userMsg = { role: "user", content: text };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    setShowGame(false);

    const typingMsg = { role: "ai-typing", content: "" };
    setMessages((msgs) => [...msgs, typingMsg]);

    try {
      const chatHistory = messages
        .filter((m) => m.role === "user" || m.role === "ai")
        .map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`)
        .join(" | ");

      const queryString = `Our previous chats: "${chatHistory}" and now my question is: "${text}" and btw my current balance is "${user.balance}" and also note that every transaction is in rupees not dollars`;

      const payload = {
        email: user.email,
        isTransactionAllowed: allowHistory,
        query: queryString,
        transactions: transactions.map((t) => ({
          amount: t.amount,
          type: t.type,
          date: `${t.date.split("T")[0]}T00:00:00`,
          description: t.description,
          category: t.category.name,
        })),
      };

      const res = await axios.post(import.meta.env.VITE_CHATBOT_URL, payload, {
        timeout: 60000,
      });

      const aiText = res.data.received_data;

      await new Promise((resolve) => {
        let idx = 0;
        const interval = setInterval(() => {
          idx++;
          setMessages((msgs) =>
            msgs.map((m) =>
              m.role === "ai-typing"
                ? { ...m, content: aiText.slice(0, idx) }
                : m
            )
          );
          if (idx >= aiText.length) {
            clearInterval(interval);
            resolve();
          }
        }, 20);
      });

      setMessages((msgs) =>
        msgs
          .filter((m) => m.role !== "ai-typing")
          .concat({
            role: "ai",
            content: aiText,
            speak: () => {
              const cleanText = aiText.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");
              const utterance = new SpeechSynthesisUtterance(cleanText);
              utterance.lang = "en-IN";
              utterance.rate = 1.5;
              const voices = window.speechSynthesis.getVoices();
              const indianVoice = voices.find(
                (v) => v.lang === "en-IN" || v.name.toLowerCase().includes("india")
              );
              if (indianVoice) utterance.voice = indianVoice;
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(utterance);
            }
          })
      );
    } catch (err) {
      console.error(err);
      const roast = realityChecks[Math.floor(Math.random() * realityChecks.length)];
      const failMsg = `⚠️ Sorry, I couldn’t get a response. Try again. But while you're here, here's a reality check:\n\n${roast}`;

      await new Promise((resolve) => {
        let idx = 0;
        const interval = setInterval(() => {
          idx++;
          setMessages((msgs) =>
            msgs.map((m) =>
              m.role === "ai-typing"
                ? { ...m, content: failMsg.slice(0, idx) }
                : m
            )
          );
          if (idx >= failMsg.length) {
            clearInterval(interval);
            resolve();
          }
        }, 20);
      });

      setMessages((msgs) =>
        msgs
          .filter((m) => m.role !== "ai-typing")
          .concat({
            role: "ai",
            content: failMsg,
            speak: () => {
              const cleanText = failMsg.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");
              const utterance = new SpeechSynthesisUtterance(cleanText);
              utterance.lang = "en-IN";
              utterance.rate = 1;
              const voices = window.speechSynthesis.getVoices();
              const indianVoice = voices.find(
                (v) => v.lang === "en-IN" || v.name.toLowerCase().includes("india")
              );
              if (indianVoice) utterance.voice = indianVoice;
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(utterance);
            }
          })
      );

      setShowGame(true); // ← RENDER PONG GAME ON FAILURE
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatBotContext.Provider
      value={{
        open,
        setOpen,
        messages,
        setMessages,
        input,
        setInput,
        loading,
        bottomRef,
        allowHistory,
        setAllowHistory,
        sendBotMessage,
        showGame,
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
}
