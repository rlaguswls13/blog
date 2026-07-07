<RULE[devlog_guidelines]>
devlog 문서를 작성하거나 수정할 때는 다음 규칙을 준수합니다:
1. 코드는 `<Collapsible>` 컴포넌트를 사용하여 작성합니다 (예: `<Collapsible title="코드 설명">코드 블록</Collapsible>`).
2. 표나 그림을 삽입할 때는 기본 제공되는 컴포넌트를 확인하여 우선적으로 사용합니다. 만약 제대로 그려지지 않거나 적절한 컴포넌트가 없다면, 새로운 컴포넌트를 추가하여 생성합니다.
3. 문서 작성 시 들여쓰기가 올바르게 되어 있는지 항상 확인합니다.
</RULE[devlog_guidelines]>

<RULE[metadata_sync]>
devlog나 project 문서 등 마크다운(MDX) 파일의 메타데이터(제목, 요약 등)를 수정하거나 새로 작성할 때는, 해당 데이터와 연관된 JSON 파일(예: `devlog.json`, `projects.json` 등)의 데이터도 반드시 일치하도록 동기화해야 합니다.
또한 문서 및 데이터를 수정할 경우, `date` 속성이 존재한다면 항상 수정한 당일 날짜(YYYY.MM.DD 등 기존 포맷 유지)로 업데이트해야 합니다.
</RULE[metadata_sync]>
