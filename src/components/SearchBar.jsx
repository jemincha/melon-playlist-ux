// src/components/SearchBar.jsx
//
// [신규] 실제 동작하는 검색창. 곡명/아티스트명을 실시간으로 필터링하는 데 쓰인다.
// 검색 중에는 PlaylistView가 블록/드래그 편집 대신 단순 검색 결과 리스트를 보여준다
// (검색 결과처럼 필터링된 상태에서 블록 재정렬을 허용하면 "블록"이라는 개념 자체가
// 모호해지므로, 검색 중엔 열람 전용으로 단순화 — App.jsx 주석 참고).
//
// Props:
// - query: 현재 검색어
// - onChange(value): 검색어 변경 콜백
// - onClose(): 검색창 닫기(검색어도 함께 초기화)

function SearchBar({ query, onChange, onClose }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        ⌕
      </span>
      <input
        type="text"
        className="search-bar__input"
        placeholder="곡명 또는 아티스트 검색"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
      <button type="button" className="search-bar__close" onClick={onClose} aria-label="검색 닫기">
        ✕
      </button>
    </div>
  );
}

export default SearchBar;