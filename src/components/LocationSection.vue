<template>
  <section class="location-section">
    <div class="container">
      
      <!-- 한글 주석: 섹션 헤더 -->
      <div class="section-header">
        <span class="subtitle">Directions</span>
        <h2>찾아오시는 길</h2>
      </div>

      <div class="location-container">
        
        <!-- 한글 주석: 상세 안내 정보 영역 -->
        <div class="location-info-card">
          <div class="info-group">
            <div class="info-icon"><i class="fas fa-map-marker-alt"></i></div>
            <div class="info-details">
              <h4>주소</h4>
              <p>서울특별시 마포구 동교로 266-9, 1층</p>
              <span class="addr-desc">(홍대입구역 3번 출구 연트럴파크 도보 8분)</span>
            </div>
          </div>

          <div class="info-group">
            <div class="info-icon"><i class="fas fa-clock"></i></div>
            <div class="info-details">
              <h4>영업 시간</h4>
              <p>화요일 - 일요일 | 11:00 - 22:00</p>
              <p class="closed-day">매주 월요일 정기 휴무</p>
            </div>
          </div>

          <div class="info-group">
            <div class="info-icon"><i class="fas fa-phone-alt"></i></div>
            <div class="info-details">
              <h4>전화번호</h4>
              <p>02-332-2026</p>
            </div>
          </div>

          <div class="info-group">
            <div class="info-icon"><i class="fas fa-info-circle"></i></div>
            <div class="info-details">
              <h4>이용 팁</h4>
              <p>• 건물 옆 유료 주차장 혹은 연남동 공영주차장 이용을 추천드립니다.</p>
              <p>• 반려동물 동반 입장이 가능합니다. (리드줄 필수)</p>
            </div>
          </div>
        </div>

        <!-- 한글 주석: 세련된 벡터 지도 목업 영역 (API 키 없이도 고품격 레이아웃 유지) -->
        <div class="map-mockup-wrapper" id="map-mockup">
          <div class="mock-map">
            <!-- 한글 주석: 지도 바둑판 무늬 배경 그리드 -->
            <div class="map-grid-line"></div>
            <!-- 한글 주석: 모의 도선(길) 및 강물 데코레이션 -->
            <svg class="map-roads" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0,100 L 400,100" stroke="#E5DFD3" stroke-width="20" fill="none" />
              <path d="M 120,0 L 120,300" stroke="#E5DFD3" stroke-width="16" fill="none" />
              <path d="M 300,0 L 300,300" stroke="#E5DFD3" stroke-width="12" fill="none" />
              <path d="M 0,220 Q 200,240 400,200" stroke="#DCE4EC" stroke-width="40" fill="none" /> <!-- 경의선 숲길 모의 표현 -->
            </svg>
            
            <!-- 한글 주석: 모의 랜드마크 핀들 -->
            <div class="landmark station-landmark">
              <div class="landmark-dot"></div>
              <span>홍대입구역 3번출구</span>
            </div>

            <div class="landmark park-landmark">
              <i class="fas fa-tree landmark-icon"></i>
              <span>연트럴파크</span>
            </div>

            <!-- 한글 주석: 미나앤폴 실시간 깜빡임 메인 핀 -->
            <div class="main-pin">
              <div class="pulse-ring"></div>
              <div class="pin-marker">
                <i class="fas fa-coffee"></i>
              </div>
              <span class="pin-label">MINA & PAUL</span>
            </div>
            
            <!-- 한글 주석: 맵 컨트롤러 목업 -->
            <div class="map-controls">
              <button class="ctrl-btn" aria-label="확대"><i class="fas fa-plus"></i></button>
              <button class="ctrl-btn" aria-label="축소"><i class="fas fa-minus"></i></button>
            </div>
          </div>
          
          <div class="map-actions">
            <a href="https://map.naver.com" target="_blank" class="btn btn-secondary map-link-btn" id="naver-map-link">
              <i class="fas fa-external-link-alt"></i> 네이버 지도에서 길찾기
            </a>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// 한글 주석: 정적 안내 레이아웃 컴포넌트입니다.
</script>

<style scoped>
.location-section {
  background-color: var(--color-bg-secondary);
}

.location-container {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 4rem;
  align-items: stretch;
}

/* 한글 주석: 주소 정보 카드 스타일 */
.location-info-card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 3rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
}

.info-group {
  display: flex;
  gap: 1.5rem;
}

.info-icon {
  width: 44px;
  height: 44px;
  background-color: var(--color-bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-hover);
  font-size: 1.2rem;
  flex-shrink: 0;
}

.info-details h4 {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: var(--color-primary);
  margin-bottom: 0.4rem;
}

.info-details p {
  font-size: 0.95rem;
  color: var(--color-text);
  line-height: 1.5;
}

.addr-desc {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.closed-day {
  color: #c91852;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.2rem;
}

/* 한글 주석: 지도 목업 디자인 (CSS 벡터 스타일) */
.map-mockup-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mock-map {
  background-color: #F8F5F0;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  height: 380px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.map-grid-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 20px 20px;
  background-image: 
    linear-gradient(to right, rgba(44, 26, 17, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(44, 26, 17, 0.02) 1px, transparent 1px);
}

.map-roads {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.landmark {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  padding: 0.35rem 0.6rem;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  color: var(--color-text-muted);
}

.landmark-dot {
  width: 8px;
  height: 8px;
  background-color: #3E4D68;
  border-radius: 50%;
}

.landmark-icon {
  color: #6C826A;
}

.station-landmark {
  bottom: 20%;
  left: 10%;
}

.park-landmark {
  top: 40%;
  right: 15%;
}

/* 한글 주석: 미나앤폴 메인 핀 디자인 */
.main-pin {
  position: absolute;
  top: 30%;
  left: 48%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
}

.pin-marker {
  width: 44px;
  height: 44px;
  background-color: var(--color-primary);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  box-shadow: 0 4px 10px rgba(44, 26, 17, 0.3);
  border: 2px solid var(--color-white);
}

.pin-marker i {
  transform: rotate(45deg); /* 뒤틀린 각도 원복 */
  font-size: 1.1rem;
}

.pin-label {
  background-color: var(--color-primary);
  color: var(--color-bg);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  margin-top: 0.6rem;
  box-shadow: var(--shadow-md);
  white-space: nowrap;
}

/* 한글 주석: 메인 핀 깜빡임 효과 */
.pulse-ring {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 16px;
  height: 16px;
  border: 3px solid var(--color-accent);
  border-radius: 50%;
  animation: pulsePin 1.8s ease-out infinite;
  opacity: 0;
}

@keyframes pulsePin {
  0% { transform: scale(0.6); opacity: 0; }
  50% { opacity: 0.8; }
  100% { transform: scale(2.8); opacity: 0; }
}

.map-controls {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.ctrl-btn {
  width: 32px;
  height: 32px;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  color: var(--color-text);
  font-size: 0.85rem;
}

.ctrl-btn:hover {
  background-color: var(--color-bg-secondary);
}

.map-link-btn {
  width: 100%;
  padding: 0.8rem;
}

/* 한글 주석: 반응형 처리 */
@media (max-width: 992px) {
  .location-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 576px) {
  .location-info-card {
    padding: 1.5rem;
  }
}
</style>
