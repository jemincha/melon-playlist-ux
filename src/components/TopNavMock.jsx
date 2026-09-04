// src/components/TopNavMock.jsx
//
// 실제 멜론 플레이어 상단 탭바를 흉내낸 "순수 장식용" 컴포넌트.
// 클릭해도 아무 기능 없음 — 몰입감을 위한 배경 요소일 뿐.
// (사용자가 제공한 실제 스크린샷 기준: 재생목록/음악서랍/믹스업 탭 + 검색/펼치기 아이콘)

function TopNavMock() {
  return (
    <nav className="top-nav-mock" aria-hidden="true">
      <div className="top-nav-mock__tabs">
        <span className="top-nav-mock__tab top-nav-mock__tab--active">재생목록</span>
        <span className="top-nav-mock__tab">음악서랍</span>
        <span className="top-nav-mock__tab">믹스업</span>
      </div>
      <div className="top-nav-mock__icons">
        <span className="top-nav-mock__icon">⌕</span>
        <span className="top-nav-mock__icon">⌄</span>
      </div>
    </nav>
  );
}

export default TopNavMock;