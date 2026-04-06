'use client';

import { FormEvent, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

type FormState = {
  name: string;
  phone: string;
  message: string;
};

type SubmitState = {
  type: 'success' | 'error';
  message: string;
} | null;

const INITIAL_FORM: FormState = {
  name: '',
  phone: '',
  message: '',
};

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(t.form.errorDefault);
      }

      setSubmitState({
        type: 'success',
        message: t.form.success,
      });
      setForm(INITIAL_FORM);
    } catch (error) {
      setSubmitState({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : t.form.errorDefault,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-xs font-bold text-stone-600 mb-2">
          {t.form.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={80}
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, name: event.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl text-sm text-stone-700 bg-white/80 border border-orange-100 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all"
          placeholder={t.form.namePlaceholder}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-bold text-stone-600 mb-2">
          {t.form.phoneLabel}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          maxLength={20}
          value={form.phone}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, phone: event.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl text-sm text-stone-700 bg-white/80 border border-orange-100 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all"
          placeholder={t.form.phonePlaceholder}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold text-stone-600 mb-2">
          {t.form.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={1000}
          value={form.message}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, message: event.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl text-sm text-stone-700 bg-white/80 border border-orange-100 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
          placeholder={t.form.messagePlaceholder}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t.form.sending : t.form.submit}
      </button>

      {submitState && (
        <p
          className={`text-xs px-3 py-2 rounded-lg ${
            submitState.type === 'success'
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
              : 'text-red-700 bg-red-50 border border-red-200'
          }`}
        >
          {submitState.message}
        </p>
      )}
    </form>
  );
}
