import React, { useState, useRef } from "react";
import { motion as Motion, useInView } from "framer-motion";
import { Send, Mail, Phone } from "lucide-react";
import { MdContactSupport } from "react-icons/md";
import { sendContactMessage } from "../api/contact";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactMessage(formData);
      alert("Thanks! We received your message.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact API error:", err);
      alert("Sorry, something went wrong. Please try again.");
    }
  };

  const handleChange = (e) =>
    setFormData(fd => ({ ...fd, [e.target.name]: e.target.value }));

  const contactInfo = [
    { icon: Mail, title: "Email Us", content: "dolly8842vsecap@gmail.com", description: "Send us an email anytime" },
    { icon: Phone, title: "Call Us", content: "+91-7985008591", description: "We are available for calls" },
    { icon: MdContactSupport, title: "Support Hours", content: "Mon–Fri, 9am–6pm IST", description: "" },
  ];

  return (
    <section id="contact" className="md:py-20 overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Let’s Connect
          </h2>
          <p className="text-xl mb-0">
            Have feedback, questions, or want to collaborate? We’d love to hear from you.
          </p>
        </Motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            {contactInfo.map((info, idx) => (
              <Motion.div
                key={info.title}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                <div className="bg-[var(--accent)] p-3 rounded-lg">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                  <p className="font-medium mb-1 text-[var(--accent)]">{info.content}</p>
                  <p className="text-sm">{info.description}</p>
                </div>
              </Motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <Motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="form-wrapper bg-[var(--bg)] rounded-2xl shadow-lg p-8 border-2 border-[var(--accent)]"
            >
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["name","email"].map((field, i) => (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium mb-2"
                      >
                        {field === "name" ? "Your Name" : "Email Address"}
                      </label>
                      <input
                        type={field==="email"?"email":"text"}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        placeholder={`Enter your ${field}`}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] text-[var(--fg)] border-2 border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] transition-colors duration-200"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] text-[var(--fg)] border-2 border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] transition-colors duration-200 resize-none"
                  />
                </div>

                <Motion.button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 bg-[var(--accent)] text-[var(--bg)] hover:opacity-90 transition"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5 text-white" />
                  <span>Send Message</span>
                </Motion.button>
              </form>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
