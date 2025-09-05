import { Heart, Phone } from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-black/30 text-gray-300 py-10 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand + Mission */}
        <div>
          <h2 className="text-2xl font-bold text-white">CapitaClarity</h2>
          <p className="mt-2 text-sm text-gray-400">
            Because Sometimes Your Wallet Needs the Truth.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <p className=" flex gap-2 hover:text-blue-400">
            <MdEmail size={24} className="text-blue-600" />{" "}
            <a href="mailto:dolly8842vsecap@gmail.com">
              dolly8842vsecap@gmail.com
            </a>
          </p>
          <p className="flex gap-2 hover:text-blue-400">
            <Phone size={24} className="text-blue-600" />{" "}
            <a href="tel:+917985008591">+91-7985008591</a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full mt-10 pt-5 border-t border-zinc-700 flex flex-col md:flex-row justify-between items-center">
        © {new Date().getFullYear()} CapitaClarity. All rights reserved.
        <p className=" flex items-center justify-center gap-2 mt-2">
          Made with <FaHeart size={20} className="text-pink-600" /> by Team
          Nemolly
        </p>
        <div className="flex  my-4 gap-4 md:gap-2">
          <a href="#privacy" className="hover:text-white hover:underline">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-white hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
