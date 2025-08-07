import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

const year = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white text-black">
      {/* Top strip */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-500 ring-1 ring-neutral-300/50" />
              <span className="text-xl font-semibold tracking-wide text-black">
                Kalida
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-neutral-500">
              Kalida supplies industrial-grade hardware and tools—reliable,
              precise, and ready for tough jobs.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-neutral-500" />
                <span className="text-neutral-600">
                  Pan‑India shipping • GST Invoicing
                </span>
              </div>
              <a
                href="tel:+919999999999"
                className="flex items-start gap-2 hover:underline text-neutral-600"
              >
                <Phone size={16} className="mt-0.5 text-neutral-500" />
                <span>+91 99999 99999</span>
              </a>
              <a
                href="mailto:support@kalida.in"
                className="flex items-start gap-2 hover:underline text-neutral-600"
              >
                <Mail size={16} className="mt-0.5 text-neutral-500" />
                <span>support@kalida.in</span>
              </a>
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: Facebook, label: "Facebook", href: "#" },
                { Icon: Instagram, label: "Instagram", href: "#" },
                { Icon: Linkedin, label: "LinkedIn", href: "#" },
                { Icon: Youtube, label: "YouTube", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="rounded-xl border border-neutral-200 bg-black/5 p-2 hover:bg-black/10 transition"
                >
                  <Icon size={18} className="text-black" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            <FooterCol title="Shop">
              <FooterLink to="/category/powertools">Power Tools</FooterLink>
              <FooterLink to="/category/handtools">Hand Tools</FooterLink>
              <FooterLink to="/category/fasteners">Fasteners</FooterLink>
              <FooterLink to="/category/electrical">Electrical</FooterLink>
              <FooterLink to="/category/plumbing">Plumbing</FooterLink>
            </FooterCol>

            <FooterCol title="Support">
              <FooterLink to="/help">Help Center</FooterLink>
              <FooterLink to="/shipping">Shipping & Delivery</FooterLink>
              <FooterLink to="/returns">Returns & Warranty</FooterLink>
              <FooterLink to="/bulk-orders">Bulk Orders</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </FooterCol>

            <FooterCol title="Company">
              <FooterLink to="/about">About Kalida</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/press">Press</FooterLink>
              <FooterLink to="/partners">Partners</FooterLink>
              <FooterLink to="/stores">Store Locator</FooterLink>
            </FooterCol>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-black">
                Newsletter
              </h4>
              <p className="mt-3 text-sm text-neutral-500">
                Get deals, launches, and pro tips straight to your inbox.
              </p>
              <form
                className="mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // hook your subscription handler here
                }}
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <div className="flex rounded-xl border border-neutral-200 bg-black/5 focus-within:ring-2 focus-within:ring-black/20">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full bg-transparent px-3 py-2 text-sm text-black outline-none placeholder:text-neutral-400"
                  />
                  <button
                    type="submit"
                    className="group flex items-center gap-1 rounded-r-xl bg-black text-white px-3 py-2 text-sm font-semibold"
                    aria-label="Subscribe"
                  >
                    Subscribe
                    <ArrowRight
                      size={16}
                      className="transition -mr-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-neutral-500">
                  By subscribing, you agree to our{" "}
                  <Link to="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-neutral-500">
            © {year} Kalida. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
            <Link to="/terms" className="hover:underline">
              Terms
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link to="/cookies" className="hover:underline">
              Cookies
            </Link>
            <span className="opacity-60">•</span>
            <span>Made in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol: React.FC<React.PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => (
  <div>
    <h4 className="text-sm font-semibold tracking-wide text-black">{title}</h4>
    <ul className="mt-3 space-y-2">{children}</ul>
  </div>
);

const FooterLink: React.FC<React.PropsWithChildren<{ to: string }>> = ({
  to,
  children,
}) => (
  <li>
    <Link
      to={to}
      className="text-sm text-neutral-500 hover:text-black transition"
    >
      {children}
    </Link>
  </li>
);

export default Footer;
