import { useEffect } from 'react';

/**
 * Global observer hook that tracks all elements with .scroll-reveal,
 * .scroll-reveal-header, .scroll-reveal-subtle, or .reveal-on-scroll
 * and adds the .is-revealed class when scrolled into view.
 */
export function useScrollRevealObserver() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const selector = '.scroll-reveal, .scroll-reveal-header, .scroll-reveal-subtle, .reveal-on-scroll';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        // If element is already in viewport on mount, reveal after a micro-delay
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    observeAll();

    // Re-check when DOM changes (e.g., dynamic sections or tab toggles)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
