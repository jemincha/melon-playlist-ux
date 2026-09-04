// src/components/PlayerBarMock.jsx
//
// 실제 멜론 하단 재생바를 흉내낸 "순수 장식용" 컴포넌트. 재생 기능 없음.
// 화면 하단에 고정해 "지금 재생 중" 몰입감만 준다.
//
// Props:
// - track: 현재 "재생 중"으로 표시할 트랙 (Track) — 실제로는 재생 안 됨, 표시만

function PlayerBarMock({ track }) {
  if (!track) return null;

  return (
    <footer className="player-bar-mock" aria-hidden="true">
      <div className="player-bar-mock__progress" />
      <div className="player-bar-mock__row">
        <span className="player-bar-mock__icon player-bar-mock__icon--ghost">⚙</span>
        <span className="player-bar-mock__icon">⏮</span>
        <span className="player-bar-mock__play">⏸</span>
        <span className="player-bar-mock__icon">⏭</span>
        <img
          className="player-bar-mock__art"
          src={track.albumArt}
          alt=""
          width={36}
          height={36}
        />
      </div>
    </footer>
  );
}

export default PlayerBarMock;