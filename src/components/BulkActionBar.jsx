// src/components/BulkActionBar.jsx
//
// [신규] 곡을 하나 이상 선택했을 때 나타나는 하단 고정 액션바.
// 실제 멜론 스크린샷의 "전체선택/듣기/다운/담기/선물" 바를 참고했지만,
// 이 프로토타입에서 실제로 의미 있게 구현할 수 있는 건 "삭제"뿐이라 그것만 기능화하고
// 나머지(다운로드 등)는 다루지 않음 — 실제로 안 되는 버튼을 그럴듯하게 만들어두는 것보다
// 안 보여주는 게 정직함.
//
// Props:
// - selectedCount: 선택된 곡 수
// - onDelete(): 선택된 곡 삭제
// - onClear(): 선택 해제

function BulkActionBar({ selectedCount, onDelete, onClear }) {
  if (selectedCount === 0) return null;

  return (
    <div className="bulk-action-bar">
      <span className="bulk-action-bar__count">{selectedCount}곡 선택됨</span>
      <div className="bulk-action-bar__actions">
        <button type="button" className="bulk-action-bar__delete" onClick={onDelete}>
          🗑 삭제
        </button>
        <button type="button" className="bulk-action-bar__clear" onClick={onClear}>
          선택 해제
        </button>
      </div>
    </div>
  );
}

export default BulkActionBar;