// src/utils/hashString.js
//
// 문자열을 결정론적(항상 같은 입력 -> 같은 출력) 32bit 정수로 바꾸는 간단한 해시 함수.
// placeholderAlbumArt(색상/이니셜)와 downloadStatus(다운로드 여부 시뮬레이션)가
// 공통으로 필요로 해서 공용 유틸로 분리함.

export function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // 32bit 정수로 유지
  }
  return Math.abs(hash);
}