import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const year = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-black mb-4">
            Kalida
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Leading Distributor of High-End Construction Materials. Providing
            quality and excellence to our customers in Saudi Arabia.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-md font-semibold text-black mb-4">Contact Us</h3>
          <div className="space-y-3 text-sm text-neutral-600">
            <div className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 text-neutral-500" />
              <span>
                4478 Northern Ring Rd, Al-Thaqr Square, Hittin, Riyadh
              </span>
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

        {/* Useful Links */}
        <div>
          <h3 className="text-md font-semibold text-black mb-4">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>
              <Link to="/" className="hover:text-black transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/product" className="hover:text-black transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-black transition">
                Contact
              </Link>
            </li>
          </ul>
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
