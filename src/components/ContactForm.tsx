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

const REQUEST_TIMEOUT_MS = 15_000;

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        const serverError =
          errorPayload &&
          typeof errorPayload === 'object' &&
          'error' in errorPayload &&
          typeof (errorPayload as { error?: unknown }).error === 'string'
            ? (errorPayload as { error: string }).error
            : null;
        throw new Error(serverError || t.form.errorDefault);
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
          error instanceof Error && error.name === 'AbortError'
            ? t.form.errorTimeout
            :
          error instanceof Error
            ? error.message
            : t.form.errorDefault,
      });
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
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
          className="w-full px-5 py-4 rounded-2xl text-sm text-zinc-100 bg-white/5 border border-white/10 backdrop-blur-sm outline-none focus:bg-white/8 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/15 transition-all placeholder:text-zinc-600"
          placeholder={t.form.namePlaceholder}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
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
          className="w-full px-5 py-4 rounded-2xl text-sm text-zinc-100 bg-white/5 border border-white/10 backdrop-blur-sm outline-none focus:bg-white/8 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/15 transition-all placeholder:text-zinc-600"
          placeholder={t.form.phonePlaceholder}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
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
          className="w-full px-5 py-4 rounded-2xl text-sm text-zinc-100 bg-white/5 border border-white/10 backdrop-blur-sm outline-none focus:bg-white/8 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/15 transition-all resize-none placeholder:text-zinc-600"
          placeholder={t.form.messagePlaceholder}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full px-8 py-4 rounded-2xl text-base font-bold text-white shadow-premium-hover disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t.form.sending : t.form.submit}
      </button>

      {submitState && (
        <div
          className={`text-sm px-5 py-4 rounded-2xl animate-fade-slide ${
            submitState.type === 'success'
              ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-900/50'
              : 'text-red-400 bg-red-950/60 border border-red-900/50'
          }`}
        >
          {submitState.message}
        </div>
      )}
    </form>
  );
}
