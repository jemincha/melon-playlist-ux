// 신곡 이동 후보. 선택/목적지 입력과 드래그 핸들을 분리한다.
import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import TrackItem from './TrackItem';

function MisplacedTrackCard({
  track,
  targetBlocks,
  onMoveToMain,
  isSelected,
  onToggleSelect,
  isOfflineMode = false,
  isDownloaded,
}) {
  const [targetId, setTargetId] = useState('');
  const defaultTarget = targetBlocks.reduce((a, b) =>
    b.tracks.length > a.tracks.length ? b : a
  );
  const selectedTarget =
    targetBlocks.find((b) => b.blockId === targetId) ?? defaultTarget;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: track.trackId,
      data: { type: 'pending-track', artistName: track.artistName },
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
        <div className="misplaced-card__drag-handle">
          <TrackItem
            track={track}
            as="div"
            isSelected={isSelected}
            onToggleSelect={onToggleSelect}
            dragHandleProps={{ ...attributes, ...listeners }}
            isOfflineUnavailable={
              isOfflineMode && isDownloaded && !isDownloaded(track.trackId)
            }
          />
        </div>
        <select
          aria-label={`${track.title} 이동할 블록`}
          value={selectedTarget.blockId}
          onChange={(event) => setTargetId(event.target.value)}
        >
          {targetBlocks.map((block, index) => (
            <option key={block.blockId} value={block.blockId}>
              {block.artistName} 구간 {index + 1} · {block.tracks[0].title}부터
              ({block.tracks.length}곡)
            </option>
          ))}
        </select>
        <button
          type="button"
          className="misplaced-card__button"
          onClick={() => onMoveToMain(selectedTarget.blockId)}
        >
          블록으로 이동
        </button>
      </div>
    </li>
  );
}

export default MisplacedTrackCard;
