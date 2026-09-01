// src/data/newTrackCandidates.js
//
// "곡 추가" 시뮬레이션에 쓰일 후보 신곡 더미 데이터.
// 이미 플레이리스트 안에 블록(5곡 이상)을 갖고 있는 아티스트들로 골라서,
// 추가 시 As-Is 문제(맨 뒤에 붙어 기존 블록과 떨어짐)가 잘 드러나도록 구성.
//
// title 앞에 "(신곡)"을 붙여 실제 발매곡이 아닌 데모용 가상 트랙임을 명시.
// trackId는 't' 접두어 대신 'new-'를 사용해 기존 224곡(t001~t224)과 충돌하지 않도록 함.

const CANDIDATES = [
  {
    trackId: 'new-1',
    title: '(신곡) 새벽 세 시',
    artistName: '한로로',
    album: '미발매 데모',
    albumArt: 'https://picsum.photos/seed/한로로/80/80',
  },
  {
    trackId: 'new-2',
    title: '(신곡) 궤도',
    artistName: '실리카겔',
    album: '미발매 데모',
    albumArt: 'https://picsum.photos/seed/실리카겔/80/80',
  },
  {
    trackId: 'new-3',
    title: '(신곡) 그날의 온도',
    artistName: '자우림',
    album: '미발매 데모',
    albumArt: 'https://picsum.photos/seed/자우림/80/80',
  },
  {
    trackId: 'new-4',
    title: '(신곡) 여름의 끝',
    artistName: '새소년',
    album: '미발매 데모',
    albumArt: 'https://picsum.photos/seed/새소년/80/80',
  },
  {
    trackId: 'new-5',
    title: '(신곡) Afterglow',
    artistName: 'The Volunteers (더 발룬티어스)',
    album: '미발매 데모',
    albumArt: 'https://picsum.photos/seed/The-Volunteers-(더-발룬티어스)/80/80',
  },
];

/**
 * getNewTrackCandidates()
 * - 추가 시뮬레이션용 후보 트랙 배열의 복사본을 반환.
 * - addedAt은 호출 시점(지금 막 추가된 것처럼 보이도록)으로 동적으로 채움.
 */
export function getNewTrackCandidates() {
  const now = new Date().toISOString();
  return CANDIDATES.map((track) => ({ ...track, addedAt: now }));
}
