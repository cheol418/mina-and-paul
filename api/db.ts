import dotenv from 'dotenv';

// 한글 주석: 로컬 환경에서 .env 파일의 환경 변수를 로드합니다.
dotenv.config();

let url = process.env.TURSO_DATABASE_URL || 'file:local.db';
const authToken = process.env.TURSO_AUTH_TOKEN || '';

// 한글 주석: 내부 실제 libsql 클라이언트 인스턴스 홀더
let clientInstance: any = null;

// 한글 주석: Proxy를 이용한 지연 로딩(Lazy Loading) 패턴 구현.
// 사용하지 않는 target 매개변수에 언더바(_) 접두사를 붙여 TS unused error를 방지합니다.
export const db = new Proxy({} as any, {
  get(_target, prop, receiver) {
    if (!clientInstance) {
      throw new Error('데이터베이스 클라이언트가 아직 초기화되지 않았습니다. initDatabase()를 먼저 호출하세요.');
    }
    const value = Reflect.get(clientInstance, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(clientInstance);
    }
    return value;
  }
});

// 한글 주석: 데이터베이스 초기화 함수
export async function initDatabase() {
  if (!clientInstance) {
    console.log(`[DB 연결 시도] 대상 URL: ${url}`);
    
    // 한글 주석: Vercel 서버리스 클라우드 환경 여부 확인
    const isVercel = !!process.env.VERCEL;

    if (isVercel) {
      // 한글 주석: Vercel 환경에서는 네이티브 모듈 500 바인딩 에러를 막기 위해 @libsql/client/web 드라이버 강제 로드
      console.log('[DB 로드] Vercel 환경 감지: @libsql/client/web 드라이버 사용');
      
      // 한글 주석: 웹 표준 드라이버 REST 연동 호환성을 위해 libsql:// 프로토콜을 https://로 변환
      let webUrl = url;
      if (webUrl.startsWith('libsql://')) {
        webUrl = 'https://' + webUrl.substring(9);
      }
      
      const { createClient } = await import('@libsql/client/web');
      clientInstance = createClient({ url: webUrl, authToken });
    } else {
      // 한글 주석: 로컬 환경에서는 file:local.db 및 libsql:// 프로토콜을 완벽하게 동시 지원하는 네이티브 @libsql/client 드라이버 사용
      console.log('[DB 로드] 로컬 개발 환경 감지: @libsql/client 네이티브 드라이버 사용');
      const { createClient } = await import('@libsql/client');
      clientInstance = createClient({ url, authToken });
    }
  }

  // 한글 주석: 방명록 테이블 생성
  await clientInstance.execute(`
    CREATE TABLE IF NOT EXISTS guestbook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      mood TEXT DEFAULT 'Cozy',
      rating INTEGER DEFAULT 5,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
