'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/* Everything that should animate into view as it is scrolled to. */
const SELECTOR = '.page-section, .page-stagger > *, .lang-lane, [data-reveal]';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const collect = () => Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

    /* An attribute, not a class: React rewrites className on re-render and would
       wipe the revealed state, but it leaves attributes it doesn't own alone. */
    const markIn = (el: Element) => el.setAttribute('data-in', '');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      collect().forEach(markIn);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          markIn(entry.target);
          io.unobserve(entry.target);
        });
      },
      /* fire once the element's top has risen ~12% into the viewport */
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      collect().forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };

    scan();

    /* Conditionally rendered blocks (mobile menu, form states, …) join later */
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  /* Lab-paper lattice drifts at 6% of scroll speed — enough to feel like depth,
     not enough to notice as movement. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    let raf = 0;

    const apply = () => {
      raf = 0;
      root.style.setProperty('--bg-shift', `${(window.scrollY * 0.06).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    /* rAF is throttled in a hidden tab — resync when the page comes back */
    document.addEventListener('visibilitychange', apply);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', apply);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
