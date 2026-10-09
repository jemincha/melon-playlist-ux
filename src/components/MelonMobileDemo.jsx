import { useEffect, useRef, useState } from 'react';
import { DndContext, PointerSensor, KeyboardSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getDummyTracks } from '../data/dummyTracks';
import { getNewTrackCandidates } from '../data/newTrackCandidates';
import { getPlaceholderAlbumArt as placeholderAlbumArt } from '../utils/placeholderAlbumArt';
import { groupByArtist } from '../utils/groupByArtist';
import { artistView, insertionTargets, addAtPosition, moveSegment, moveTrack } from '../utils/playlistEditing';
import Sheet from './Sheet';
import CoachMark from './CoachMark';

function Icon({ name, size = 22 }) {
  const paths = {
    back: <path d="m14 5-7 7 7 7" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    play: <path d="m9 5 11 7-11 7z" fill="currentColor" stroke="none" />,
    pause: <path d="M8 5v14M16 5v14" strokeWidth="4" />,
    next: <><path d="m6 5 10 7-10 7z" fill="currentColor" stroke="none" /><path d="M18 5v14" /></>,
    list: <><path d="M4 6h16M4 11h16M4 16h10" /><path d="m17 15 4 3-4 3z" fill="currentColor" stroke="none" /></>,
    grip: <path d="M5 8h14M5 12h14M5 16h14" />,
    sort: <><path d="M4 6h16M4 12h11M4 18h6" /><path d="m17 15 3 3 3-3M20 10v8" /></>,
    drawer: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M4 11h16M10 7h4M10 15h4" /></>,
    heart: <path d="M12 20 4 12C-1 6 7 1 12 7c5-6 13-1 8 5z" />,
    shuffle: <><path d="m3 5 16 14M3 19l16-14M17 5h4v4M17 19h4v-4" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function TrackRow({ track, editing, selected, onSelect, onPlay, onStep, first, last, playingId, sortable = {} }) {
  const { attributes, listeners, setNodeRef, transform, transition } = sortable;
  return (
    <li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`mobile-track${track.trackId === playingId ? ' mobile-track--playing' : ''}`} data-track-id={track.trackId}>
      {editing && <input type="checkbox" checked={selected} onChange={() => onSelect(track.trackId)} aria-label={`${track.title} 선택`} />}
      <img src={track.albumArt} width="46" height="46" alt="" />
      <button className="track-title" onClick={() => editing ? onSelect(track.trackId) : onPlay(track.trackId)}>
        <strong>{track.title}</strong><span>{track.artistName}</span>
      </button>
      {editing ? <div className="row-move">
        <button aria-label={`${track.title} 위로 이동`} disabled={first} onClick={() => onStep(track.trackId, -1)}>↑</button>
        <button className="drag-grip" {...attributes} {...listeners} aria-label={`${track.title} 드래그로 이동`}><Icon name="grip" size={18} /></button>
        <button aria-label={`${track.title} 아래로 이동`} disabled={last} onClick={() => onStep(track.trackId, 1)}>↓</button>
      </div> : !editing && <button className="track-more" aria-label={`${track.title} 정보`} onClick={() => onPlay(track.trackId, true)}><Icon name="more" size={19} /></button>}
    </li>
  );
}

function SortableTrackRow(props) {
  const sortable = useSortable({ id: props.track.trackId, data: { kind: 'track' } });
  return <TrackRow {...props} sortable={sortable} />;
}

function ArtistSegment({ block, onMove, onTrackMove, first, last, renderTrack }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.blockId, data: { kind: 'block' } });
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  return <li ref={setNodeRef} className="mobile-segment" style={{ transform: CSS.Transform.toString(transform), transition }}>
    <header><span><strong>{block.artistName}</strong><small>{block.tracks.length}곡</small></span>
      <div><button disabled={first} aria-label={`${block.artistName} 묶음 위로 이동`} onClick={() => onMove(block.blockId, -1)}>↑</button>
        <button className="drag-grip" {...attributes} {...listeners} aria-label={`${block.artistName} 묶음 드래그로 이동`}><Icon name="grip" size={18} /></button>
        <button disabled={last} aria-label={`${block.artistName} 묶음 아래로 이동`} onClick={() => onMove(block.blockId, 1)}>↓</button></div>
    </header><DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({ active, over }) => { if (over) onTrackMove(block, active.id, over.id); }}>
      <SortableContext items={block.tracks.map((track) => track.trackId)} strategy={verticalListSortingStrategy}>
        <ul>{block.tracks.map((track, index) => renderTrack(track, index, block))}</ul>
      </SortableContext>
    </DndContext>
  </li>;
}

function initialTracks() {
  return getDummyTracks().map((track) => ({ ...track, albumArt: placeholderAlbumArt(track.artistName) }));
}

function firstVisit() { try { return !localStorage.getItem('melon-coach-v3'); } catch { return true; } }

function blockKeyboardCoordinates(event, args) {
  const { active, over, collisionRect, droppableRects } = args.context;
  if (active?.data.current?.kind !== 'block') return sortableKeyboardCoordinates(event, args);
  if (!['ArrowUp', 'ArrowDown'].includes(event.code) || !collisionRect) return;
  event.preventDefault();
  const ids = active.data.current.sortable.items;
  const index = ids.indexOf(over?.id ?? active.id);
  const target = droppableRects.get(ids[index + (event.code === 'ArrowDown' ? 1 : -1)]);
  if (target) return {
    x: args.currentCoordinates.x + target.left - collisionRect.left + (target.width - collisionRect.width) / 2,
    y: args.currentCoordinates.y + target.top - collisionRect.top + (target.height - collisionRect.height) / 2,
  };
}

export default function MelonMobileDemo() {
  const [tracks, setTracks] = useState(initialTracks);
  const [mode, setMode] = useState(() => firstVisit() ? 'reference' : 'proposal');
  const [screen, setScreen] = useState('playlist');
  const [draft, setDraft] = useState(null);
  const [grouped, setGrouped] = useState(false);
  const [sort, setSort] = useState('custom');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [sheet, setSheet] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [position, setPosition] = useState('tail');
  const [undo, setUndo] = useState(null);
  const [notice, setNotice] = useState('');
  const [playingId, setPlayingId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [tour, setTour] = useState(() => firstVisit() ? 'baseline-add' : null);
  const [tourResult, setTourResult] = useState(null);
  const listRef = useRef(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: blockKeyboardCoordinates }));
  const editing = draft !== null;
  const current = draft ?? tracks;
  const visible = (sort === 'artist' && !editing ? artistView(current) : current)
    .filter((track) => `${track.title} ${track.artistName}`.toLowerCase().includes(query.trim().toLowerCase()));
  const blocks = groupByArtist(current);
  const available = getNewTrackCandidates().filter((track) => !tracks.some((item) => item.trackId === track.trackId) && (!tour || track.trackId === 'new-1'));
  const targets = candidate ? insertionTargets(tracks, candidate.artistName) : [];
  const previewTarget = targets.find((target) => target.afterId === position);
  const playingTrack = [...tracks, ...queue].find((track) => track.trackId === playingId);

  function announce(message) { setNotice(message); }
  function commit(next, message) { setUndo(tracks); setTracks(next); announce(message); }
  function startEdit() { setDraft([...tracks]); setSort('custom'); setQuery(''); setSearchOpen(false); setSelected(new Set()); setGrouped(mode === 'proposal'); if (tour === 'edit-open') setTour('block-move'); }
  function endEdit(save) {
    if (!editing) return;
    if (save) commit(draft, '플레이리스트 변경을 저장했어요');
    setDraft(null); setGrouped(false); setSelected(new Set());
    if (tour === 'edit-save' && save) setTour('done');
  }
  function reset(nextMode = mode) {
    setTracks(initialTracks()); setMode(nextMode); setDraft(null); setGrouped(false); setSort('custom');
    setSelected(new Set()); setSheet(null); setCandidate(null); setUndo(null); setQuery(''); setSearchOpen(false);
    setPlayingId(null); setIsPlaying(false); setQueue([]); setScreen('playlist'); announce('동일한 224곡으로 시작합니다');
  }
  function toggleSelect(id) { setSelected((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); }
  function stepTrack(id, direction) {
    const block = grouped ? blocks.find((item) => item.tracks.some((track) => track.trackId === id)) : null;
    const scope = block?.tracks ?? current;
    const index = scope.findIndex((track) => track.trackId === id);
    const over = scope[index + direction];
    if (over) { setDraft(moveTrack(current, id, over.trackId)); if (tour === 'track-move') setTour('edit-save'); }
  }
  function moveInside(block, id, overId) {
    if (id === overId || !block.tracks.some((track) => track.trackId === id) || !block.tracks.some((track) => track.trackId === overId)) return;
    setDraft(moveTrack(current, id, overId)); if (tour === 'track-move') setTour('edit-save');
  }
  function stepBlock(id, direction) {
    const index = blocks.findIndex((block) => block.blockId === id);
    const over = blocks[index + direction];
    if (over) { setDraft(moveSegment(current, id, over.blockId)); if (tour === 'block-move') setTour('track-move'); }
  }
  function dragEnd({ active, over }) {
    if (!editing || !over) return;
    setDraft(active.data.current?.kind === 'block'
      ? moveSegment(current, active.id, over.id) : moveTrack(current, active.id, over.id));
    if (active.id !== over.id && tour === 'block-move') setTour('track-move');
  }
  function play(id, info = false) {
    if (info) { setSheet({ kind: 'track', track: tracks.find((track) => track.trackId === id) }); return; }
    setQueue([...tracks]); setPlayingId(id); setIsPlaying(true);
    announce('재생 상태를 미리 봅니다 · 실제 음원은 재생하지 않아요');
  }
  function renderTrack(track, index, block) {
    const Row = editing ? SortableTrackRow : TrackRow;
    return <Row key={track.trackId} track={track} editing={editing}
      selected={selected.has(track.trackId)} onSelect={toggleSelect} onPlay={play} onStep={stepTrack}
      first={index === 0} last={index === (block?.tracks.length ?? current.length) - 1} playingId={playingId} />;
  }
  function chooseCandidate(track) { setCandidate({ ...track, albumArt: placeholderAlbumArt(track.artistName) }); setPosition('tail'); setSheet({ kind: 'position' }); if (tour) setTour(mode === 'reference' ? 'baseline-confirm' : 'proposal-position'); }
  function addCandidate() {
    if (tour === 'proposal-confirm' && !previewTarget) return;
    if (tour === 'baseline-confirm' && position !== 'tail') return;
    const next = addAtPosition(tracks, candidate, position);
    commit(next, previewTarget ? `${previewTarget.tracks.at(-1).title} 다음에 추가했어요` : position === 'head' ? '플레이리스트 맨 처음에 추가했어요' : '플레이리스트 맨 끝에 추가했어요');
    setSheet(null); setCandidate(null);
    if (tour === 'baseline-confirm' || tour === 'proposal-confirm') {
      const index = next.findIndex((track) => track.trackId === candidate.trackId);
      setTourResult((prev) => ({ ...prev, [tour === 'baseline-confirm' ? 'before' : 'after']: { position: index + 1, previous: next[index - 1]?.artistName } }));
      setTour(tour === 'baseline-confirm' ? 'baseline-result' : 'proposal-result');
    }
  }
  function finishTour() { setTour(null); setSheet(null); setDraft(null); setGrouped(false); setMode('proposal'); setNotice(''); try { localStorage.setItem('melon-coach-v3', 'done'); } catch { /* storage may be unavailable */ } }
  function beginTour() { reset('reference'); setTourResult(null); setTour('baseline-add'); }
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (tour === 'block-move') list.scrollTo({ top: 0 });
  }, [tour]);

  const coachSteps = {
    'baseline-add': { target: '.add-action', title: '먼저 기본 방식으로 곡을 담아볼게요.', copy: '곡 추가를 눌러 한로로의 가상 신곡을 담아보세요.' },
    'baseline-pick': { target: '.candidate-list button', title: '이 신곡을 담아보세요.', copy: '기존 한로로 곡은 13곡이 모여 있어요. 새 곡이 어디로 들어가는지 확인합니다.' },
    'baseline-confirm': { target: '.sheet-primary', title: '맨 끝에 추가해 주세요.', copy: '기본 추가 위치인 맨 끝으로 담아봅니다.' },
    'baseline-result': { target: '[data-track-id="new-1"]', title: `새 곡이 ${tourResult?.before?.position}번째에 떨어졌어요.`, copy: `앞 곡은 ${tourResult?.before?.previous}. 기존 한로로 구간으로 옮기려면 위치를 다시 찾아야 합니다. 다음 단계에서 같은 목록에 개선 방식을 적용합니다.`, next: () => { reset('proposal'); setTour('proposal-add'); } },
    'proposal-add': { target: '.add-action', title: '같은 곡을 개선 방식으로 담아볼게요.', copy: '동일한 224곡으로 돌아왔어요. 곡 추가를 눌러주세요.' },
    'proposal-pick': { target: '.candidate-list button', title: '같은 신곡을 선택하세요.', copy: '이번에는 추가하면서 곧바로 원하는 자리를 고릅니다.' },
    'proposal-position': { target: '.insertion-target', title: '한로로 구간을 눌러주세요.', copy: '기존 13곡의 마지막 ‘이상비행’ 다음에 새 곡을 넣을 수 있어요.' },
    'proposal-confirm': { target: '.sheet-primary', title: '선택한 구간에 추가하세요.', copy: '앞뒤 곡을 확인했으니 이 위치에 추가를 눌러주세요.' },
    'proposal-result': { target: '[data-track-id="new-1"]', title: '한로로 곡 바로 뒤에 들어갔어요.', copy: <><div className="comparison-result"><span>기본 모형<strong>{tourResult?.before?.position}번째 · {tourResult?.before?.previous} 다음</strong></span><span>개선안<strong>{tourResult?.after?.position}번째 · 한로로 다음</strong></span></div><p>기존 곡 순서는 그대로, 새 곡의 자리만 골랐어요. 이어서 묶음 편집을 해봅니다.</p></>, next: () => setTour('edit-open') },
    'edit-open': { target: '.edit-trigger', title: '이제 편집을 눌러주세요.', copy: '여러 곡을 하나의 블록으로 옮긴 뒤, 블록 안의 순서도 조정합니다.' },
    'block-move': { target: '[aria-label="Tuesday Beach Club 묶음 아래로 이동"]', title: '이 화살표로 블록 전체를 옮겨보세요.', copy: '아티스트 제목 옆 ↓를 누르면 3곡이 함께 이동하고, 블록 안의 순서는 유지됩니다.' },
    'track-move': { target: '[aria-label="Endless Shine 위로 이동"]', title: '이번에는 이 곡만 위로 옮겨보세요.', copy: '곡 옆 ↑는 같은 아티스트 블록 안에서만 곡의 순서를 바꿉니다.' },
    'edit-save': { target: '.edit-footer button:last-child', title: '변경한 순서를 저장하세요.', copy: '블록 전체 이동과 내부 곡 편집이 모두 적용됩니다.' },
    done: { target: '.playlist-hero', title: '체험을 마쳤어요.', copy: '곡을 원하는 구간에 담고, 아티스트 블록과 내부 곡 순서를 각각 바꿨습니다. 완료 후에는 개선안을 자유롭게 사용해 보세요.', next: finishTour },
  };
  const coach = coachSteps[tour];

  return <main className="portfolio-layout">
    <aside className="case-intro">
      <a className="project-mark" href="https://apps.apple.com/kr/app/id415597317" target="_blank" rel="noreferrer">MELON / UX STUDY <span>↗</span></a>
      <p className="case-eyebrow">PLAYLIST EDITING · CONCEPT PROTOTYPE</p>
      <h1>내가 만든 순서는 그대로.<br /><em>정리는 더 가볍게.</em></h1>
      <p className="case-description">224곡을 직접 정리한 플레이리스트에 새 곡이 들어온다면?<br />멜론 모바일의 음악서랍 맥락에서, 아티스트 묶음 이동과 추가 위치 선택을 제안합니다.</p>
      <p className="experience-route">기본 방식 → 개선 방식 → 블록 편집</p>
      <button className="tour-launch" onClick={beginTour}>처음부터 체험하기 →</button>
      <p className="mode-note">한 가지 흐름으로 차이를 직접 확인합니다.<br />체험을 시작하면 같은 224곡 예제로 초기화됩니다.</p>
      <details className="research-note"><summary>조사 근거와 재현 범위</summary>
        <p>공식 스토어의 음악서랍 화면·미니플레이어와 iOS 업데이트 기록을 참고했습니다. 상세 목록·편집 화면의 배치는 재구성했으며 최신 앱을 직접 조작한 재현은 아닙니다.</p>
        <p>‘기본 편집 모형’도 실제 앱의 기능 전체를 재현하지 않습니다. 아티스트순 보기·묶음 편집·구간 삽입은 이 데모의 제안입니다.</p>
        <a href="https://apps.apple.com/kr/app/id415597317?platform=vision" target="_blank" rel="noreferrer">공식 기능·업데이트 기록 ↗</a>
        <a href="https://play.google.com/store/apps/details?id=com.iloen.melon&hl=ko" target="_blank" rel="noreferrer">Android 공식 서비스 소개 ↗</a>
      </details>
    </aside>

    <section className="device-stage" aria-label="모바일 플레이리스트 프로토타입">
      <p className="device-caption"><span /> {mode === 'proposal' ? '개선안' : '기본 편집 모형'} · 모바일 UI 참고 재구성</p>
      <div className="mobile-device">
        <div className="device-status" aria-hidden="true"><span>9:41</span><span>▮▮▮ &nbsp; ◔ &nbsp; ▰</span></div>
        <header className="mobile-header">
          <button aria-label={screen === 'playlist' ? '음악서랍으로' : '플레이리스트로'} onClick={() => { if (editing) return; setScreen(screen === 'playlist' ? 'drawer' : 'playlist'); }} disabled={editing}><Icon name="back" /></button>
          <span>{screen === 'drawer' ? '음악서랍' : editing ? '플레이리스트 편집' : '플레이리스트'}</span>
          {screen === 'playlist' ? editing ? <button className="header-done" onClick={() => endEdit(true)}>완료</button>
            : <button aria-label="플레이리스트 정보" onClick={() => setSheet({ kind: 'info' })}><Icon name="more" /></button>
            : <Icon name="drawer" />}
        </header>

        {screen === 'drawer' ? <div className="drawer-content">
          <div className="drawer-shortcuts"><span><Icon name="list" />플레이리스트</span><span><Icon name="heart" />좋아요</span><span><Icon name="drawer" />다운로드</span></div>
          <h2>내 플레이리스트</h2><button className="drawer-playlist" onClick={() => setScreen('playlist')}>
            <div className="playlist-cover small"><Icon name="list" size={34} /></div><span><strong>국내밴드</strong><small>{tracks.length}곡 · 직접 만든 플레이리스트</small></span><span>›</span></button>
          <p className="drawer-caption">목록 관리 과제를 위한 화면 재구성입니다.</p>
        </div> : <>
          {!editing && <section className="playlist-hero"><div className="playlist-cover"><span>BAND<br />ARCHIVE</span><Icon name="list" size={35} /></div>
            <div><p>MY PLAYLIST</p><h2>국내밴드</h2><span>내가 만든 플레이리스트 · {tracks.length}곡</span><small>좋아하는 밴드의 곡을 모아둔 나만의 흐름</small></div></section>}
          {!editing && <div className="play-actions"><button onClick={() => tracks.length && play(tracks[0].trackId)} disabled={!tracks.length}><Icon name="play" size={17} />전체듣기</button>
            <button className="shuffle-action" aria-label="셔플 재생 상태 미리보기" onClick={() => tracks.length && play(tracks[Math.floor(Math.random() * tracks.length)].trackId)} disabled={!tracks.length}><Icon name="shuffle" size={19} /></button>
            <button className="add-action" onClick={() => { setSheet({ kind: 'add' }); if (tour) setTour(mode === 'reference' ? 'baseline-pick' : 'proposal-pick'); }}><Icon name="plus" size={18} />곡 추가</button></div>}
          <div className="list-toolbar">
            {editing ? <label><input type="checkbox" checked={current.length > 0 && selected.size === current.length} onChange={() => setSelected(selected.size === current.length ? new Set() : new Set(current.map((track) => track.trackId)))} />전체선택 <span>{selected.size}</span></label>
              : <span>전체 <strong>{tracks.length}</strong>곡</span>}
            <div>{!editing && <><button aria-label="목록에서 검색" aria-pressed={searchOpen} onClick={() => setSearchOpen(!searchOpen)}><Icon name="search" size={19} /></button>
              {mode === 'proposal' && <button className="sort-trigger" onClick={() => setSheet({ kind: 'sort' })}><Icon name="sort" size={17} />{sort === 'custom' ? '내 순서' : '아티스트순'}</button>}</>}
              <button className="edit-trigger" onClick={() => editing ? endEdit(false) : startEdit()}>{editing ? '취소' : '편집'}</button></div>
          </div>
          {searchOpen && !editing && <div className="mobile-search"><Icon name="search" size={18} /><input aria-label="곡명 또는 아티스트 검색" placeholder="곡명, 아티스트 검색" value={query} onChange={(event) => setQuery(event.target.value)} /><button aria-label="검색 닫기" onClick={() => { setSearchOpen(false); setQuery(''); }}>×</button></div>}
          {editing && mode === 'proposal' && <div className="edit-mode-control"><div role="group" aria-label="순서 편집 방식"><button aria-pressed={!grouped} onClick={() => setGrouped(false)}>곡별 편집</button><button aria-pressed={grouped} onClick={() => setGrouped(true)}>아티스트 블록</button></div><p>{grouped ? '제목 옆 핸들: 블록 전체 이동 · 곡 옆 핸들: 블록 안 순서' : '곡을 다른 아티스트 구간으로도 이동할 수 있어요.'}</p></div>}
          {sort === 'artist' && !editing && <p className="view-order-note">보기만 정렬합니다. 저장된 곡 순서는 유지됩니다.</p>}
          <div className={`track-scroll${tour?.endsWith('-result') ? ' tour-result-list' : ''}`} key={screen} ref={listRef}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={dragEnd}>
              <SortableContext items={grouped ? blocks.map((block) => block.blockId) : visible.map((track) => track.trackId)} strategy={verticalListSortingStrategy}>
                <ul className="mobile-tracks">{grouped ? blocks.map((block, index) => <ArtistSegment key={block.blockId} block={block} onMove={stepBlock} onTrackMove={moveInside} first={index === 0} last={index === blocks.length - 1} renderTrack={renderTrack} />) : visible.map((track, index) => renderTrack(track, index))}</ul>
              </SortableContext>
            </DndContext>
            {!visible.length && <p className="mobile-empty">{tracks.length ? '검색 결과가 없어요' : '아직 담긴 곡이 없어요'}</p>}
          </div>
          {editing && <footer className="edit-footer"><span>{selected.size}곡 선택</span><button disabled={!selected.size} onClick={() => { setDraft(current.filter((track) => !selected.has(track.trackId))); setSelected(new Set()); }}>선택 삭제</button><button onClick={() => endEdit(true)}>변경 저장</button></footer>}
        </>}

        {!editing && <footer className="mini-player"><div className="mini-progress" /><div className="mini-content">
          <img src={(playingTrack ?? tracks[0])?.albumArt} width="36" height="36" alt="" />
          <span><strong>{playingTrack?.title ?? '곡을 선택해 주세요'}</strong><small>{playingTrack?.artistName ?? '재생 UI 미리보기 · 음원 재생 없음'}</small></span>
          <button aria-label={isPlaying ? '재생 상태 일시정지' : '재생 상태 시작'} disabled={!tracks.length && !queue.length} onClick={() => { if (!playingId) play(tracks[0].trackId); else setIsPlaying(!isPlaying); }}><Icon name={isPlaying ? 'pause' : 'play'} /></button>
          <button aria-label="다음 곡 상태 미리보기" disabled={!queue.length} onClick={() => { const index = queue.findIndex((track) => track.trackId === playingId); setPlayingId(queue[(index + 1) % queue.length].trackId); }}><Icon name="next" size={20} /></button>
          <button aria-label="재생 대기열 보기" onClick={() => setSheet({ kind: 'queue' })}><Icon name="list" /></button>
        </div></footer>}
        <div className="device-home" aria-hidden="true"><span /></div>
      </div>
      {notice && !tour && <div className="demo-toast" role="status"><span>{notice}</span>{undo && <button onClick={() => { setTracks(undo); setUndo(null); setDraft(null); setGrouped(false); setSelected(new Set()); announce('이전 플레이리스트로 되돌렸어요'); }}>되돌리기</button>}<button aria-label="알림 닫기" onClick={() => setNotice('')}>×</button></div>}
      <p className="prototype-footnote">비공식 개선 제안 · 공개 UI 자료 기반 · 가상 신곡·재생 상태 시뮬레이션</p>
    </section>

    {sheet && <Sheet title={{ add: '곡 추가', position: '추가 위치 선택', sort: '정렬해서 보기', info: '플레이리스트 정보', track: '곡 정보', queue: '재생 대기열' }[sheet.kind]} onClose={() => { if (tour) finishTour(); else setSheet(null); }}>
      {sheet.kind === 'add' && <><p className="sheet-description">신곡 발매를 가정한 가상 곡입니다.</p><ul className="candidate-list">{available.map((track) => <li key={track.trackId}><img src={placeholderAlbumArt(track.artistName)} width="44" height="44" alt="" /><div><strong>{track.title}</strong><span>{track.artistName}</span></div><button onClick={() => chooseCandidate(track)}>담기</button></li>)}</ul>{!available.length && <p className="sheet-description">후보 곡을 모두 추가했어요. 데모를 초기화하면 다시 시작할 수 있어요.</p>}</>}
      {sheet.kind === 'position' && <><p className="sheet-description"><strong>{candidate.title}</strong><br />국내밴드에 추가합니다.</p>
        <div className="position-options"><label><input type="radio" name="position" checked={position === 'head'} onChange={() => setPosition('head')} /><span>맨 처음</span></label><label><input type="radio" name="position" checked={position === 'tail'} onChange={() => setPosition('tail')} /><span>맨 끝</span></label></div>
        {mode === 'proposal' && <section className="insertion-section"><div className="section-label">같은 아티스트 구간 <span>제안 기능</span></div><p>원하는 구간을 직접 선택하세요. 다른 곡의 순서는 바뀌지 않아요.</p>
          {targets.map((target, index) => <label className={`insertion-target${position === target.afterId ? ' chosen' : ''}`} key={target.blockId}><input type="radio" name="position" checked={position === target.afterId} onChange={() => { setPosition(target.afterId); if (tour === 'proposal-position') setTour('proposal-confirm'); }} /><span><strong>{target.artistName} {targets.length > 1 ? `구간 ${index + 1}` : ''}<small>{target.tracks.length}곡 · {target.start + 1}–{target.end}번째</small></strong><small>‘{target.tracks.at(-1).title}’ 다음</small></span></label>)}
          {!targets.length && <p>같은 아티스트의 기존 구간이 없어요. 맨 처음 또는 맨 끝을 선택하세요.</p>}</section>}
        <div className="insertion-preview"><span>추가 후 순서 미리보기</span>
          {position !== 'head' && <p>{previewTarget ? previewTarget.tracks.at(-1).title : tracks.at(-1)?.title ?? '목록 시작'}</p>}
          <p className="preview-new">＋ {candidate.title}</p>
          {(position === 'head' ? tracks[0] : previewTarget ? tracks[previewTarget.end] : null) && <p>{(position === 'head' ? tracks[0] : tracks[previewTarget.end]).title}</p>}
        </div><button className="sheet-primary" disabled={(tour === 'baseline-confirm' && position !== 'tail') || (tour === 'proposal-position' && !previewTarget)} onClick={addCandidate}>이 위치에 추가</button></>}
      {sheet.kind === 'sort' && <><p className="sheet-description">이 데모의 제안 기능입니다. 보는 순서만 바뀌며 편집은 저장된 순서에서 진행합니다.</p><div className="sort-options">{[{ value: 'custom', label: '내가 만든 순서', detail: '저장된 플레이리스트 순서' }, { value: 'artist', label: '아티스트 가나다순', detail: '같은 아티스트를 모아서 보기' }].map((option) => <button key={option.value} className={sort === option.value ? 'chosen' : ''} onClick={() => { setSort(option.value); setSheet(null); }}><span><strong>{option.label}</strong><small>{option.detail}</small></span><span>{sort === option.value ? '✓' : ''}</span></button>)}</div></>}
      {sheet.kind === 'info' && <div className="info-content"><h3>국내밴드</h3><p>{tracks.length}곡 · 직접 만든 플레이리스트</p><p>원래 사용자가 정리한 순서를 바탕으로 만든 데모입니다. 곡명·아티스트·앨범 정보 외 실제 추가 이력은 사용하지 않습니다.</p><p>재생 대기열과 저장된 플레이리스트는 별도 상태입니다. 실제 앱의 동기화 정책은 미확인입니다.</p></div>}
      {sheet.kind === 'track' && <div className="info-content"><h3>{sheet.track.title}</h3><p>{sheet.track.artistName}</p><p>{sheet.track.album}</p><button className="sheet-primary" onClick={() => { play(sheet.track.trackId); setSheet(null); }}>재생 상태 미리보기</button></div>}
      {sheet.kind === 'queue' && <><p className="sheet-description">재생을 시작할 때 목록을 복사한 별도 대기열입니다. 데모 동작이며 현재 멜론의 동기화 정책을 재현하지 않습니다.</p><ul className="queue-list">{queue.map((track) => <li key={track.trackId}><button onClick={() => { setPlayingId(track.trackId); setIsPlaying(true); setSheet(null); }}>{track.trackId === playingId ? '▶ ' : ''}{track.title}<small>{track.artistName}</small></button></li>)}</ul>{!queue.length && <p className="sheet-description">전체듣기 또는 곡 선택 후 확인하세요.</p>}</>}
    </Sheet>}
    {coach && <CoachMark key={tour} target={coach.target} title={coach.title} phase={tour.startsWith('baseline') ? '1 / 3 · 기본 방식' : tour.startsWith('proposal') ? '2 / 3 · 개선 방식' : '3 / 3 · 블록 편집'} onNext={coach.next} onClose={finishTour} final={tour === 'done'}>{coach.copy}</CoachMark>}
  </main>;
}
