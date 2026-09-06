// src/components/PlaylistMetaPanel.jsx
//
// [신규] 상단 탭바의 펼치기(⌄) 버튼을 누르면 나오는 플레이리스트 메타정보 패널.
// 실제 멜론 스크린샷의 "플레이리스트 정보" 영역(제작자/최종수정일/장르구성)을 참고해
// 구성. 제작자·수정일은 고정 텍스트(실제 데이터가 없으므로)지만, 곡 수만은 실제
// tracks 길이를 반영해 살아있는 정보처럼 보이게 함.
//
// Props:
// - trackCount: 현재 총 곡 수

function PlaylistMetaPanel({ trackCount }) {
  return (
    <section className="meta-panel">
      <p className="meta-panel__title">국내밴드</p>
      <dl className="meta-panel__rows">
        <div className="meta-panel__row">
          <dt>제작자</dt>
          <dd>ppabian</dd>
        </div>
        <div className="meta-panel__row">
          <dt>수록곡</dt>
          <dd>{trackCount}곡</dd>
        </div>
        <div className="meta-panel__row">
          <dt>장르구성</dt>
          <dd>Rock, 록/메탈 20&apos;</dd>
        </div>
        <div className="meta-panel__row">
          <dt>최종수정일</dt>
          <dd>이 프로토타입에서 편집한 시점 기준</dd>
        </div>
      </dl>
    </section>
  );
}

export default PlaylistMetaPanel;