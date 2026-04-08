// ===== STEP NAVIGATION =====
let currentStep = 1;
const stepLines = document.querySelectorAll('.rp-step-line');

function goToStep(n) {
  document.querySelectorAll('.rp-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('step' + n).classList.add('active');
  document.querySelectorAll('.rp-step').forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 < n)  s.classList.add('done');
    if (i + 1 === n) s.classList.add('active');
  });
  stepLines.forEach((l, i) => l.classList.toggle('done', i + 1 < n));
  currentStep = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showErr(id, msg) { const el = document.getElementById(id); if (el) el.textContent = msg; }
function markErr(inputId, errId, msg) {
  const inp = document.getElementById(inputId);
  if (inp) inp.classList.toggle('error', !!msg);
  showErr(errId, msg);
  return !!msg;
}
function clearErr(inputId, errId) { markErr(inputId, errId, ''); }

// ===== STEP 1 — Student =====
document.getElementById('next1').addEventListener('click', () => {
  let e = false;
  e |= markErr('stuFirst',   'stuFirstErr',   !document.getElementById('stuFirst').value.trim()   ? 'Required' : '');
  e |= markErr('stuLast',    'stuLastErr',    !document.getElementById('stuLast').value.trim()    ? 'Required' : '');
  e |= markErr('stuDob',     'stuDobErr',     !document.getElementById('stuDob').value            ? 'Required' : '');
  e |= markErr('stuGender',  'stuGenderErr',  !document.getElementById('stuGender').value         ? 'Required' : '');
  e |= markErr('stuClass',   'stuClassErr',   !document.getElementById('stuClass').value          ? 'Required' : '');
  e |= markErr('prevSchool', 'prevSchoolErr', !document.getElementById('prevSchool').value.trim() ? 'Required' : '');
  if (!e) goToStep(2);
});

// ===== STEP 2 — Parent =====
document.getElementById('back2').addEventListener('click', () => goToStep(1));
document.getElementById('next2').addEventListener('click', () => {
  let e = false;
  e |= markErr('fatherName',  'fatherNameErr',  !document.getElementById('fatherName').value.trim()  ? 'Required' : '');
  e |= markErr('motherName',  'motherNameErr',  !document.getElementById('motherName').value.trim()  ? 'Required' : '');
  const ph = document.getElementById('parentPhone').value.trim();
  e |= markErr('parentPhone', 'parentPhoneErr', !ph ? 'Required' : '');
  const em = document.getElementById('parentEmail').value.trim();
  e |= markErr('parentEmail', 'parentEmailErr', !em ? 'Required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em) ? 'Invalid email' : '');
  e |= markErr('address',     'addressErr',     !document.getElementById('address').value.trim()     ? 'Required' : '');
  const pw = document.getElementById('parentPwd').value;
  e |= markErr('parentPwd',   'parentPwdErr',   !pw ? 'Required' : pw.length < 8 ? 'Min 8 characters' : '');
  if (!e) goToStep(3);
});

// Password strength
document.getElementById('parentPwd').addEventListener('input', function () {
  const pw = this.value;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const colors = ['','#DC2626','#EA580C','#D97706','#16A34A'];
  const labels = ['','Weak','Fair','Good','Strong'];
  const fill  = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');
  fill.style.width      = pw.length ? (score / 4 * 100) + '%' : '0%';
  fill.style.background = colors[score] || '#CBD5E1';
  label.textContent     = pw.length ? labels[score] : '';
  label.style.color     = colors[score] || 'var(--gray)';
});

// Eye toggle
document.getElementById('parentEye').addEventListener('click', function () {
  const inp = document.getElementById('parentPwd');
  inp.type = inp.type === 'text' ? 'password' : 'text';
});

// ===== STEP 3 — Documents =====
document.getElementById('back3').addEventListener('click', () => goToStep(2));

// File upload feedback
document.querySelectorAll('.doc-item').forEach(item => {
  const input = item.querySelector('.doc-input');
  const status = item.querySelector('.doc-status');
  input.addEventListener('change', () => {
    if (input.files[0]) {
      item.classList.add('uploaded');
      status.textContent = '✓ ' + input.files[0].name.substring(0, 20) + (input.files[0].name.length > 20 ? '…' : '');
    }
  });
});

document.getElementById('submitBtn').addEventListener('click', () => {
  const terms = document.getElementById('agreeTerms').checked;
  showErr('termsErr', !terms ? 'Please accept the terms to continue' : '');
  if (!terms) return;

  const btn = document.getElementById('submitBtn');
  btn.classList.add('loading'); btn.disabled = true;

  setTimeout(() => {
    btn.classList.remove('loading'); btn.disabled = false;
    const first = document.getElementById('stuFirst').value;
    const last  = document.getElementById('stuLast').value;
    const email = document.getElementById('parentEmail').value;
    document.getElementById('successStudentName').textContent = first + ' ' + last;
    document.getElementById('successEmail').textContent = email;
    document.getElementById('successRef').textContent = 'Application ID: ADM-2026-' + Math.floor(1000 + Math.random() * 9000);
    goToStep(4);
    // Auto-redirect to login after 5 seconds
    setTimeout(function() {
      window.location.href = 'login.html';
    }, 5000);
  }, 2000);
});

// Live clear errors
['stuFirst','stuLast','stuDob','stuGender','stuClass','prevSchool',
 'fatherName','motherName','parentPhone','parentEmail','address','parentPwd'
].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => {
    el.classList.remove('error');
    const errEl = document.getElementById(id + 'Err');
    if (errEl) errEl.textContent = '';
  });
});
