<template>
  <footer class="footer-area">
    <div class="container footer-container">
      
      <!-- 한글 주석: 브랜드 소개 영역 -->
      <div class="footer-brand">
        <h3 class="footer-logo">MINA & PAUL</h3>
        <p class="footer-desc">
          정성 가득한 커피와 수제 디저트, 그리고 따뜻한 온기가 머무는 곳.<br />
          미나앤폴에서 여러분만의 여유롭고 특별한 감성을 즐겨보세요.
        </p>
      </div>

      <!-- 한글 주석: 퀵 메뉴 링크 영역 -->
      <div class="footer-links-group">
        <h4>Navigate</h4>
        <ul class="footer-links">
          <li><a href="#home">홈</a></li>
          <li><a href="#story">스토리</a></li>
          <li><a href="#menu">메뉴</a></li>
          <li><a href="#gallery">갤러리</a></li>
          <li><a href="#guestbook">방명록</a></li>
        </ul>
      </div>

      <!-- 한글 주석: 소셜 채널 영역 -->
      <div class="footer-social">
        <h4>Follow Us</h4>
        <div class="social-icons">
          <a href="https://www.instagram.com/minapaul.fezh/" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="인스타그램" id="footer-insta-btn">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://map.naver.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="네이버 스마트플레이스" id="footer-naver-btn">
            <i class="fas fa-map-marked-alt"></i>
          </a>
        </div>
      </div>

    </div>

    <!-- 한글 주석: 카피라이트 영역 -->
    <div class="footer-bottom">
      <div class="container footer-bottom-container">
        <p>&copy; 2026 MINA & PAUL. All rights reserved.</p>
        <p class="designed-by">Designed with <i class="fas fa-heart heart-icon"></i> by Vibe Coding</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 한글 주석: 정적 레이아웃 푸터 컴포넌트입니다.
</script>

<style scoped>
.footer-area {
  background-color: #1F1916; /* 딥 에스프레소 블랙 배경 */
  color: rgba(250, 248, 245, 0.7);
  padding: 5rem 0 0;
  border-top: 1px solid rgba(197, 168, 128, 0.1);
  font-family: var(--font-sans);
}

.footer-container {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 4rem;
  padding-bottom: 4rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.footer-logo {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #FAF8F5;
}

.footer-desc {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(250, 248, 245, 0.6);
}

.footer-links-group h4,
.footer-social h4 {
  font-family: var(--font-serif);
  color: #FAF8F5;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-links a {
  font-size: 0.9rem;
  color: rgba(250, 248, 245, 0.6);
}

.footer-links a:hover {
  color: var(--color-accent);
  padding-left: 5px;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon-btn {
  width: 44px;
  height: 44px;
  background-color: rgba(250, 248, 245, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FAF8F5;
  font-size: 1.2rem;
  transition: var(--transition-smooth);
}

.social-icon-btn:hover {
  background-color: var(--color-accent);
  color: var(--color-primary);
  transform: translateY(-3px);
}

.footer-bottom {
  border-top: 1px solid rgba(250, 248, 245, 0.05);
  padding: 1.8rem 0;
  font-size: 0.8rem;
  color: rgba(250, 248, 245, 0.4);
}

.footer-bottom-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.heart-icon {
  color: #c91852;
  font-size: 0.75rem;
}

.designed-by {
  font-size: 0.75rem;
}

/* 한글 주석: 반응형 처리 */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .footer-bottom-container {
    flex-direction: column;
    text-align: center;
  }
}
</style>
