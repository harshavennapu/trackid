import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Gift,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import SectionWrapper from "../../components/SectionWrapper";
import Divider from "../../components/Divider";

// Reuse FormField from Section 06A
import FormField from "../06A-InstitutionalAsk/FormField";

import { COPY } from "../../content/copy";
import { FAMILY_FORM_FIELDS } from "../../content/formSchema";
import { submitLead } from "../../services/leadSubmission";

import { fadeUp, staggerContainer } from "../../motion/variants";

export default function Invitation() {
  const copy = COPY.invitation;

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  function validate() {
    const nextErrors = {};

    FAMILY_FORM_FIELDS.forEach((field) => {
      if (
        field.required &&
        !String(formData[field.name] || "").trim()
      ) {
        nextErrors[field.name] = copy.errorRequired;
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    const result = await submitLead(formData);

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    }
  }

  const highlights = [
    {
      icon: Heart,
      title: "Made for Everyday Wear",
      text: "Elegant jewellery children will love wearing every day.",
    },
    {
      icon: Gift,
      title: "A Meaningful Gift",
      text: "Perfect for birthdays, milestones, and treasured family moments.",
    },
    {
      icon: Sparkles,
      title: "Beautiful Meets Smart",
      text: "Premium craftsmanship with discreet GPS protection inside.",
    },
    {
      icon: ShieldCheck,
      title: "Peace of Mind",
      text: "Stay connected with the people who matter most.",
    },
  ];

  return (
    <SectionWrapper id="invitation">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-20 lg:grid-cols-[1fr_520px]"
      >
        {/* LEFT COLUMN */}

        <motion.div variants={fadeUp}>
          <p className="font-mono uppercase tracking-[0.35em] text-accent text-sm">
            {copy.eyebrow}
          </p>

          <h2 className="mt-5 font-display text-5xl md:text-6xl text-ink leading-tight">
            {copy.headline}
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate">
            {copy.subtitle}
          </p>

          <div className="mt-14 space-y-8">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-start gap-5"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/5">
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                      className="text-accent"
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl text-ink">
                      {item.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}

        <motion.div
          variants={fadeUp}
          className="rounded-[36px] border border-gold/20 bg-white/70 p-10 backdrop-blur-xl shadow-xl"
        >
          {submitted ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
                <Heart
                  size={40}
                  strokeWidth={2}
                  className="text-accent"
                />
              </div>

              <h3 className="mt-8 font-display text-4xl text-ink">
                Thank You!
              </h3>

              <p className="mt-5 max-w-md leading-8 text-slate">
                {copy.successMessage}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {FAMILY_FORM_FIELDS.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  error={errors[field.name]}
                  onChange={handleChange}
                />
              ))}

              <button
                type="submit"
                disabled={submitting}
                className="
                  group
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-accent
                  px-8
                  py-4
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-xl
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {submitting
                  ? "Submitting..."
                  : copy.submitLabel}

                {!submitting && (
                  <ChevronRight
                    size={20}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>

              <p className="text-center text-sm leading-6 text-slate">
                Looking for a meaningful gift? Grandparents love gifting
                TrakID pendants to celebrate birthdays, milestones and
                cherished family moments.
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>

      <Divider />
    </SectionWrapper>
  );
}