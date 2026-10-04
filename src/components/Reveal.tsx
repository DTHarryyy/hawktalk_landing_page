import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from 'react';

type Props = { children: ReactNode; as?: ElementType; delay?: number; className?: string };

/** Fades content in when it scrolls into view. */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
