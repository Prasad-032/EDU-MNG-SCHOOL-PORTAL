// ===== ROLE SWITCHER =====
const roles = document.querySelectorAll('.lp-role');
const bgImg    = document.getElementById('lpBgImg');
const bgTint   = document.getElementById('lpBgTint');
const quoteText   = document.getElementById('lpQuoteText');
const quoteAvatar = document.getElementById('lpQuoteAvatar');
const quoteName   = document.getElementById('lpQuoteName');
const quoteRole   = document.getElementById('lpQuoteRole');
const pill1Text   = document.getElementById('lpPillText1');
const pill2Text   = document.getElementById('lpPillText2');
const submitBtn   = document.getElementById('lpSubmit');
const forgotLink  = document.querySelector('.lp-forgot');
const signupLink  = document.querySelector('.lp-signup a');
const logoIcon    = document.querySelector('.lp-logo-icon');

function applyRole(btn) {
  // Update CSS variable for role color
  const color = btn.dataset.color;
  const bg    = btn.dataset.bg;
  document.documentElement.style.setProperty('--role-color', color);
  document.documentElement.style.setProperty('--role-bg', bg);

  // Swap left panel photo
  bgImg.style.opacity = '0';
  setTimeout(() => {
    bgImg.src = btn.dataset.img;
    bgImg.onload = () => { bgImg.style.opacity = '1'; };
  }, 200);
  bgTint.style.background = btn.dataset.tint;

  // Swap quote
  quoteText.textContent   = `"${btn.dataset.quote}"`;
  quoteAvatar.src         = btn.dataset.avatar;
  quoteName.textContent   = btn.dataset.author;
  quoteRole.textContent   = btn.dataset.arole;
  pill1Text.textContent   = btn.dataset.p1;
  pill2Text.textContent   = btn.dataset.p2;

  // Logo icon color
  logoIcon.style.color = color;
}

roles.forEach(btn => {
  btn.addEventListener('click', () => {
    roles.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyRole(btn);
  });
});

// Init with first role
applyRole(document.querySelector('.lp-role.active'));

// ===== PASSWORD TOGGLE =====
const passwordInput = document.getElementById('password');
const eyeBtn = document.getElementById('lpEye');
eyeBtn.addEventListener('click', () => {
  const isText = passwordInput.type === 'text';
  passwordInput.type = isText ? 'password' : 'text';
  eyeBtn.innerHTML = isText
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
});

// ===== FORM VALIDATION & SUBMIT =====
const form         = document.getElementById('lpForm');
const emailInput   = document.getElementById('email');
const emailError   = document.getElementById('emailError');
const passwordError= document.getElementById('passwordError');

function validateEmail(val) {
  if (!val) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Enter a valid email address';
  return '';
}
function validatePassword(val) {
  if (!val) return 'Password is required';
  if (val.length < 6) return 'Password must be at least 6 characters';
  return '';
}

// Live validation on blur
emailInput.addEventListener('blur', () => {
  const err = validateEmail(emailInput.value.trim());
  emailError.textContent = err;
  emailInput.classList.toggle('error', !!err);
});
passwordInput.addEventListener('blur', () => {
  const err = validatePassword(passwordInput.value);
  passwordError.textContent = err;
  passwordInput.classList.toggle('error', !!err);
});

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const eErr = validateEmail(emailInput.value.trim());
  const pErr = validatePassword(passwordInput.value);
  emailError.textContent    = eErr;
  passwordError.textContent = pErr;
  emailInput.classList.toggle('error', !!eErr);
  passwordInput.classList.toggle('error', !!pErr);
  if (eErr || pErr) return;

  // Show loading
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  // Simulate auth — redirect to correct portal
  setTimeout(() => {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    const role = document.querySelector('.lp-role.active').dataset.role;
    const redirectMap = {
      admin:   'admin/dashboard.html',
      teacher: 'teacher/dashboard.html',
      student: 'student/dashboard.html',
      parent:  'parent/dashboard.html'
    };
    window.location.href = redirectMap[role];
  }, 1200);
});

// ===== INPUT FOCUS RING COLOR =====
[emailInput, passwordInput].forEach(input => {
  input.addEventListener('focus', () => {
    input.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--role-color').trim();
  });
  input.addEventListener('blur', () => {
    if (!input.classList.contains('error')) input.style.borderColor = '';
  });
});
