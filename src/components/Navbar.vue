<template>
  <!-- 한글 주석: 스크롤 상태에 따라 scrolled 클래스가 추가되는 내비게이션 바 -->
  <nav :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="navbar-container">
      <!-- 한글 주석: 카페 로고 -->
      <a href="#home" class="navbar-logo" id="nav-logo">
        <span class="logo-text">MINA & PAUL</span>
      </a>

      <!-- 한글 주석: 데스크톱 메뉴 링크 -->
      <ul class="navbar-links" :class="{ 'navbar-links-active': isMobileMenuOpen }">
        <li v-for="item in navItems" :key="item.href">
          <a :href="item.href" @click="closeMobileMenu" class="nav-link">{{ item.label }}</a>
        </li>
      </ul>

      <!-- 한글 주석: 우측 인스타그램 아이콘 및 모바일 토글 버튼 -->
      <div class="navbar-actions">
        <a href="https://www.instagram.com/minapaul.fezh/" target="_blank" rel="noopener noreferrer" class="instagram-btn" title="인스타그램 바로가기" id="nav-insta-icon">
          <i class="fab fa-instagram"></i>
        </a>
        <button class="mobile-toggle" @click="toggleMobileMenu" aria-label="메뉴 열기/닫기" id="nav-mobile-toggle">
          <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 한글 주석: 내비게이션 아이템 정보 정의
const navItems = [
  { label: '홈', href: '#home' },
  { label: '스토리', href: '#story' },
  { label: '메뉴', href: '#menu' },
  { label: '갤러리', href: '#gallery' },
  { label: '방명록', href: '#guestbook' },
  { label: '위치 안내', href: '#location' }
];

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// 한글 주석: 스크롤 이벤트 핸들러 (50px 이상 스크롤 시 배경 변경)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 초기 로드 시 체크
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: var(--transition-smooth);
  background-color: transparent;
}

/* 한글 주석: 스크롤 시 상단 바에 블러 및 반투명 모래 베이지 색상 바인딩 */
.navbar-scrolled {
  padding: 1rem 0;
  background-color: rgba(250, 248, 245, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(44, 26, 17, 0.06);
  box-shadow: var(--shadow-sm);
}

.navbar-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-primary);
}

.logo-text {
  position: relative;
}

.navbar-links {
  display: flex;
  list-style: none;
  gap: 2.5rem;
}

.nav-link {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text);
  opacity: 0.8;
  position: relative;
  padding: 0.25rem 0;
}

.nav-link:hover {
  opacity: 1;
  color: var(--color-accent);
}

/* 한글 주석: 내비게이션 메뉴 호버 시 언더라인 애니메이션 */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-accent);
  transition: var(--transition-smooth);
}

.nav-link:hover::after {
  width: 100%;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.instagram-btn {
  font-size: 1.3rem;
  color: var(--color-text);
  opacity: 0.8;
}

.instagram-btn:hover {
  opacity: 1;
  color: #E1306C; /* 인스타그램 고유 로고 컬러 포인트 */
  transform: scale(1.1);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.3rem;
  color: var(--color-text);
  cursor: pointer;
}

/* 한글 주석: 모바일 반응형 처리 */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem 0;
    background-color: rgba(250, 248, 245, 0.95);
    border-bottom: 1px solid rgba(44, 26, 17, 0.05);
  }
  
  .mobile-toggle {
    display: block;
  }
  
  .navbar-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--color-bg);
    flex-direction: column;
    gap: 0;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: var(--transition-smooth);
  }
  
  .navbar-links-active {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
    box-shadow: var(--shadow-md);
  }
  
  .navbar-links li {
    width: 100%;
    text-align: center;
  }
  
  .nav-link {
    display: block;
    padding: 1rem;
    width: 100%;
  }
  
  .nav-link::after {
    display: none;
  }
}
</style>
