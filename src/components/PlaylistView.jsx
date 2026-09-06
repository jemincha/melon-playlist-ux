// src/components/PlaylistView.jsx
import { useEffect, useRef, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import ArtistBlock from './ArtistBlock';
import MisplacedTrackCard from './MisplacedTrackCard';
import TrackItem from './TrackItem';
import { groupByArtist } from '../utils/groupByArtist';
import { analyzeBlocks } from '../utils/analyzeBlocks';

function sortBlocks(blocks, sortMode) {
  if (sortMode !== 'artist-az') return blocks;
  return [...blocks].sort((a, b) => a.artistName.localeCompare(b.artistName, 'ko'));
}

function matchesQuery(track, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    track.title.toLowerCase().includes(q) || track.artistName.toLowerCase().includes(q)
  );
}

function PlaylistView({
  tracks,
  onInsertIntoArtistBlock,
  onReorderBlocks,
  sortMode = 'default',
  searchQuery = '',
  selectedIds,
  onToggleSelect,
  isOfflineMode = false,
  isDownloaded,
}) {
  const blockRefs = useRef({});
  const [scrollTargetArtist, setScrollTargetArtist] = useState(null);
  const [highlightArtist, setHighlightArtist] = useState(null);

  useEffect(() => {
    if (!scrollTargetArtist) return;
    const node = blockRefs.current[scrollTargetArtist];
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightArtist(scrollTargetArtist);
      const timer = setTimeout(() => setHighlightArtist(null), 1400);
      setScrollTargetArtist(null);
      return () => clearTimeout(timer);
    }
    setScrollTargetArtist(null);
  }, [tracks, scrollTargetArtist]);

  if (tracks.length === 0) {
    return <p className="playlist-view__empty">플레이리스트가 비어있습니다.</p>;
  }

  const isSearching = searchQuery.trim() !== '';
  if (isSearching) {
    const filtered = tracks.filter((t) => matchesQuery(t, searchQuery));
    return (
      <div className="search-results">
        <p className="search-results__count">{filtered.length}곡 검색됨</p>
        {filtered.length === 0 ? (
          <p className="playlist-view__empty">검색 결과가 없습니다.</p>
        ) : (
          <ul className="playlist-view playlist-view--flat">
            {filtered.map((track) => (
              <TrackItem
                key={track.trackId}
                track={track}
                isSelected={selectedIds?.has(track.trackId)}
                onToggleSelect={onToggleSelect}
                isOfflineUnavailable={isOfflineMode && isDownloaded && !isDownloaded(track.trackId)}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }

  const rawBlocks = groupByArtist(tracks);
  const analyzedBlocks = analyzeBlocks(rawBlocks);
  const orderedBlocks = sortBlocks(analyzedBlocks, sortMode);

  const misplacedBlocks = orderedBlocks.filter((b) => b.isMisplaced);
  const normalBlocks = orderedBlocks.filter((b) => !b.isMisplaced);

  function registerBlockRef(artistName, node) {
    if (node) blockRefs.current[artistName] = node;
  }

  function handleMergeTrack(trackId) {
    const track = tracks.find((t) => t.trackId === trackId);
    onInsertIntoArtistBlock(trackId);
    if (track) setScrollTargetArtist(track.artistName);
  }

  function applyBlockOrder(newNormalBlockOrder) {
    const reorderedTracks = newNormalBlockOrder.flatMap((b) => b.tracks);
    const misplacedTracks = misplacedBlocks.flatMap((b) => b.tracks);
    onReorderBlocks([...reorderedTracks, ...misplacedTracks]);
  }

  function handleMoveBlock(blockId, direction) {
    const index = normalBlocks.findIndex((b) => b.blockId === blockId);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= normalBlocks.length) return;
    applyBlockOrder(arrayMove(normalBlocks, index, targetIndex));
  }

  function handleReorderTracksWithinBlock(activeTrackId, overTrackId) {
    if (activeTrackId === overTrackId) return;
    const activeIndex = tracks.findIndex((t) => t.trackId === activeTrackId);
    const overIndex = tracks.findIndex((t) => t.trackId === overTrackId);
    if (activeIndex === -1 || overIndex === -1) return;
    if (tracks[activeIndex].artistName !== tracks[overIndex].artistName) return;
    onReorderBlocks(arrayMove(tracks, activeIndex, overIndex));
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    if (String(over.id).startsWith('drop-')) {
      handleMergeTrack(active.id);
      return;
    }

    const isBlockDrag =
      String(active.id).startsWith('block-') && String(over.id).startsWith('block-');
    if (isBlockDrag && active.id !== over.id) {
      const oldIndex = normalBlocks.findIndex((b) => b.blockId === active.id);
      const newIndex = normalBlocks.findIndex((b) => b.blockId === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      applyBlockOrder(arrayMove(normalBlocks, oldIndex, newIndex));
      return;
    }

    handleReorderTracksWithinBlock(active.id, over.id);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {misplacedBlocks.length > 0 && (
        <ul className="misplaced-tray">
          {misplacedBlocks.map((block) => (
            <MisplacedTrackCard
              key={block.blockId}
              track={block.tracks[0]}
              onMoveToMain={() => handleMergeTrack(block.tracks[0].trackId)}
              isOfflineMode={isOfflineMode}
              isDownloaded={isDownloaded}
            />
          ))}
        </ul>
      )}

      <SortableContext
        items={normalBlocks.map((b) => b.blockId)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="playlist-view">
          {normalBlocks.map((block, index) => (
            <ArtistBlock
              key={block.blockId}
              block={block}
              isDropTarget={block.isDropTarget}
              isHighlighted={block.artistName === highlightArtist}
              registerRef={registerBlockRef}
              onMoveUp={() => handleMoveBlock(block.blockId, 'up')}
              onMoveDown={() => handleMoveBlock(block.blockId, 'down')}
              isFirst={index === 0}
              isLast={index === normalBlocks.length - 1}
              selectedIds={selectedIds}
              onToggleSelect={onToggleSelect}
              isOfflineMode={isOfflineMode}
              isDownloaded={isDownloaded}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default PlaylistView;