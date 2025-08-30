import React, { useState } from "react";
import { api } from "../utils/api";
import {
  Mail,
  User,
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ContactUs: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = !!(fullName.trim() && email.trim() && note.trim());

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const payload = {
        full_name: fullName,
        email,
        note,
      };

      const response = await api.contact.contact(payload); // 👈 API call
      console.log("API Response:", response);

      setSuccess(true);
      setFullName("");
      setEmail("");
      setNote("");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-neutral-100 text-black min-h-screen">
      {/* Header */}
      <div className="text-center py-16 border-b border-black/10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Contact Us
        </h1>
        <p className="mt-3 text-neutral-600 text-lg max-w-2xl mx-auto">
          Kalida – Leading Distributor of High-End Construction Materials
        </p>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white shadow-2xl rounded-3xl p-10 border border-neutral-200">
          {/* Full Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <User
                className="absolute left-3 top-3 text-neutral-400"
                size={20}
              />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-black outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3 text-neutral-400"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-black outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Note */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Note</label>
            <div className="relative">
              <MessageSquare
                className="absolute left-3 top-3 text-neutral-400"
                size={20}
              />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                rows={5}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-black outline-none"
                placeholder="I want to know more about your products..."
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !isFormValid}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-semibold hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>

          {/* Success/Error Messages */}
          {success && (
            <div className="flex items-center justify-center gap-2 text-green-700 mt-6 p-3 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle size={20} /> <span>Message sent successfully!</span>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center gap-2 text-red-700 mt-6 p-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle size={20} /> <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
