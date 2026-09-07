// src/components/BulkActionBar.jsx
//
// [신규] 곡을 하나 이상 선택했을 때 나타나는 하단 고정 액션바.
// [접근성] role="status" + aria-live="polite" — 선택 개수가 바뀔 때 스크린리더가
// 즉시 안내하도록 함.
//
// Props:
// - selectedCount: 선택된 곡 수
// - onDelete(): 선택된 곡 삭제
// - onClear(): 선택 해제

function BulkActionBar({ selectedCount, onDelete, onClear }) {
  if (selectedCount === 0) return null;

  return (
    <div className="bulk-action-bar" role="status" aria-live="polite">
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