import { Link } from 'react-router-dom';
import { MessageSquare, Pin, Plus, RotateCcw, X } from 'lucide-react';
import { mockHistory } from '../../data/demoScenarios';
import { Logo } from '../Logo';

type Props = {
  open: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onRestart: () => void;
  onUnavailable: (feature: string) => void;
};

export function Sidebar({ open, onClose, onNewChat, onRestart, onUnavailable }: Props) {
  return (
    <>
      <div className={`sb-scrim ${open ? 'show' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Chat history (sample)">
        <div className="sb-head">
          <Link to="/" aria-label="HawkTalk home">
            <Logo size={30} />
          </Link>
          <button type="button" className="icon-btn sb-close" aria-label="Close sidebar" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <button type="button" className="btn btn-primary sb-new" onClick={onNewChat}>
          <Plus size={18} aria-hidden="true" /> New chat
        </button>

        <div className="sb-group">
          <h2 className="sb-label">PINNED</h2>
          <ul>
            {mockHistory.pinned.map((c) => (
              <li key={c}>
                <button type="button" onClick={() => onUnavailable('Saved chats')}>
                  <Pin size={15} aria-hidden="true" />
                  <span>{c}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="sb-group">
          <h2 className="sb-label">RECENT CHATS</h2>
          <ul>
            {mockHistory.recent.map((c) => (
              <li key={c}>
                <button type="button" onClick={() => onUnavailable('Saved chats')}>
                  <MessageSquare size={15} aria-hidden="true" />
                  <span>{c}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="sb-foot">
          <p className="sb-note">Sample history — sign in on the real app to save your chats.</p>
          <button type="button" className="btn btn-secondary btn-sm sb-restart" onClick={onRestart}>
            <RotateCcw size={15} aria-hidden="true" /> Restart demo
          </button>
        </div>
      </aside>
    </>
  );
}
