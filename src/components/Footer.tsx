import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Home as HomeIcon,
  Facebook,
  Linkedin,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const year = new Date().getFullYear();

const Footer: React.FC = () => (
  <footer className="mt-16 bg-gradient-to-r from-blue-50 via-white to-blue-200 text-black">
    <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Company Info */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Kalida</h2>
        <p className="text-sm text-neutral-700">
          Leading Distributor of High-End Construction Materials in Saudi
          Arabia.
        </p>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="font-semibold mb-4">Contact Us</h3>
        <div className="space-y-3 text-sm text-neutral-700">
          <div className="flex items-start gap-2">
            <MapPin size={18} className="text-neutral-500" />
            <span>4478 Northern Ring Rd, Al-Thaqr Square, Hittin, Riyadh</span>
          </div>
          <div className="flex items-start gap-2">
            <Phone size={18} className="text-neutral-500" />
            <span>+966 11-442-2225</span>
          </div>
          <div className="flex items-start gap-2">
            <Mail size={18} className="text-neutral-500" />
            <span>info@kalida.sa</span>
          </div>
        </div>
      </div>

      {/* Useful Links + Social Icons */}
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm text-neutral-700">
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

        {/* Social Icons styled as premium circular buttons */}
        <div className="mt-6 flex gap-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:scale-110 transition transform border border-neutral-200"
          >
            <Facebook size={18} className="text-blue-600" />
          </a>
          <a
            href="https://www.linkedin.com/company/kalida/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:scale-110 transition transform border border-neutral-200"
          >
            <Linkedin size={18} className="text-blue-700" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:scale-110 transition transform border border-neutral-200"
          >
            <X size={18} className="text-black" />
          </a>
          <Link
            to="/"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:scale-110 transition transform border border-neutral-200"
          >
            <HomeIcon size={18} className="text-neutral-700" />
          </Link>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-neutral-200 bg-gradient-to-r from-blue-100 via-white to-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600">
        <p>© {year} Kalida. All rights reserved.</p>
        <p>Made in Saudi Arabia 🇸🇦</p>
      </div>
    </div>
  </footer>
);
export default Footer;
