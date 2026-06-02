<template>
  <div class="app-container">
    <!-- 한글 주석: 상단 내비게이션 바 -->
    <Navbar />

    <main>
      <!-- 한글 주석: 메인 섹션 배치 -->
      <HeroSection id="home" />
      <StorySection id="story" />
      <MenuSection id="menu" />
      <GallerySection id="gallery" />
      <GuestbookSection id="guestbook" />
      <LocationSection id="location" />
    </main>

    <!-- 한글 주석: 하단 푸터 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
// 한글 주석: 각 섹션 컴포넌트들을 임포트합니다.
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import StorySection from './components/StorySection.vue';
import MenuSection from './components/MenuSection.vue';
import GallerySection from './components/GallerySection.vue';
import GuestbookSection from './components/GuestbookSection.vue';
import LocationSection from './components/LocationSection.vue';
import Footer from './components/Footer.vue';
</script>

<style>
/* 한글 주석: 전역 혹은 루트 스타일은 style.css에 정의되어 있습니다. */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
  color: var(--color-text);
  overflow-x: hidden;
}

main {
  flex: 1;
}
</style>
