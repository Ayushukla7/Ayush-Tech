import React, { useState, useEffect, useRef } from 'react';

export default function Counter({ value, target, suffix = '', prefix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Safely extract numeric value whether passed as string, number, value, or target
  const raw = value !== undefined ? value : (target !== undefined ? target : 0);
  const strVal = String(raw || '0');
  const numericValue = parseInt(strVal.replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out quart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * numericValue));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(numericValue);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [numericValue, duration]);

  // Combine with original string signs like +, -, %
  const originalHasPlus = strVal.includes('+') || suffix.includes('+');
  const originalHasMinus = strVal.includes('-');
  const originalHasPercent = strVal.includes('%') || suffix.includes('%');

  return (
    <span ref={elementRef} className="tabular-nums font-clash font-extrabold tracking-tight">
      {prefix}
      {originalHasMinus && '-'}
      {count}
      {originalHasPlus && '+'}
      {originalHasPercent && '%'}
      {!originalHasPlus && !originalHasPercent && suffix}
    </span>
  );
}
