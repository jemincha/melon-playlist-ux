// 명시적으로 추가된 미배치 곡만 이동 후보로 삼는다. 기존 분리 구간은 보존한다.
export function analyzeBlocks(blocks) {
  return blocks.map((block) => {
    const existing = blocks.filter(
      (b) =>
        b.artistName === block.artistName &&
        b.tracks.some((t) => !t.pendingPlacement)
    );
    const pendingOnly = block.tracks.every((t) => t.pendingPlacement);
    const isMisplaced = pendingOnly && existing.length > 0;
    return {
      ...block,
      isMisplaced,
      isDropTarget:
        !pendingOnly &&
        blocks.some(
          (b) =>
            b.artistName === block.artistName &&
            b.tracks.every((t) => t.pendingPlacement)
        ),
      targetBlocks: isMisplaced ? existing : [],
    };
  });
}
