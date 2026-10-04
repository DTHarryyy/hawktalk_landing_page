import { MapPin, Navigation } from 'lucide-react';
import type { MapInfo } from '../../data/types';

export function MapCard({ map }: { map: MapInfo }) {
  return (
    <figure className="map-card">
      <div className="map-photo">
        <img src={map.photo} alt={`Photo of ${map.place} (placeholder)`} loading="lazy" />
        <span className="map-pin-badge">
          <MapPin size={14} aria-hidden="true" /> Campus map
        </span>
      </div>
      <figcaption className="map-body">
        <strong>{map.place}</strong>
        <span>{map.description}</span>
        <a className="btn btn-primary btn-sm map-nav" href={map.navUrl} target="_blank" rel="noopener noreferrer">
          <Navigation size={16} aria-hidden="true" /> Open live navigation
        </a>
      </figcaption>
    </figure>
  );
}
