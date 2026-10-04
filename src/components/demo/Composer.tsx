import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowUp, Camera, FileText, Mic, Paperclip, Square } from 'lucide-react';

type Props = {
  busy: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
  onAttachPicture: () => void;
  onUnavailable: (feature: string) => void;
  autoFocus?: boolean;
};

export function Composer({ busy, onSend, onStop, onAttachPicture, onUnavailable, autoFocus }: Props) {
  const [text, setText] = useState('');
  const [menu, setMenu] = useState(false);
  const [listening, setListening] = useState(false);
  const ta = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ta.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [text]);

  useEffect(() => {
    if (!menu) return;
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    const esc = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [menu]);

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    if (busy || !text.trim()) return;
    onSend(text);
    setText('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  const voice = () => {
    if (listening) return;
    setListening(true);
    window.setTimeout(() => {
      setListening(false);
      onUnavailable('Voice input');
    }, 1400);
  };

  return (
    <form className="composer" onSubmit={submit}>
      <div className="composer-box">
        <div className="attach" ref={menuRef}>
          <button
            type="button"
            className="icon-btn composer-icon"
            aria-label="Add attachment"
            aria-haspopup="menu"
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
            disabled={busy}
          >
            <Paperclip size={20} />
          </button>
          {menu && (
            <div className="attach-menu" role="menu">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenu(false);
                  onAttachPicture();
                }}
              >
                <Camera size={18} aria-hidden="true" />
                <span>
                  Attach picture
                  <small>Try a sample photo</small>
                </span>
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenu(false);
                  onUnavailable('File attachments');
                }}
              >
                <FileText size={18} aria-hidden="true" />
                <span>
                  Attach file
                  <small>PDF, DOCX, and more</small>
                </span>
              </button>
            </div>
          )}
        </div>

        <label htmlFor="composer-input" className="sr-only">
          Ask HawkTalk
        </label>
        <textarea
          id="composer-input"
          ref={ta}
          rows={1}
          value={text}
          placeholder={listening ? 'Listening…' : 'Ask HawkTalk...'}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
          maxLength={500}
        />

        <button
          type="button"
          className={`icon-btn composer-icon ${listening ? 'listening' : ''}`}
          aria-label={listening ? 'Listening' : 'Voice input'}
          onClick={voice}
          disabled={busy}
        >
          <Mic size={20} />
        </button>

        {busy ? (
          <button type="button" className="send-btn stop" aria-label="Stop response" onClick={onStop}>
            <Square size={14} fill="currentColor" />
          </button>
        ) : (
          <button type="submit" className="send-btn" aria-label="Send message" disabled={!text.trim()}>
            <ArrowUp size={20} strokeWidth={2.5} />
          </button>
        )}
      </div>
      <p className="composer-hint">
        <kbd>Enter</kbd> to send · <kbd>Shift</kbd>+<kbd>Enter</kbd> for a new line · Demo answers are simulated
      </p>
    </form>
  );
}
