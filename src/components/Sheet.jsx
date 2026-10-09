import { useEffect, useRef } from 'react';

export default function Sheet({ title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    return () => { dialog.close(); previous?.focus(); };
  }, []);
  return (
    <dialog ref={ref} className="mobile-sheet" aria-label={title}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === ref.current) onClose(); }}>
      <div className="sheet-grabber" aria-hidden="true" />
      <header className="sheet-header"><h2>{title}</h2><button onClick={onClose} aria-label="닫기">×</button></header>
      {children}
    </dialog>
  );
}
