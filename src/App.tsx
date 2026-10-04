import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';

/** Scrolls to #hash targets (e.g. /#faq) and to top on page change. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
