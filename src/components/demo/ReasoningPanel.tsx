import { useId, useState } from 'react';
import { Check, ChevronDown, Sparkles } from 'lucide-react';

export function ReasoningPanel({ steps, defaultOpen = true }: { steps: string[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`reason ${open ? 'open' : ''}`}>
      <button type="button" className="reason-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <Sparkles size={15} aria-hidden="true" />
        <span>How HawkTalk answered this</span>
        <ChevronDown size={16} className="reason-chev" aria-hidden="true" />
      </button>
      {open && (
        <ol className="reason-steps" id={id}>
          {steps.map((s, i) => (
            <li key={s} style={{ animationDelay: `${i * 120}ms` }}>
              <span className="reason-check">
                <Check size={12} strokeWidth={3} aria-hidden="true" />
              </span>
              {s}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
