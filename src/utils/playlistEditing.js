import { groupByArtist } from './groupByArtist.js';

// Viewing order never mutates the saved playlist. Original position breaks artist ties.
export function artistView(tracks) {
  return tracks.map((track, index) => ({ track, index }))
    .sort((a, b) => a.track.artistName.localeCompare(b.track.artistName, 'ko') || a.index - b.index)
    .map(({ track }) => track);
}

// Each contiguous segment is a candidate, including intentional separate segments.
export function insertionTargets(tracks, artistName) {
  let start = 0;
  return groupByArtist(tracks).flatMap((block) => {
    const end = start + block.tracks.length;
    const target = { ...block, start, end, afterId: block.tracks.at(-1).trackId };
    start = end;
    return block.artistName === artistName ? [target] : [];
  });
}

export function addAtPosition(tracks, track, position = 'tail') {
  if (tracks.some((item) => item.trackId === track.trackId)) return tracks;
  const index = position === 'head' ? 0 : position === 'tail' ? tracks.length
    : tracks.findIndex((item) => item.trackId === position) + 1;
  if (index === 0 && position !== 'head') return tracks;
  return [...tracks.slice(0, index), track, ...tracks.slice(index)];
}

export function moveSegment(tracks, blockId, overBlockId) {
  const blocks = groupByArtist(tracks);
  const from = blocks.findIndex((block) => block.blockId === blockId);
  const to = blocks.findIndex((block) => block.blockId === overBlockId);
  if (from < 0 || to < 0 || from === to) return tracks;
  const next = [...blocks];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next.flatMap((block) => block.tracks);
}

export function moveTrack(tracks, id, overId) {
  const from = tracks.findIndex((track) => track.trackId === id);
  const to = tracks.findIndex((track) => track.trackId === overId);
  if (from < 0 || to < 0 || from === to) return tracks;
  const next = [...tracks];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next;
}
