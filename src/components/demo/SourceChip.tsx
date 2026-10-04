import { useEffect, useId, useRef, useState } from 'react';
import { FileText, Globe, ExternalLink, X } from 'lucide-react';
import type { SourceRef, WebSource } from '../../data/types';

function usePopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return { open, setOpen, ref };
}

export function SourceChip({ source }: { source: SourceRef }) {
  const { open, setOpen, ref } = usePopover();
  const id = useId();
  return (
    <div className="chip-wrap" ref={ref}>
      <button
        type="button"
        className="src-chip"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <FileText size={14} aria-hidden="true" />
        <span className="src-chip-doc">{source.doc}</span>
        <span className="src-chip-page">p. {source.page}</span>
      </button>
      {open && (
        <div className="popover" id={id} role="dialog" aria-label={`Source preview: ${source.doc}, page ${source.page}`}>
          <div className="popover-head">
            <span className="popover-icon">
              <FileText size={16} aria-hidden="true" />
            </span>
            <div>
              <strong>{source.doc}</strong>
              <small>Page {source.page} · Official document</small>
            </div>
            <button type="button" className="icon-btn" aria-label="Close preview" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <blockquote className="popover-excerpt">“{source.excerpt}”</blockquote>
          <p className="popover-note">In the full app, this opens the document at this page.</p>
        </div>
      )}
    </div>
  );
}

export function WebSourceChip({ source }: { source: WebSource }) {
  const host = (() => {
    try {
      return new URL(source.url).host;
    } catch {
      return source.url;
    }
  })();
  return (
    <a className="src-chip src-chip-web" href={source.url} target="_blank" rel="noopener noreferrer">
      <Globe size={14} aria-hidden="true" />
      <span className="src-chip-doc">{source.title}</span>
      <span className="src-chip-page">{host}</span>
      <ExternalLink size={13} aria-hidden="true" />
    </a>
  );
}
