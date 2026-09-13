// WHAT THIS FILE DOES: The public "Contact" page, visible at /contact.
// Visitors fill in the form and click "Send Enquiry" — no page reload, no
// login needed. On success it's replaced with a thank-you message; on
// failure everything they typed stays exactly as it was, with a clear
// error instead. Also shows contact details alongside the form. Runs in
// the browser because it reacts to typing and the button click.

"use client";

import { useState } from "react";
import { addEnquiry } from "@/lib/firestore";
import {
  isValidEmail,
  hasReachedEnquiryLimit,
  recordEnquirySubmission,
} from "@/lib/utils";
import { countries } from "@/data/countries";

const NEED_OPTIONS = ["Website", "Mobile App", "Both", "Not sure yet"];

const BUDGET_OPTIONS = [
  "Under ₹50,000 (Under $600)",
  "₹50,000 – ₹2,00,000 ($600 – $2,400)",
  "₹2,00,000 – ₹5,00,000 ($2,400 – $6,000)",
  "₹5,00,000+ ($6,000+)",
];

const INPUT_CLASSES =
  "mt-1 w-full rounded-lg border border-white/10 bg-card px-4 py-3 text-foreground outline-none focus:border-accent";

const INITIAL_VALUES = {
  fullName: "",
  email: "",
  phone: "",
  country: "India",
  needType: "",
  budgetRange: "",
  message: "",
};

export default function ContactPage() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validate() {
    const nextErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = "Please enter your name.";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(values.email)) {
      nextErrors.email = "That doesn't look like a valid email address.";
    }
    if (!values.country.trim()) {
      nextErrors.country = "Please choose a country.";
    }
    if (!values.needType.trim()) {
      nextErrors.needType = "Please choose what you need.";
    }
    if (!values.message.trim()) {
      nextErrors.message = "Please write a short message.";
    } else if (values.message.trim().length < 20) {
      nextErrors.message = "Please write at least 20 characters.";
    }

    return nextErrors;
  }

  async function handleSubmit() {
    setSubmitError("");

    if (hasReachedEnquiryLimit()) {
      setSubmitError(
        "You've sent the maximum of 3 enquiries in the last hour. Please try again later."
      );
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSending(true);
    const result = await addEnquiry(values);
    setIsSending(false);

    if (!result.success) {
      setSubmitError(result.message);
      return;
    }

    recordEnquirySubmission();
    setIsSent(true);
  }

  if (isSent) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Thanks for getting in touch.
        </h1>
        <p className="mt-3 text-muted">We will reply within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        Get in Touch
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Tell us a bit about what you need, and we&apos;ll get back to you.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-5">
          <Field label="Full Name" error={errors.fullName}>
            <input
              type="text"
              value={values.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              className={INPUT_CLASSES}
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              type="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={INPUT_CLASSES}
            />
          </Field>

          <Field label="Phone Number" hint="Optional.">
            <input
              type="tel"
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className={INPUT_CLASSES}
            />
          </Field>

          <Field label="Country" error={errors.country}>
            <select
              value={values.country}
              onChange={(event) => updateField("country", event.target.value)}
              className={INPUT_CLASSES}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </Field>

          <Field label="What do you need?" error={errors.needType}>
            <select
              value={values.needType}
              onChange={(event) => updateField("needType", event.target.value)}
              className={INPUT_CLASSES}
            >
              <option value="">Select an option</option>
              {NEED_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Budget Range" hint="Optional.">
            <select
              value={values.budgetRange}
              onChange={(event) => updateField("budgetRange", event.target.value)}
              className={INPUT_CLASSES}
            >
              <option value="">Select a range (optional)</option>
              {BUDGET_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Message"
            error={errors.message}
            hint="At least 20 characters."
          >
            <textarea
              value={values.message}
              onChange={(event) => updateField("message", event.target.value)}
              rows={5}
              className={INPUT_CLASSES}
            />
          </Field>

          {submitError && <p className="text-sm text-red-400">{submitError}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSending}
            className="mt-2 self-start rounded-full bg-accent px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isSending ? "Sending..." : "Send Enquiry"}
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-card p-6">
          <div>
            <p className="text-sm text-muted">Email</p>
            {/* PLACEHOLDER: replace with the real email address. */}
            <p className="font-medium text-foreground">you@example.com</p>
          </div>
          <div>
            <p className="text-sm text-muted">LinkedIn</p>
            {/* PLACEHOLDER: replace href with the real LinkedIn page URL. */}
            <a href="#" className="font-medium text-accent hover:opacity-80">
              linkedin.com/company/seller-backbone
            </a>
          </div>
          <p className="text-sm text-muted">
            We work with clients worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, error, children }) {
  return (
    <div>
      <label className="text-sm text-muted">{label}</label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      ) : (
        hint && <p className="mt-1 text-xs text-muted">{hint}</p>
      )}
    </div>
  );
}
