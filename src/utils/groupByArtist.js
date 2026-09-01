// src/utils/groupByArtist.js
//
// tracks 배열을 순서를 유지한 채로 "연속된 같은 아티스트 곡" 단위 블록으로 묶는
// 순수 함수. 정렬/재배치는 하지 않는다 — 현재 순서에서 이미 붙어있는 곡들을
// 시각적으로 하나의 블록으로 인식시키는 것이 목적.
//
// 왜 "연속 구간 기준"인가:
// - Phase 4에서 새로 추가된 곡이 특정 아티스트 블록과 떨어진 위치(맨 뒤)에 놓이는
//   As-Is 상황을 다뤄야 하는데, 이때 같은 아티스트라도 서로 떨어진 두 그룹은
//   별개 블록으로 보여야 "떨어져 있다"는 문제가 시각적으로 드러남.
//
// 입력: Track[] (dummyTracks.js 형태)
// 출력: ArtistBlock[]
//   { blockId: string, artistName: string, tracks: Track[] }

/**
 * groupByArtist(tracks)
 * - 연속된 동일 artistName을 하나의 블록으로 묶어 반환.
 * - blockId는 블록의 첫 곡 trackId를 기준으로 생성 (렌더링 key용, 유일함 보장).
 */
export function groupByArtist(tracks) {
  const blocks = [];

  for (const track of tracks) {
    const lastBlock = blocks[blocks.length - 1];

    if (lastBlock && lastBlock.artistName === track.artistName) {
      lastBlock.tracks.push(track);
    } else {
      blocks.push({
        blockId: `block-${track.trackId}`,
        artistName: track.artistName,
        tracks: [track],
      });
    }
  }

  return blocks;
}
