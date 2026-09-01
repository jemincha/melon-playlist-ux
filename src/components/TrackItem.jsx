// src/components/TrackItem.jsx
//
// 플레이리스트 내 곡 한 줄을 렌더링하는 표시 전용(presentational) 컴포넌트.
// 상태나 로직을 갖지 않고, props로 받은 데이터를 그리기만 한다.
//
// Props:
// - track: { trackId, title, artistName, album, albumArt, addedAt }
//
// [Phase 1] 곡명/아티스트명/앨범아트만 표시. (완료)
// [Phase 2] 같은 아티스트 블록임을 시각적으로 표시하는 스타일 추가 예정 (ArtistBlock과 연동)

function TrackItem({ track }) {
  return (
    <li className="track-item">
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
    </li>
  );
}

export default TrackItem;
