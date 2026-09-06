// src/components/TrackItem.jsx
//
// [신규] 체크박스가 실제로 동작함 — 다중 선택/일괄 삭제에 쓰임 (isSelected/onToggleSelect
// 가 없으면 기존처럼 장식용 원형 표시로 폴백).
// [신규] 오프라인 재생 모드에서 "다운로드 안 된 곡"으로 표시되면 흐리게 처리.

function TrackItem({
  track,
  innerRef,
  style,
  dragHandleProps,
  isSelected,
  onToggleSelect,
  isOfflineUnavailable = false,
}) {
  const isSelectable = typeof onToggleSelect === 'function';

  return (
    <li
      ref={innerRef}
      style={style}
      className={`track-item${isOfflineUnavailable ? ' track-item--offline-unavailable' : ''}`}
    >
      {isSelectable ? (
        <input
          type="checkbox"
          className="track-item__checkbox track-item__checkbox--real"
          checked={!!isSelected}
          onChange={() => onToggleSelect(track.trackId)}
          aria-label={`${track.title} 선택`}
        />
      ) : (
        <span className="track-item__checkbox" aria-hidden="true" />
      )}
      <img
        className="track-item__art"
        src={track.albumArt}
        alt={`${track.album} 앨범아트`}
        width={48}
        height={48}
      />
      <div className="track-item__info">
        <p className="track-item__title">{track.title}</p>
        <p className="track-item__artist">
          {track.artistName}
          {isOfflineUnavailable && (
            <span className="track-item__offline-badge">다운로드 필요</span>
          )}
        </p>
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