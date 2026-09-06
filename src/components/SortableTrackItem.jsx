// src/components/SortableTrackItem.jsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TrackItem from './TrackItem';

function SortableTrackItem({ track, isSelected, onToggleSelect, isOfflineUnavailable }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: track.trackId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <TrackItem
      track={track}
      innerRef={setNodeRef}
      style={style}
      dragHandleProps={{ ...attributes, ...listeners }}
      isSelected={isSelected}
      onToggleSelect={onToggleSelect}
      isOfflineUnavailable={isOfflineUnavailable}
    />
  );
}

export default SortableTrackItem;