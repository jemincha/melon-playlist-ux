// src/utils/insertIntoArtistBlock.js
//
// usePlaylist 훅 안에 있던 "블록 병합" 계산 로직을 순수 함수로 분리한 것.
// React 상태(setTracks)와 분리되어 있어야 단위 테스트가 가능하기 때문에 뽑아냄.
//
// insertIntoArtistBlock(tracks, trackId)
// - trackId로 지정된 곡을, 같은 아티스트의 "가장 큰 기존 블록" 바로 뒤로 옮긴 새 배열을 반환.
// - 같은 아티스트 블록이 여러 개로 쪼개져 있으면 그중 가장 긴 블록을 기준으로 삼는다.
// - 매칭되는 블록이 없으면(= 정말 처음 나온 아티스트라면) 원래 있던 자리 그대로 맨 뒤 유지.
// - 존재하지 않는 trackId가 들어오면 원본 배열을 그대로 반환 (방어 코드).

import { groupByArtist } from './groupByArtist.js';

export function insertIntoArtistBlock(tracks, trackId) {
  const movingTrack = tracks.find((t) => t.trackId === trackId);
  if (!movingTrack) return tracks;

  const withoutMovingTrack = tracks.filter((t) => t.trackId !== trackId);
  const blocksWithoutMovingTrack = groupByArtist(withoutMovingTrack);
  const matchingBlocks = blocksWithoutMovingTrack.filter(
    (block) => block.artistName === movingTrack.artistName
  );

  if (matchingBlocks.length === 0) {
    return [...withoutMovingTrack, movingTrack];
  }

  const targetBlock = matchingBlocks.reduce((largest, current) =>
    current.tracks.length > largest.tracks.length ? current : largest
  );
  const targetBlockLastTrackId = targetBlock.tracks[targetBlock.tracks.length - 1].trackId;
  const insertIndex =
    withoutMovingTrack.findIndex((t) => t.trackId === targetBlockLastTrackId) + 1;

  const nextTracks = [...withoutMovingTrack];
  nextTracks.splice(insertIndex, 0, movingTrack);
  return nextTracks;
}