import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs: React.FC = () => {
  return (
    <div className="bg-white text-black">
      {/* Header Section */}
      <div className="text-center py-16 border-b border-black/10 relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">
          Contact Us
        </h1>
        <p className="mt-3 text-neutral-600 text-lg max-w-2xl mx-auto">
          Kalida – Leading Distributor of High-End Construction Materials
        </p>

        {/* Decorative Gradient Blob */}
        <div className="absolute -top-24 right-1/3 w-64 h-64 bg-black/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-black/10 rounded-full blur-3xl"></div>
      </div>

      {/* Contact Info */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {/* Address */}
        <div className="bg-gradient-to-br from-white to-neutral-50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl p-10 text-center border border-neutral-200 transform hover:-translate-y-2">
          <div className="p-5 rounded-2xl bg-black text-white mb-6 shadow-lg inline-flex">
            <MapPin size={30} />
          </div>
          <h2 className="text-xl font-semibold mb-3">Our Location</h2>
          <p className="text-neutral-700 leading-relaxed">
            4478 Northern Ring Rd, Al-Thaqr Square, <br />
            Hittin, Riyadh
          </p>
        </div>

        {/* Phone */}
        <div className="bg-gradient-to-br from-white to-neutral-50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl p-10 text-center border border-neutral-200 transform hover:-translate-y-2">
          <div className="p-5 rounded-2xl bg-black text-white mb-6 shadow-lg inline-flex">
            <Phone size={30} />
          </div>
          <h2 className="text-xl font-semibold mb-3">Call Us</h2>
          <p className="text-neutral-700">+966 11-442-2225</p>
        </div>

        {/* Email */}
        <div className="bg-gradient-to-br from-white to-neutral-50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl p-10 text-center border border-neutral-200 transform hover:-translate-y-2">
          <div className="p-5 rounded-2xl bg-black text-white mb-6 shadow-lg inline-flex">
            <Mail size={30} />
          </div>
          <h2 className="text-xl font-semibold mb-3">Email Us</h2>
          <p className="text-neutral-700">info@kalida.sa</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[450px] mt-10 px-6">
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 transform hover:scale-[1.01] transition-transform duration-500">
          <iframe
            title="Kalida Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.315865787187!2d46.622!3d24.743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0345abcd123%3A0x123456789!2s4478%20Northern%20Ring%20Rd%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1690000000000"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
