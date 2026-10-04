import { Link } from 'react-router-dom';
import { ArrowUpRight, PlayCircle, ShieldCheck, Languages, MapPin } from 'lucide-react';
import { brand, hero, LOGO_SRC } from '../../data/site';
import { AppLink } from '../AppLink';
import { PlayStoreButton } from '../PlayStoreButton';
import { MiniSimulator } from './MiniSimulator';

export function Hero() {
  return (
    <section className="hero on-dark" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="grid-lines" />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="hero-badge">
            <span className="pulse" aria-hidden="true" />
            {brand.badge}
          </span>
          <div className="hero-brand">
            <img src={LOGO_SRC} alt="HawkTalk logo" width={64} height={64} />
            <div>
              <span className="wordmark hero-name">{brand.name}</span>
              <span className="hero-tagline">{brand.tagline}</span>
            </div>
          </div>
          <h1 id="hero-title" className="hero-title">
            Ask anything about <span className="hl">campus.</span>
          </h1>
          <p className="hero-lead">{brand.descriptor}</p>
          <p className="hero-value">{hero.value}</p>

          <div className="hero-ctas">
            <AppLink className="btn btn-yellow">
              {hero.primaryCta} <ArrowUpRight size={18} aria-hidden="true" />
            </AppLink>
            <Link to="/demo" className="btn btn-ghost-dark">
              <PlayCircle size={18} aria-hidden="true" /> {hero.secondaryCta}
            </Link>
          </div>
          <div className="hero-store">
            <PlayStoreButton dark />
            <span className="hero-platforms">{hero.platforms}</span>
          </div>

          <ul className="hero-points">
            <li>
              <ShieldCheck size={16} aria-hidden="true" /> Official documents only
            </li>
            <li>
              <Languages size={16} aria-hidden="true" /> English · Filipino · Taglish
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" /> Campus map built in
            </li>
          </ul>
        </div>

        <div className="hero-visual">
          <div className="phone" role="img" aria-label="Preview of the HawkTalk chat: a student asks about the Dean’s List and HawkTalk answers with a cited source.">
            <div className="phone-notch" aria-hidden="true" />
            <div className="phone-top" aria-hidden="true">
              <img src={LOGO_SRC} alt="" width={22} height={22} />
              <span className="wordmark">HawkTalk</span>
              <span className="phone-guest">GUEST</span>
            </div>
            <MiniSimulator scenarioIds={['deans-list', 'registrar-map', 'scholarship-taglish']} showEmpty />
          </div>
          <div className="float-card fc1" aria-hidden="true">
            <span className="fc-dot" /> Understood “dea’s lisr” as <strong>Dean’s List</strong>
          </div>
          <div className="float-card fc2" aria-hidden="true">
            <span className="fc-dot" /> Cited <strong>Student Manual · p. 32</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
