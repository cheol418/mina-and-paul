import app from './index.js'; // 한글 주석: ESM 사양에 부합하게 임포트 시 .js 확장자를 작성합니다.

const port = process.env.PORT || 3001;

// 한글 주석: 로컬 개발 서버를 실행하고 클라이언트 요청 대기
app.listen(port, () => {
  console.log(`[Mina & Paul Backend API] http://localhost:${port} 에서 구동이 시작되었습니다.`);
});
