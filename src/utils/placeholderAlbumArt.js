// src/utils/placeholderAlbumArt.js
//
// picsum.photos 무작위 사진 대신 아티스트명 해시 기반 그라디언트+이니셜 SVG 생성.

import { hashString } from './hashString.js';

function getInitials(artistName) {
  const trimmed = artistName.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const first = trimmed[0] ?? '?';

  if (/^[A-Za-z]/.test(first) && words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return first.toUpperCase();
}

export function getPlaceholderAlbumArt(artistName) {
  const hash = hashString(artistName);
  const hueA = hash % 360;
  const hueB = (hueA + 55) % 360;
  const initials = getInitials(artistName);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${hueA},50%,42%)" />
        <stop offset="100%" stop-color="hsl(${hueB},55%,28%)" />
      </linearGradient>
    </defs>
    <rect width="80" height="80" rx="10" fill="url(#g)" />
    <text x="40" y="48" font-family="-apple-system,BlinkMacSystemFont,sans-serif"
      font-size="26" font-weight="700" fill="#ffffffdd" text-anchor="middle">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}