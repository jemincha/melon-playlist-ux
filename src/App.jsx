// src/App.jsx
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

      <p className="app-shell__hint">
        ⠿ 블록 드래그, 곡의 ≡ 핸들로 블록 내부 순서, ▲▼ 버튼도 가능 · 체크박스로 여러 곡
        선택해 일괄 삭제
      </p>

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