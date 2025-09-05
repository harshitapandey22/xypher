import React, { useRef } from "react";
import { motion as Motion, useInView } from "framer-motion";
import { Target, Users, Lightbulb } from "lucide-react";

export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    { icon: Target, title: "Precision", description: "Accurate tracking and forecasting with AI-powered insights" },
    { icon: Users, title: "Simplicity", description: "User-friendly interface designed for everyone" },
    { icon: Lightbulb, title: "Innovation", description: "Cutting-edge technology for smarter financial decisions" },
  ];

  return (
    <section
      id="about"
      className="py-10 md:py-20 overflow-hidden bg-[var(--bg)] text-[var(--fg)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Why We Built This
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to democratize financial planning and make
            intelligent money management accessible to everyone.
          </p>
        </Motion.div>

        <div className="w-full grid lg:grid-cols-2 gap-12 items-center mb-16">
          <Motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/img/aboutillus.jpg"
              alt="About Us Hero"
              className="w-full h-auto rounded-lg border-2 border-[var(--accent)]"
            />
          </Motion.div>

          <Motion.div
            className="space-y-8 h-full flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {values.map((val, idx) => (
              <Motion.div
                key={val.title}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
              >
                <div className="bg-[var(--accent)] p-3 rounded-lg shadow-md icon-gradient">
                  <val.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">{val.title}</h4>
                  <p>{val.description}</p>
                </div>
              </Motion.div>
            ))}

            <div
              className="quote-box bg-[var(--bg)] backdrop-blur-2xl p-6 rounded-lg shadow-lg border-l-4 border-[var(--accent)]"
            >
              <p className="font-medium">
                "Our vision is to make financial planning as simple as checking
                your email yet as powerful as having a personal financial advisor."
              </p>
              <p className="font-bold mt-2">– The People Behind CapitaClarity</p>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
