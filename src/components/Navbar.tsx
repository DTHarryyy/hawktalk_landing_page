import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { nav } from '../data/site';
import { Logo } from './Logo';
import { AppLink } from './AppLink';

export function Navbar({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled || compact ? 'nav-solid' : ''} ${compact ? 'nav-compact' : ''}`}>
      <nav className="container nav-inner" aria-label="Main">
        <Link to="/" className="nav-brand" aria-label="HawkTalk home">
          <Logo size={34} />
        </Link>

        <ul className={`nav-links ${open ? 'open' : ''}`} id="nav-menu">
          {nav.map((item) => (
            <li key={item.label}>
              {item.to.includes('#') ? (
                <Link to={item.to} className="nav-link">
                  {item.label}
                </Link>
              ) : (
                <NavLink to={item.to} end className={({ isActive }) => `nav-link ${isActive && !hash ? 'active' : ''}`}>
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
          <li className="nav-cta-mobile">
            <AppLink className="btn btn-primary">
              Try HawkTalk <ArrowUpRight size={18} aria-hidden="true" />
            </AppLink>
          </li>
        </ul>

        <div className="nav-actions">
          <AppLink className="btn btn-primary btn-sm nav-cta">
            Try HawkTalk <ArrowUpRight size={16} aria-hidden="true" />
          </AppLink>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
