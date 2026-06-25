import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAntGwNp1NG3HbvyZZPVGg2e2REJafRO68",
  authDomain: "login-test-ea00e.firebaseapp.com",
  projectId: "login-test-ea00e",
  storageBucket: "login-test-ea00e.firebasestorage.app",
  messagingSenderId: "271607584631",
  appId: "1:271607584631:web:27c59ea7fc5dad42f2b372"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const messageEl = document.getElementById('message');

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = 'message ' + type;
}

function onLoginSuccess(user) {
  const name = user.displayName || user.email;
  alert(name + ' 로그인 성공!');
}

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showMessage('이메일과 비밀번호를 모두 입력해주세요.', 'error');
    return;
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    onLoginSuccess(result.user);
  } catch (err) {
    const errors = {
      'auth/user-not-found': '등록되지 않은 이메일입니다.',
      'auth/wrong-password': '비밀번호가 올바르지 않습니다.',
      'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
      'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
      'auth/too-many-requests': '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.',
    };
    showMessage(errors[err.code] || '로그인에 실패했습니다.', 'error');
  }
});

document.querySelectorAll('.social-btn').forEach(function (btn) {
  btn.addEventListener('click', async function () {
    const provider = btn.dataset.provider;

    if (provider === 'google') {
      try {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        onLoginSuccess(result.user);
      } catch (err) {
        if (err.code !== 'auth/popup-closed-by-user') {
          showMessage('Google 로그인에 실패했습니다.', 'error');
        }
      }
    } else if (provider === 'naver') {
      const CLIENT_ID = '여기에_복사한_Client_ID_붙여넣기';
      const CALLBACK_URL = encodeURIComponent(location.origin + '/naver-callback.html');
      const state = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      sessionStorage.setItem('naver_oauth_state', state);
      location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&state=${state}`;
    }
  });
});
