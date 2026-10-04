import { brand, techStack, team } from '../../data/site';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

export function TechStack() {
  return (
    <section className="section section-tint" aria-labelledby="tech-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Technology</span>
          <h2 id="tech-title" className="section-title">
            Built on a modern stack
          </h2>
        </Reveal>
        <div className="tech">
          {techStack.map((t, i) => (
            <Reveal key={t.name} className="card tech-card" delay={i * 90}>
              <span className="icon-tile">
                <Icon name={t.icon} size={22} />
              </span>
              <h3>{t.name}</h3>
              <p>{t.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section className="section section-white" aria-labelledby="team-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">The team</span>
          <h2 id="team-title" className="section-title">
            Made by students, for students
          </h2>
          <p className="section-sub">
            {team.program} · {brand.institution}
          </p>
        </Reveal>
        <ul className="team">
          {team.members.map((m, i) => (
            <Reveal as="li" key={m.name} className="card member" delay={i * 90}>
              <span className="member-avatar" aria-hidden="true">
                {m.initials}
              </span>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
