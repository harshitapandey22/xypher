// src/components/FeatureSection.jsx
import React, { useRef } from "react";
import { motion as Motion, useInView } from "framer-motion";
import { Receipt, Brain, Smartphone, Calendar, Bot } from "lucide-react";
import { TbTargetArrow } from "react-icons/tb";

export default function FeatureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Receipt,
      title: "Expense Tracking",
      description:
        "Automatically log and categorize your expenses for clear insights into your spending habits.",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      icon: Brain,
      title: "Analyze Trends",
      description:
        "Discover what's gaining traction across social media and news platforms.",
      gradient: "from-green-600 to-green-400",
    },
    {
      icon: TbTargetArrow,
      title: "Set Financial Goals",
      description:
        "Plan for a trip, emergency fund, or your next big move — we’ll help you reach it faster.",
      gradient: "from-purple-600 to-purple-400",
    },
    {
      icon: Calendar,
      title: "Reality Check",
      description:
        "Move beyond assumptions with all‑in‑one money management insights.",
      gradient: "from-orange-600 to-orange-400",
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description:
        "Use CapitaClarity anytime, anywhere — it’s optimized for all devices.",
      gradient: "from-red-600 to-red-400",
    },
    {
      icon: Bot,
      title: "Chatbot Assistant",
      description:
        "Have questions? Our 24/7 AI assistant is here to guide you and answer financial queries instantly.",
      gradient: "from-blue-600 to-purple-600",
    },
  ];

  return (
    <section
      id="features"
      ref={ref}
      className="md:py-20 overflow-hidden bg-[var(--bg)] text-[var(--fg)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading with Framer‑Motion reveal */}
        <Motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Everything You Need to Master Your Money
          </h2>
          <p className="text-xl mb-0">
            Take full control of your finances and build a secure financial future.
          </p>
        </Motion.div>

        {/* Grid of feature cards with original CSS hover animation */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => (
            <div
              key={feature.title + idx}
              className="
                group relative
                bg-[var(--card-bg)]
                backdrop-blur-3xl
                rounded-2xl
                p-8
                shadow-white/40
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              {/* subtle gradient overlay on hover */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-r
                  opacity-0
                  group-hover:opacity-5
                  transition-opacity
                  duration-300
                  rounded-2xl
                "
                style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
                }}
              />

              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="mb-6 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
