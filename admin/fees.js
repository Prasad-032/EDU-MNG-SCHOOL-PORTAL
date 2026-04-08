// Sidebar
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
  document.getElementById('adminMain').classList.toggle('collapsed');
});

// Animate progress bar
setTimeout(() => {
  document.getElementById('feeProgressFill').style.width = '70%';
  document.getElementById('feeProgressPct').textContent  = '70%';
}, 300);

// Fee table data
const feeData = [
  { name:'Raju Sharma',   img:'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=40&h=40&fit=crop&crop=face', cls:'10A', type:'Tuition Fee',   amount:'₹8,500', due:'01 Apr 2026', paid:'02 Apr 2026', status:'paid' },
  { name:'Priya Nair',    img:'https://images.unsplash.com/photo-1545696968-1a31da406a64?w=40&h=40&fit=crop&crop=face', cls:'10B', type:'Tuition Fee',   amount:'₹8,500', due:'01 Apr 2026', paid:'05 Apr 2026', status:'paid' },
  { name:'Anita Roy',     img:'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=40&h=40&fit=crop&crop=face', cls:'9A',  type:'Transport Fee', amount:'₹2,200', due:'01 Apr 2026', paid:'—',          status:'pending' },
  { name:'Karan Mehta',   img:'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=40&h=40&fit=crop&crop=face', cls:'9B',  type:'Tuition Fee',   amount:'₹8,500', due:'01 Mar 2026', paid:'—',          status:'overdue' },
  { name:'Sunita Verma',  img:'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=40&h=40&fit=crop&crop=face', cls:'8A',  type:'Activity Fee',  amount:'₹1,200', due:'01 Apr 2026', paid:'03 Apr 2026', status:'paid' },
  { name:'Arjun Patel',   img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', cls:'11A', type:'Exam Fee',      amount:'₹1,800', due:'15 Apr 2026', paid:'—',          status:'pending' },
  { name:'Meera Singh',   img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop&crop=face', cls:'12B', type:'Tuition Fee',   amount:'₹9,200', due:'01 Feb 2026', paid:'—',          status:'overdue' },
  { name:'Rohit Kumar',   img:'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=40&h=40&fit=crop&crop=face', cls:'8B',  type:'Tuition Fee',   amount:'₹8,500', due:'01 Apr 2026', paid:'01 Apr 2026', status:'paid' },
];

const feeBadge = { paid:'badge-green', pending:'badge-orange', overdue:'badge-red' };
const PAGE_SIZE = 5;
let currentFeePage = 1;
let currentFilter = '';
let currentSearch = '';

function getFilteredFeeData() {
  let data = feeData;
  if (currentFilter) data = data.filter(f => f.status === currentFilter);
  if (currentSearch) data = data.filter(f => f.name.toLowerCase().includes(currentSearch));
  return data;
}

function renderFeeTablePage(page) {
  const data = getFilteredFeeData();
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  page = Math.max(1, Math.min(page, totalPages));
  currentFeePage = page;
  const start = (page - 1) * PAGE_SIZE;
  const pageData = data.slice(start, start + PAGE_SIZE);

  const tbody = document.getElementById('feeTableBody');
  if (!pageData.length) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
      <h3>No fee records found</h3>
      <p>Try adjusting your search or filter.</p>
    </div></td></tr>`;
  } else {
    tbody.innerHTML = pageData.map(f => `
      <tr>
        <td><div class="td-avatar"><img src="${f.img}" alt="${f.name}"/><div class="td-name">${f.name}</div></div></td>
        <td>Class ${f.cls}</td>
        <td>${f.type}</td>
        <td style="font-weight:700">${f.amount}</td>
        <td style="color:var(--gray)">${f.due}</td>
        <td style="color:var(--gray)">${f.paid}</td>
        <td><span class="badge ${feeBadge[f.status]}">${f.status.charAt(0).toUpperCase()+f.status.slice(1)}</span></td>
        <td>
          <div style="display:flex;gap:4px">
            <button class="btn btn-outline btn-sm">Receipt</button>
            ${f.status !== 'paid' ? `<button class="btn btn-primary btn-sm">Remind</button>` : ''}
          </div>
        </td>
      </tr>`).join('');
  }

  updateFeePagination(data.length, page, totalPages);
}

function updateFeePagination(total, page, totalPages) {
  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);
  document.getElementById('feePaginationInfo').textContent =
    total === 0 ? 'No results' : `Showing ${start}–${end} of ${total.toLocaleString()}`;
  document.getElementById('feePrevBtn').disabled = page <= 1;
  document.getElementById('feeNextBtn').disabled = page >= totalPages;
}

document.getElementById('feePrevBtn').addEventListener('click', () => {
  if (currentFeePage > 1) renderFeeTablePage(currentFeePage - 1);
});
document.getElementById('feeNextBtn').addEventListener('click', () => {
  const totalPages = Math.ceil(getFilteredFeeData().length / PAGE_SIZE);
  if (currentFeePage < totalPages) renderFeeTablePage(currentFeePage + 1);
});

document.getElementById('feeFilter').addEventListener('change', function () {
  currentFilter = this.value.toLowerCase();
  renderFeeTablePage(1);
});

document.getElementById('feeSearch').addEventListener('input', function () {
  currentSearch = this.value.toLowerCase();
  renderFeeTablePage(1);
});

renderFeeTablePage(1);
