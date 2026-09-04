// src/components/PlaylistView.jsx
//
// 플레이리스트 전체 목록을 렌더링.
//
// Props:
// - tracks: Track[] (usePlaylist().tracks)
// - onInsertIntoArtistBlock(trackId): 병합 실행 함수
// - onReorderBlocks(newTracks): 블록/트랙 순서 변경 반영 함수 (usePlaylist().reorderByBlocks)
// - sortMode: 'default' | 'artist-az'
//
// [Phase 1~2] 기본 렌더링 + 블록 그룹핑 (완료)
// [Phase 4] 떨어져 나온 곡 감지 + 드래그/클릭 병합 (완료)
// [Phase 5] sortMode에 따른 블록 정렬 (완료)
// [개선] 병합 시 자동 스크롤+하이라이트, 떨어져 나온 곡 트레이 분리
// [신규] 블록 단위 드래그 재정렬 + ▲▼ 버튼 재정렬(드래그 대체 수단, 동일 로직 공유)
// [신규] 블록 "내부" 트랙끼리 순서 변경 — handleDragEnd에서 세 가지 드래그 종류를 구분:
//        1) 떨어진 곡 → 블록에 병합  2) 블록 자체 재정렬  3) 블록 내부 트랙 재정렬

import { useEffect, useRef, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import ArtistBlock from './ArtistBlock';
import MisplacedTrackCard from './MisplacedTrackCard';
import { groupByArtist } from '../utils/groupByArtist';
import { analyzeBlocks } from '../utils/analyzeBlocks';

function sortBlocks(blocks, sortMode) {
  if (sortMode !== 'artist-az') return blocks;
  return [...blocks].sort((a, b) => a.artistName.localeCompare(b.artistName, 'ko'));
}

function PlaylistView({ tracks, onInsertIntoArtistBlock, onReorderBlocks, sortMode = 'default' }) {
  const blockRefs = useRef({}); // artistName -> DOM node (스크롤 대상 찾기용)
  const [scrollTargetArtist, setScrollTargetArtist] = useState(null);
  const [highlightArtist, setHighlightArtist] = useState(null);

  // 병합(insert) 직후 tracks가 갱신되면, 예약해둔 아티스트 블록으로 스크롤 + 잠깐 하이라이트
  useEffect(() => {
    if (!scrollTargetArtist) return;
    const node = blockRefs.current[scrollTargetArtist];
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightArtist(scrollTargetArtist);
      const timer = setTimeout(() => setHighlightArtist(null), 1400);
      setScrollTargetArtist(null);
      return () => clearTimeout(timer);
    }
    setScrollTargetArtist(null);
  }, [tracks, scrollTargetArtist]);

  if (tracks.length === 0) {
    return <p className="playlist-view__empty">플레이리스트가 비어있습니다.</p>;
  }

  const rawBlocks = groupByArtist(tracks);
  const analyzedBlocks = analyzeBlocks(rawBlocks);
  const orderedBlocks = sortBlocks(analyzedBlocks, sortMode);

  // 떨어져 나온 곡(misplaced)은 별도 "정리 대기" 트레이로 분리해 항상 목록 맨 위에 표시.
  // 나머지(정상 블록)만 순서를 바꿀 수 있는 대상이 됨.
  const misplacedBlocks = orderedBlocks.filter((b) => b.isMisplaced);
  const normalBlocks = orderedBlocks.filter((b) => !b.isMisplaced);

  function registerBlockRef(artistName, node) {
    if (node) blockRefs.current[artistName] = node;
  }

  function handleMergeTrack(trackId) {
    const track = tracks.find((t) => t.trackId === trackId);
    onInsertIntoArtistBlock(trackId);
    if (track) setScrollTargetArtist(track.artistName);
  }

  // 드래그와 ▲▼ 버튼이 공유하는 실제 재배치 실행 함수.
  // newNormalBlockOrder: 순서가 바뀐 normalBlocks 배열을 받아 tracks 전체를 다시 조립.
  function applyBlockOrder(newNormalBlockOrder) {
    const reorderedTracks = newNormalBlockOrder.flatMap((b) => b.tracks);
    const misplacedTracks = misplacedBlocks.flatMap((b) => b.tracks);
    onReorderBlocks([...reorderedTracks, ...misplacedTracks]);
  }

  function handleMoveBlock(blockId, direction) {
    const index = normalBlocks.findIndex((b) => b.blockId === blockId);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= normalBlocks.length) return;
    applyBlockOrder(arrayMove(normalBlocks, index, targetIndex));
  }

  // [신규] 같은 블록(=같은 아티스트) 안에서만 트랙끼리 순서를 바꾼다.
  // 다른 아티스트 트랙 위로 드래그되면 무시 — 블록 간 이동은 병합 드롭존을 통해서만
  // 가능하도록 의도적으로 제한(그래야 "블록"이라는 단위 자체가 흐트러지지 않음).
  function handleReorderTracksWithinBlock(activeTrackId, overTrackId) {
    if (activeTrackId === overTrackId) return;
    const activeIndex = tracks.findIndex((t) => t.trackId === activeTrackId);
    const overIndex = tracks.findIndex((t) => t.trackId === overTrackId);
    if (activeIndex === -1 || overIndex === -1) return;
    if (tracks[activeIndex].artistName !== tracks[overIndex].artistName) return;
    onReorderBlocks(arrayMove(tracks, activeIndex, overIndex));
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    // 1) 떨어져 나온 곡을 아티스트 블록 위에 드롭 → 병합
    if (String(over.id).startsWith('drop-')) {
      handleMergeTrack(active.id);
      return;
    }

    // 2) 블록 자체를 다른 블록 자리로 드래그 → 순서 재배치
    const isBlockDrag =
      String(active.id).startsWith('block-') && String(over.id).startsWith('block-');
    if (isBlockDrag && active.id !== over.id) {
      const oldIndex = normalBlocks.findIndex((b) => b.blockId === active.id);
      const newIndex = normalBlocks.findIndex((b) => b.blockId === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      applyBlockOrder(arrayMove(normalBlocks, oldIndex, newIndex));
      return;
    }

    // 3) [신규] 둘 다 블록/드롭존이 아니면 트랙 id끼리의 드래그 → 블록 내부 순서 변경
    handleReorderTracksWithinBlock(active.id, over.id);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {misplacedBlocks.length > 0 && (
        <ul className="misplaced-tray">
          {misplacedBlocks.map((block) => (
            <MisplacedTrackCard
              key={block.blockId}
              track={block.tracks[0]}
              onMoveToMain={() => handleMergeTrack(block.tracks[0].trackId)}
            />
          ))}
        </ul>
      )}

      <SortableContext
        items={normalBlocks.map((b) => b.blockId)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="playlist-view">
          {normalBlocks.map((block, index) => (
            <ArtistBlock
              key={block.blockId}
              block={block}
              isDropTarget={block.isDropTarget}
              isHighlighted={block.artistName === highlightArtist}
              registerRef={registerBlockRef}
              onMoveUp={() => handleMoveBlock(block.blockId, 'up')}
              onMoveDown={() => handleMoveBlock(block.blockId, 'down')}
              isFirst={index === 0}
              isLast={index === normalBlocks.length - 1}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default PlaylistView;