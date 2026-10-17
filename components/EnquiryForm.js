// WHAT THIS FILE DOES: The actual enquiry form — every field, its
// validation, and sending it to the real database. Used on both the
// Contact page and (when turned on in Settings) embedded in the
// homepage's "Ready to get started?" section, so there's exactly one copy
// of this logic, not two that could drift apart. On success, the fields
// are replaced with a short thank-you message, right where the form was.
// Runs in the browser because it reacts to typing and the button click.
// Each label is linked to its field, and error messages are announced
// with the field they belong to, so the form works with screen readers.

"use client";

import { useId, useState } from "react";
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
  "mt-2 w-full rounded-[10px] border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted/60 hover:border-white/20 focus:border-accent focus:shadow-[0_0_0_3px_rgba(245,165,36,0.18)] aria-[invalid=true]:border-red-400/70";

// Selects get their own arrow, since the browser's default one is hidden
// to match the other fields.
const SELECT_CLASSES = `${INPUT_CLASSES} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%238f9bc2' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 8l4 4 4-4'/%3E%3C/svg%3E")] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-11`;

const INITIAL_VALUES = {
  fullName: "",
  email: "",
  phone: "",
  country: "India",
  needType: "",
  budgetRange: "",
  message: "",
};

export default function EnquiryForm() {
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
      <div role="status" className="flex flex-col items-start py-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-background">
          <svg viewBox="0 0 20 20" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10.5l4 4 8-9" />
          </svg>
        </span>
        <p className="font-display mt-6 text-[1.75rem] font-semibold leading-tight text-foreground">
          Enquiry sent. Thanks for getting in touch.
        </p>
        <p className="mt-2 text-muted">We will reply within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
      <Field label="Full name" error={errors.fullName}>
        {(fieldProps) => (
          <input
            {...fieldProps}
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            className={INPUT_CLASSES}
          />
        )}
      </Field>

      <Field label="Email" error={errors.email}>
        {(fieldProps) => (
          <input
            {...fieldProps}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={INPUT_CLASSES}
          />
        )}
      </Field>

      <Field label="Phone number" hint="Optional.">
        {(fieldProps) => (
          <input
            {...fieldProps}
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={INPUT_CLASSES}
          />
        )}
      </Field>

      <Field label="Country" error={errors.country}>
        {(fieldProps) => (
          <select
            {...fieldProps}
            value={values.country}
            onChange={(event) => updateField("country", event.target.value)}
            className={SELECT_CLASSES}
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field label="What do you need?" error={errors.needType}>
        {(fieldProps) => (
          <select
            {...fieldProps}
            value={values.needType}
            onChange={(event) => updateField("needType", event.target.value)}
            className={SELECT_CLASSES}
          >
            <option value="">Select an option</option>
            {NEED_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field label="Budget range" hint="Optional.">
        {(fieldProps) => (
          <select
            {...fieldProps}
            value={values.budgetRange}
            onChange={(event) => updateField("budgetRange", event.target.value)}
            className={SELECT_CLASSES}
          >
            <option value="">Select a range (optional)</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        label="Message"
        error={errors.message}
        hint="At least 20 characters."
        className="sm:col-span-2"
      >
        {(fieldProps) => (
          <textarea
            {...fieldProps}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            rows={5}
            placeholder="What are you building, and who is it for?"
            className={`${INPUT_CLASSES} resize-y`}
          />
        )}
      </Field>

      <div className="flex flex-col items-start gap-4 sm:col-span-2">
        {submitError && (
          <p role="alert" className="text-sm text-red-300">
            {submitError}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSending}
          className="btn-form"
        >
          {isSending ? "Sending..." : "Send enquiry"}
        </button>
      </div>
    </div>
  );
}

// One labelled form field. `children` is a function that receives the
// props linking the field to its label and its hint/error message.
function Field({ label, hint, error, className = "", children }) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error || hint;

  return (
    <div className={`text-left ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": message ? messageId : undefined,
      })}
      {message && (
        <p
          id={messageId}
          className={`mt-1.5 text-[13px] ${error ? "text-red-300" : "text-muted"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
