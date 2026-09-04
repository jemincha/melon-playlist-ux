// src/components/ScrollTopButton.jsx
//
// 화면을 어느 정도 스크롤했을 때만 나타나는 "맨 위로" 플로팅 버튼.
// 블록 병합 시 자동 스크롤로 아래로 내려간 뒤, 데모 대시보드(상단)에서
// 바로 다음 작업(곡 추가 등)을 이어가고 싶을 때 빠르게 복귀하기 위함.

import { useEffect, useState } from 'react';

const SHOW_THRESHOLD = 240; // 이 정도 스크롤 이후부터 버튼 노출

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SHOW_THRESHOLD);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="scroll-top-button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑ 맨 위로
    </button>
  );
}

export default ScrollTopButton;