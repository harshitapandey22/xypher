import React, { useEffect, useRef, useState } from "react";
import { useDashboardTour } from "../context/TourContext";
import { STEPS } from "../context/TourContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import teacher from "../assets/teacher.svg";

export default function Walkthrough() {
  const { step, next, prev, endTour } = useDashboardTour();
  const [container, setContainer] = useState(null);
  const boxRef = useRef();

  useEffect(() => {
    if (step === -1) {
      setContainer(null);
      return;
    }

    const { selector } = STEPS[step];
    const target = document.querySelector(selector);
    setContainer(target);
  }, [step]);

  if (step === -1 || !container) return null;

  const { label, offsetX = 0, offsetY = 0 } = STEPS[step];

  return (
    <div
      ref={boxRef}
      style={{
        position: "absolute",
        top: `${offsetY}px`,
        left: `${offsetX}px`,
        zIndex: 9999,
        width: "280px",
        backgroundColor: "#1e1e2f",
        border: "1px solid #8b5cf6",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        color: "white",
      }}
    >
      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
        <img src={teacher} alt="Guide" className="w-20 h-20" />
      </div>

      <button
        onClick={endTour}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        <IoClose size={18} />
      </button>

      <div className="mt-8 mb-3 text-sm">{label}</div>

      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          disabled={step === 0}
          className="text-sm text-purple-400 hover:text-purple-300 disabled:opacity-30"
        >
          <FaChevronLeft className="inline" /> Prev
        </button>
        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === step ? "bg-purple-500" : "bg-gray-500"
              }`}
            ></span>
          ))}
        </div>
        <button
          onClick={next}
          disabled={step === STEPS.length - 1}
          className="text-sm text-purple-400 hover:text-purple-300 disabled:opacity-30"
        >
          Next <FaChevronRight className="inline" />
        </button>
      </div>
    </div>
  );
}
