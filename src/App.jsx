// src/App.jsx
//
// 최상위 컴포넌트. usePlaylist 훅으로 상태를 가져와 하위 컴포넌트에 전달하는
// "조립" 역할만 담당 (가이드라인 2~3절: 상태는 훅에 모으고 컴포넌트는 props로만 받는다).
//
// [Phase 1] usePlaylist -> PlaylistView 연결 (완료)
// [Phase 3] AddTrackButton 연결 (완료)
// [Phase 4] insertIntoArtistBlock 연결 (완료)
// [Phase 5] SortToggle + sortMode 로컬 상태 (완료)
// [Phase 6] CompareView 토글 (완료)

import { useState } from 'react';
import './App.css';
import { usePlaylist } from './hooks/usePlaylist';
import PlaylistView from './components/PlaylistView';
import AddTrackButton from './components/AddTrackButton';
import SortToggle from './components/SortToggle';
import CompareView from './components/CompareView';

function App() {
  const { tracks, addTrack, insertIntoArtistBlock } = usePlaylist();
  const [sortMode, setSortMode] = useState('default'); // Phase 5: 'default' | 'artist-az'
  const [showCompare, setShowCompare] = useState(false); // Phase 6

  return (
    <main className="app">
      <h1>멜론 플레이리스트 편집 UX 개선 — 국내밴드 ({tracks.length}곡)</h1>

      <AddTrackButton onAdd={addTrack} />

      <div className="app__toolbar">
        <SortToggle sortMode={sortMode} onChange={setSortMode} />
        <button
          type="button"
          className="app__compare-toggle"
          onClick={() => setShowCompare((prev) => !prev)}
        >
          {showCompare ? '비교 보기 닫기' : 'As-Is / To-Be 비교 보기'}
        </button>
      </div>

      {showCompare && <CompareView tracks={tracks} />}

      <PlaylistView
        tracks={tracks}
        onInsertIntoArtistBlock={insertIntoArtistBlock}
        sortMode={sortMode}
      />
    </main>
  );
}

export default App;
