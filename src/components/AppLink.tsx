import type { ReactNode } from 'react';
import { APP_URL } from '../data/site';

type Props = { children: ReactNode; className?: string; ariaLabel?: string };

/** Every "Try HawkTalk" / "Open App" / "Get Started" link goes through here. */
export function AppLink({ children, className = 'btn btn-primary', ariaLabel }: Props) {
  return (
    <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
