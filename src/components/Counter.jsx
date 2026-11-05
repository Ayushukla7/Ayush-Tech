import React, { useState, useEffect, useRef } from 'react';

export default function Counter({ value, suffix = '', prefix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Extract numeric part
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;

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
  const originalHasPlus = value.includes('+');
  const originalHasMinus = value.includes('-');
  const originalHasPercent = value.includes('%');

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {originalHasMinus ? '-' : ''}
      {count}
      {originalHasPlus ? '+' : ''}
      {originalHasPercent ? '%' : ''}
      {suffix}
    </span>
  );
}
