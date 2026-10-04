import { Link } from 'react-router-dom';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import { finalCta, LOGO_SRC } from '../../data/site';
import { AppLink } from '../AppLink';
import { PlayStoreButton } from '../PlayStoreButton';
import { Reveal } from '../Reveal';

export function FinalCTA() {
  return (
    <section className="section final" aria-labelledby="final-title">
      <div className="container">
        <Reveal className="final-card on-dark">
          <span className="blob b1" aria-hidden="true" />
          <img src={LOGO_SRC} alt="" width={72} height={72} className="final-logo" />
          <h2 id="final-title">{finalCta.title}</h2>
          <p>{finalCta.text}</p>
          <div className="final-ctas">
            <AppLink className="btn btn-yellow">
              Get Started <ArrowUpRight size={18} aria-hidden="true" />
            </AppLink>
            <PlayStoreButton dark />
          </div>
          <Link to="/demo" className="final-demo">
            <PlayCircle size={18} aria-hidden="true" /> Or try the interactive AI demo first
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
