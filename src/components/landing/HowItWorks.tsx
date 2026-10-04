import { howItWorks } from '../../data/site';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

export function HowItWorks() {
  return (
    <section className="section section-tint" id="how" aria-labelledby="how-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 id="how-title" className="section-title">
            From question to answer in seconds
          </h2>
        </Reveal>
        <ol className="steps">
          {howItWorks.map((s, i) => (
            <Reveal as="li" key={s.title} className="step" delay={i * 110}>
              <span className="step-num">{i + 1}</span>
              <span className="step-icon">
                <Icon name={s.icon} size={24} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
