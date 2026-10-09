import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Keep the real control clickable; the four surrounding panels block other actions.
// A sheet uses a native dialog, so its coachmark must live in that same top layer.
export default function CoachMark({ target, title, children, phase, onNext, onClose, final = false }) {
  const [layout, setLayout] = useState(null);
  const [cardHeight, setCardHeight] = useState(220);
  const cardRef = useRef(null);
  const passive = Boolean(onNext);
  useLayoutEffect(() => {
    if (!cardRef.current) return;
    const observer = new ResizeObserver(() => setCardHeight(cardRef.current?.getBoundingClientRect().height ?? 220));
    observer.observe(cardRef.current);
    if (passive) cardRef.current.querySelector('.coach-next')?.focus({ preventScroll: true });
    return () => observer.disconnect();
  }, [layout?.host, passive]);
  useLayoutEffect(() => {
    let frame;
    let observer;
    let element;
    function measure() {
      element = document.querySelector(target);
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const host = element.closest('dialog[open]') ?? document.body;
      setLayout({ host, left: Math.max(8, rect.left - 7), top: Math.max(8, rect.top - 7),
        right: Math.min(innerWidth - 8, rect.right + 7), bottom: Math.min(innerHeight - 8, rect.bottom + 7), width: innerWidth, height: innerHeight });
    }
    frame = requestAnimationFrame(() => {
      element = document.querySelector(target);
      if (!element) return;
      element.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
      if (!element.closest('dialog')) {
        const top = element.getBoundingClientRect().top;
        if (top < 100) window.scrollBy({ top: top - 100, behavior: 'instant' });
      }
      measure();
      observer = new ResizeObserver(measure);
      observer.observe(element);
      const focusable = passive ? null : element.matches('button, input') ? element : element.querySelector('button, input');
      (focusable ?? cardRef.current?.querySelector('button'))?.focus({ preventScroll: true });
    });
    function keydown(event) {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onClose(); }
      if (event.key !== 'Tab') return;
      const allowed = [...(passive ? [] : element?.matches('button, input') ? [element] : element?.querySelectorAll('button, input') ?? []), ...(cardRef.current?.querySelectorAll('button') ?? [])].filter((node) => !node.disabled);
      if (!allowed.length) return;
      event.preventDefault();
      const current = allowed.indexOf(document.activeElement);
      allowed[(current + (event.shiftKey ? -1 : 1) + allowed.length) % allowed.length].focus({ preventScroll: true });
    }
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    document.addEventListener('keydown', keydown, true);
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener('resize', measure); window.removeEventListener('scroll', measure, true); document.removeEventListener('keydown', keydown, true); };
  }, [target, onClose, passive]);
  if (!layout) return null;
  const { left, top, right, bottom, width, height, host } = layout;
  const cardWidth = Math.min(330, width - 32);
  const below = height - bottom > cardHeight + 36;
  const cardTop = below ? bottom + 22 : Math.max(16, top - cardHeight - 22);
  const cardLeft = Math.max(16, Math.min(width - cardWidth - 16, (left + right - cardWidth) / 2));
  return createPortal(<div className="coach-layer">
    <div className="coach-shade" style={{ left: 0, top: 0, width, height: top }} />
    <div className="coach-shade" style={{ left: 0, top, width: left, height: bottom - top }} />
    <div className="coach-shade" style={{ left: right, top, width: width - right, height: bottom - top }} />
    <div className="coach-shade" style={{ left: 0, top: bottom, width, height: height - bottom }} />
    <div className="coach-ring" style={{ left, top, width: right - left, height: bottom - top }} />
    {onNext && <div className="coach-passive" style={{ left, top, width: right - left, height: bottom - top }} />}
    <section ref={cardRef} className={`coach-card${below ? ' below' : ' above'}`} style={{ left: cardLeft, top: cardTop, width: cardWidth }} aria-label="체험 코치마크" aria-live="polite">
      <div className="coach-top"><span>{phase}</span><button onClick={onClose} aria-label="체험 가이드 닫기">×</button></div>
      <h2>{title}</h2><div className="coach-copy">{children}</div>
      {onNext ? <button className="coach-next" onClick={onNext}>{final ? '완료' : '다음'} <span>→</span></button> : <p className="coach-action-hint">강조된 곳을 눌러 진행하세요</p>}
    </section>
  </div>, host);
}
