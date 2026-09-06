// src/components/MisplacedTrackCard.jsx
//
// [참고] 여기엔 다중 선택 체크박스를 넣지 않음 — 카드 전체가 이미 드래그 핸들 역할을
// 하고 있어서, 체크박스를 누르는 제스처와 드래그 시작 제스처가 충돌할 수 있기 때문.
// 오프라인 재생 표시는 시각 전용이라 충돌 없이 그대로 전달함.

import { useDraggable } from '@dnd-kit/core';
import TrackItem from './TrackItem';

function MisplacedTrackCard({ track, onMoveToMain, isOfflineMode = false, isDownloaded }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: track.trackId,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: 10,
      }
    : undefined;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`misplaced-card${isDragging ? ' misplaced-card--dragging' : ''}`}
    >
      <p className="misplaced-card__label">
        ⚠ 새로 추가됨 · {track.artistName} 블록과 떨어져 있어요
      </p>
      <div className="misplaced-card__row">
        <div
          className="misplaced-card__drag-handle"
          aria-label="드래그해서 블록으로 이동"
          {...attributes}
          {...listeners}
        >
          <TrackItem
            track={track}
            isOfflineUnavailable={isOfflineMode && isDownloaded && !isDownloaded(track.trackId)}
          />
        </div>
        <button type="button" className="misplaced-card__button" onClick={onMoveToMain}>
          블록으로 이동
        </button>
      </div>
    </li>
  );
}

export default MisplacedTrackCard;