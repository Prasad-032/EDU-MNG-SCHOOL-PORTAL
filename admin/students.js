/* =========================================================
   students.js — Student management with UX improvements
   ========================================================= */

// ===== SIDEBAR TOGGLE (shared) =====
const sidebar = document.getElementById('sidebar');
const adminMain = document.getElementById('adminMain');
document.getElementById('sidebarToggle').addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  adminMain.classList.toggle('collapsed');
});

// ===== TOAST NOTIFICATIONS =====
function showToast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ===== MODAL FOCUS MANAGEMENT =====
const modal = document.getElementById('addModal');
let lastFocusedElement = null;

function openModal() {
  lastFocusedElement = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-modal', 'true');
  const firstInput = modal.querySelector('input, select, textarea, button');
  if (firstInput) setTimeout(() => firstInput.focus(), 50);
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-modal', 'false');
  if (lastFocusedElement) lastFocusedElement.focus();
}

// ===== SAMPLE DATA =====
const allStudents = [
  { name:'Raju Sharma',    img:'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=40&h=40&fit=crop&crop=face', roll:'001', cls:'10A', phone:'+91 98765 43210', fee:'paid',    att:94, joined:'Jan 2024' },
  { name:'Priya Nair',     img:'https://images.unsplash.com/photo-1545696968-1a31da406a64?w=40&h=40&fit=crop&crop=face', roll:'002', cls:'10B', phone:'+91 87654 32109', fee:'paid',    att:88, joined:'Jan 2024' },
  { name:'Anita Roy',      img:'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=40&h=40&fit=crop&crop=face', roll:'015', cls:'9A',  phone:'+91 76543 21098', fee:'pending', att:72, joined:'Jun 2024' },
  { name:'Karan Mehta',    img:'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=40&h=40&fit=crop&crop=face', roll:'022', cls:'9B',  phone:'+91 65432 10987', fee:'overdue', att:65, joined:'Jun 2024' },
  { name:'Sunita Verma',   img:'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=40&h=40&fit=crop&crop=face', roll:'031', cls:'8A',  phone:'+91 54321 09876', fee:'paid',    att:91, joined:'Jun 2023' },
  { name:'Arjun Patel',    img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', roll:'044', cls:'11A', phone:'+91 43210 98765', fee:'paid',    att:96, joined:'Jun 2022' },
  { name:'Meera Singh',    img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop&crop=face', roll:'055', cls:'12B', phone:'+91 32109 87654', fee:'pending', att:79, joined:'Jun 2021' },
  { name:'Rohit Kumar',    img:'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=40&h=40&fit=crop&crop=face', roll:'063', cls:'8B',  phone:'+91 21098 76543', fee:'paid',    att:85, joined:'Jun 2023' },
  { name:'Kavya Reddy',    img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face', roll:'071', cls:'10A', phone:'+91 10987 65432', fee:'overdue', att:60, joined:'Jan 2024' },
  { name:'Vikram Joshi',   img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face', roll:'082', cls:'11B', phone:'+91 09876 54321', fee:'paid',    att:93, joined:'Jun 2022' },
];

const feeBadge = { paid:'badge-green', pending:'badge-orange', overdue:'badge-red' };
let selected = new Set();
const PAGE_SIZE = 10;
let currentPage = 1;

function renderTable(data, page = 1) {
  const tbody = document.getElementById('studentsBody');
  tbody.innerHTML = '';

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <h3>No students found</h3>
      <p>Try adjusting your search or filters.</p>
    </div></td></tr>`;
    updatePagination(data.length, page);
    return;
  }

  const start = (page - 1) * PAGE_SIZE;
  const pageData = data.slice(start, start + PAGE_SIZE);

  pageData.forEach((s, localIdx) => {
    const globalIdx = allStudents.indexOf(s);
    const attColor = s.att >= 85 ? '#16A34A' : s.att >= 75 ? '#D97706' : '#DC2626';
    tbody.innerHTML += `
      <tr>
        <td><input type="checkbox" data-idx="${globalIdx}" ${selected.has(globalIdx) ? 'checked' : ''} /></td>
        <td><div class="td-avatar"><img src="${s.img}" alt="${s.name}"/><div><div class="td-name">${s.name}</div></div></div></td>
        <td>${s.roll}</td>
        <td>Class ${s.cls}</td>
        <td>${s.phone}</td>
        <td><span class="badge ${feeBadge[s.fee]}">${s.fee.charAt(0).toUpperCase()+s.fee.slice(1)}</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <div style="flex:1;height:6px;background:#E2E8F0;border-radius:9999px;overflow:hidden">
              <div style="width:${s.att}%;height:100%;background:${attColor};border-radius:9999px"></div>
            </div>
            <span style="font-size:12px;font-weight:700;color:${attColor};min-width:32px">${s.att}%</span>
          </div>
        </td>
        <td style="color:var(--gray);font-size:12px">${s.joined}</td>
        <td>
          <div style="display:flex;gap:4px">
            <button class="btn btn-ghost btn-icon btn-sm" title="View Profile" aria-label="View ${s.name}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="btn btn-ghost btn-icon btn-sm" title="Edit" aria-label="Edit ${s.name}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="btn btn-ghost btn-icon btn-sm" title="Delete" aria-label="Delete ${s.name}" style="color:var(--red)"
              onclick="confirm('Delete ${s.name}? This cannot be undone.') && showToast('${s.name} removed','error')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            </button>
          </div>
        </td>
      </tr>`;
  });

  // Row checkboxes
  tbody.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => {
      const idx = +cb.dataset.idx;
      cb.checked ? selected.add(idx) : selected.delete(idx);
      updateBulkBar();
    });
  });

  updatePagination(data.length, page);
}

function updatePagination(total, page) {
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);
  document.getElementById('paginationInfo').textContent =
    total === 0 ? 'No results' : `Showing ${start}–${end} of ${total.toLocaleString()}`;

  const pageBtns = document.querySelectorAll('[id^="page"], #prevPage, #nextPage');
  pageBtns.forEach(btn => {
    const num = btn.id.match(/^page(\d+)$/)?.[1];
    if (num) {
      const n = parseInt(num);
      btn.className = n === page ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm';
      btn.disabled = n < 1 || n > totalPages;
    }
  });
  document.getElementById('prevPage').disabled = page <= 1;
  document.getElementById('nextPage').disabled = page >= totalPages;
}

function updateBulkBar() {
  const bar = document.getElementById('bulkBar');
  const cnt = document.getElementById('bulkCount');
  bar.classList.toggle('show', selected.size > 0);
  cnt.textContent = `${selected.size} selected`;
}

function getFiltered() {
  const q   = document.getElementById('searchInput').value.toLowerCase();
  const cls = document.getElementById('filterClass').value;
  const fee = document.getElementById('filterFee').value.toLowerCase();
  return allStudents.filter(s => {
    const matchQ   = !q   || s.name.toLowerCase().includes(q) || s.roll.includes(q) || s.cls.toLowerCase().includes(q);
    const matchCls = !cls || (`Class ` + s.cls).startsWith(cls);
    const matchFee = !fee || s.fee === fee;
    return matchQ && matchCls && matchFee;
  });
}

function showSkeleton() {
  const tbody = document.getElementById('studentsBody');
  const rows = Array.from({ length: 5 }, () =>
    `<tr class="skeleton-row">
      <td><div class="skeleton sk-avatar" style="width:36px;height:36px;border-radius:50%"></div></td>
      <td><div style="display:flex;align-items:center;gap:10px">
        <div class="skeleton sk-avatar"></div>
        <div style="flex:1"><div class="skeleton sk-text-lg" style="width:120px;height:13px;margin-bottom:5px"></div><div class="skeleton sk-text-sm" style="width:80px"></div></div>
      </div></td>
      <td><div class="skeleton sk-text-sm" style="width:40px"></div></td>
      <td><div class="skeleton sk-text-sm" style="width:55px"></div></td>
      <td><div class="skeleton sk-text-sm" style="width:100px"></div></td>
      <td><div class="skeleton sk-badge"></div></td>
      <td><div class="skeleton sk-bar" style="width:80px"></div></td>
      <td><div class="skeleton sk-text-sm" style="width:55px"></div></td>
      <td><div style="display:flex;gap:4px"><div class="skeleton" style="width:28px;height:28px;border-radius:6px"></div><div class="skeleton" style="width:28px;height:28px;border-radius:6px"></div></div></td>
    </tr>`).join('');
  tbody.innerHTML = rows;
}

showSkeleton();
setTimeout(() => renderTable(allStudents, currentPage), 100);
let searchTimer;
['searchInput','filterClass','filterFee'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', () => {
    clearTimeout(searchTimer);
    showSkeleton();
    searchTimer = setTimeout(() => { currentPage = 1; selected.clear(); updateBulkBar(); renderTable(getFiltered(), currentPage); }, 300);
  });
});
document.getElementById('filterSection')?.addEventListener('input', () => {
  showSkeleton();
  currentPage = 1;
  setTimeout(() => renderTable(getFiltered(), currentPage), 300);
});

// Pagination buttons
document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) { currentPage--; renderTable(getFiltered(), currentPage); }
});
document.getElementById('nextPage').addEventListener('click', () => {
  const totalPages = Math.ceil(getFiltered().length / PAGE_SIZE);
  if (currentPage < totalPages) { currentPage++; renderTable(getFiltered(), currentPage); }
});
document.querySelectorAll('[id^="page"]').forEach(btn => {
  const num = btn.id.match(/^page(\d+)$/)?.[1];
  if (num) btn.addEventListener('click', () => { currentPage = parseInt(num); renderTable(getFiltered(), currentPage); });
});

// Select all
document.getElementById('selectAll').addEventListener('change', function () {
  const filtered = getFiltered();
  if (this.checked) {
    filtered.forEach(s => selected.add(allStudents.indexOf(s)));
  } else {
    selected.clear();
  }
  updateBulkBar();
  renderTable(filtered, currentPage);
});

// Clear selection
document.getElementById('clearSelection').addEventListener('click', () => {
  selected.clear(); updateBulkBar(); renderTable(getFiltered(), currentPage);
});

// Bulk delete with confirm
document.querySelector('#bulkBar .btn-danger')?.addEventListener('click', () => {
  if (selected.size === 0) return;
  if (confirm(`Delete ${selected.size} student(s)? This cannot be undone.`)) {
    showToast(`${selected.size} student(s) removed`, 'error');
    selected.clear(); updateBulkBar(); renderTable(getFiltered(), currentPage);
  }
});

// ===== ADD STUDENT MODAL =====
document.getElementById('addStudentBtn').addEventListener('click', openModal);
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('cancelModal').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

// Add student form submission
const addStudentForm = document.getElementById('addStudentSubmit');
if (addStudentForm) {
  // Live clear errors on input
  document.querySelectorAll('#addModal input, #addModal select').forEach(inp => {
    inp.addEventListener('input', () => { inp.classList.remove('error'); });
  });

  addStudentForm.addEventListener('click', () => {
    const inputs = {
      firstName: document.getElementById('fnFirstName'),
      lastName:  document.getElementById('fnLastName'),
      dob:       document.getElementById('fnDob'),
      cls:       document.getElementById('fnClass'),
      section:   document.getElementById('fnSection'),
      parent:    document.getElementById('fnParent'),
      phone:     document.getElementById('fnPhone'),
    };

    let hasErr = false;
    const required = [
      [inputs.firstName, 'fnErr',  'First name is required'],
      [inputs.lastName,  'lnErr',  'Last name is required'],
      [inputs.dob,      'dobErr', 'Date of birth is required'],
      [inputs.cls,      'clsErr', 'Please select a class'],
      [inputs.section,  'secErr', 'Please select a section'],
      [inputs.parent,   'parErr', 'Parent name is required'],
      [inputs.phone,    'phErr',  'Phone number is required'],
    ];

    required.forEach(([inp, errId, msg]) => {
      if (!inp || !inp.value.trim()) {
        inp.classList.add('error');
        const errEl = document.getElementById(errId);
        if (errEl) errEl.textContent = msg;
        hasErr = true;
      } else {
        inp.classList.remove('error');
        const errEl = document.getElementById(errId);
        if (errEl) errEl.textContent = '';
      }
    });

    if (hasErr) { showToast('Please fill in all required fields', 'error'); return; }

    // Loading state
    addStudentForm.classList.add('loading');
    addStudentForm.disabled = true;
    addStudentForm.innerHTML = `<span class="btn-spinner"></span><span class="btn-label">Adding…</span>`;

    setTimeout(() => {
      addStudentForm.classList.remove('loading');
      addStudentForm.disabled = false;
      addStudentForm.innerHTML = `<span class="btn-label">Add Student</span><span class="btn-spinner"></span>`;
      closeModal();
      showToast('Student added successfully');
      document.querySelectorAll('#addModal input, #addModal select').forEach(i => { i.value = ''; i.classList.remove('error'); });
    }, 1500);
  });
}
