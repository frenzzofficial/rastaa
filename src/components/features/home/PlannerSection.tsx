"use client";

import { type FormEvent, useState } from "react";
import { siteConfig } from "@/packages/configs/data.config";
import { useReveal } from "@/packages/hooks/useReveal";
import {
  buildEnquiryMessage,
  buildWhatsAppUrl,
  type EnquiryPayload,
} from "@/packages/utils/whatsapp";
import SectionHead from "./SectionHead";

type FormState = EnquiryPayload;
type FormErrors = Partial<Record<keyof FormState, boolean>>;

const emptyForm: FormState = {
  name: "",
  city: "",
  mood: "",
  date: "",
  group: "",
};

const PlannerSection = () => {
  const { planner, formFields, sections } = siteConfig;
  const shellRef = useReveal<HTMLDivElement>();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField(id: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    formFields.forEach((field) => {
      if (field.required && !form[field.id]) nextErrors[field.id] = true;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      localStorage.setItem("rastaa_last_enquiry", JSON.stringify(form));
    } catch {
      // localStorage unavailable — non-fatal, enquiry still proceeds via WhatsApp
    }

    setSubmitting(true);
    setSuccess(false);

    window.setTimeout(() => {
      const message = buildEnquiryMessage(planner.name, form);
      window.open(buildWhatsAppUrl(planner.phoneIntl, message), "_blank");
      setSubmitting(false);
      setSuccess(true);
    }, 500);
  }

  return (
    <section id="plan" className="bg-[var(--zinc-950)] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-14">
        <SectionHead
          lines={sections.plannerHeading}
          subtext={sections.plannerSubtext}
          dark
        />

        <div
          ref={shellRef}
          className="reveal grid grid-cols-1 border border-[var(--zinc-800)] sm:grid-cols-[0.85fr_1.15fr]"
        >
          {/* Planner identity side */}
          <div className="flex flex-col gap-[22px] p-9">
            <div className="flex items-center gap-3.5 rounded-2xl border border-[var(--zinc-800)] bg-[var(--zinc-900)] p-5">
              <div className="font-display flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--ember)] to-[#ffb37a] text-lg font-semibold text-[var(--zinc-950)]">
                {planner.initial}
              </div>
              <div>
                <div className="text-[14.5px] font-semibold">
                  {planner.name} · {planner.role}
                </div>
                <div className="mt-[3px] flex items-center gap-1.5 text-xs text-[#7CDB8A]">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#7CDB8A]" />
                  {planner.statusText}
                </div>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed text-[var(--zinc-400)]">
              {planner.note}
            </p>
            <div className="font-mono-brand text-xs text-[var(--zinc-400)]">
              {planner.phoneDisplay}
            </div>
          </div>

          {/* Form side */}
          <div className="bg-white p-9 text-[var(--zinc-950)]">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-x-3.5 sm:grid-cols-2">
                {formFields.map((field) => {
                  const isFullWidth = field.id === "name";
                  const hasError = !!errors[field.id];
                  return (
                    <div
                      key={field.id}
                      className={[
                        "mb-[18px]",
                        isFullWidth ? "sm:col-span-2" : "",
                      ].join(" ")}
                    >
                      <label
                        htmlFor={field.id}
                        className="mb-[7px] block text-[11px] uppercase tracking-[0.06em] text-[var(--zinc-400)]"
                      >
                        {field.label}
                      </label>

                      {field.type === "select" ? (
                        <select
                          id={field.id}
                          value={form[field.id]}
                          onChange={(e) =>
                            updateField(field.id, e.target.value)
                          }
                          className={[
                            "w-full rounded-[10px] border px-3.5 py-3 text-sm focus:outline-none focus:ring-[3px]",
                            hasError
                              ? "border-[#C0392B]"
                              : "border-[var(--zinc-700)] focus:border-[var(--zinc-950)]",
                          ].join(" ")}
                          style={{ boxShadow: undefined }}
                        >
                          <option value="">
                            Select {field.label.toLowerCase()}
                          </option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.id}
                          type={field.type}
                          min={field.type === "number" ? 1 : undefined}
                          placeholder={field.placeholder}
                          value={form[field.id]}
                          onChange={(e) =>
                            updateField(field.id, e.target.value)
                          }
                          className={[
                            "w-full rounded-[10px] border px-3.5 py-3 text-sm focus:outline-none focus:ring-[3px]",
                            hasError
                              ? "border-[#C0392B]"
                              : "border-[var(--zinc-700)] focus:border-[var(--zinc-950)]",
                          ].join(" ")}
                        />
                      )}

                      {hasError && (
                        <div className="mt-[5px] text-xs text-[#C0392B]">
                          {field.errorText}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-[var(--zinc-950)] py-[15px] text-sm font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
              >
                {submitting && (
                  <span className="spinner h-[15px] w-[15px] rounded-full border-2 border-white/35 border-t-white" />
                )}
                {submitting
                  ? "Opening WhatsApp…"
                  : `Message ${planner.name} on WhatsApp`}
              </button>

              {success && (
                <div className="mt-3 flex items-center gap-2.5 rounded-[10px] border border-[#C7E9D1] bg-[#EAF7EE] px-3.5 py-[11px] text-[13px] text-[#1B7A3D]">
                  Opening WhatsApp with your details filled in.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlannerSection;
