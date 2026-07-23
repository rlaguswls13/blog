# 커밋 전 보안·품질 체크리스트

이 문서는 저장소에 공유하면 안 되는 로컬 설정과 인증정보를 차단하고, 커밋 전에 변경 범위와 빌드 상태를 확인하기 위한 기준입니다.

## 현재 점검 결과

2026년 7월 22일 기준으로 다음 항목을 확인했습니다.

- `.env.local.yml`은 `.env*` 규칙으로 무시됩니다.
- `.cache`, `.idea`, `.next`, `out`, `node_modules`, `tsconfig.tsbuildinfo`, `next-env.d.ts`는 무시됩니다.
- `.agents/AGENTS.md`는 기존 커밋에 포함돼 있지만 현재 작업 트리에서 삭제된 상태입니다. 기존 내용에서는 키·토큰·개인 절대경로가 발견되지 않았습니다. 삭제가 의도한 변경인지 확인한 뒤 이번 커밋에 포함해야 합니다.
- 추적·미추적 후보 282개에서 개인 키와 주요 서비스 토큰 형식을 검사했으며 실제 비밀값은 발견되지 않았습니다.
- `src/data/pages/detail/codePopupContent.ts`의 비밀번호 형태 문자열은 Tomcat 보안 설명을 위한 예시이며 실제 계정 정보가 아닙니다.
- `public/thumnail`에는 현재 데이터에서 참조하는 WebP 81개만 존재합니다.
- 일반 `일지(blog)`에는 썸네일을 사용하지 않습니다.

## 저장소에 올리면 안 되는 항목

- `.env*`에 저장된 API 키, 토큰, Notion·GA4 설정
- 개인 키와 인증서: `*.pem`, `*.key`, `*.p12`, `*.pfx`, `*.jks`, `*.keystore`
- 클라우드 자격증명: `credentials*.json`, `service-account*.json`
- 로컬 전용 폴더: `credentials`, `secrets`, `.codex`, `.agents`, `.idea`, `.vscode`, `.fleet`
- 생성 산출물과 캐시: `.next`, `out`, `build`, `coverage`, `.cache`, `tmp`, 로그 파일
- 의존성 및 가상환경: `node_modules`, `.venv`, `__pycache__`
- 화면 캡처, 덤프, 백업 파일 중 프로젝트에서 실제 사용하는 근거가 없는 파일

GitHub Actions에서 필요한 값은 파일에 작성하지 말고 저장소의 `Settings > Secrets and variables > Actions`에서 관리합니다. 워크플로에서는 `${{ secrets.NAME }}` 형태로만 참조합니다.

## 커밋 직전 확인 순서

### 1. 변경 파일 확인

```powershell
git status --short
git diff --stat
git diff --check
```

의도하지 않은 대용량 이미지, 임시 폴더, 환경설정 파일이 포함되지 않았는지 확인합니다.

### 2. 무시 대상이 이미 추적 중인지 확인

```powershell
git ls-files -ci --exclude-standard
```

일반적으로 출력이 없어야 합니다. 현재는 삭제 예정인 `.agents/AGENTS.md`가 기존 추적 파일이어서 출력될 수 있습니다. 해당 삭제를 커밋한 다음 다시 실행했을 때 출력이 없어야 합니다. 그 밖의 파일이 출력되면 `.gitignore`만 추가해서는 해결되지 않으므로 실제 비밀값 여부와 Git 기록 정리 필요성을 먼저 확인합니다.

### 3. 스테이징 대상 검토

```powershell
git add -p
git diff --cached --name-status
git diff --cached --check
```

`git add .`보다 `git add -p`를 우선 사용해 변경 단위별로 포함 여부를 확인합니다.

### 4. 인증정보 패턴 검사

```powershell
git grep -n -I -E "BEGIN .*PRIVATE KEY|ghp_|github_pat_|sk-|AIza|AKIA|ASIA|xox[baprs]-|secret_" --cached
```

출력이 있으면 커밋을 중단하고 실제 키인지 확인합니다. 실제 키였다면 파일에서 제거하는 것만으로 끝내지 말고 해당 키를 즉시 폐기·재발급합니다.

### 5. 썸네일 파일 확인

```powershell
Get-ChildItem public/thumnail -Recurse -File | Group-Object Extension
git diff --cached --name-only -- public/thumnail
```

- 허용 형식은 현재 WebP입니다.
- 콘텐츠 데이터에서 참조하지 않는 썸네일은 제거합니다.
- `일지(blog)`용 썸네일은 추가하지 않습니다.
- 원본 생성 시트와 이미지 생성용 임시 파일은 커밋하지 않습니다.

### 6. 코드 품질과 빌드 확인

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

오류가 있으면 커밋 전에 수정합니다. 외부 API 연결 실패로 캐시 데이터를 사용했다면 빌드 성공 여부와 캐시 데이터의 최신성을 별도로 확인합니다.

## 최종 확인

- [ ] 커밋 메시지가 변경 목적을 설명한다.
- [ ] 환경변수, 인증정보, 개인 경로가 포함되지 않았다.
- [ ] 임시 파일과 미사용 이미지가 포함되지 않았다.
- [ ] 스테이징된 diff를 직접 확인했다.
- [ ] ESLint와 TypeScript 검사를 통과했다.
- [ ] 프로덕션 빌드를 통과했다.
- [ ] 문서와 실제 동작이 일치한다.
