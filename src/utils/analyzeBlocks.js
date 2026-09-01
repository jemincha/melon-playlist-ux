// src/utils/analyzeBlocks.js
//
// groupByArtist가 만든 블록 배열을 받아, 어떤 블록이 "메인 블록"이고 어떤 블록이
// "떨어져 나온(misplaced) 블록"인지 표시를 추가하는 순수 함수.
// PlaylistView와 CompareView가 동일한 판정 로직을 공유해야 하므로 별도 유틸로 분리.
//
// 판정 규칙:
// - 같은 artistName을 가진 블록이 2개 이상이면, 그중 곡 수가 가장 많은 블록이 "메인 블록".
// - 나머지는 "떨어져 나온 블록" (isMisplaced: true).
// - 블록이 1개뿐인 아티스트는 항상 정상 상태 (isMisplaced: false, isDropTarget: false).

export function analyzeBlocks(blocks) {
  const blocksByArtist = new Map();
  for (const block of blocks) {
    const list = blocksByArtist.get(block.artistName) ?? [];
    list.push(block);
    blocksByArtist.set(block.artistName, list);
  }

  const mainBlockIdByArtist = new Map();
  for (const [artistName, blockList] of blocksByArtist) {
    const main = blockList.reduce((largest, current) =>
      current.tracks.length > largest.tracks.length ? current : largest
    );
    mainBlockIdByArtist.set(artistName, main.blockId);
  }

  return blocks.map((block) => {
    const siblingCount = blocksByArtist.get(block.artistName).length;
    const isMainBlock = mainBlockIdByArtist.get(block.artistName) === block.blockId;
    return {
      ...block,
      isMisplaced: siblingCount > 1 && !isMainBlock,
      isDropTarget: siblingCount > 1 && isMainBlock,
    };
  });
}
