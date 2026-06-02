<template>
  <section class="hero-section">
    <!-- 한글 주석: 히어로 배경 이미지 및 오버레이 -->
    <div class="hero-background"></div>
    <div class="hero-overlay"></div>

    <div class="container hero-container">
      <div class="hero-content animate-fade-in-up">
        <span class="hero-tagline">COZY CAFE & ESPRESSO</span>
        <h1 class="hero-title">MINA & PAUL</h1>
        <p class="hero-description">
          정성스레 내린 핸드드립 커피와 매일 아침 구워내는 수제 디저트,<br />
          그리고 아늑한 햇살이 머무는 따뜻한 소통의 공간입니다.
        </p>
        <div class="hero-buttons">
          <a href="#menu" class="btn btn-primary" id="hero-btn-menu">메뉴 둘러보기</a>
          <a href="#guestbook" class="btn btn-secondary hero-btn-sec" id="hero-btn-guest">방명록 남기기</a>
        </div>
      </div>
    </div>

    <!-- 한글 주석: 스크롤 유도 인디케이터 -->
    <div class="scroll-indicator">
      <span class="scroll-text">SCROLL</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 한글 주석: 특별한 스크립트 로직 없이 애니메이션 CSS와 템플릿 마크업으로 구성됩니다.
</script>

<style scoped>
.hero-section {
  height: 100vh;
  min-height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/hero_cafe.png');
  background-size: cover;
  background-position: center;
  z-index: 1;
  transform: scale(1.05); /* 부드러운 줌 인 애니메이션 베이스 */
  animation: zoomBg 12s ease-out infinite alternate;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(44, 26, 17, 0.45) 0%,
    rgba(44, 26, 17, 0.6) 100%
  );
  z-index: 2;
}

.hero-container {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  color: #FAF8F5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-tagline {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-title {
  font-family: var(--font-serif);
  font-size: 5.5rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  line-height: 1.1;
  margin-bottom: 2rem;
  text-shadow: 0 4px 15px rgba(44, 26, 17, 0.5);
}

.hero-description {
  font-family: var(--font-sans);
  font-size: 1.2rem;
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 3.5rem;
  font-weight: 300;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
}

.hero-btn-sec {
  border-color: #FAF8F5;
  color: #FAF8F5;
}

.hero-btn-sec:hover {
  background-color: #FAF8F5;
  color: var(--color-primary);
}

/* 한글 주석: 마우스 휠 스크롤 인디케이터 */
.scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #FAF8F5;
  opacity: 0.7;
}

.scroll-text {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  font-weight: 500;
}

.scroll-line {
  width: 1px;
  height: 50px;
  background-color: rgba(250, 248, 245, 0.3);
  position: relative;
  overflow: hidden;
}

.scroll-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background-color: var(--color-accent);
  animation: scrollDown 2s ease-in-out infinite;
}

/* 한글 주석: 키프레임 애니메이션 정의 */
@keyframes zoomBg {
  from { transform: scale(1); }
  to { transform: scale(1.06); }
}

@keyframes scrollDown {
  0% { top: -20px; }
  50% { top: 50px; }
  100% { top: 50px; }
}

/* 한글 주석: 반응형 스타일 모바일 대응 */
@media (max-width: 992px) {
  .hero-title {
    font-size: 4rem;
  }
  .hero-description {
    font-size: 1.1rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2.8rem;
    letter-spacing: 0.1em;
  }
  .hero-description {
    font-size: 1rem;
    br { display: none; }
  }
  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    gap: 1rem;
  }
}
</style>
