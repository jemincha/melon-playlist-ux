import { groupByArtist } from './groupByArtist.js';

// 요청한 곡만 같은 아티스트의 지정 구간으로 이동한다. 나머지 곡의 상대 순서는 유지한다.
// 기본 목적지는 가장 큰 기존 구간이며, 동점이면 먼저 나온 구간을 사용한다.
export function insertIntoArtistBlock(tracks, trackId, targetBlockId) {
  const movingTrack = tracks.find((t) => t.trackId === trackId);
  if (!movingTrack) return tracks;
  const blocks = groupByArtist(tracks).filter(
    (b) =>
      b.artistName === movingTrack.artistName &&
      !b.tracks.some((t) => t.trackId === trackId) &&
      b.tracks.some((t) => !t.pendingPlacement)
  );
  if (!blocks.length) return tracks;
  const target = targetBlockId
    ? blocks.find((b) => b.blockId === targetBlockId)
    : blocks.reduce((largest, current) =>
        current.tracks.length > largest.tracks.length ? current : largest
      );
  if (!target) return tracks;
  const remaining = tracks.filter((t) => t.trackId !== trackId);
  const index =
    remaining.findIndex((t) => t.trackId === target.tracks.at(-1).trackId) + 1;
  const result = [...remaining];
  result.splice(index, 0, { ...movingTrack, pendingPlacement: false });
  return result;
}
