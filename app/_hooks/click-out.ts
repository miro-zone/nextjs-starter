import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
/**
 * Detect clicks outside target element and toggle state.
 */
export const useClickOut: (
  elRef: RefObject<any>,
  onClickOut: () => void
) => [boolean, Dispatch<SetStateAction<boolean>>] = (elRef, onClickOut) => {
  // Initiate state with false (closed).
  const [open, setOpen] = useState(false);

  // On each click away change state to false (close).
  const onClick = useCallback(
    (me: MouseEvent) => {
      // In case element not rendered yet.
      if (!elRef.current) return;
      // Check if clicked inside target element.
      if (elRef.current.contains(me.target as Element)) return;
      // Call the lister.
      onClickOut();
      // Toggle state to false (close) otherwise.
      setOpen(false);
    },
    [elRef.current]
  );

  // Listen to each click on dom.
  useEffect(() => {
    // Attach event when component mount.
    document.addEventListener("click", onClickOut);
    // Clear event once component demount.
    return () => document.removeEventListener("click", onClickOut);
  }, [onClick]);
  // Return state and dispatcher to caller.
  return [open, setOpen];
};
