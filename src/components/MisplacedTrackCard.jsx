// src/components/MisplacedTrackCard.jsx
//
// "블록에서 떨어져 나온" 곡(주로 AddTrackButton으로 방금 추가된 신곡)을 표시하는
// 컴포넌트. As-Is 문제 상황 그 자체를 시각적으로 보여주는 역할.
//
// 두 가지 방법으로 같은 아티스트 블록에 합칠 수 있게 함:
// 1) 드래그: useDraggable로 카드 자체를 드래그 가능하게 만들고,
//    해당 아티스트의 메인 블록(ArtistBlock에서 isDropTarget=true인 곳)에 드롭
// 2) 클릭: "블록으로 이동" 버튼 — 드래그가 번거롭거나 잘 안 될 때의 대체 수단
//
// Props:
// - track: 떨어져 나온 곡 (Track)
// - onMoveToMain(): 클릭 시 즉시 병합 실행 콜백

import { useDraggable } from '@dnd-kit/core';
import TrackItem from './TrackItem';

function MisplacedTrackCard({ track, onMoveToMain }) {
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
          <TrackItem track={track} />
        </div>
        <button type="button" className="misplaced-card__button" onClick={onMoveToMain}>
          블록으로 이동
        </button>
      </div>
    </li>
  );
}

export default MisplacedTrackCard;
