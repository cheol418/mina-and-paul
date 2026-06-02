import express from 'express';
import cors from 'cors';
import { initDatabase, db } from './db.js'; // 한글 주석: ESM 규격에 맞추어 반드시 .js 확장자를 포함하여 임포트합니다.

const app = express();

// 한글 주석: 교차 출처 리소스 공유(CORS) 및 JSON 요청 바디 파싱 미들웨어 설정
app.use(cors());
app.use(express.json());

// 한글 주석: 데이터베이스 동기화 보장 미들웨어 관련 상태 변수
let isDbInitialized = false;
let dbInitializationPromise: Promise<void> | null = null;

// 한글 주석: 콜드 스타트 시, DB 연결 및 초기화 연산이 완료된 후 후속 요청을 처리하도록 보장하는 동기화 락 미들웨어
// 에러 발생 시 프로세스가 죽지 않도록 내부 try-catch를 통해 예외를 안전하게 가둡니다.
export async function ensureDbInitialized(_req: any, res: any, next: any) {
  if (!isDbInitialized) {
    if (!dbInitializationPromise) {
      dbInitializationPromise = initDatabase().then(() => {
        isDbInitialized = true;
        console.log('데이터베이스 초기화 완료');
      }).catch((err) => {
        console.error('데이터베이스 초기화 실패:', err);
        dbInitializationPromise = null; // 실패 시 재시도할 수 있도록 초기화
        throw err;
      });
    }
    try {
      await dbInitializationPromise;
    } catch (err: any) {
      res.status(500).json({
        error: '데이터베이스 연결 및 초기화에 실패했습니다. 환경변수(.env) 설정 및 Turso 인증 토큰을 확인해 주세요.',
        details: err.message
      });
      return;
    }
  }
  next();
}

// 한글 주석: 모든 API 요청 시 데이터베이스 초기화 보장 미들웨어를 통과하도록 적용
app.use(ensureDbInitialized);

// 한글 주석: 방명록 목록 전체 조회 API (최신순 정렬)
app.get('/api/guestbook', async (_req, res) => {
  try {
    const result = await db.execute('SELECT * FROM guestbook ORDER BY id DESC');
    res.json(result.rows);
    return;
  } catch (error: any) {
    console.error('방명록 조회 중 오류 발생:', error);
    res.status(500).json({ error: '방명록을 불러오는 중 서버 오류가 발생했습니다.' });
    return;
  }
});

// 한글 주석: 방명록 새 작성글 등록 API
app.post('/api/guestbook', async (req, res) => {
  const { name, message, mood, rating } = req.body;

  // 한글 주석: 유효성 검사
  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ error: '이름을 입력해 주세요.' });
    return;
  }
  if (!message || typeof message !== 'string' || message.trim() === '') {
    res.status(400).json({ error: '메시지를 입력해 주세요.' });
    return;
  }

  const cleanMood = mood || 'Cozy';
  const cleanRating = typeof rating === 'number' ? Math.min(5, Math.max(1, rating)) : 5;

  try {
    await db.execute({
      sql: 'INSERT INTO guestbook (name, message, mood, rating) VALUES (?, ?, ?, ?)',
      args: [name.trim(), message.trim(), cleanMood, cleanRating]
    });
    res.status(201).json({ success: true, message: '방명록이 등록되었습니다.' });
    return;
  } catch (error: any) {
    console.error('방명록 등록 중 오류 발생:', error);
    res.status(500).json({ error: '방명록을 저장하는 중 서버 오류가 발생했습니다.' });
    return;
  }
});

// 한글 주석: Vercel 서버리스 함수 진입점으로 활용하기 위해 Express 앱 객체를 기본 내보내기 합니다.
export default app;
