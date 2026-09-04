// src/components/SortableTrackItem.jsx
//
// TrackItem을 "블록 내부에서 드래그로 순서 변경 가능한" 버전으로 감싸는 컴포넌트.
// useSortable은 훅이라 .map() 콜백 안에서 바로 호출할 수 없어서 (Hooks 규칙 위반),
// 트랙 하나당 이 컴포넌트를 하나씩 렌더링하는 방식으로 분리함.
//
// Props:
// - track: Track — 이 트랙이 속한 아티스트 블록의 SortableContext 안에서만 사용되어야 함
//   (ArtistBlock이 block.tracks 단위로 SortableContext를 열어줌)

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TrackItem from './TrackItem';

function SortableTrackItem({ track }) {
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
    />
  );
}

export default SortableTrackItem;