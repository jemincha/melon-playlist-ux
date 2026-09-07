// src/App.jsx
//
// 최상위 컴포넌트. usePlaylist 훅으로 상태를 가져와 하위 컴포넌트에 전달하는
// "조립" 역할만 담당.
//
// [리스킨] 다크 테마 + 상단 탭바 목업.
// [개선] 데모 대시보드(곡 추가/비교)를 목록 위로 올려 한눈에 보이게 함.
// [신규] 그래픽만 있던 요소들을 실제로 기능화:
//   - 검색(⌕): 실시간 곡명/아티스트 필터링
//   - 펼치기(⌄): 플레이리스트 메타정보 패널
//   - 체크박스(전체선택 포함): 다중 선택 → 일괄 삭제
//   - 오프라인 재생 토글: 다운로드 안 된 곡을 흐리게 표시하는 시뮬레이션
// [UI 디테일] 블록 조작 안내 문구를 데모 대시보드 안으로 이동 — "실제 앱 영역"과
// "이 프로토타입만의 도구" 영역의 시각적 위계를 분리.

import { useState } from 'react';
import './App.css';
import { usePlaylist } from './hooks/usePlaylist';
import { useTrackSelection } from './hooks/useTrackSelection';
import { isTrackDownloaded } from './utils/downloadStatus';
import PlaylistView from './components/PlaylistView';
import AddTrackButton from './components/AddTrackButton';
import SortToggle from './components/SortToggle';
import CompareView from './components/CompareView';
import TopNavMock from './components/TopNavMock';
import ScrollTopButton from './components/ScrollTopButton';
import SearchBar from './components/SearchBar';
import PlaylistMetaPanel from './components/PlaylistMetaPanel';
import BulkActionBar from './components/BulkActionBar';

function App() {
  const { tracks, addTrack, insertIntoArtistBlock, reorderByBlocks, deleteTracks } =
    usePlaylist();
  const selection = useTrackSelection();

  const [sortMode, setSortMode] = useState('default');
  const [showCompare, setShowCompare] = useState(false);
  const [showSimTools, setShowSimTools] = useState(true);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMetaOpen, setIsMetaOpen] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const allSelected = selection.selectedIds.size > 0 && selection.selectedIds.size === tracks.length;

  function handleToggleSearch() {
    setIsSearchOpen((prev) => {
      if (prev) setSearchQuery('');
      return !prev;
    });
  }

  function handleToggleSelectAll() {
    if (allSelected) {
      selection.clear();
    } else {
      selection.selectAll(tracks.map((t) => t.trackId));
    }
  }

  function handleBulkDelete() {
    deleteTracks(selection.selectedIds);
    selection.clear();
  }

  return (
    <div className="app-shell">
      <p className="app-shell__disclaimer">
        실제 멜론 서비스와 무관한 개인 포트폴리오용 비공식 UI 시뮬레이션입니다
      </p>

      <TopNavMock
        isSearchOpen={isSearchOpen}
        onToggleSearch={handleToggleSearch}
        isMetaOpen={isMetaOpen}
        onToggleMeta={() => setIsMetaOpen((prev) => !prev)}
      />

      {isSearchOpen && (
        <SearchBar
          query={searchQuery}
          onChange={setSearchQuery}
          onClose={() => {
            setIsSearchOpen(false);
            setSearchQuery('');
          }}
        />
      )}

      {isMetaOpen && <PlaylistMetaPanel trackCount={tracks.length} />}

      {/* 데모 대시보드 — 실제 멜론에는 없는, 이 프로토타입만의 시연 도구.
          블록/곡 조작 안내 문구도 여기 안에 함께 둬서, "실제 앱처럼 보이는 영역"
          (탭바·검색·컨트롤 행·목록)과 "이 프로토타입만의 도구" 영역을 시각적으로 분리함. */}
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
            <p className="sim-dashboard__hint">
              ⠿ 블록 드래그, 곡의 ≡ 핸들로 블록 내부 순서, ▲▼ 버튼도 가능 · 체크박스로
              여러 곡 선택해 일괄 삭제
            </p>
          </div>
        )}
      </section>

      <div className="app-shell__control-row">
        <span className="app-shell__count">
          <input
            type="checkbox"
            className="app-shell__count-checkbox app-shell__count-checkbox--real"
            checked={allSelected}
            onChange={handleToggleSelectAll}
            aria-label="전체 선택"
          />
          {tracks.length}곡
        </span>
        <div className="app-shell__control-right">
          <button
            type="button"
            className="app-shell__offline"
            aria-pressed={isOfflineMode}
            onClick={() => setIsOfflineMode((prev) => !prev)}
          >
            <span
              className={`app-shell__offline-toggle${isOfflineMode ? ' app-shell__offline-toggle--on' : ''}`}
              aria-hidden="true"
            />
            오프라인 재생
          </button>
          <SortToggle sortMode={sortMode} onChange={setSortMode} />
        </div>
      </div>

      <PlaylistView
        tracks={tracks}
        onInsertIntoArtistBlock={insertIntoArtistBlock}
        onReorderBlocks={reorderByBlocks}
        sortMode={sortMode}
        searchQuery={searchQuery}
        selectedIds={selection.selectedIds}
        onToggleSelect={selection.toggle}
        isOfflineMode={isOfflineMode}
        isDownloaded={isTrackDownloaded}
      />

      <BulkActionBar
        selectedCount={selection.selectedIds.size}
        onDelete={handleBulkDelete}
        onClear={selection.clear}
      />

      <ScrollTopButton />
    </div>
  );
}

export default App;