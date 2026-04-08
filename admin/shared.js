document.addEventListener('DOMContentLoaded', function () {

  // Sidebar collapse toggle
  var sidebar   = document.getElementById('sidebar');
  var adminMain = document.getElementById('adminMain');
  var toggleBtn = document.getElementById('sidebarToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
      adminMain.classList.toggle('collapsed');
    });
  }

  // Topbar avatar dropdown toggle
  var avatar   = document.querySelector('.topbar-avatar');
  var dropdown = document.getElementById('adminUserDropdown');
  if (avatar && dropdown) {
    avatar.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    document.addEventListener('click', function () {
      dropdown.classList.remove('open');
    });
    dropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  // Logout — sidebar button
  var sidebarLogout = document.querySelector('.sb-logout-btn');
  if (sidebarLogout) {
    sidebarLogout.addEventListener('click', function () {
      if (confirm('Are you sure you want to log out?')) {
        window.location.href = '../login.html';
      }
    });
  }

  // Logout — dropdown link
  var dropdownLogout = document.querySelector('#adminUserDropdown .logout');
  if (dropdownLogout) {
    dropdownLogout.addEventListener('click', function (e) {
      e.preventDefault();
      if (confirm('Are you sure you want to log out?')) {
        window.location.href = '../login.html';
      }
    });
  }

});
