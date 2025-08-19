import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const year = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-semibold text-black mb-6">
          Kalida - Leading Distributor of High-End Construction Materials
        </h2>

        {/* Contact Info */}
        <div className="space-y-4 text-sm text-neutral-600">
          <div className="flex items-start gap-2">
            <MapPin size={18} className="mt-0.5 text-neutral-500" />
            <span>4478 Northern Ring Rd, Al-Thaqr Square, Hittin, Riyadh</span>
          </div>

          <div className="flex items-start gap-2">
            <Phone size={18} className="mt-0.5 text-neutral-500" />
            <span>+966 11-442-2225</span>
          </div>

          <div className="flex items-start gap-2">
            <Mail size={18} className="mt-0.5 text-neutral-500" />
            <span>info@kalida.sa</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-neutral-500">
            © {year} Kalida. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500">Made in Saudi Arabia 🇸🇦</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
