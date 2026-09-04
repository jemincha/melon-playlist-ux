// src/components/TrackItem.jsx
//
// 플레이리스트 내 곡 한 줄. 실제 멜론 스크린샷 기준 레이아웃:
// 원형 체크박스(장식용) + 앨범아트 + 곡명/아티스트 + 드래그핸들 아이콘.
//
// [신규] 핸들(≡)이 이제 실제로 동작함 — 블록 내부에서 트랙 순서를 바꾸는
// 드래그 트리거가 됨 (SortableTrackItem이 dragHandleProps를 넘겨줄 때만 활성화).
// MisplacedTrackCard/CompareView에서 쓰일 때는 dragHandleProps가 없어서 그대로 장식용
// (커서도 grab으로 안 바뀜 — 실제 상호작용 가능할 때만 그렇게 보이도록 구분).
//
// Props:
// - track: { trackId, title, artistName, album, albumArt, addedAt }
// - innerRef: 정렬 시 필요한 DOM 참조 (SortableTrackItem에서 전달, 없으면 미적용)
// - style: 정렬 시 필요한 transform/transition 스타일 (SortableTrackItem에서 전달)
// - dragHandleProps: 핸들에 씌울 dnd-kit attributes+listeners (없으면 핸들은 장식용)

function TrackItem({ track, innerRef, style, dragHandleProps }) {
  return (
    <li ref={innerRef} style={style} className="track-item">
      <span className="track-item__checkbox" aria-hidden="true" />
      <img
        className="track-item__art"
        src={track.albumArt}
        alt={`${track.album} 앨범아트`}
        width={48}
        height={48}
      />
      <div className="track-item__info">
        <p className="track-item__title">{track.title}</p>
        <p className="track-item__artist">{track.artistName}</p>
      </div>
      <span
        className={`track-item__handle${dragHandleProps ? ' track-item__handle--active' : ''}`}
        {...(dragHandleProps
          ? { 'aria-label': `${track.title} 순서 이동`, ...dragHandleProps }
          : { 'aria-hidden': true })}
      >
        ≡
      </span>
    </li>
  );
}

export default TrackItem;