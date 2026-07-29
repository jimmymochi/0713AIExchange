"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type RefCallback,
  type RefObject,
} from "react";

type PillPosition = {
  left: number;
  width: number;
};

type SlidingPill<Key extends string> = {
  containerRef: RefObject<HTMLDivElement | null>;
  pill: PillPosition;
  registerButton: (key: Key) => RefCallback<HTMLButtonElement>;
  movePillTo: (button: HTMLButtonElement) => void;
  focusButton: (key: Key) => void;
};

export default function useSlidingPill<Key extends string>(
  activeKey: Key,
  keys: readonly Key[],
): SlidingPill<Key> {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Partial<Record<Key, HTMLButtonElement | null>>>({});
  const [pill, setPill] = useState<PillPosition>({ left: 0, width: 0 });

  const movePillTo = useCallback((button: HTMLButtonElement) => {
    setPill({
      left: button.offsetLeft,
      width: button.offsetWidth,
    });
  }, []);

  const registerButton = useCallback(
    (key: Key): RefCallback<HTMLButtonElement> =>
      (button) => {
        buttonRefs.current[key] = button;
      },
    [],
  );

  const focusButton = useCallback((key: Key) => {
    buttonRefs.current[key]?.focus();
  }, []);

  useLayoutEffect(() => {
    const syncPill = () => {
      const activeButton = buttonRefs.current[activeKey];
      if (activeButton) movePillTo(activeButton);
    };

    syncPill();
    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(syncPill);
    if (containerRef.current) observer.observe(containerRef.current);
    keys.forEach((key) => {
      const button = buttonRefs.current[key];
      if (button) observer.observe(button);
    });
    return () => observer.disconnect();
  }, [activeKey, keys, movePillTo]);

  return {
    containerRef,
    pill,
    registerButton,
    movePillTo,
    focusButton,
  };
}
