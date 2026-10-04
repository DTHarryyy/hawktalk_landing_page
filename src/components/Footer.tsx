import { Link } from 'react-router-dom';
import { APP_URL, brand, legalLinks } from '../data/site';
import { Logo } from './Logo';
import { PlayStoreButton } from './PlayStoreButton';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer on-dark">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo size={40} />
          <p className="footer-tagline">{brand.tagline}</p>
          <p className="footer-desc">{brand.descriptor}</p>
          <PlayStoreButton dark />
        </div>
        <div>
          <h2 className="footer-h">Product</h2>
          <ul className="footer-list">
            <li>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                Open the app
              </a>
            </li>
            <li>
              <Link to="/demo">AI demo</Link>
            </li>
            <li>
              <Link to="/#features">Features</Link>
            </li>
            <li>
              <Link to="/#faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="footer-h">Legal</h2>
          <ul className="footer-list">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          Built for students of <strong>{brand.institution}</strong> ({brand.institutionShort}).
        </p>
        <p>
          © {year} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
