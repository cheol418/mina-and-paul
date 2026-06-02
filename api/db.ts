import dotenv from 'dotenv';

// 한글 주석: 로컬 환경에서 .env 파일의 환경 변수를 로드합니다.
dotenv.config();

// 한글 주석: 공백, 캐리지 리턴, 따옴표 등을 전처리합니다.
const url = (process.env.TURSO_DATABASE_URL || 'file:local.db').trim().replace(/['"]/g, '');
const authToken = (process.env.TURSO_AUTH_TOKEN || '').trim().replace(/['"]/g, '');

// 한글 주석: 내부 실제 libsql 클라이언트 인스턴스 홀더
let clientInstance: any = null;

// 한글 주석: Proxy를 이용한 지연 로딩(Lazy Loading) 패턴 구현.
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
    
    if (url.startsWith('file:')) {
      // 한글 주석: 로컬 SQLite 파일인 경우 → 네이티브 드라이버 사용
      console.log('[DB 로드] 로컬 SQLite 파일: @libsql/client 네이티브 드라이버 사용');
      const { createClient } = await import('@libsql/client');
      clientInstance = createClient({ url });
    } else {
      // 한글 주석: Turso 원격 URL (libsql:// 등)인 경우:
      //   @libsql/client 네이티브 드라이버는 내부적으로 migration jobs API를 호출하여
      //   Turso 무료 플랜에서 400 에러를 발생시킵니다.
      //   이를 회피하기 위해 환경에 상관없이 HTTP 전용 @libsql/client/web 드라이버를 사용합니다.
      console.log('[DB 로드] Turso 원격 URL 감지: @libsql/client/web (HTTP 전용) 드라이버 사용');
      
      // 한글 주석: @libsql/client/web은 libsql:// 프로토콜을 지원하지 않으므로 https://로 변환합니다.
      let webUrl = url;
      if (webUrl.startsWith('libsql://')) {
        webUrl = 'https://' + webUrl.substring('libsql://'.length);
        console.log(`[DB 로드] 프로토콜 변환 완료: ${webUrl}`);
      }
      
      const { createClient } = await import('@libsql/client/web');
      clientInstance = createClient({ url: webUrl, authToken });
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
  
  console.log('[DB 초기화 완료] 방명록 테이블 준비 완료');
}
