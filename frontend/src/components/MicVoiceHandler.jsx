import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate, useLocation } from "react-router-dom";
import { Mic } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import {
  login,
  signup,
  getTransactions,
  createTransaction,
  getCategories,
  createCategory,
  getGoals,
  createGoal,
  forecast,
  getMe,
  setBalanceLimit,
} from "../api";
import { useChatBot } from "../context/ChatBotContext";

export default function MicVoiceHandler() {
  const { accessToken, setAuth, logout: performLogout } = useAuthStore();
  const { sendBotMessage, setOpen: openChatBot } = useChatBot();

  const navigate = useNavigate();
  const location = useLocation();

  const { transcript, interimTranscript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition({ continuous: true, language: "en-IN", interimResults: true });

  const [micOn, setMicOn] = useState(false);

  useEffect(() => {
    if (!micOn && transcript.trim()) {
      console.log("[✅ Final] →", transcript);
      handleCommand(transcript.toLowerCase().trim());
      resetTranscript();
    }
  }, [micOn]);

  function handleCommand(cmd) {
    console.log("[🧠 Command] →", cmd);

    let m = cmd.match(/take me to (home|login|dashboard)/);
    if (m) {
      const dest = m[1] === "home" ? "/" : m[1] === "dashboard" ? "/dashboard" : "/auth";
      if (dest !== location.pathname) navigate(dest);
      return;
    }

    if (cmd.includes("scroll to bottom")) return window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    if (cmd.includes("scroll to top")) return window.scrollTo({ top: 0, behavior: "smooth" });

    if (cmd.includes("log out")) {
      performLogout().then(() => navigate("/"));
      return;
    }

    if (cmd.includes("toggle colour blind mode")) {
      document.documentElement.classList.toggle("colorblind-theme");
      return;
    }

    m = cmd.match(/set language to (.+)/);
    if (m) {
      const spokenLang = m[1];
      const langMap = {
        english: "en",
        hindi: "hi",
        bengali: "bn",
        telugu: "te",
        marathi: "mr",
        tamil: "ta",
        urdu: "ur",
        gujarati: "gu",
        bhojpuri: "bho",
        kannada: "kn",
        malayalam: "ml",
        punjabi: "pa",
        spanish: "es",
        french: "fr",
        arabic: "ar",
        russian: "ru",
        portuguese: "pt",
      };
      const code = langMap[spokenLang];
      if (code) {
        document.cookie = `googtrans=/en/${code}; path=/`;
        setTimeout(() => window.location.reload(), 100);
      }
      return;
    }

    if (location.pathname === "/auth") {
      m = cmd.match(/login with email (.+) and password (.+)/);
      if (m) {
        const [, email, password] = m;
        return login({ email, password })
          .then((res) => {
            setAuth({ user: res.data.user, token: res.data.token });
            navigate("/dashboard");
          })
          .catch(() => alert("Login failed"));
      }

      m = cmd.match(/sign up with email (.+) and password (.+)/);
      if (m) {
        const [, email, password] = m;
        return signup({ email, password })
          .then(() => alert("Signup successful; please log in"))
          .catch(() => alert("Signup failed"));
      }
      return;
    }

    if (location.pathname === "/dashboard") {
      m = cmd.match(/create a (income|expense) with rs ([0-9]+) title (.+?) and category (.+)/);
      if (m) {
        const [, type, amt, title, category] = m;
        openChatBot(true);

        getCategories(accessToken).then(res => {
          const cats = res.data.map(c => c.name.toLowerCase());
          const matched = cats.includes(category.toLowerCase());

          const addTxn = () => {
            createTransaction({ type, amount: +amt, description: title, categoryName: category }, accessToken)
              .then(() => {
                alert("Transaction created via voice");
                window.location.reload();
              })
              .catch(err => {
                console.error("Failed to create transaction:", err);
                alert("Transaction failed");
              });
          };

          if (!matched) {
            createCategory(category, accessToken).then(() => {
              console.log("New category added:", category);
              addTxn();
            }).catch(console.error);
          } else {
            addTxn();
          }
        });
        return;
      }

      m = cmd.match(/create a goal of (.+?) with target ([0-9]+)/);
      if (m) {
        const [, name, target] = m;
        return createGoal({ name, target: parseFloat(target) }, accessToken)
          .then(() => {
            alert(`Goal "${name}" with ₹${target} created`);
            window.location.reload();
          })
          .catch(err => {
            console.error("Goal creation failed:", err);
            alert("Failed to create goal");
          });
      }

      m = cmd.match(/set balance limit to ([0-9]+)/);
      if (m) {
        const limit = +m[1];
        return setBalanceLimit({ initialBalance: limit, dailyLimit: 0 }, accessToken)
          .then(() => alert("Balance limit set"))
          .catch(console.error);
      }

      if (cmd.includes("forecast my expenses")) {
        return getMe(accessToken)
          .then((r) => Promise.all([getTransactions(accessToken), forecast(r.data, r.data.transactions)]))
          .then(([, data]) => console.log("📈 Forecast data:", data))
          .catch(console.error);
      }

      m = cmd.match(/send a message to chatbot[:]? (.+)/);
      if (m) {
        const msg = m[1];
        openChatBot(true);
        sendBotMessage(msg);
        return;
      }
    }

    console.warn("[❌ Unknown command]");
  }

  function toggleMic() {
    if (!browserSupportsSpeechRecognition) return alert("Speech recognition not supported");
    if (micOn) {
      SpeechRecognition.stopListening();
      setMicOn(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening();
      setMicOn(true);
    }
  }

  return (
    <>
      <button
        onClick={toggleMic}
        style={{
          position: "fixed",
          width: 64,
          height: 64,
          bottom: 24,
          right: 120,
          background: micOn ? "#dbb2fe" : "#9814fc",
          color: "#fff",
          border: "none",
          padding: 12,
          borderRadius: "50%",
          cursor: "pointer",
          zIndex: 10000,
          textAlign: "center",
          alignItems: "center",
          paddingLeft: "auto",
          paddingRight: "auto",
          display: "flex",
          justifyContent: "center",   
        }}
        title={micOn ? "Stop Listening" : "Start Listening"}
        className="voice-toggle-btn"
      >
        <Mic size={30} />
      </button>

      {micOn && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 20,
            width: 300,
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: 4,
            fontFamily: "poppins, sans-serif",
            fontSize: 12,
            zIndex: 9998,
            pointerEvents: "none",
          }}
        >
          <div><strong>🎧 Live:</strong> {interimTranscript}</div>
          <div><strong>✅ Final:</strong> {transcript}</div>
        </div>
      )}
    </>
  );
}
