import { PLAY_STORE_URL } from '../data/site';

/** "Get it on Google Play" CTA. Link is a placeholder until the listing is live. */
export function PlayStoreButton({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href={PLAY_STORE_URL}
      className={`play-btn ${dark ? 'play-btn-dark' : ''}`}
      aria-label="Get HawkTalk on Google Play"
      onClick={(e) => {
        if (PLAY_STORE_URL === '#') e.preventDefault();
      }}
    >
      <svg viewBox="0 0 24 26" width="22" height="24" aria-hidden="true">
        <path d="M1.2.6 13.4 12.9 1.2 25.2c-.4-.3-.7-.8-.7-1.4V2c0-.6.3-1.1.7-1.4Z" fill="#00d7fe" />
        <path d="m17.5 8.8-4.1 4.1 4.1 4.1 4.9-2.8c1.4-.8 1.4-2.1 0-2.9l-4.9-2.5Z" fill="#ffce00" />
        <path d="M17.5 17 13.4 12.9 1.2 25.2c.5.4 1.2.4 2 0L17.5 17Z" fill="#ff3a44" />
        <path d="M17.5 8.8 3.2.6C2.4.2 1.7.2 1.2.6l12.2 12.3 4.1-4.1Z" fill="#00f076" />
      </svg>
      <span className="play-text">
        <small>GET IT ON</small>
        <strong>Google Play</strong>
      </span>
    </a>
  );
}
