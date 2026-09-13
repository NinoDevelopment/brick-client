import { useCallback, useEffect, useRef, useState } from "react";

export const useInViewOnce = (rootMargin = "200px") => {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (!node || inView) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setInView(true);
          observer.disconnect();
        },
        { rootMargin },
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [inView, rootMargin],
  );

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return { ref, inView };
};
