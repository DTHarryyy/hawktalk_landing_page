import { Check, FileUp, Gauge, MessageSquareReply, ShieldCheck } from 'lucide-react';
import { university } from '../../data/site';
import { Reveal } from '../Reveal';

const bars = [62, 74, 58, 81, 77, 88, 92];

export function ForUniversity() {
  return (
    <section className="section section-white" id="university" aria-labelledby="uni-title">
      <div className="container uni">
        <div className="uni-copy">
          <Reveal className="section-head left">
            <span className="eyebrow">For the university</span>
            <h2 id="uni-title" className="section-title">
              A staff &amp; admin portal that keeps the AI accurate
            </h2>
            <p className="section-sub">
              Offices answer what the AI can’t — and those answers make HawkTalk smarter for every student after.
            </p>
          </Reveal>

          {[university.contributors, university.admins].map((g, gi) => (
            <Reveal key={g.title} className="uni-group" delay={gi * 100}>
              <div className="uni-group-head">
                <span className="icon-tile sm">
                  {gi === 0 ? <MessageSquareReply size={18} aria-hidden="true" /> : <ShieldCheck size={18} aria-hidden="true" />}
                </span>
                <div>
                  <h3>{g.title}</h3>
                  <span>{g.subtitle}</span>
                </div>
              </div>
              <ul className="checklist">
                {g.items.map((it) => (
                  <li key={it}>
                    <Check size={16} strokeWidth={3} aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="dash" delay={150}>
          <div className="dash-card" role="img" aria-label="Illustration of the admin dashboard with AI insights (sample data)">
            <div className="dash-head">
              <Gauge size={18} aria-hidden="true" />
              <strong>AI Insights</strong>
              <span className="dash-tag">Sample data</span>
            </div>
            <div className="dash-kpis">
              <div>
                <span>Answer rate</span>
                <strong>92%</strong>
              </div>
              <div>
                <span>Avg. latency</span>
                <strong>2.4s</strong>
              </div>
              <div>
                <span>Pending escalations</span>
                <strong>7</strong>
              </div>
            </div>
            <div className="dash-chart" aria-hidden="true">
              {bars.map((b, i) => (
                <span key={i} style={{ height: `${b}%`, animationDelay: `${i * 80}ms` }} />
              ))}
            </div>
            <div className="dash-legend">Requests · last 7 days</div>
            <div className="dash-sources">
              <span>Answers came from</span>
              <div className="dash-stack" aria-hidden="true">
                <i style={{ width: '64%' }} />
                <i style={{ width: '22%' }} />
                <i style={{ width: '14%' }} />
              </div>
              <ul>
                <li>
                  <b className="k1" /> Documents
                </li>
                <li>
                  <b className="k2" /> Office answers
                </li>
                <li>
                  <b className="k3" /> University website
                </li>
              </ul>
            </div>
          </div>
          <div className="dash-mini">
            <FileUp size={18} aria-hidden="true" />
            <div>
              <strong>Student_Manual_2026.pdf</strong>
              <span>142 pages transcribed · tables included</span>
            </div>
            <Check size={18} strokeWidth={3} aria-hidden="true" className="dash-ok" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
