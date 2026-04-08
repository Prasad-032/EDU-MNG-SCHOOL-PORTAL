// ===== STEP MANAGEMENT =====
let currentStep = 1;
const leftSteps = [
  document.getElementById('ls1'),
  document.getElementById('ls2'),
  document.getElementById('ls3')
];

function goTo(n) {
  document.querySelectorAll('.fp-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('fp-step' + n).classList.add('active');

  leftSteps.forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 < n)  s.classList.add('done');
    if (i + 1 === n) s.classList.add('active');
  });
  currentStep = n;
}

// ===== STEP 1 — SEND OTP =====
const fpEmail   = document.getElementById('fpEmail');
const fpEmailErr= document.getElementById('fpEmailErr');

document.getElementById('fpSendOtp').addEventListener('click', () => {
  const val = fpEmail.value.trim();
  if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    fpEmailErr.textContent = 'Enter a valid email address';
    fpEmail.classList.add('error');
    return;
  }
  fpEmailErr.textContent = '';
  fpEmail.classList.remove('error');

  const btn = document.getElementById('fpSendOtp');
  btn.classList.add('loading'); btn.disabled = true;

  setTimeout(() => {
    btn.classList.remove('loading'); btn.disabled = false;
    document.getElementById('fpEmailDisplay').textContent = val;
    goTo(2);
    startTimer();
    document.querySelector('.fp-otp-box').focus();
  }, 1500);
});

fpEmail.addEventListener('input', () => {
  fpEmail.classList.remove('error');
  fpEmailErr.textContent = '';
});

// ===== OTP BOXES — auto-advance & backspace =====
const otpBoxes = document.querySelectorAll('.fp-otp-box');
otpBoxes.forEach((box, i) => {
  box.addEventListener('input', () => {
    box.value = box.value.replace(/\D/g, '').slice(-1);
    box.classList.toggle('filled', !!box.value);
    if (box.value && i < otpBoxes.length - 1) otpBoxes[i + 1].focus();
  });
  box.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !box.value && i > 0) {
      otpBoxes[i - 1].value = '';
      otpBoxes[i - 1].classList.remove('filled');
      otpBoxes[i - 1].focus();
    }
  });
  // Paste support
  box.addEventListener('paste', e => {
    e.preventDefault();
    const digits = (e.clipboardData.getData('text').replace(/\D/g, '')).slice(0, 6);
    digits.split('').forEach((d, j) => {
      if (otpBoxes[j]) { otpBoxes[j].value = d; otpBoxes[j].classList.add('filled'); }
    });
    const next = Math.min(digits.length, 5);
    otpBoxes[next].focus();
  });
});

// ===== STEP 2 — VERIFY OTP =====
document.getElementById('fpVerifyOtp').addEventListener('click', () => {
  const otp = [...otpBoxes].map(b => b.value).join('');
  const err = document.getElementById('fpOtpErr');

  if (otp.length < 6) {
    err.textContent = 'Please enter all 6 digits';
    otpBoxes.forEach(b => b.classList.add('error'));
    setTimeout(() => otpBoxes.forEach(b => b.classList.remove('error')), 500);
    err.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  // Show wrong OTP state — simulate wrong code check
  if (otp !== '123456') {
    err.textContent = 'Incorrect code — please try again';
    otpBoxes.forEach(b => b.classList.add('error'));
    setTimeout(() => otpBoxes.forEach(b => b.classList.remove('error')), 800);
    return;
  }
  err.textContent = '';

  const btn = document.getElementById('fpVerifyOtp');
  btn.classList.add('loading'); btn.disabled = true;

  setTimeout(() => {
    btn.classList.remove('loading'); btn.disabled = false;
    // Accept any 6-digit code for demo
    goTo(3);
    document.getElementById('fpNewPw').focus();
  }, 1500);
});

// ===== RESEND TIMER =====
let timerInterval = null;
function startTimer() {
  let seconds = 59;
  const timerEl  = document.getElementById('fpTimer');
  const resendBtn = document.getElementById('fpResendBtn');
  const resendText= document.getElementById('fpResendText');
  resendBtn.disabled = true;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    seconds--;
    timerEl.textContent = '00:' + String(seconds).padStart(2, '0');
    if (seconds <= 0) {
      clearInterval(timerInterval);
      resendText.innerHTML = 'Didn\'t receive the code?';
      resendBtn.disabled = false;
    }
  }, 1000);
}

document.getElementById('fpResendBtn').addEventListener('click', () => {
  document.getElementById('fpResendText').innerHTML = 'Resend code in <strong id="fpTimer">00:59</strong>';
  otpBoxes.forEach(b => { b.value = ''; b.classList.remove('filled'); });
  otpBoxes[0].focus();
  startTimer();
});

document.getElementById('fpBackToEmail').addEventListener('click', () => {
  clearInterval(timerInterval);
  goTo(1);
});

// ===== PASSWORD STRENGTH =====
const newPw = document.getElementById('fpNewPw');
const fill  = document.getElementById('fpStrengthFill');
const label = document.getElementById('fpStrengthLabel');

newPw.addEventListener('input', () => {
  const pw = newPw.value;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const colors = ['','#DC2626','#EA580C','#D97706','#16A34A'];
  const labels = ['','Weak','Fair','Good','Strong'];
  fill.style.width      = pw.length ? (score / 4 * 100) + '%' : '0%';
  fill.style.background = colors[score] || '#CBD5E1';
  label.textContent     = pw.length ? labels[score] : '';
  label.style.color     = colors[score] || 'var(--gray)';
});

// ===== EYE TOGGLES =====
function toggleEye(eyeId, inputId) {
  const btn = document.getElementById(eyeId);
  const inp = document.getElementById(inputId);
  btn.addEventListener('click', () => {
    const isText = inp.type === 'text';
    inp.type = isText ? 'password' : 'text';
    btn.innerHTML = isText
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
  });
}
toggleEye('fpEye1', 'fpNewPw');
toggleEye('fpEye2', 'fpConfirmPw');

// ===== STEP 3 — RESET =====
document.getElementById('fpResetBtn').addEventListener('click', () => {
  const pw  = document.getElementById('fpNewPw').value;
  const cpw = document.getElementById('fpConfirmPw').value;
  const pwErr  = document.getElementById('fpNewPwErr');
  const cpwErr = document.getElementById('fpConfirmPwErr');
  let hasErr = false;

  if (!pw || pw.length < 8) {
    pwErr.textContent = 'Password must be at least 8 characters';
    document.getElementById('fpNewPw').classList.add('error');
    hasErr = true;
  } else { pwErr.textContent = ''; document.getElementById('fpNewPw').classList.remove('error'); }

  if (pw !== cpw) {
    cpwErr.textContent = 'Passwords do not match';
    document.getElementById('fpConfirmPw').classList.add('error');
    hasErr = true;
  } else { cpwErr.textContent = ''; document.getElementById('fpConfirmPw').classList.remove('error'); }

  if (hasErr) return;

  const btn = document.getElementById('fpResetBtn');
  btn.classList.add('loading'); btn.disabled = true;

  setTimeout(() => {
    btn.classList.remove('loading'); btn.disabled = false;
    goTo(4);
  }, 1800);
});
