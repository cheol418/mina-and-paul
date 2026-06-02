<template>
  <section class="gallery-section">
    <div class="container">
      
      <!-- 한글 주석: 섹션 헤더 -->
      <div class="section-header">
        <span class="subtitle">Cafe Vibe</span>
        <h2>미나앤폴 갤러리</h2>
      </div>

      <!-- 한글 주석: 반응형 이미지 갤러리 그리드 -->
      <div class="gallery-grid" id="gallery-container">
        <div 
          v-for="photo in photos" 
          :key="photo.id"
          :class="['gallery-item', photo.sizeClass]"
        >
          <img :src="photo.src" :alt="photo.alt" class="gallery-img" />
          <div class="gallery-item-overlay">
            <div class="gallery-caption">
              <span class="gallery-tag">{{ photo.tag }}</span>
              <p class="gallery-title">{{ photo.title }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// 한글 주석: 생성된 4개의 고화질 웅장한 이미지 데이터 매핑
const photos = [
  {
    id: 1,
    src: '/images/hero_cafe.png',
    alt: '미나앤폴 카페 내부',
    tag: 'Space',
    title: '햇살이 따스하게 머무는 아늑한 공간',
    sizeClass: 'large-rect'
  },
  {
    id: 2,
    src: '/images/pauls_drip.png',
    alt: '핸드드립 브루잉 추출',
    tag: 'Craft',
    title: '한 방울씩 천천히 채우는 폴의 진심',
    sizeClass: 'square-one'
  },
  {
    id: 3,
    src: '/images/mina_latte.png',
    alt: '카페라떼 하트 아트',
    tag: 'Aroma',
    title: '부드럽고 묵직한 하트의 고소함',
    sizeClass: 'square-two'
  },
  {
    id: 4,
    src: '/images/earl_grey_scone.png',
    alt: '수제 얼그레이 스콘',
    tag: 'Fresh baked',
    title: '매일 아침 오븐을 채우는 홍차향',
    sizeClass: 'tall-rect'
  }
];
</script>

<style scoped>
.gallery-section {
  background-color: var(--color-bg-secondary);
}

/* 한글 주석: 프리미엄 갤러리 그리드 스타일링 (CSS Grid를 활용한 불규칙 staggered 레이아웃) */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 250px;
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}

/* 한글 주석: 그리드 병합 클래스를 이용해 입체적 모자이크 구성 */
.large-rect {
  grid-column: span 2;
  grid-row: span 2;
}

.tall-rect {
  grid-column: span 1;
  grid-row: span 2;
}

.square-one {
  grid-column: span 1;
  grid-row: span 1;
}

.square-two {
  grid-column: span 1;
  grid-row: span 1;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

/* 한글 주석: 호버 시 나타나는 세련된 글래스모피즘 캡션 오버레이 */
.gallery-item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(44, 26, 17, 0.7) 0%,
    rgba(44, 26, 17, 0) 70%
  );
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  opacity: 0;
  transition: var(--transition-smooth);
  z-index: 2;
}

.gallery-caption {
  transform: translateY(15px);
  transition: var(--transition-smooth);
}

.gallery-tag {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-accent);
  font-weight: 600;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.gallery-title {
  color: #FAF8F5;
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.4;
}

/* 한글 주석: 호버 액션 활성화 */
.gallery-item:hover .gallery-img {
  transform: scale(1.05);
}

.gallery-item:hover .gallery-item-overlay {
  opacity: 1;
}

.gallery-item:hover .gallery-caption {
  transform: translateY(0);
}

/* 한글 주석: 태블릿 및 모바일 반응형 그리드 붕괴 방지 */
@media (max-width: 992px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 220px;
    gap: 1rem;
  }
  
  .large-rect {
    grid-column: span 2;
    grid-row: span 2;
  }
  
  .tall-rect {
    grid-column: span 1;
    grid-row: span 2;
  }
}

@media (max-width: 576px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
  }
  
  .large-rect, .tall-rect, .square-one, .square-two {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  .gallery-item-overlay {
    padding: 1rem;
  }
  
  .gallery-title {
    font-size: 0.95rem;
  }
}
</style>
