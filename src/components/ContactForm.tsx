'use client';

import { FormEvent, useState } from 'react';

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

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof data.error === 'string'
            ? data.error
            : 'Xabar yuborishda xatolik yuz berdi.',
        );
      }

      setSubmitState({
        type: 'success',
        message: 'So\'rovingiz yuborildi. Tez orada siz bilan bog\'lanamiz.',
      });
      setForm(INITIAL_FORM);
    } catch (error) {
      setSubmitState({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Xabar yuborishda xatolik yuz berdi.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-xs font-bold text-stone-600 mb-2">
          Ism familiya
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
          placeholder="Masalan: Ali Valiyev"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-bold text-stone-600 mb-2">
          Telefon raqam
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
          placeholder="+998 90 123 45 67"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold text-stone-600 mb-2">
          Qo&apos;shimcha xabar
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
          placeholder="Qaysi guruhga yozilmoqchisiz yoki savolingizni yozing"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Yuborilmoqda...' : 'So\'rov yuborish'}
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
