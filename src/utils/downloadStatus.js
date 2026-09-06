// src/utils/downloadStatus.js
//
// "오프라인 재생" 토글 시뮬레이션용. 실제 다운로드 기능은 없으므로, trackId를 해시해서
// 각 곡이 "다운로드된 것처럼" 보일지를 결정론적으로 정해둔다 (매번 랜덤이면 토글할 때마다
// 결과가 바뀌어서 시뮬레이션 신뢰도가 떨어짐 — 같은 곡은 항상 같은 상태를 가져야 함).
//
// 다운로드율은 대략 75%로 잡음 (완전히 랜덤보다 "그럴듯한 실사용 비율"에 가깝게).

import { hashString } from './hashString.js';

const DOWNLOADED_RATIO = 0.75;

export function isTrackDownloaded(trackId) {
  const hash = hashString(trackId);
  return (hash % 100) / 100 < DOWNLOADED_RATIO;
}