import { LOGO_SRC, brand } from '../data/site';

type Props = { size?: number; showName?: boolean; className?: string };

export function Logo({ size = 36, showName = true, className = '' }: Props) {
  return (
    <span className={`logo ${className}`}>
      <img src={LOGO_SRC} alt={showName ? '' : `${brand.name} logo`} width={size} height={size} className="logo-img" />
      {showName && <span className="wordmark logo-name">{brand.name}</span>}
    </span>
  );
}
