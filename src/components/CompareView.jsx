// src/components/CompareView.jsx
//
// As-Is / To-Be 비교 데모 (선택 기능, Phase 6).
// 현재 "떨어져 나온 곡"이 있으면, 그 곡을 기준으로
// - As-Is: 지금 플레이리스트 맨 뒤쪽에서 엉뚱한 곡들 사이에 끼어있는 모습
// - To-Be: 같은 아티스트 블록에 합쳐졌을 때의 모습 (미리보기, 실제로 상태를 바꾸지는 않음)
// 을 [수정] 위아래로 보여준다 (기존 좌우 배치는 모바일 폭에서 넘침 문제가 있어 변경).
// 실제 병합은 여전히 PlaylistView의 드래그/버튼으로 수행.
//
// Props:
// - tracks: Track[] (usePlaylist().tracks)

import TrackItem from './TrackItem';
import { groupByArtist } from '../utils/groupByArtist';
import { analyzeBlocks } from '../utils/analyzeBlocks';

const TAIL_CONTEXT_SIZE = 3; // As-Is 쪽에서 몇 곡을 앞뒤 맥락으로 보여줄지

function CompareView({ tracks }) {
  const blocks = analyzeBlocks(groupByArtist(tracks));
  const misplacedBlock = blocks.find((b) => b.isMisplaced);

  if (!misplacedBlock) {
    return (
      <p className="compare-view__empty">
        지금은 비교할 대상이 없습니다. 먼저 "곡 추가 시뮬레이션"에서 신곡을 추가해보세요.
      </p>
    );
  }

  const misplacedTrack = misplacedBlock.tracks[0];
  const mainBlock = blocks.find(
    (b) => b.artistName === misplacedBlock.artistName && b.isDropTarget
  );

  // As-Is: 전체 tracks 배열에서 misplacedTrack 위치를 찾아 그 앞뒤 맥락을 함께 보여줌
  const misplacedIndex = tracks.findIndex((t) => t.trackId === misplacedTrack.trackId);
  const asIsContext = tracks.slice(
    Math.max(0, misplacedIndex - TAIL_CONTEXT_SIZE),
    misplacedIndex + 1
  );

  // To-Be: 메인 블록 곡들 + 맨 끝에 misplacedTrack을 합친 미리보기 (실제 상태 변경 아님)
  const toBePreview = mainBlock ? [...mainBlock.tracks, misplacedTrack] : [misplacedTrack];

  return (
    <section className="compare-view">
      <p className="compare-view__title">
        As-Is / To-Be 비교 — "{misplacedTrack.title}"
      </p>
      <div className="compare-view__columns">
        <div className="compare-view__column">
          <p className="compare-view__column-label compare-view__column-label--asis">
            As-Is (지금 상태)
          </p>
          <ul className="compare-view__list">
            {asIsContext.map((track) => (
              <li
                key={track.trackId}
                className={
                  track.trackId === misplacedTrack.trackId
                    ? 'compare-view__highlight'
                    : ''
                }
              >
                <TrackItem track={track} />
              </li>
            ))}
          </ul>
          <p className="compare-view__caption">
            {misplacedBlock.artistName} 블록과 상관없는 곡들 사이에 끼어있음
          </p>
        </div>

        <div className="compare-view__divider" aria-hidden="true">
          ↓ 병합하면
        </div>

        <div className="compare-view__column">
          <p className="compare-view__column-label compare-view__column-label--tobe">
            To-Be (병합 시 미리보기)
          </p>
          <ul className="compare-view__list">
            {toBePreview.map((track) => (
              <li
                key={track.trackId}
                className={
                  track.trackId === misplacedTrack.trackId
                    ? 'compare-view__highlight'
                    : ''
                }
              >
                <TrackItem track={track} />
              </li>
            ))}
          </ul>
          <p className="compare-view__caption">
            ↑ 같은 {misplacedBlock.artistName} 블록 안으로 합쳐진 모습
          </p>
        </div>
      </div>
    </section>
  );
}

export default CompareView;