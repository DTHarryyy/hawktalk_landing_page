import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Check, FileText, Globe, MapPin, Mic, Paperclip } from 'lucide-react';
import { statusText } from '../../data/demoScenarios';
import { quickTopics } from '../../data/quickTopics';
import { hero } from '../../data/site';
import { getScenario } from '../../lib/matchScenario';
import { MarkdownAnswer } from '../demo/MarkdownAnswer';
import { HawkAvatar } from '../demo/Avatar';
import { Icon } from '../Icon';

type Stage = 'empty' | 'typing' | 'thinking' | 'tool' | 'writing' | 'done';

type Props = {
  scenarioIds: string[];
  /** Show the "How can HawkTalk help you today?" screen before each question */
  showEmpty?: boolean;
  showReasoning?: boolean;
  /** Controlled index (e.g. from tabs). Omit to auto-cycle. */
  index?: number;
  onIndexChange?: (i: number) => void;
  className?: string;
};

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** A self-playing, non-interactive preview of the chat used on the landing page. */
export function MiniSimulator({ scenarioIds, showEmpty, showReasoning, index, onIndexChange, className = '' }: Props) {
  const [i, setI] = useState(0);
  const idx = index ?? i;
  const scenario = getScenario(scenarioIds[idx % scenarioIds.length])!;
  const [stage, setStage] = useState<Stage>(showEmpty ? 'empty' : 'typing');
  const [typed, setTyped] = useState('');
  const [text, setText] = useState('');
  const [tool, setTool] = useState('');
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !('IntersectionObserver' in window)) return setVisible(true);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    if (reduceMotion()) {
      setTyped(scenario.prompt);
      setText(scenario.answer);
      setStage('done');
      return;
    }

    setText('');
    setTyped('');
    setTool('');
    let t = 0;
    if (showEmpty) {
      setStage('empty');
      t += 2200;
    }
    at(t, () => setStage('typing'));
    const q = scenario.prompt;
    for (let c = 1; c <= q.length; c++) {
      t += 38;
      at(t, () => setTyped(q.slice(0, c)));
    }
    t += 450;
    at(t, () => setStage('thinking'));
    t += 900;
    const tools =
      scenario.status === 'web'
        ? [statusText.manuals, statusText.web]
        : scenario.status === 'none'
          ? []
          : [statusText[scenario.status]];
    tools.forEach((label) => {
      at(t, () => {
        setTool(label);
        setStage('tool');
      });
      t += 1000;
    });
    at(t, () => setStage('writing'));
    const words = scenario.answer.match(/\S+\s*/g) ?? [];
    let acc = '';
    words.forEach((w) => {
      t += 30;
      at(t, () => {
        acc += w;
        setText(acc);
      });
    });
    t += 100;
    at(t, () => setStage('done'));
    t += showReasoning ? 6500 : 4500;
    if (index === undefined) at(t, () => setI((n) => (n + 1) % scenarioIds.length));
    else if (onIndexChange) at(t, () => onIndexChange((idx + 1) % scenarioIds.length));

    return () => timers.forEach(window.clearTimeout);
  }, [idx, visible]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [text, stage]);

  const asked = stage !== 'empty' && stage !== 'typing';

  return (
    <div className={`mini ${className}`} ref={root} aria-hidden="true">
      <div className="mini-body" ref={bodyRef}>
        {!asked && (
          <div className="mini-empty">
            <HawkAvatar size={44} />
            <strong>{hero.previewHeadline}</strong>
            <span>{hero.previewSub}</span>
            <div className="mini-topics">
              {quickTopics.map((t) => (
                <span key={t.id}>
                  <Icon name={t.icon} size={13} />
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        )}
        {asked && (
          <div className="mini-msgs">
            <div className="mini-user">{scenario.prompt}</div>
            <div className="mini-ai">
              <HawkAvatar size={26} />
              <div className="mini-ai-body">
                <span className="mini-name">HawkTalk</span>
                {stage === 'thinking' && (
                  <span className="status-line">
                    <span className="dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    HawkTalk is thinking
                  </span>
                )}
                {stage === 'tool' && (
                  <span className="status-line status-tool" key={tool}>
                    <span className="spinner" />
                    {tool}
                  </span>
                )}
                {(stage === 'writing' || stage === 'done') && (
                  <div className="bubble-ai">
                    <MarkdownAnswer text={text} streaming={stage === 'writing'} />
                  </div>
                )}
                {stage === 'done' && (
                  <div className="mini-extras">
                    {scenario.sources?.map((s) => (
                      <span className="src-chip" key={s.doc + s.page}>
                        <FileText size={12} />
                        <span className="src-chip-doc">{s.doc}</span>
                        <span className="src-chip-page">p. {s.page}</span>
                      </span>
                    ))}
                    {scenario.webSource && (
                      <span className="src-chip src-chip-web">
                        <Globe size={12} />
                        <span className="src-chip-doc">csu.edu.ph</span>
                      </span>
                    )}
                    {scenario.map && (
                      <span className="src-chip">
                        <MapPin size={12} />
                        <span className="src-chip-doc">{scenario.map.place}</span>
                      </span>
                    )}
                    {scenario.clarify?.map((c) => (
                      <span className="clarify-chip" key={c.label}>
                        {c.label}
                      </span>
                    ))}
                    {showReasoning && (
                      <div className="mini-reason">
                        <span className="mini-reason-title">How HawkTalk answered this</span>
                        <ol>
                          {scenario.reasoning.map((r, n) => (
                            <li key={r} style={{ animationDelay: `${n * 160}ms` }}>
                              <span className="reason-check">
                                <Check size={10} strokeWidth={3} />
                              </span>
                              {r}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mini-composer">
        <Paperclip size={16} />
        <span className={`mini-input ${stage === 'typing' ? 'typing' : ''}`}>
          {stage === 'typing' ? typed : <span className="mini-ph">Ask HawkTalk...</span>}
        </span>
        <Mic size={16} />
        <span className={`mini-send ${stage === 'typing' && typed ? 'ready' : ''}`}>
          <ArrowUp size={14} strokeWidth={2.5} />
        </span>
      </div>
    </div>
  );
}
