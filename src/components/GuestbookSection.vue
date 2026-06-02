<template>
  <section class="guestbook-section">
    <div class="container">
      
      <!-- 한글 주석: 섹션 헤더 -->
      <div class="section-header">
        <span class="subtitle">Guestbook</span>
        <h2>따뜻한 이야기</h2>
      </div>

      <div class="guestbook-container">
        
        <!-- 한글 주석: 방명록 작성 폼 영역 -->
        <div class="guestbook-form-card">
          <h3>방명록 남기기</h3>
          <p class="form-intro">미나앤폴에서의 시간은 어떠셨나요? 소중한 이야기와 별점을 나누어주세요.</p>
          
          <form @submit.prevent="submitMessage" class="g-form" id="guestbook-submit-form">
            <!-- 한글 주석: 이름 입력 -->
            <div class="form-group">
              <label for="g-name">작성자 이름</label>
              <input 
                type="text" 
                id="g-name" 
                v-model="form.name" 
                placeholder="이름이나 닉네임을 입력해 주세요" 
                required
                maxlength="15"
              />
            </div>

            <!-- 한글 주석: 별점 선택 영역 (인터랙티브 스타 레이팅) -->
            <div class="form-group">
              <label>별점</label>
              <div class="rating-stars" id="star-rating-selector">
                <button 
                  type="button" 
                  v-for="star in 5" 
                  :key="star" 
                  class="star-btn"
                  @click="form.rating = star"
                  :aria-label="`${star}점 주기`"
                >
                  <i :class="star <= form.rating ? 'fas fa-star filled-star' : 'far fa-star empty-star'"></i>
                </button>
                <span class="rating-value">{{ form.rating }}점 / 5점</span>
              </div>
            </div>

            <!-- 한글 주석: 오늘의 무드 선택 -->
            <div class="form-group">
              <label>오늘의 무드</label>
              <div class="mood-selector" id="mood-selector-container">
                <button 
                  type="button"
                  v-for="mood in moodOptions" 
                  :key="mood.value"
                  :class="['mood-btn', `mood-${mood.value}`, { active: form.mood === mood.value }]"
                  @click="form.mood = mood.value"
                >
                  <span class="mood-emoji">{{ mood.emoji }}</span>
                  <span>{{ mood.name }}</span>
                </button>
              </div>
            </div>

            <!-- 한글 주석: 메시지 본문 입력 -->
            <div class="form-group">
              <label for="g-message">내용</label>
              <textarea 
                id="g-message" 
                v-model="form.message" 
                placeholder="미나앤폴에 전하고 싶은 메시지나 후기를 적어주세요." 
                required
                rows="4"
                maxlength="200"
              ></textarea>
              <span class="char-counter">{{ form.message.length }} / 200자</span>
            </div>

            <!-- 한글 주석: 경고 및 상태 알림창 -->
            <div v-if="statusMessage" :class="['alert-message', { 'alert-error': isStatusError }]">
              {{ statusMessage }}
            </div>

            <!-- 한글 주석: 제출 버튼 -->
            <button type="submit" class="btn btn-primary submit-btn" :disabled="isSubmitting" id="guestbook-submit-btn">
              <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
              <span v-else>방명록 등록하기</span>
            </button>
          </form>
        </div>

        <!-- 한글 주석: 방명록 리스트 조회 영역 -->
        <div class="guestbook-list-area">
          <div class="list-header">
            <h3>방명록 목록</h3>
            <button @click="fetchMessages" class="refresh-btn" title="새로고침" id="guestbook-refresh-btn">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>

          <!-- 한글 주석: 로딩 상태 -->
          <div v-if="isLoading" class="list-status">
            <i class="fas fa-circle-notch fa-spin status-icon"></i>
            <p>방명록을 불러오는 중입니다...</p>
          </div>

          <!-- 한글 주석: 데이터가 없는 경우 -->
          <div v-else-if="messages.length === 0" class="list-status list-empty">
            <i class="far fa-comment-dots status-icon"></i>
            <p>아직 작성된 방명록이 없습니다.<br />첫 번째 따뜻한 한마디를 남겨주세요!</p>
          </div>

          <!-- 한글 주석: 방명록 리스트 피드 -->
          <div v-else class="messages-feed" id="guestbook-messages-feed">
            <div 
              v-for="msg in messages" 
              :key="msg.id" 
              class="message-card animate-fade-in"
            >
              <div class="msg-header">
                <div class="msg-author-info">
                  <span class="msg-name">{{ msg.name }}</span>
                  <!-- 한글 주석: 저장된 무드 매핑 데코레이션 -->
                  <span :class="['msg-mood-badge', `badge-${msg.mood}`]">
                    {{ getMoodLabel(msg.mood) }}
                  </span>
                </div>
                <span class="msg-date">{{ formatDate(msg.created_at) }}</span>
              </div>
              
              <!-- 한글 주석: 별점 표기 -->
              <div class="msg-rating">
                <i v-for="star in 5" :key="star" :class="star <= msg.rating ? 'fas fa-star filled-star' : 'far fa-star empty-star'"></i>
              </div>

              <p class="msg-text">{{ msg.message }}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 한글 주석: 방명록 스키마 정의
interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  mood: string;
  rating: number;
  created_at: string;
}

// 한글 주석: 오늘의 무드 선택지
const moodOptions = [
  { value: 'Cozy', name: '아늑함', emoji: '☕' },
  { value: 'Fresh', name: '싱그러움', emoji: '🌿' },
  { value: 'Sweet', name: '달콤함', emoji: '🍰' },
  { value: 'Deep', name: '깊이감', emoji: '🎻' }
];

// 한글 주석: 리액티브 상태 변수들
const messages = ref<GuestbookEntry[]>([]);
const isLoading = ref(true);
const isSubmitting = ref(false);
const statusMessage = ref('');
const isStatusError = ref(false);

const form = ref({
  name: '',
  message: '',
  mood: 'Cozy',
  rating: 5
});

// 한글 주석: DB 조회 API 연동
const fetchMessages = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('/api/guestbook');
    if (!response.ok) {
      throw new Error('방명록 데이터를 가져오지 못했습니다.');
    }
    const data = await response.json();
    messages.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// 한글 주석: DB 작성 API 연동
const submitMessage = async () => {
  if (form.value.name.trim() === '' || form.value.message.trim() === '') {
    showStatus('이름과 내용을 입력해 주세요.', true);
    return;
  }

  isSubmitting.value = true;
  showStatus('', false);

  try {
    const response = await fetch('/api/guestbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || '등록 중 오류가 발생했습니다.');
    }

    // 한글 주석: 성공 시 작성 폼 초기화 및 목록 갱신
    showStatus('방명록이 등록되었습니다. 감사합니다!', false);
    form.value.name = '';
    form.value.message = '';
    form.value.mood = 'Cozy';
    form.value.rating = 5;
    
    await fetchMessages();
  } catch (error: any) {
    showStatus(error.message || '네트워크 통신 중 오류가 발생했습니다.', true);
  } finally {
    isSubmitting.value = false;
  }
};

// 한글 주석: 알림 메시지 노출 제어
const showStatus = (msg: string, isError: boolean) => {
  statusMessage.value = msg;
  isStatusError.value = isError;
  if (msg && !isError) {
    setTimeout(() => {
      statusMessage.value = '';
    }, 4000);
  }
};

// 한글 주석: 무드 라벨 포맷 변경
const getMoodLabel = (value: string) => {
  const opt = moodOptions.find(o => o.value === value);
  return opt ? `${opt.emoji} ${opt.name}` : value;
};

// 한글 주석: 생성일자 가독성 포맷 변경 (예: "2026.06.02 18:30")
const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      // 만약 파싱에 실패하면 원본 문자열 가공 시도
      return dateStr.substring(0, 16).replace('T', ' ');
    }
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
  } catch (e) {
    return dateStr;
  }
};

// 한글 주석: 최초 컴포넌트 마운트 시 데이터 조회 수행
onMounted(() => {
  fetchMessages();
});
</script>

<style scoped>
.guestbook-section {
  background-color: var(--color-bg);
}

.guestbook-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  align-items: flex-start;
}

.guestbook-form-card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 2.5rem;
  box-shadow: var(--shadow-md);
}

.guestbook-form-card h3 {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.form-intro {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.g-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.form-group input, 
.form-group textarea {
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0.8rem 1rem;
  background-color: var(--color-bg);
  transition: var(--transition-smooth);
}

.form-group input:focus, 
.form-group textarea:focus {
  border-color: var(--color-accent);
  outline: none;
  background-color: var(--color-white);
  box-shadow: 0 0 0 3px rgba(197, 168, 128, 0.15);
}

.char-counter {
  align-self: flex-end;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 0.2rem;
}

/* 한글 주석: 별점 선택 영역 디자인 */
.rating-stars {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem;
  font-size: 1.4rem;
  transition: var(--transition-smooth);
}

.star-btn:hover {
  transform: scale(1.15);
}

.filled-star {
  color: var(--color-accent);
}

.empty-star {
  color: #D3C9BE;
}

.rating-value {
  margin-left: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-muted);
}

/* 한글 주석: 무드 선택 버튼 디자인 */
.mood-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.mood-btn {
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  padding: 0.6rem 0.4rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: var(--transition-smooth);
}

.mood-emoji {
  font-size: 1.25rem;
}

.mood-btn:hover {
  border-color: var(--color-accent);
}

.mood-btn.active {
  border-color: var(--color-primary);
  background-color: var(--color-bg-secondary);
}

.submit-btn {
  padding: 1rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.alert-message {
  padding: 0.8rem 1rem;
  background-color: rgba(197, 168, 128, 0.15);
  border-left: 4px solid var(--color-accent);
  color: var(--color-primary);
  border-radius: 4px;
  font-size: 0.875rem;
}

.alert-error {
  background-color: rgba(225, 48, 108, 0.1);
  border-left-color: #E1306C;
  color: #c91852;
}

/* 한글 주석: 방명록 조회 리스트 디자인 */
.guestbook-list-area {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-border);
}

.list-header h3 {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--color-primary);
}

.refresh-btn {
  background: none;
  border: 1px solid var(--color-border);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
  color: var(--color-text-muted);
}

.refresh-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-text);
  transform: rotate(180deg);
}

.list-status {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.status-icon {
  font-size: 2.5rem;
  color: var(--color-secondary);
}

.list-empty .status-icon {
  color: var(--color-accent);
  opacity: 0.6;
}

.messages-feed {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.messages-feed::-webkit-scrollbar {
  width: 6px;
}

.messages-feed .message-card {
  background-color: var(--color-card-bg);
  border: 1px solid rgba(44, 26, 17, 0.05);
  border-radius: 6px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.msg-author-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.msg-name {
  font-weight: 600;
  color: var(--color-primary);
  font-size: 1.05rem;
}

.msg-mood-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  color: var(--color-white);
}

/* 한글 주석: 무드 테마별 배지 배경색 */
.badge-Cozy { background-color: #8C786E; }
.badge-Fresh { background-color: #6C826A; }
.badge-Sweet { background-color: #B27B88; }
.badge-Deep { background-color: #556B8C; }

.msg-date {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.msg-rating {
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.msg-text {
  font-size: 0.925rem;
  color: var(--color-text);
  line-height: 1.6;
  white-space: pre-wrap;
}

/* 한글 주석: 반응형 레이아웃 모바일 대응 */
@media (max-width: 992px) {
  .guestbook-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 576px) {
  .guestbook-form-card {
    padding: 1.5rem;
  }
  .mood-selector {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
