export interface MapTargetOptions {
  latitude?: number | null;
  longitude?: number | null;
  googleMapsUrl?: string;
  address?: string;
}

export function openMapLocation(options: MapTargetOptions): void {
  const { latitude, longitude, googleMapsUrl, address } = options;

  let url = '';

  if (latitude != null && longitude != null) {
    url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  } else if (googleMapsUrl && googleMapsUrl.trim() !== '') {
    url = googleMapsUrl;
  } else if (address && address.trim() !== '') {
    const encodedAddress = encodeURIComponent(address);
    url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  } else {
    url = 'https://www.google.com/maps';
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}
