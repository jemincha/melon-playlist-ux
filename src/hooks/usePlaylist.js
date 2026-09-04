// src/hooks/usePlaylist.js
//
// 플레이리스트 상태의 "진실의 원천(source of truth)" 역할을 하는 커스텀 훅.
// (가이드라인 3절: 상태는 여기에 모으고, 컴포넌트는 props로만 받는다)
//
// [Phase 1] tracks 상태 + 초기 로드 (완료)
// [Phase 3] addTrack (As-Is: 맨 뒤 추가) (완료)
// [Phase 4] insertIntoArtistBlock (To-Be: 블록 삽입) (완료)
// [Phase 5] toggleSort (선택 기능) — App에서 별도 로컬 상태로 처리 (아래 설명 참고)

import { useState } from 'react';
import { getDummyTracks } from '../data/dummyTracks';
import { groupByArtist } from '../utils/groupByArtist';

export function usePlaylist() {
  const [tracks, setTracks] = useState(() => getDummyTracks());

  /**
   * addTrack(newTrack) — As-Is 동작
   * - 새 곡을 무조건 배열 맨 뒤에 추가한다.
   * - 이게 바로 기획서 2절에서 정의한 "원래 멜론의 문제"를 그대로 재현하는 함수:
   *   같은 아티스트 블록이 이미 있어도 신곡은 그 블록과 상관없이 맨 뒤에 붙는다.
   */
  function addTrack(newTrack) {
    setTracks((prevTracks) => [...prevTracks, newTrack]);
  }

  /**
   * insertIntoArtistBlock(trackId) — To-Be 동작
   * - trackId로 지정된 곡을, 같은 아티스트의 "가장 큰 기존 블록" 바로 뒤로 옮긴다.
   * - 같은 아티스트 블록이 여러 개로 쪼개져 있으면(=드물지만 가능) 그중 가장 긴 블록을 기준으로 삼는다.
   * - 매칭되는 블록이 없으면(= 정말 처음 나온 아티스트라면) 기존 As-Is 동작(맨 뒤 유지)으로 안전하게 폴백.
   */
  function insertIntoArtistBlock(trackId) {
    setTracks((prevTracks) => {
      const movingTrack = prevTracks.find((t) => t.trackId === trackId);
      if (!movingTrack) return prevTracks; // 방어 코드: 없는 trackId면 아무 것도 안 함

      const withoutMovingTrack = prevTracks.filter((t) => t.trackId !== trackId);
      const blocksWithoutMovingTrack = groupByArtist(withoutMovingTrack);
      const matchingBlocks = blocksWithoutMovingTrack.filter(
        (block) => block.artistName === movingTrack.artistName
      );

      if (matchingBlocks.length === 0) {
        // 폴백: 병합할 기존 블록이 없으면 As-Is와 동일하게 맨 뒤에 둔다.
        return [...withoutMovingTrack, movingTrack];
      }

      // 여러 블록으로 쪼개져 있다면 가장 큰 블록을 "메인 블록"으로 간주
      const targetBlock = matchingBlocks.reduce((largest, current) =>
        current.tracks.length > largest.tracks.length ? current : largest
      );
      const targetBlockLastTrackId =
        targetBlock.tracks[targetBlock.tracks.length - 1].trackId;
      const insertIndex =
        withoutMovingTrack.findIndex((t) => t.trackId === targetBlockLastTrackId) + 1;

      const nextTracks = [...withoutMovingTrack];
      nextTracks.splice(insertIndex, 0, movingTrack);
      return nextTracks;
    });
  }

  /**
   * reorderByBlocks(newTracks) — 블록 단위 순서 조절
   * - PlaylistView가 블록 드래그 결과로 이미 재배열까지 끝낸 새 tracks 배열을 그대로 받아
   *   반영한다. 재배열 계산 자체(블록을 flatMap해서 새 순서로 합치는 것)는 PlaylistView
   *   쪽에 두는 게 자연스러움 — usePlaylist는 "블록 인식" 로직(groupByArtist)을 직접
   *   갖고 있지 않고 utils에서 가져다 쓰는 입장이라, 여기서 새로 그 계산을 반복하기보다
   *   PlaylistView가 계산한 결과를 그대로 신뢰하는 편이 중복을 줄임.
   * - 방어 코드: 곡 개수가 달라지면(= 계산 과정에서 곡이 유실/중복됐다면) 무시하고 이전
   *   상태를 유지한다.
   */
  function reorderByBlocks(newTracks) {
    setTracks((prevTracks) => {
      if (newTracks.length !== prevTracks.length) return prevTracks;
      return newTracks;
    });
  }

  return { tracks, addTrack, insertIntoArtistBlock, reorderByBlocks };
}