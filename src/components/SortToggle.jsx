// src/components/SortToggle.jsx
//
// 정렬 기준 전환 UI (선택 기능, Phase 5).
// 실제 정렬 로직은 PlaylistView 안의 sortBlocks()가 담당하고,
// 이 컴포넌트는 현재 모드를 보여주고 바꾸는 역할만 한다.
//
// Props:
// - sortMode: 'default' | 'artist-az'
// - onChange(mode): 모드 변경 콜백

const OPTIONS = [
  { value: 'default', label: '기본순' },
  { value: 'artist-az', label: '아티스트 가나다순' },
];

function SortToggle({ sortMode, onChange }) {
  return (
    <div className="sort-toggle" role="group" aria-label="정렬 기준">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`sort-toggle__button${
            sortMode === option.value ? ' sort-toggle__button--active' : ''
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SortToggle;
