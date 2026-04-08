// ===== TOPBAR DATE =====
(function () {
  const el = document.getElementById('topbarDate');
  if (!el) return;
  const now = new Date();
  const greetings = ['Good morning', 'Good afternoon', 'Good evening'];
  const greet = greetings[now.getHours() < 12 ? 0 : now.getHours() < 17 ? 1 : 2];
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  el.textContent = `${greet}, Priya 👋 — ${day}, ${date}`;
})();

// ===== SIDEBAR TOGGLE =====
const sidebar    = document.getElementById('sidebar');
const adminMain  = document.getElementById('adminMain');
const toggleBtn  = document.getElementById('sidebarToggle');
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  adminMain.classList.toggle('collapsed');
});

// ===== ALERT CLOSE =====
document.getElementById('alertClose').addEventListener('click', () => {
  document.getElementById('alertBanner').style.display = 'none';
});

// ===== KPI COUNTER ANIMATION =====
function animateKPI(el) {
  const target  = parseFloat(el.dataset.target);
  const suffix  = el.dataset.suffix  || '';
  const prefix  = el.dataset.prefix  || '';
  const dur     = 1800;
  const start   = performance.now();
  const ease    = t => 1 - Math.pow(2, -10 * t);
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const v = ease(p) * target;
    el.textContent = prefix + (Number.isInteger(target) ? Math.round(v).toLocaleString('en-IN') : v.toFixed(1)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const kpiObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.kpi-value[data-target]').forEach(animateKPI);
      kpiObs.disconnect();
    }
  });
}, { threshold: 0.3 });
kpiObs.observe(document.querySelector('.kpi-grid'));

// ===== CHART TABS =====
document.querySelectorAll('.chart-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    tab.closest('.chart-tabs').querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ===== ATTENDANCE CHART =====
const days = ['Mon','Tue','Wed','Thu','Fri','Sat'];
const data = [
  { present: 92, absent: 5, late: 3 },
  { present: 88, absent: 8, late: 4 },
  { present: 95, absent: 3, late: 2 },
  { present: 91, absent: 6, late: 3 },
  { present: 94, absent: 4, late: 2 },
  { present: 78, absent: 14, late: 8 },
];
const barsEl   = document.getElementById('attChartBars');
const labelsEl = document.getElementById('attChartLabels');

days.forEach((day, i) => {
  const d = data[i];
  const group = document.createElement('div');
  group.className = 'att-bar-group';
  group.innerHTML = `
    <div class="att-bar" style="height:${d.present}%;background:#1E40AF" title="Present: ${d.present}%"></div>
    <div class="att-bar" style="height:${d.absent}%;background:#DC2626" title="Absent: ${d.absent}%"></div>
    <div class="att-bar" style="height:${d.late}%;background:#EA580C" title="Late: ${d.late}%"></div>
  `;
  barsEl.appendChild(group);
  const lbl = document.createElement('div');
  lbl.className = 'att-chart-label';
  lbl.textContent = day;
  labelsEl.appendChild(lbl);
});

// ===== ACTIVITY FEED =====
const activities = [
  { color: '#16A34A', text: 'Attendance marked for <strong>Class 10A</strong> — 41/42 present', time: '2 min ago' },
  { color: '#1E40AF', text: 'New student <strong>Arjun Mehta</strong> enrolled in Class 8B', time: '18 min ago' },
  { color: '#D97706', text: 'Fee payment of <strong>₹12,500</strong> received from Raju Sharma', time: '34 min ago' },
  { color: '#DC2626', text: '<strong>Anita Roy</strong> marked absent — parent notified automatically', time: '1 hr ago' },
  { color: '#7C3AED', text: 'Report card generated for <strong>Class 9 — Term 2</strong>', time: '2 hrs ago' },
  { color: '#0EA5E9', text: 'Timetable updated for <strong>Class 11 Science</strong>', time: '3 hrs ago' },
];
const actEl = document.getElementById('activityList');
activities.forEach(a => {
  actEl.innerHTML += `
    <div class="activity-item">
      <div class="activity-dot" style="background:${a.color}"></div>
      <div class="activity-text">${a.text}</div>
      <div class="activity-time">${a.time}</div>
    </div>`;
});

// ===== STUDENTS TABLE =====
const students = [
  { name:'Raju Sharma',   img:'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=40&h=40&fit=crop&crop=face', class:'10A', roll:'001', phone:'+91 98765 43210', fee:'paid',    att:94 },
  { name:'Priya Nair',    img:'https://images.unsplash.com/photo-1545696968-1a31da406a64?w=40&h=40&fit=crop&crop=face', class:'10B', roll:'002', phone:'+91 87654 32109', fee:'paid',    att:88 },
  { name:'Anita Roy',     img:'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=40&h=40&fit=crop&crop=face', class:'9A',  roll:'015', phone:'+91 76543 21098', fee:'pending', att:72 },
  { name:'Karan Mehta',   img:'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=40&h=40&fit=crop&crop=face', class:'9B',  roll:'022', phone:'+91 65432 10987', fee:'overdue', att:65 },
  { name:'Sunita Verma',  img:'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=40&h=40&fit=crop&crop=face', class:'8A',  roll:'031', phone:'+91 54321 09876', fee:'paid',    att:91 },
];

const feeBadge = { paid:'badge-green', pending:'badge-orange', overdue:'badge-red' };
const tbody = document.getElementById('studentsTableBody');
students.forEach(s => {
  const attColor = s.att >= 85 ? '#16A34A' : s.att >= 75 ? '#D97706' : '#DC2626';
  tbody.innerHTML += `
    <tr>
      <td><input type="checkbox" /></td>
      <td><div class="td-avatar"><img src="${s.img}" alt="${s.name}"/><div><div class="td-name">${s.name}</div></div></div></td>
      <td>Class ${s.class}</td>
      <td>${s.roll}</td>
      <td>${s.phone}</td>
      <td><span class="badge ${feeBadge[s.fee]}">${s.fee.charAt(0).toUpperCase()+s.fee.slice(1)}</span></td>
      <td><span style="font-weight:700;color:${attColor}">${s.att}%</span></td>
      <td>
        <div style="display:flex;gap:4px">
          <button class="btn btn-ghost btn-icon btn-sm" title="View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button class="btn btn-ghost btn-icon btn-sm" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
        </div>
      </td>
    </tr>`;
});

// Select all checkbox
document.getElementById('selectAll').addEventListener('change', function () {
  document.querySelectorAll('tbody input[type=checkbox]').forEach(cb => cb.checked = this.checked);
});
