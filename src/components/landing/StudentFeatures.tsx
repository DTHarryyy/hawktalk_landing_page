import { studentFeatures } from '../../data/site';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

export function StudentFeatures() {
  return (
    <section className="section section-tint" id="features" aria-labelledby="features-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">For students</span>
          <h2 id="features-title" className="section-title">
            Everything you need, in your pocket
          </h2>
          <p className="section-sub">On the web and Android — try it as a guest, sign in for more.</p>
        </Reveal>
        <div className="features">
          {studentFeatures.map((f, i) => (
            <Reveal key={f.title} className="card feature" delay={(i % 3) * 80}>
              <span className="icon-tile">
                <Icon name={f.icon} size={20} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
