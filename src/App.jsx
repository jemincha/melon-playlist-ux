// src/App.jsx
//
// 최상위 컴포넌트. usePlaylist 훅으로 상태를 가져와 하위 컴포넌트에 전달하는
// "조립" 역할만 담당.
//
// [리스킨] 다크 테마 + 상단 탭바 목업.
// [개선] 데모 대시보드(곡 추가/비교)를 목록 위로 올려 한눈에 보이게 함.
// [수정] 하단 재생바(PlayerBarMock) 제거 — 불필요하다는 피드백 반영.
//        대신 스크롤 후 상단 대시보드로 빠르게 복귀할 수 있는 ScrollTopButton 추가.
// [신규] 블록 순서 조절(드래그+버튼) 발견성을 위한 안내 문구 추가.

import { useState } from 'react';
import './App.css';
import { usePlaylist } from './hooks/usePlaylist';
import PlaylistView from './components/PlaylistView';
import AddTrackButton from './components/AddTrackButton';
import SortToggle from './components/SortToggle';
import CompareView from './components/CompareView';
import TopNavMock from './components/TopNavMock';
import ScrollTopButton from './components/ScrollTopButton';

function App() {
  const { tracks, addTrack, insertIntoArtistBlock, reorderByBlocks } = usePlaylist();
  const [sortMode, setSortMode] = useState('default');
  const [showCompare, setShowCompare] = useState(false);
  const [showSimTools, setShowSimTools] = useState(true); // 기본으로 펼쳐서 한눈에 보이게

  return (
    <div className="app-shell">
      <p className="app-shell__disclaimer">
        실제 멜론 서비스와 무관한 개인 포트폴리오용 비공식 UI 시뮬레이션입니다
      </p>

      <TopNavMock />

      {/* 데모 대시보드 — 실제 멜론에는 없는, 이 프로토타입만의 시연 도구.
          목록 위 상단에 고정 카드로 배치해 As-Is/To-Be 비교를 한눈에 볼 수 있게 함 */}
      <section className="sim-dashboard">
        <button
          type="button"
          className="sim-dashboard__toggle"
          onClick={() => setShowSimTools((prev) => !prev)}
        >
          🎛 데모 대시보드 {showSimTools ? '▲' : '▼'}
        </button>
        {showSimTools && (
          <div className="sim-dashboard__panel">
            <AddTrackButton onAdd={addTrack} />
            <button
              type="button"
              className="sim-dashboard__compare-toggle"
              onClick={() => setShowCompare((prev) => !prev)}
            >
              {showCompare ? '비교 보기 닫기' : 'As-Is / To-Be 비교 보기'}
            </button>
            {showCompare && <CompareView tracks={tracks} />}
          </div>
        )}
      </section>

      <div className="app-shell__control-row">
        <span className="app-shell__count">
          <span className="app-shell__count-checkbox" aria-hidden="true" />
          {tracks.length}곡
        </span>
        <div className="app-shell__control-right">
          <span className="app-shell__offline">
            <span className="app-shell__offline-toggle" aria-hidden="true" />
            오프라인 재생
          </span>
          <SortToggle sortMode={sortMode} onChange={setSortMode} />
        </div>
      </div>

      <p className="app-shell__hint">
        ⠿ 드래그하거나 블록 옆 ▲▼ 버튼으로 아티스트 블록 순서를 바꿀 수 있어요
      </p>

      <PlaylistView
        tracks={tracks}
        onInsertIntoArtistBlock={insertIntoArtistBlock}
        onReorderBlocks={reorderByBlocks}
        sortMode={sortMode}
      />

      <ScrollTopButton />
    </div>
  );
}

export default App;