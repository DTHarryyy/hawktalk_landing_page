import { useState } from 'react';
import { brand, team, type TeamMember } from '../../data/site';
import { Reveal } from '../Reveal';

function MemberAvatar({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);

  if (member.avatar && !failed) {
    return (
      <img
        className="member-avatar"
        src={member.avatar}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className="member-avatar" aria-hidden="true">
      {member.initials}
    </span>
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
              <MemberAvatar member={m} />
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
