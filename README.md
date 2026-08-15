# Exit404

전공 문제를 풀어 열쇠를 모으고 학교를 탈출하는 2D 서바이벌 퀴즈 게임입니다. 

---

## 사용 기술

**Frontend**
- HTML5 / CSS3 / JavaScript
- Canvas API

**Backend / Database**
- Supabase (Database, Edge Function)

**협업 도구**
- Git / GitHub / Figma

---

## 데이터베이스

- `ranking`: 클리어 기록 (학번, 이름, 클리어 시간)
- `problem`: 전공 문제 (카테고리, 문제, 정답)

정답은 RLS로 클라이언트 접근을 차단하고 Edge Function에서만 검증합니다. 상세 스키마는 Supabase 대시보드 참고.

---

## 개발 흐름

이슈 생성 → 브랜치 생성 → 작업 → PR → 리뷰 → `main` 병합

이슈/PR은 `.github/` 템플릿을 사용합니다.

```bash
git checkout -b feature/#이슈번호-작업내용
```

병합 후 브랜치 삭제:

```bash
git branch -d feature/#이슈번호-작업내용
git push origin --delete feature/#이슈번호-작업내용
```