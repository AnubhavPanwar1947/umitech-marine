"use client";

import { useState } from "react";
import { contactPage } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import styles from "./ContactFormSection.module.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactFormSection() {
  const { form } = contactPage;
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const data = new FormData(formElement);
    const firstName = data.get("firstName")?.toString().trim() ?? "";
    const lastName = data.get("lastName")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const message = data.get("message")?.toString().trim() ?? "";

    if (!firstName || !lastName || !email) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!emailPattern.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const subject = encodeURIComponent(`Contact from ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:${form.mailto}?subject=${subject}&body=${body}`;
    setStatus("success");
    setErrorMessage("");
    formElement.reset();
  }

  return (
    <section
      id="contact-form"
      className={`section ${styles.section}`}
      aria-labelledby="contact-form-title"
    >
      <div className={`container ${styles.inner}`}>
        <Reveal
          as="h2"
          id="contact-form-title"
          className={`section-heading ${styles.heading}`}
          delay={0}
        >
          {form.heading}
        </Reveal>

        <Reveal delay={80}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>
                Name <span className={styles.required} aria-hidden="true">*</span>
              </legend>
              <div className={styles.nameRow}>
                <label className={styles.field}>
                  <span className={styles.sublabel}>First</span>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    className={styles.input}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.sublabel}>Last</span>
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    className={styles.input}
                  />
                </label>
              </div>
            </fieldset>

            <label className={styles.field}>
              <span className={styles.label}>
                Email <span className={styles.required} aria-hidden="true">*</span>
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Message</span>
              <textarea
                name="message"
                rows={5}
                className={styles.textarea}
              />
            </label>

            {status === "error" ? (
              <p className={styles.error} role="alert">
                {errorMessage}
              </p>
            ) : null}

            {status === "success" ? (
              <p className={styles.success} role="status">
                Thank you. Your email client should open so you can send your message.
              </p>
            ) : null}

            <div className={styles.actions}>
              <button type="submit" className="button">
                {form.submitLabel}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
