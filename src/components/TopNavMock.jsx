// src/components/TopNavMock.jsx
//
// 상단 탭바. 탭(재생목록/음악서랍/믹스업) 자체는 여전히 장식용이지만,
// 오른쪽 두 아이콘은 [신규] 실제로 동작한다:
// - 검색(⌕): 검색창 토글
// - 펼치기(⌄): 플레이리스트 메타정보 패널 토글

function TopNavMock({ isSearchOpen, onToggleSearch, isMetaOpen, onToggleMeta }) {
  return (
    <nav className="top-nav-mock">
      <div className="top-nav-mock__tabs" aria-hidden="true">
        <span className="top-nav-mock__tab top-nav-mock__tab--active">재생목록</span>
        <span className="top-nav-mock__tab">음악서랍</span>
        <span className="top-nav-mock__tab">믹스업</span>
      </div>
      <div className="top-nav-mock__icons">
        <button
          type="button"
          className={`top-nav-mock__icon-btn${isSearchOpen ? ' top-nav-mock__icon-btn--active' : ''}`}
          aria-label="곡 검색"
          aria-pressed={isSearchOpen}
          onClick={onToggleSearch}
        >
          ⌕
        </button>
        <button
          type="button"
          className={`top-nav-mock__icon-btn${isMetaOpen ? ' top-nav-mock__icon-btn--active' : ''}`}
          aria-label="플레이리스트 정보 펼치기"
          aria-pressed={isMetaOpen}
          onClick={onToggleMeta}
        >
          ⌄
        </button>
      </div>
    </nav>
  );
}

export default TopNavMock;