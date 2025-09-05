import React, { createContext, useContext, useState } from "react";

const TourContext = createContext();
export const useDashboardTour = () => useContext(TourContext);

export const STEPS = [
  {
    selector: ".create-transaction-btn",
    label: "Click here to add a new Income or Expense.",
    offsetX: 300,
    offsetY: 30,
  },
  {
    selector: ".daily-limit-box",
    label: "This shows how much of your daily limit remains.",
    offsetX: 300,
    offsetY: 30,
  },
  {
    selector: ".goals-list",
    label: "Here you can view and add your financial goals.",
    offsetX: 300,
    offsetY: -100,
  },
  {
    selector: ".forecast-graph",
    label: "This graph shows your predicted month‑end balance.",
    offsetX: 800,
    offsetY: 430,
  },
  {
    selector: ".pie-chart-box",
    label: "Your spending breakdown by category appears here.",
    offsetX: 290,
    offsetY: -100,
  },
  {
    selector: ".transaction-list",
    label: "All your recent transactions are listed here.",
    offsetX: 150,
    offsetY: 100,
  },
  {
    selector: ".chatbot-toggle-btn",
    label: "Chat with our Finance Bot for insights.",
    offsetX: 150,
    offsetY: 800,
  },
  {
    selector: ".voice-toggle-btn",
    label: "Use voice commands by toggling this mic button.",
    offsetX: 50,
    offsetY: 800,
  },
];
export function TourProvider({ children }) {
  const [step, setStep] = useState(-1);

  const startTour = () => setStep(0);
  const endTour   = () => setStep(-1);
  const next      = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev      = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <TourContext.Provider value={{ step, startTour, endTour, next, prev }}>
      {children}
    </TourContext.Provider>
  );
}
