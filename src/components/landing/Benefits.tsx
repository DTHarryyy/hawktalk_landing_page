import { benefits } from '../../data/site';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

export function Benefits() {
  return (
    <section className="section" aria-labelledby="benefits-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Why HawkTalk</span>
          <h2 id="benefits-title" className="section-title">
            Campus information, finally in one place
          </h2>
          <p className="section-sub">
            Built for Cagayan State University students who just want a straight answer — fast.
          </p>
        </Reveal>
        <div className="benefits">
          {benefits.map((b, i) => (
            <Reveal key={b.title} className="card benefit" delay={i * 80}>
              <span className="icon-tile">
                <Icon name={b.icon} size={22} />
              </span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
