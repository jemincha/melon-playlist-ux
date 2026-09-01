// src/components/AddTrackButton.jsx
//
// "곡 추가" 시뮬레이션 UI. newTrackCandidates.js의 후보 곡들을 목록으로 보여주고,
// 각 곡의 "추가" 버튼을 누르면 As-Is 동작(usePlaylist.addTrack)이 실행된다.
// 후보 목록 상태는 이 컴포넌트가 로컬로 관리 (플레이리스트 자체 상태와는 무관하므로
// usePlaylist에 둘 필요 없음 — 가이드라인 3절의 "진실의 원천은 하나로" 원칙 유지).
//
// Props:
// - onAdd(track): 추가 버튼 클릭 시 호출할 콜백 (App에서 usePlaylist().addTrack 전달)

import { useState } from 'react';
import { getNewTrackCandidates } from '../data/newTrackCandidates';

function AddTrackButton({ onAdd }) {
  const [candidates, setCandidates] = useState(() => getNewTrackCandidates());

  function handleAdd(candidate) {
    onAdd(candidate);
    // 추가한 후보는 목록에서 제거 (중복 추가 방지)
    setCandidates((prev) => prev.filter((c) => c.trackId !== candidate.trackId));
  }

  if (candidates.length === 0) {
    return (
      <p className="add-track__empty">
        추가할 수 있는 신곡 후보를 모두 추가했습니다.
      </p>
    );
  }

  return (
    <section className="add-track">
      <p className="add-track__label">곡 추가 시뮬레이션 (신곡 발매 가정)</p>
      <ul className="add-track__list">
        {candidates.map((candidate) => (
          <li key={candidate.trackId} className="add-track__item">
            <span className="add-track__item-text">
              {candidate.title} · {candidate.artistName}
            </span>
            <button
              type="button"
              className="add-track__button"
              onClick={() => handleAdd(candidate)}
            >
              추가
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AddTrackButton;
