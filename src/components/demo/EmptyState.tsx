import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { quickTopics } from '../../data/quickTopics';
import { hero } from '../../data/site';
import { Icon } from '../Icon';
import { HawkAvatar } from './Avatar';

export function EmptyState({ onPick }: { onPick: (label: string, scenarioId: string) => void }) {
  const [topic, setTopic] = useState<string | null>(null);
  const active = quickTopics.find((t) => t.id === topic);

  return (
    <div className="empty">
      <HawkAvatar size={64} />
      <h2 className="empty-title">{hero.previewHeadline}</h2>
      <p className="empty-sub">{hero.previewSub}</p>

      <div className="topics" role="group" aria-label="Quick topics">
        {quickTopics.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`topic ${topic === t.id ? 'active' : ''}`}
            aria-pressed={topic === t.id}
            onClick={() => setTopic(topic === t.id ? null : t.id)}
          >
            <Icon name={t.icon} size={18} />
            {t.label}
          </button>
        ))}
      </div>

      {active && (
        <ul className="topic-qs" aria-label={`${active.label} questions`} key={active.id}>
          {active.questions.map((q) => (
            <li key={q.label}>
              <button type="button" onClick={() => onPick(q.label, q.scenario)}>
                {q.label}
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
