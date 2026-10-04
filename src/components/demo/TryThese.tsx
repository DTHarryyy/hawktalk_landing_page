import { Play } from 'lucide-react';
import { scenarios, tryTheseOrder } from '../../data/demoScenarios';

const list = tryTheseOrder.map((id) => scenarios.find((s) => s.id === id)!).filter(Boolean);

type Props = { onPick: (prompt: string, id: string) => void; disabled: boolean; variant?: 'rail' | 'inline' | 'chips' };

export function TryThese({ onPick, disabled, variant = 'rail' }: Props) {
  return (
    <section className={`try try-${variant}`} aria-labelledby={`try-${variant}`}>
      <h2 id={`try-${variant}`} className="try-title">
        Try these
      </h2>
      <ol className="try-list">
        {list.map((s, i) => (
          <li key={s.id}>
            <button type="button" disabled={disabled} onClick={() => onPick(s.prompt, s.id)}>
              <span className="try-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="try-text">
                <strong>{s.title}</strong>
                <span>“{s.prompt}”</span>
              </span>
              <Play size={14} className="try-play" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
