import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { FiChevronDown } from "react-icons/fi";
import styles from "./custom-select.module.css";

export interface CustomSelectOption<T extends string> {
  value: T;
  label: string;
}

interface CustomSelectProps<T extends string> {
  value: T;
  options: CustomSelectOption<T>[];
  onChange: (value: T) => void;
  variant?: "default" | "outline";
  ariaLabel?: string;
}

export const CustomSelect = <T extends string>({
  value,
  options,
  onChange,
  variant = "default",
  ariaLabel,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const close = useCallback(() => setIsOpen(false), []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 6;
    const listMaxHeight = 260;
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const spaceAbove = rect.top - gap;
    const flip = spaceBelow < 140 && spaceAbove > spaceBelow;
    const top = flip
      ? Math.max(8, rect.top - Math.min(listMaxHeight, spaceAbove) - gap)
      : rect.bottom + gap;
    setPos({ top, left: rect.left, width: rect.width });
    if (flip) {
      requestAnimationFrame(() => {
        if (listRef.current) {
          const lh = listRef.current.offsetHeight;
          setPos((p) => ({ ...p, top: Math.max(8, rect.top - lh - gap) }));
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        listRef.current?.contains(target)
      )
        return;
      close();
    };
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const handleScrollOrResize = () => updatePosition();
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, close, updatePosition]);

  useEffect(() => {
    if (isOpen) {
      listRef.current?.focus();
      const currentIndex = Math.max(
        0,
        options.findIndex((option) => option.value === value)
      );
      setActiveIndex(currentIndex);
    }
  }, [isOpen, options, value]);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const activeElement = listRef.current.children[activeIndex];
    if (activeElement instanceof HTMLElement) {
      activeElement.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, isOpen]);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const select = (optionValue: T) => {
    onChange(optionValue);
    close();
  };

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (isOpen) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        select(options[activeIndex].value);
        break;
      case "Tab":
        close();
        break;
    }
  };

  return (
    <div
      className={`${styles.select} ${variant === "outline" ? styles.outline : ""}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.trigger_open : ""}`}
        onClick={toggle}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <span className={styles.trigger_value}>
          {selectedOption?.label ?? value}
        </span>
        <FiChevronDown
          className={`${styles.chevron} ${isOpen ? styles.chevron_open : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen &&
        createPortal(
          <ul
            ref={listRef}
            className={styles.list}
            role="listbox"
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width,
              minWidth: pos.width,
            }}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                className={`${styles.option} ${
                  index === activeIndex ? styles.option_active : ""
                } ${option.value === value ? styles.option_selected : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(option.value)}
              >
                {option.label}
                {option.value === value && (
                  <span className={styles.check} aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
};
