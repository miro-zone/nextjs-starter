import { RefObject, useEffect, useMemo, useState } from "react";

type UseIntersectType = (
  elRef: RefObject<HTMLElement>,
  rootMargin: number,
  onIntersect?: (f: boolean) => void
) => [boolean];

export const useIntersect: UseIntersectType = (
  elRef,
  rootMargin,
  onIntersect
) => {
  // Main state.
  const [intersect, setIntersect] = useState(false);

  useEffect(() => {
    if (elRef.current) {
      // Initialize observer.
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          setIntersect(isIntersecting);
          onIntersect?.(isIntersecting);
        },
        { rootMargin: rootMargin + "px" }
      );
      // Start observing the element.
      observer.observe(elRef.current);
      // Cleanup the observer.
      return () => observer.disconnect();
    }
  }, [elRef.current, rootMargin]);

  return [intersect];
};
