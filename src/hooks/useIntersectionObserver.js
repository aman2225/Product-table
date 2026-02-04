import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for Intersection Observer - triggers callback when element enters viewport
 * Used for infinite scroll implementation
 * @param {Function} callback - Called when observed element is visible
 * @param {Object} options - IntersectionObserver options
 */
export function useIntersectionObserver(callback, options = {}) {
  const observerRef = useRef(null);
  const targetRef = useRef(null);

  const { root = null, rootMargin = '100px', threshold = 0 } = options;

  const stableCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stableCallback();
          }
        });
      },
      { root, rootMargin, threshold }
    );

    observerRef.current.observe(target);

    return () => {
      if (observerRef.current && target) {
        observerRef.current.unobserve(target);
      }
    };
  }, [stableCallback, root, rootMargin, threshold]);

  return targetRef;
}
