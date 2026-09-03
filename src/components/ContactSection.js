"use client";

import { useState } from "react";
import { contact } from "@/lib/site-data";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Connect this form to email delivery or CRM/backend integration.
    setSubmitted(true);
  };

  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <h2 id="contact-title" className="section-heading">
            {contact.title}
          </h2>
          <p className="section-lead">{contact.description}</p>

          <ul className={styles.details}>
            <li>
              <span className={styles.label}>Contact</span>
              <a href={contact.phoneHref} className={styles.link}>
                {contact.phone}
              </a>
            </li>
            <li>
              <span className={styles.label}>Email</span>
              <a href={contact.emailHref} className={styles.link}>
                {contact.email}
              </a>
            </li>
            <li>
              <span className={styles.label}>Address</span>
              <address className={styles.address}>{contact.address}</address>
            </li>
          </ul>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <p className={styles.formNote}>
            Frontend-only form for now. Backend integration is pending.
          </p>

          <label className={styles.field}>
            <span>Name</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>

          <label className={styles.field}>
            <span>Message</span>
            <textarea name="message" rows={5} required />
          </label>

          <button type="submit" className="button">
            Send message
          </button>

          {submitted ? (
            <p className={styles.success} role="status">
              Thank you. Your message has been captured locally for now.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
