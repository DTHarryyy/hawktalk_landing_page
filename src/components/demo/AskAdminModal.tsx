import { useEffect, useRef, useState } from 'react';
import { Bell, Building, CheckCircle2, ImagePlus, Send, X } from 'lucide-react';

type Props = { question: string | null; onClose: () => void };

export function AskAdminModal({ question, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [q, setQ] = useState('');
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [state, setState] = useState<'form' | 'sending' | 'sent'>('form');

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (question !== null) {
      setQ(question);
      setNote('');
      setPhoto(null);
      setState('form');
      if (!d.open) d.showModal();
    } else if (d.open) d.close();
  }, [question]);

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo);
  }, [photo]);

  const send = () => {
    if (!q.trim()) return;
    setState('sending');
    window.setTimeout(() => setState('sent'), 1100);
  };

  return (
    <dialog ref={ref} className="modal" aria-labelledby="ask-admin-title" onClose={onClose} onCancel={onClose}>
      <div className="modal-head">
        <h2 id="ask-admin-title">{state === 'sent' ? 'Sent to campus admin' : 'Ask a campus admin'}</h2>
        <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {state !== 'sent' ? (
        <form
          className="modal-body"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <label className="field">
            <span>Your question</span>
            <textarea value={q} onChange={(e) => setQ(e.target.value)} rows={3} required />
          </label>
          <label className="field">
            <span>
              Note <em>(optional)</em>
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Anything that helps the admin answer this."
            />
          </label>
          <div className="field">
            <span>
              Photo <em>(optional)</em>
            </span>
            {photo ? (
              <div className="photo-preview">
                <img src={photo} alt="Selected attachment preview" />
                <button type="button" className="icon-btn" aria-label="Remove photo" onClick={() => setPhoto(null)}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="photo-pick">
                <ImagePlus size={18} aria-hidden="true" /> Add a photo
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setPhoto(URL.createObjectURL(f));
                  }}
                />
              </label>
            )}
          </div>
          <p className="modal-note">Demo only — nothing is actually sent. Your photo stays on your device.</p>
          <button type="submit" className="btn btn-primary modal-send" disabled={state === 'sending' || !q.trim()}>
            {state === 'sending' ? (
              <>
                <span className="spinner light" aria-hidden="true" /> Sending…
              </>
            ) : (
              <>
                <Send size={17} aria-hidden="true" /> Send to admin
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="modal-body sent" role="status">
          <CheckCircle2 size={56} className="sent-icon" aria-hidden="true" />
          <p className="sent-lead">Your question is on its way.</p>
          <ul className="sent-steps">
            <li>
              <Building size={18} aria-hidden="true" />
              <span>
                HawkTalk <strong>routes it to the right department</strong> automatically — here, the Housing / Student
                Affairs office.
              </span>
            </li>
            <li>
              <Bell size={18} aria-hidden="true" />
              <span>
                When a staff member replies, you get a <strong>notification</strong> and can track it in{' '}
                <strong>My Inquiries</strong>.
              </span>
            </li>
          </ul>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Back to chat
          </button>
        </div>
      )}
    </dialog>
  );
}
