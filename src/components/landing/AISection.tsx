import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { capabilities } from '../../data/site';
import { getScenario } from '../../lib/matchScenario';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';
import { MiniSimulator } from './MiniSimulator';

const showcase = ['deans-list', 'deans-eligibility', 'scholarship-taglish', 'which-building', 'dorm-refund'];

export function AISection() {
  const [idx, setIdx] = useState(0);
  return (
    <section className="section section-white ai" id="ai" aria-labelledby="ai-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">The intelligent AI</span>
          <h2 id="ai-title" className="section-title">
            Not just a chatbot. An assistant that <span className="u-hl">checks its work.</span>
          </h2>
          <p className="section-sub">
            HawkTalk understands what you meant, finds the exact rule in the official documents, keeps every condition
            attached — and shows you how it got there.
          </p>
        </Reveal>

        <Reveal className="ai-showcase">
          <div className="ai-tabs" role="group" aria-label="Example conversations">
            {showcase.map((id, n) => (
              <button
                key={id}
                type="button"
                aria-pressed={n === idx}
                className={`ai-tab ${n === idx ? 'active' : ''}`}
                onClick={() => setIdx(n)}
              >
                {getScenario(id)?.title}
              </button>
            ))}
          </div>
          <div className="ai-stage">
            <div className="ai-window">
              <div className="ai-window-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>hawktalk.pages.dev</span>
              </div>
              <MiniSimulator scenarioIds={showcase} index={idx} onIndexChange={setIdx} showReasoning className="mini-wide" />
            </div>
            <div className="ai-stage-cta">
              <p>
                <strong>Watch the reasoning.</strong> Every demo reply comes with a “How HawkTalk answered this” panel —
                the steps the AI took, in plain language.
              </p>
              <Link to="/demo" className="btn btn-primary">
                Try the interactive demo <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="caps">
          {capabilities.map((c, i) => (
            <Reveal key={c.key} className="cap" delay={(i % 3) * 70}>
              <span className="cap-icon">
                <Icon name={c.icon} size={20} />
              </span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                {c.example && <span className="cap-example">{c.example}</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
