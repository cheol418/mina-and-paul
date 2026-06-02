<template>
  <section class="menu-section">
    <div class="container">
      
      <!-- 한글 주석: 섹션 타이틀 헤더 -->
      <div class="section-header">
        <span class="subtitle">Artisanal Menu</span>
        <h2>미나앤폴의 메뉴</h2>
      </div>

      <!-- 한글 주석: 카테고리 필터 탭 -->
      <div class="menu-tabs" id="menu-category-tabs">
        <button 
          v-for="tab in categories" 
          :key="tab.value"
          :class="['tab-btn', { active: activeCategory === tab.value }]"
          @click="activeCategory = tab.value"
          :id="`tab-${tab.value}`"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- 한글 주석: 메뉴 아이템 그리드 레이아웃 -->
      <div class="menu-grid">
        <div 
          v-for="item in filteredMenuItems" 
          :key="item.id"
          class="menu-card"
        >
          <!-- 한글 주석: 메뉴 이미지 (이미지가 존재할 경우 렌더링, 없을 경우 감성 플레이스홀더 렌더링) -->
          <div class="menu-image-container">
            <img 
              v-if="item.image" 
              :src="item.image" 
              :alt="item.name" 
              class="menu-img"
            />
            <div v-else class="menu-img-placeholder">
              <i class="fas fa-coffee placeholder-icon"></i>
              <span class="placeholder-text">MINA & PAUL</span>
            </div>
            <span v-if="item.isSignature" class="signature-tag">Signature</span>
          </div>

          <!-- 한글 주석: 메뉴 설명 및 명세 -->
          <div class="menu-info">
            <div class="menu-title-row">
              <h3 class="menu-item-name">{{ item.name }}</h3>
              <span class="menu-item-price">{{ item.price }}</span>
            </div>
            <p class="menu-item-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 한글 주석: 카테고리 종류 정의
const categories = [
  { name: '전체 메뉴', value: 'all' },
  { name: '시그니처', value: 'signature' },
  { name: '커피', value: 'coffee' },
  { name: '음료', value: 'non-coffee' },
  { name: '디저트', value: 'dessert' }
];

const activeCategory = ref('all');

// 한글 주석: 세부 메뉴 데이터 정의
const menuItems = [
  {
    id: 1,
    name: '미나 라떼 (Mina Latte)',
    category: 'signature',
    price: '6,500원',
    image: '/images/mina_latte.png',
    description: '유기농 바닐라빈 시럽과 솔티드 카라멜 크림이 에스프레소와 우유 위에 부드럽게 융합된 미나의 대표 에스프레소 베리에이션 음료.',
    isSignature: true
  },
  {
    id: 2,
    name: '폴스 드립 (Paul\'s Drip)',
    category: 'signature',
    price: '6,000원',
    image: '/images/pauls_drip.png',
    description: '스페셜티 싱글 오리진 원두의 화사하고 산뜻한 아로마와 깔끔한 과일 계열의 단맛을 정성스럽게 핸드드립으로 추출해 낸 브루잉 커피.',
    isSignature: true
  },
  {
    id: 3,
    name: '얼그레이 스콘 (Earl Grey Scone)',
    category: 'dessert',
    price: '4,800원',
    image: '/images/earl_grey_scone.png',
    description: '유기농 얼그레이 홍차 잎을 아낌없이 가미해 매일 직접 굽는 버터향 가득한 영국식 스콘. 고소한 클로티드 크림과 달콤한 잼을 함께 곁들여 냅니다.',
    isSignature: false
  },
  {
    id: 4,
    name: '피스타치오 아인슈페너',
    category: 'signature',
    price: '6,800원',
    image: null,
    description: '다크 에스프레소 위에 달콤 고소하고 크리미한 수제 피스타치오 생크림을 올리고 카카오 파우더와 너츠 분태를 얹어 풍부한 식감을 선사하는 시그니처 크림 아인슈페너.',
    isSignature: true
  },
  {
    id: 5,
    name: '에스프레소 / 아메리카노',
    category: 'coffee',
    price: '5,000원',
    image: null,
    description: '다크 초콜릿의 묵직한 바디감과 구운 견과류의 고소한 풍미, 은은한 카카오 단맛이 조화롭게 블렌딩된 미나앤폴의 에센셜 블랙 커피.',
    isSignature: false
  },
  {
    id: 6,
    name: '클래식 카페 라떼',
    category: 'coffee',
    price: '5,500원',
    image: null,
    description: '신선한 친환경 1등급 우유의 부드럽고 든든한 바디에 깊은 에스프레소 샷이 매끄럽게 어우러져 한결같은 고소함을 자랑하는 밀크 커피.',
    isSignature: false
  },
  {
    id: 7,
    name: '제주 유기농 말차 크림 라떼',
    category: 'non-coffee',
    price: '6,300원',
    image: null,
    description: '제주 다원의 고급 유기농 말차가루를 우려낸 진하고 쌉싸름한 말차 베이스 위에 폭신하고 가벼운 수제 바닐라 생크림을 플로팅하여 음미하는 라떼.',
    isSignature: false
  },
  {
    id: 8,
    name: '수제 제주 청귤 에이드',
    category: 'non-coffee',
    price: '6,500원',
    image: null,
    description: '미나앤폴 키친에서 직접 수작업으로 담근 청귤청의 새콤달콤한 풍미에 톡 쏘는 청량한 탄산수를 혼합한 싱그러운 스파클링 에이드.',
    isSignature: false
  },
  {
    id: 9,
    name: '바스크 번트 치즈 케이크',
    category: 'dessert',
    price: '7,000원',
    image: null,
    description: '고온에서 빠르게 그을리듯 구워내어 스모키한 캐러멜 풍미의 겉면과 대조되는 아주 촉촉하고 크리미한 마스카포네 크림치즈 속살의 진한 치즈 케이크.',
    isSignature: false
  }
];

// 한글 주석: 선택한 카테고리에 맞는 메뉴를 필터링하는 계산 프로퍼티
const filteredMenuItems = computed(() => {
  if (activeCategory.value === 'all') {
    return menuItems;
  }
  return menuItems.filter(item => item.category === activeCategory.value);
});
</script>

<style scoped>
.menu-section {
  background-color: var(--color-bg);
}

.menu-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.tab-btn {
  background-color: transparent;
  border: 1px solid var(--color-border);
  padding: 0.6rem 1.6rem;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-smooth);
  color: var(--color-text-muted);
}

.tab-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-text);
}

.tab-btn.active {
  background-color: var(--color-primary);
  color: var(--color-bg);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

/* 한글 주석: 반응형 카드 그리드 레이아웃 */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.menu-card {
  background-color: var(--color-card-bg);
  border-radius: 6px;
  border: 1px solid rgba(44, 26, 17, 0.05);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
}

.menu-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.menu-image-container {
  height: 220px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--color-bg-secondary);
}

.menu-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-smooth);
}

.menu-card:hover .menu-img {
  transform: scale(1.05);
}

/* 한글 주석: 이미지가 없는 기본 메뉴의 감성적인 플레이스홀더 디자인 */
.menu-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: var(--color-text-muted);
  opacity: 0.65;
}

.placeholder-icon {
  font-size: 2.5rem;
}

.placeholder-text {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  letter-spacing: 0.25em;
  font-weight: 600;
}

.signature-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--color-primary);
  color: var(--color-bg);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.35rem 0.8rem;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.menu-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.menu-title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.75rem;
}

.menu-item-name {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-primary);
}

.menu-item-price {
  font-family: var(--font-sans);
  font-weight: 600;
  color: var(--color-accent-hover);
  font-size: 1.05rem;
}

.menu-item-desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* 한글 주석: 반응형 처리 */
@media (max-width: 576px) {
  .menu-tabs {
    gap: 0.5rem;
  }
  .tab-btn {
    padding: 0.5rem 1.2rem;
    font-size: 0.875rem;
  }
  .menu-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
