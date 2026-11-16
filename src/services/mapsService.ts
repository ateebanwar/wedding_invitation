export interface MapTargetOptions {
  latitude?: number | null;
  longitude?: number | null;
  googleMapsUrl?: string;
  address?: string;
  name?: string;
  coordinatesDMS?: string;
}

export function openMapLocation(options: MapTargetOptions): void {
  const { latitude, longitude, googleMapsUrl, address, name, coordinatesDMS } = options;

  let url = '';

  // 1. Highest Priority: Explicit googleMapsUrl in JSON takes full control
  if (googleMapsUrl && googleMapsUrl.trim() !== '') {
    url = googleMapsUrl.trim();
  }
  // 2. High-precision DMS coordinate pin (e.g. 20°32'09.6"N 74°32'06.1"E)
  else if (coordinatesDMS && coordinatesDMS.trim() !== '') {
    const encodedDms = encodeURIComponent(coordinatesDMS.trim());
    if (latitude != null && longitude != null) {
      url = `https://www.google.com/maps/place/${encodedDms}/@${latitude},${longitude},18z`;
    } else {
      url = `https://www.google.com/maps/place/${encodedDms}`;
    }
  }
  // 3. Exact Pin Marker with Latitude & Longitude & Optional Label
  else if (latitude != null && longitude != null) {
    const label = name ? `+(${encodeURIComponent(name)})` : '';
    url = `https://www.google.com/maps?q=loc:${latitude},${longitude}${label}&z=18`;
  }
  // 4. Fallback to address search
  else if (address && address.trim() !== '') {
    const encodedAddress = encodeURIComponent(address.trim());
    url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  } else {
    url = 'https://www.google.com/maps';
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}
