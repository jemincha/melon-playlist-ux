// src/components/ArtistBlock.jsx
//
// 아티스트 블록. 네 가지 상호작용을 갖는다:
// 1) (Phase 4) 떨어져 나온 곡을 받는 드롭 타깃 — useDroppable
// 2) 블록 자체를 드래그로 옮기는 정렬 대상 — useSortable (그립 아이콘 ⠿)
// 3) 드래그가 여의치 않을 때를 위한 확정 동작 버튼 — ▲ 위로 / ▼ 아래로
// 4) [신규] 블록 내부 트랙끼리 순서 변경 — SortableTrackItem으로 감싼 곡들을
//    블록 전용 SortableContext로 한 번 더 감싸 "블록 재정렬"과 섞이지 않게 함
//
// Props:
// - block: { blockId, artistName, tracks: Track[] }
// - isDropTarget: 드롭 대상 여부 (Phase 4)
// - isHighlighted: 방금 병합이 완료돼 스크롤+하이라이트 대상인지
// - registerRef(artistName, node): 스크롤 이동을 위해 실제 DOM 노드를 부모(PlaylistView)에 등록
// - onMoveUp() / onMoveDown(): 블록을 한 칸 위/아래로 이동
// - isFirst / isLast: 맨 위/맨 아래 블록이면 해당 방향 버튼 비활성화

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SortableTrackItem from './SortableTrackItem';

function ArtistBlock({
  block,
  isDropTarget = false,
  isHighlighted = false,
  registerRef,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
}) {
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `drop-${block.artistName}`,
    disabled: !isDropTarget,
  });

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.blockId });

  // 세 가지 ref(블록 정렬용/드롭용/스크롤용)를 한 DOM 노드에 함께 연결
  function combinedRef(node) {
    setSortableRef(node);
    if (isDropTarget) setDropRef(node);
    registerRef?.(block.artistName, node);
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const className = [
    'artist-block',
    isDropTarget ? 'artist-block--drop-target' : '',
    isDropTarget && isOver ? 'artist-block--drop-hover' : '',
    isDragging ? 'artist-block--dragging' : '',
    isHighlighted ? 'artist-block--highlighted' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li ref={combinedRef} style={style} className={className}>
      <div className="artist-block__header">
        <span
          className="artist-block__grip"
          aria-label={`${block.artistName} 블록 드래그로 순서 이동`}
          {...attributes}
          {...listeners}
        >
          ⠿
        </span>
        {block.tracks.length > 1 && (
          <p className="artist-block__label">
            {block.artistName}
            <span className="artist-block__count">{block.tracks.length}</span>
            {isDropTarget && <span className="artist-block__drop-hint">여기로 드롭</span>}
          </p>
        )}
        <div className="artist-block__move-buttons">
          <button
            type="button"
            className="artist-block__move-btn"
            aria-label={`${block.artistName} 블록 위로 이동`}
            disabled={isFirst}
            onClick={onMoveUp}
          >
            ▲
          </button>
          <button
            type="button"
            className="artist-block__move-btn"
            aria-label={`${block.artistName} 블록 아래로 이동`}
            disabled={isLast}
            onClick={onMoveDown}
          >
            ▼
          </button>
        </div>
      </div>
      <SortableContext
        items={block.tracks.map((t) => t.trackId)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="artist-block__tracks">
          {block.tracks.map((track) => (
            <SortableTrackItem key={track.trackId} track={track} />
          ))}
        </ul>
      </SortableContext>
    </li>
  );
}

export default ArtistBlock;