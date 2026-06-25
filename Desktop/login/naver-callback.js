(function () {
  const params = new URLSearchParams(window.location.search);
  const code  = params.get('code');
  const state = params.get('state');
  const error = params.get('error');

  const savedState = sessionStorage.getItem('naver_oauth_state');

  function showError(msg) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('errorMsg').textContent = msg;
    document.getElementById('error').style.display = 'block';
  }

  function showSuccess() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('success').style.display = 'block';
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 1500);
  }

  // 로그인 취소
  if (error) {
    showError('네이버 로그인이 취소되었습니다.');
    return;
  }

  // 코드 없음
  if (!code) {
    showError('인증 코드를 받지 못했습니다.');
    return;
  }

  // CSRF 검증
  if (state !== savedState) {
    showError('보안 검증에 실패했습니다. 다시 시도해주세요.');
    return;
  }

  sessionStorage.removeItem('naver_oauth_state');

  // ✅ 여기서 code를 서버(Firebase Function)로 전달해 토큰 교환
  // 네이버 토큰 API는 브라우저에서 직접 호출 불가(CORS) → 서버 필요
  // 아래는 Firebase Function 연동 시 교체할 부분입니다.
  //
  // fetch('https://{region}-{project}.cloudfunctions.net/naverAuth', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ code, state })
  // })
  // .then(res => res.json())
  // .then(data => {
  //   if (data.success) showSuccess();
  //   else showError('로그인에 실패했습니다.');
  // });

  // 임시 처리 (서버 연동 전)
  console.log('네이버 인증 코드 수신:', code);
  showSuccess();
})();
