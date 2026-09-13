// WHAT THIS FILE DOES: The fixed list of social platforms this site can
// link to, each with its label, a matching icon, and a placeholder example
// URL shown in the admin form. Used by both the admin "Contact & Social"
// form and the public SocialLinksRow component, so both always agree on
// which platforms exist and what they're called.

import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
  FaThreads,
  FaPinterest,
  FaGithub,
} from "react-icons/fa6";

export const SOCIAL_PLATFORMS = [
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedin, placeholder: "https://linkedin.com/company/yourbusiness" },
  { key: "instagram", label: "Instagram", icon: FaInstagram, placeholder: "https://instagram.com/yourbusiness" },
  { key: "facebook", label: "Facebook", icon: FaFacebook, placeholder: "https://facebook.com/yourbusiness" },
  { key: "youtube", label: "YouTube", icon: FaYoutube, placeholder: "https://youtube.com/@yourbusiness" },
  { key: "twitter", label: "X / Twitter", icon: FaXTwitter, placeholder: "https://x.com/yourbusiness" },
  { key: "threads", label: "Threads", icon: FaThreads, placeholder: "https://threads.net/@yourbusiness" },
  { key: "pinterest", label: "Pinterest", icon: FaPinterest, placeholder: "https://pinterest.com/yourbusiness" },
  { key: "github", label: "GitHub", icon: FaGithub, placeholder: "https://github.com/yourbusiness" },
];

// Turns whatever digits/spaces/symbols were typed for the WhatsApp number
// into a working wa.me link. Keeps only digits, since that's all wa.me
// accepts — a "+" or spaces in front would break the link.
export function buildWhatsAppLink(rawNumber) {
  const digitsOnly = (rawNumber || "").replace(/\D/g, "");
  if (!digitsOnly) return "";
  return `https://wa.me/${digitsOnly}`;
}

// Turns a typed phone number into a tel: link, keeping a leading "+" if
// present (international format) but stripping spaces/dashes/brackets,
// which some phones don't dial correctly.
export function buildTelLink(rawNumber) {
  if (!rawNumber) return "";
  const cleaned = rawNumber.replace(/[^\d+]/g, "");
  return cleaned ? `tel:${cleaned}` : "";
}
