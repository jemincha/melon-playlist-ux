// src/components/PlaylistView.jsx
//
// 플레이리스트 전체 목록을 렌더링. usePlaylist에서 받은 tracks를 블록 단위로
// 그리고, "떨어져 나온 곡"이 있으면 드래그/클릭으로 블록에 합칠 수 있게 한다.
//
// Props:
// - tracks: Track[] (usePlaylist().tracks)
// - onInsertIntoArtistBlock(trackId): 병합 실행 함수 (usePlaylist().insertIntoArtistBlock)
// - sortMode: 'default' | 'artist-az' (Phase 5, App의 로컬 상태에서 전달)
//
// [Phase 1] 기본 렌더링 (완료)
// [Phase 2] 아티스트 블록 그룹핑 (완료)
// [Phase 4] 떨어져 나온 곡 감지 + 드래그/클릭 병합 (완료)
// [Phase 5] sortMode에 따른 블록 정렬 (완료)

import { DndContext } from '@dnd-kit/core';
import ArtistBlock from './ArtistBlock';
import MisplacedTrackCard from './MisplacedTrackCard';
import { groupByArtist } from '../utils/groupByArtist';
import { analyzeBlocks } from '../utils/analyzeBlocks';

function sortBlocks(blocks, sortMode) {
  if (sortMode !== 'artist-az') return blocks;
  return [...blocks].sort((a, b) => a.artistName.localeCompare(b.artistName, 'ko'));
}

function PlaylistView({ tracks, onInsertIntoArtistBlock, sortMode = 'default' }) {
  if (tracks.length === 0) {
    return <p className="playlist-view__empty">플레이리스트가 비어있습니다.</p>;
  }

  const rawBlocks = groupByArtist(tracks);
  const analyzedBlocks = analyzeBlocks(rawBlocks);
  const orderedBlocks = sortBlocks(analyzedBlocks, sortMode);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    if (!String(over.id).startsWith('drop-')) return;
    onInsertIntoArtistBlock(active.id);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <ul className="playlist-view">
        {orderedBlocks.map((block) =>
          block.isMisplaced ? (
            <MisplacedTrackCard
              key={block.blockId}
              track={block.tracks[0]}
              onMoveToMain={() => onInsertIntoArtistBlock(block.tracks[0].trackId)}
            />
          ) : (
            <ArtistBlock key={block.blockId} block={block} isDropTarget={block.isDropTarget} />
          )
        )}
      </ul>
    </DndContext>
  );
}

export default PlaylistView;
