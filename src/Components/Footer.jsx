import React from "react";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#010a13] pt-20 pb-10 px-6 relative overflow-hidden text-white">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 blur-[120px] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">

        {/* Column 1 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-6 bg-blue-500 rounded-sm"></div>
            <span className="text-2xl font-extrabold tracking-tight">VirTuo</span>
          </div>

          <p className="text-gray-400 leading-relaxed">
            The personal portfolio category includes websites or physical displays.
          </p>

          <div className="flex gap-3">
            {[FaInstagram, FaLinkedin, FaXTwitter, FaFacebookF].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"
              >
                <Icon size={18} />
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-bold mb-6">Quick Link</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="text-blue-400 border-b-2 border-blue-400 w-fit cursor-pointer">
              About Me
            </li>
            <li className="hover:text-white cursor-pointer">Service</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Blog Post</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-bold mb-6">Contact</h3>
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <Phone size={18} className="text-blue-400" />
              <span className="text-gray-300">017345 678 9101</span>
            </li>

            <li className="flex items-center gap-4">
              <MapPin size={18} className="text-blue-400" />
              <span className="text-gray-300">Cumilla, Bangladesh</span>
            </li>

            <li className="flex items-center gap-4">
              <Mail size={18} className="text-blue-400" />
              <span className="text-gray-300">abcd@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="bg-[#021324]/50 border border-gray-800 p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>

          <p className="text-gray-400 text-sm mb-6">
            The personal portfolio category includes websites or representation
          </p>

          <div className="relative">
            <input
              type="email"
              placeholder="Your e-mail"
              className="w-full bg-transparent border border-gray-700 rounded-full py-3 px-6 outline-none focus:border-blue-500"
            />

            <button className="absolute right-1 top-1 bottom-1 px-4 bg-blue-500 rounded-full hover:bg-blue-600 transition-all">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© 2026 InversWeb | All Rights Reserved</p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer">Terms & Condition</span>
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Contact Us</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;