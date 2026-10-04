import { LOGO_SRC } from '../../data/site';

export function HawkAvatar({ size = 32 }: { size?: number }) {
  return (
    <span className="hawk-avatar" style={{ width: size, height: size }}>
      <img src={LOGO_SRC} alt="" width={size} height={size} />
    </span>
  );
}
