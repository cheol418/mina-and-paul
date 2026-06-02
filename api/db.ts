import dotenv from 'dotenv';

// 한글 주석: 로컬 환경에서 .env 파일의 환경 변수를 로드합니다.
dotenv.config();

const url = process.env.TURSO_DATABASE_URL || 'file:local.db';
const authToken = process.env.TURSO_AUTH_TOKEN || '';

// 한글 주석: 내부 실제 libsql 클라이언트 인스턴스 홀더
let clientInstance: any = null;

// 한글 주석: Proxy를 이용한 지연 로딩(Lazy Loading) 패턴 구현.
// 데이터베이스 커넥션이 실행되는 시점에 실제 클라이언트 객체의 프로퍼티와 메소드를 대리 호출합니다.
export const db = new Proxy({} as any, {
  get(target, prop, receiver) {
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

// 한글 주석: 애플리케이션 초기 기동 시 락(Lock) 상태에서 단 한 번 호출되어 드라이버를 로드하고 테이블을 준비하는 초기화 함수
export async function initDatabase() {
  if (!clientInstance) {
    console.log(`[DB 연결 시도] 대상 URL: ${url}`);
    
    // 한글 주석: URL 프로토콜 스키마에 맞춰 최적의 라이브러리를 동적 임포트(Dynamic Import)합니다.
    if (url.startsWith('file:')) {
      // 로컬 파일 경로인 경우 네이티브 모듈 바인딩 기능이 있는 기본 @libsql/client 로드
      const { createClient } = await import('@libsql/client');
      clientInstance = createClient({ url });
      console.log('[DB 로드 완료] 로컬 SQLite 클라이언트를 마운트했습니다.');
    } else {
      // 원격 Turso 클라우드 경로인 경우 C++ 바인딩 없이 HTTP REST 통신을 수행하는 경량 @libsql/client/web 로드
      const { createClient } = await import('@libsql/client/web');
      clientInstance = createClient({ url, authToken });
      console.log('[DB 로드 완료] Turso Cloud Web 클라이언트를 마운트했습니다.');
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
