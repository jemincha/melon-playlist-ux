// src/components/ArtistBlock.jsx
//
// groupByArtist가 만든 블록 하나(같은 아티스트의 연속된 곡들)를 시각적으로
// 묶어서 렌더링하는 컴포넌트.
//
// Props:
// - block: { blockId, artistName, tracks: Track[] }
// - isDropTarget: 이 블록이 "떨어져 나온 곡(MisplacedTrackCard)"을 드래그해서
//   놓을 수 있는 대상인지 여부. true면 useDroppable로 드롭 영역이 되고,
//   드래그 중인 항목이 위에 올라오면 하이라이트 스타일이 적용됨.
//
// [Phase 2] 정적 그룹 표시 (완료)
// [Phase 4] 드롭 대상으로 확장 (완료)

import { useDroppable } from '@dnd-kit/core';
import TrackItem from './TrackItem';

function ArtistBlock({ block, isDropTarget = false }) {
  // isDropTarget이 아닐 때도 훅은 항상 호출해야 하므로(React 훅 규칙),
  // id는 항상 넘기되 disabled로 드롭 기능만 꺼둔다.
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${block.artistName}`,
    disabled: !isDropTarget,
  });

  const className = [
    'artist-block',
    isDropTarget ? 'artist-block--drop-target' : '',
    isDropTarget && isOver ? 'artist-block--drop-hover' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li ref={isDropTarget ? setNodeRef : undefined} className={className}>
      <p className="artist-block__label">
        {block.artistName}
        <span className="artist-block__count">{block.tracks.length}곡</span>
        {isDropTarget && <span className="artist-block__drop-hint">여기로 드롭</span>}
      </p>
      <ul className="artist-block__tracks">
        {block.tracks.map((track) => (
          <TrackItem key={track.trackId} track={track} />
        ))}
      </ul>
    </li>
  );
}

export default ArtistBlock;
