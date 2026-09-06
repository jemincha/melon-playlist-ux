// src/components/ArtistBlock.jsx
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
  selectedIds,
  onToggleSelect,
  isOfflineMode = false,
  isDownloaded,
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
            <SortableTrackItem
              key={track.trackId}
              track={track}
              isSelected={selectedIds?.has(track.trackId)}
              onToggleSelect={onToggleSelect}
              isOfflineUnavailable={isOfflineMode && isDownloaded && !isDownloaded(track.trackId)}
            />
          ))}
        </ul>
      </SortableContext>
    </li>
  );
}

export default ArtistBlock;