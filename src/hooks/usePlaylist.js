// src/hooks/usePlaylist.js
import { useState } from 'react';
import { getDummyTracks } from '../data/dummyTracks';
import { insertIntoArtistBlock as computeInsertIntoArtistBlock } from '../utils/insertIntoArtistBlock';

export function usePlaylist() {
  const [tracks, setTracks] = useState(() => getDummyTracks());

  function addTrack(newTrack) {
    setTracks((prevTracks) =>
      prevTracks.some((t) => t.trackId === newTrack.trackId)
        ? prevTracks
        : [...prevTracks, { ...newTrack, pendingPlacement: true }]
    );
  }

  function insertIntoArtistBlock(trackId, targetBlockId) {
    setTracks((prevTracks) =>
      computeInsertIntoArtistBlock(prevTracks, trackId, targetBlockId)
    );
  }

  function reorderByBlocks(newTracks) {
    setTracks((prevTracks) => {
      const ids = new Set(newTracks.map((t) => t.trackId));
      if (
        newTracks.length !== prevTracks.length ||
        ids.size !== prevTracks.length ||
        !prevTracks.every((t) => ids.has(t.trackId))
      )
        return prevTracks;
      return newTracks;
    });
  }

  /**
   * deleteTracks(trackIds) — [신규] 선택된 곡들을 일괄 삭제
   * - trackIds: Set<string> 또는 string[] — 어느 쪽이든 받도록 Set으로 감싸서 처리
   */
  function deleteTracks(trackIds) {
    const idsToDelete = trackIds instanceof Set ? trackIds : new Set(trackIds);
    setTracks((prevTracks) =>
      prevTracks.filter((t) => !idsToDelete.has(t.trackId))
    );
  }

  return {
    tracks,
    addTrack,
    insertIntoArtistBlock,
    reorderByBlocks,
    deleteTracks,
  };
}
