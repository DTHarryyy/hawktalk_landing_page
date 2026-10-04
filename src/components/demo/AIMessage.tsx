import { UserRoundCheck } from 'lucide-react';
import type { AiMessage } from '../../hooks/useSimulator';
import { HawkAvatar } from './Avatar';
import { MarkdownAnswer } from './MarkdownAnswer';
import { SourceChip, WebSourceChip } from './SourceChip';
import { MapCard } from './MapCard';
import { ReasoningPanel } from './ReasoningPanel';

type Props = {
  msg: AiMessage;
  isLatest: boolean;
  onClarify: (label: string, scenarioId: string) => void;
  onAskAdmin: (question: string) => void;
  question?: string;
  busy: boolean;
};

export function AIMessage({ msg, isLatest, onClarify, onAskAdmin, question, busy }: Props) {
  const s = msg.scenario;
  const done = msg.phase === 'done';
  const complete = done && !msg.stopped;

  return (
    <article className="msg msg-ai" aria-label="HawkTalk reply">
      <HawkAvatar />
      <div className="msg-ai-body">
        <div className="msg-ai-name">
          HawkTalk
          {!done && <span className="msg-ai-state">{msg.phase === 'writing' ? 'is writing' : ''}</span>}
        </div>

        {msg.phase === 'thinking' && (
          <div className="status-line" role="status">
            <span className="dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            HawkTalk is thinking
          </div>
        )}
        {msg.phase === 'tool' && (
          <div className="status-line status-tool" role="status" key={msg.toolLabel}>
            <span className="spinner" aria-hidden="true" />
            {msg.toolLabel}
            <span className="ellipsis" aria-hidden="true" />
          </div>
        )}

        {(msg.phase === 'writing' || done) && msg.text && (
          <div className="bubble-ai">
            <MarkdownAnswer text={msg.text} streaming={msg.phase === 'writing'} />
          </div>
        )}
        {msg.phase === 'writing' && (
          <div className="status-line status-writing" aria-hidden="true">
            <span className="pen" /> HawkTalk is writing
          </div>
        )}
        {msg.stopped && <p className="stopped-note">Response stopped.</p>}

        {complete && (
          <div className="extras">
            {(s.sources?.length || s.webSource) && (
              <div className="chip-row" aria-label="Sources">
                {s.sources?.map((src) => <SourceChip key={src.doc + src.page} source={src} />)}
                {s.webSource && <WebSourceChip source={s.webSource} />}
              </div>
            )}
            {s.map && <MapCard map={s.map} />}
            {s.clarify && (
              <div className="clarify" role="group" aria-label="Choose an option">
                {s.clarify.map((c) => (
                  <button
                    key={c.next}
                    type="button"
                    className="clarify-chip"
                    disabled={busy || !isLatest}
                    onClick={() => onClarify(c.label, c.next)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
            {s.askAdmin && (
              <button type="button" className="btn btn-secondary btn-sm ask-admin-btn" onClick={() => onAskAdmin(question ?? '')}>
                <UserRoundCheck size={16} aria-hidden="true" /> Ask an admin this question
              </button>
            )}
            <ReasoningPanel steps={s.reasoning} />
          </div>
        )}
      </div>
    </article>
  );
}
