<template>
  <section class="story-section">
    <div class="container story-container">
      
      <!-- 한글 주석: 스토리 텍스트 영역 (왼쪽) -->
      <div class="story-content">
        <span class="subtitle">Our Story</span>
        <h2>Mina & Paul의 코리아 이야기</h2>
        <p class="highlight-text">
          "페즈(FEZH) 지하의 유럽식 광장에서 커피 한 잔과 함께 쉽어가는 일상."
        </p>
        <p class="description">
          미나앤폴은 한남동 복합문화공간 페즈(FEZH)의 지하 2층 D-SQUARE 광장에 자리한 개방형 카페입니다. 건축가 유이화가 설계한 페즈 공간의 독특한 건축미와 탁 트인 열린 광장에서 커피를 즐기실 수 있습니다.
        </p>
        <p class="description">
          오트 밀크와 락토 프리 우유, 디카페인 등 다양한 옵션 변경이 무료로 가능하며, 반려동물도 저희와 함께할 수 있습니다. 같은 공간 내에는 재즈바 '블루캣(BLUE CAT)'도 위치해 커피와 재즈를 함께 즐길 수 있습니다.
        </p>
        
        <!-- 한글 주석: 인스타그램 소통 유도 배지 -->
        <a href="https://www.instagram.com/minapaul.fezh/" target="_blank" rel="noopener noreferrer" class="instagram-badge" id="story-insta-badge">
          <i class="fab fa-instagram"></i>
          <span>@minapaul.fezh 팔로우하고 소식 받아보기</span>
        </a>
      </div>

      <!-- 한글 주석: 입체감 있는 스토리 이미지 영역 (오른쪽) -->
      <div class="story-images">
        <div class="image-wrapper main-image-wrapper">
          <img src="/images/mina_latte.png" alt="미나앤폴 라떼" class="story-img main-img" />
        </div>
        <div class="image-wrapper sub-image-wrapper">
          <img src="/images/pauls_drip.png" alt="미나앤폴 드립 커피" class="story-img sub-img" />
        </div>
        <div class="deco-box"></div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// 한글 주석: 정적 레이아웃 컴포넌트입니다.
</script>

<style scoped>
.story-section {
  background-color: var(--color-bg-secondary); /* 연한 모래빛 베이지 배경 */
  overflow: hidden;
}

.story-container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 5rem;
  align-items: center;
}

.story-content {
  display: flex;
  flex-direction: column;
}

.subtitle {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.story-content h2 {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1.8rem;
  line-height: 1.2;
}

.highlight-text {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-style: italic;
  color: var(--color-accent-hover);
  margin-bottom: 1.5rem;
  line-height: 1.5;
  font-weight: 500;
}

.description {
  font-size: 0.975rem;
  color: var(--color-text-muted);
  margin-bottom: 1.2rem;
  line-height: 1.8;
}

.instagram-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  padding: 0.8rem 1.2rem;
  border-radius: 30px;
  margin-top: 2rem;
  align-self: flex-start;
  box-shadow: var(--shadow-sm);
  font-size: 0.9rem;
  font-weight: 500;
}

.instagram-badge i {
  color: #E1306C;
  font-size: 1.1rem;
}

.instagram-badge:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

/* 한글 주석: 입체감 넘치는 이미지 겹치기 효과 스타일링 */
.story-images {
  position: relative;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper {
  position: absolute;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: var(--shadow-lg);
  transition: var(--transition-smooth);
}

.main-image-wrapper {
  width: 70%;
  height: 320px;
  top: 10%;
  left: 5%;
  z-index: 2;
}

.sub-image-wrapper {
  width: 55%;
  height: 250px;
  bottom: 10%;
  right: 5%;
  z-index: 3;
  border: 4px solid var(--color-bg-secondary);
}

.deco-box {
  position: absolute;
  width: 45%;
  height: 280px;
  top: 15%;
  right: 15%;
  border: 2px solid var(--color-accent);
  border-radius: 4px;
  z-index: 1;
  opacity: 0.3;
}

.story-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

.image-wrapper:hover {
  transform: translateY(-5px) scale(1.02);
  z-index: 4;
}

.image-wrapper:hover .story-img {
  transform: scale(1.05);
}

/* 한글 주석: 반응형 스타일 모바일 대응 */
@media (max-width: 992px) {
  .story-container {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  .story-images {
    height: 400px;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
  }
  .main-image-wrapper {
    height: 280px;
  }
  .sub-image-wrapper {
    height: 210px;
  }
  .deco-box {
    height: 240px;
  }
}

@media (max-width: 576px) {
  .story-content h2 {
    font-size: 2rem;
  }
  .highlight-text {
    font-size: 1.1rem;
  }
  .story-images {
    height: 320px;
  }
  .main-image-wrapper {
    height: 220px;
  }
  .sub-image-wrapper {
    height: 160px;
  }
  .deco-box {
    height: 180px;
  }
}
</style>
