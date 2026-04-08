// ===== REASON SELECTOR =====
document.querySelectorAll('.cp-reason').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cp-reason').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ===== FILE DROPZONE =====
const dropzone   = document.getElementById('cpDropzone');
const fileInput  = document.getElementById('cpFile');
const filePreview= document.getElementById('cpFilePreview');

dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('drag-over'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
dropzone.addEventListener('drop', e => {
  e.preventDefault(); dropzone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) showFilePreview(file);
});
fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) showFilePreview(fileInput.files[0]);
});

function showFilePreview(file) {
  if (!file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = e => {
    filePreview.innerHTML = `
      <img src="${e.target.result}" alt="Preview" />
      <span>${file.name}</span>
      <button type="button" id="removeFile" style="margin-left:auto;background:none;border:none;cursor:pointer;color:#DC2626;font-size:18px;">✕</button>
    `;
    document.getElementById('removeFile').addEventListener('click', () => {
      filePreview.innerHTML = '';
      fileInput.value = '';
    });
  };
  reader.readAsDataURL(file);
}

// ===== FORM VALIDATION =====
function showErr(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function markErr(inputId, errId, msg) {
  const inp = document.getElementById(inputId);
  if (inp) inp.classList.toggle('error', !!msg);
  showErr(errId, msg);
  return !!msg;
}

// Live clear on input
['cpName','cpEmail','cpSchool','cpMessage'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => {
    el.classList.remove('error');
    showErr(id + 'Err', '');
  });
});

// ===== SUBMIT =====
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  let hasErr = false;

  hasErr |= markErr('cpName',    'cpNameErr',    !document.getElementById('cpName').value.trim()    ? 'Name is required' : '');
  hasErr |= markErr('cpRole',    'cpRoleErr',    !document.getElementById('cpRole').value            ? 'Please select your role' : '');
  const email = document.getElementById('cpEmail').value.trim();
  hasErr |= markErr('cpEmail',   'cpEmailErr',   !email ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Enter a valid email' : '');
  hasErr |= markErr('cpSchool',  'cpSchoolErr',  !document.getElementById('cpSchool').value.trim()  ? 'School name is required' : '');
  hasErr |= markErr('cpMessage', 'cpMessageErr', !document.getElementById('cpMessage').value.trim() ? 'Please describe your issue' : '');

  if (hasErr) return;

  const btn = document.getElementById('cpSubmit');
  btn.classList.add('loading');
  btn.disabled = true;

  // Simulate API
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.disabled = false;

    // Show success
    document.getElementById('contactForm').style.display = 'none';
    document.querySelector('.cp-form-header').style.display = 'none';
    const success = document.getElementById('cpSuccess');
    success.classList.add('show');
    document.getElementById('cpSuccessEmail').textContent = email;
    document.getElementById('cpRefId').textContent = 'EDU-' + Math.random().toString(36).substr(2,8).toUpperCase();

    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1800);
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.cp-faq-item').forEach(item => {
  item.querySelector('.cp-faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.cp-faq-item').forEach(i => i.classList.remove('open'));
    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});
