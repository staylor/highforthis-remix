import qs from 'qs';
import cn from 'classnames';

import Image from '@/components/Image';
import type { VenueCoordinates } from '@/types/graphql';

interface MapProps {
  name?: string;
  size?: number;
  className?: string;
  coordinates: VenueCoordinates;
}

export default function Map({ name, className, coordinates, size = 300 }: MapProps) {
  const center = `${coordinates.latitude},${coordinates.longitude}`;
  const params = {
    zoom: 15,
    center,
    size: `${size}x${size}`,
    key: 'AIzaSyD1lL9VIkUJEAxyHqCTm8msOnJX98UM8Ls',
    style: 'feature:all|element:all|saturation:-100',
    markers: `size:normal|color:0xe50082|label:${name}|${center}`,
  };
  const src = `https://maps.googleapis.com/maps/api/staticmap?${qs.stringify(params)}`;

  return (
    <a
      className="block"
      style={{ width: size, height: size }}
      href={`http://maps.apple.com/?${qs.stringify({
        q: name,
        ll: center,
        z: 18,
      })}`}
    >
      <Image width={size} height={size} className={cn('block', className)} src={src} />
    </a>
  );
}
