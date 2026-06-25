import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
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

document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;

  if (!name || !email || !password || !passwordConfirm) {
    showMessage('모든 항목을 입력해주세요.', 'error');
    return;
  }

  if (password !== passwordConfirm) {
    showMessage('비밀번호가 일치하지 않습니다.', 'error');
    return;
  }

  if (password.length < 6) {
    showMessage('비밀번호는 6자 이상이어야 합니다.', 'error');
    return;
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    alert(name + ' 님, 회원가입이 완료되었습니다!');
    window.location.href = 'index.html';
  } catch (err) {
    const errors = {
      'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
      'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
      'auth/weak-password': '비밀번호가 너무 약합니다.',
    };
    showMessage(errors[err.code] || '회원가입에 실패했습니다.', 'error');
  }
});

document.getElementById('googleSignup').addEventListener('click', async function () {
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const name = result.user.displayName || result.user.email;
    alert(name + ' 님, Google 회원가입이 완료되었습니다!');
    window.location.href = 'index.html';
  } catch (err) {
    if (err.code !== 'auth/popup-closed-by-user') {
      showMessage('Google 회원가입에 실패했습니다.', 'error');
    }
  }
});
