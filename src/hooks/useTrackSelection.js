// src/hooks/useTrackSelection.js
//
// 다중 선택(체크박스) 상태를 관리하는 훅. 플레이리스트 데이터(usePlaylist)와는
// 별개의 "UI 상태"라 분리함 — 선택 여부는 곡 데이터의 일부가 아니라 지금 화면에서
// 사용자가 뭘 골랐는지에 대한 임시 상태이기 때문.

import { useState } from 'react';

export function useTrackSelection() {
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  function toggle(trackId) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(trackId)) {
        next.delete(trackId);
      } else {
        next.add(trackId);
      }
      return next;
    });
  }

  function selectAll(trackIds) {
    setSelectedIds(new Set(trackIds));
  }

  function clear() {
    setSelectedIds(new Set());
  }

  function isSelected(trackId) {
    return selectedIds.has(trackId);
  }

  return { selectedIds, toggle, selectAll, clear, isSelected };
}