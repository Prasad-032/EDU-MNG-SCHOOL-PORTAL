# EduManage School Portal

A fully responsive, frontend-only School Management System built with pure HTML, CSS, and JavaScript. Designed as part of an internship evaluation task to demonstrate UI/UX design skills, frontend development practices, and complete website structure.

---

## Live Preview

> Run locally using the included `start.bat` (Windows) or any static file server.
> Open `http://localhost:5500` in your browser.

---

## Project Structure

```
EDU-MNG-SCHOOL-PORTAL/
│
├── index.html                  # Landing page
├── login.html                  # Role-based login (Admin/Teacher/Student/Parent)
├── register.html               # Multi-step admission registration
├── forgot-password.html        # Password recovery page
├── portals.html                # Developer hub — all pages in one place
├── contact.html                # Contact & support page
├── 404.html                    # Custom 404 error page
│
├── admin/                      # Admin Portal (13 pages)
│   ├── dashboard.html          # KPIs, charts, activity feed
│   ├── students.html           # Student management table
│   ├── teachers.html           # Teacher profiles & management
│   ├── classes.html            # Class overview
│   ├── attendance.html         # School-wide attendance heatmap
│   ├── timetable.html          # Schedule builder
│   ├── exams.html              # Exam scheduling & results
│   ├── fees.html               # Fee collection dashboard
│   ├── invoices.html           # Invoice management
│   ├── communication.html      # SMS/email/push notifications
│   ├── reports.html            # Analytics & custom reports
│   ├── settings.html           # School config, roles, permissions
│   └── profile.html            # Admin profile page
│
├── teacher/                    # Teacher Portal (8 pages)
│   ├── dashboard.html          # Today's classes, tasks, quick attendance
│   ├── classes.html            # All assigned classes with stats
│   ├── attendance.html         # Mark attendance per class
│   ├── gradebook.html          # Enter & view student marks
│   ├── assignments.html        # Create & track assignments
│   ├── messages.html           # Chat with parents & students
│   ├── leave.html              # Apply for leave & track approval
│   └── profile.html            # Teacher profile page
│
├── student/                    # Student Portal (8 pages)
│   ├── dashboard.html          # Schedule, grades, attendance overview
│   ├── timetable.html          # Weekly class timetable (day + week view)
│   ├── grades.html             # Report card & performance charts
│   ├── assignments.html        # View, filter & submit assignments
│   ├── attendance.html         # Monthly attendance calendar & log
│   ├── fees.html               # Fee status, breakdown & payment modal
│   ├── library.html            # Search, borrow & reserve books
│   └── profile.html            # Student profile page
│
├── parent/                     # Parent Portal (8 pages)
│   ├── dashboard.html          # Child overview, quick actions
│   ├── attendance.html         # Day-wise attendance calendar
│   ├── academics.html          # Grades & report cards
│   ├── fees.html               # Pay fees & download receipts
│   ├── bus.html                # Live bus tracking & ETA
│   ├── messages.html           # Chat with teachers
│   ├── announcements.html      # School circulars & events
│   └── profile.html            # Parent profile page
│
├── styles.css                  # Landing page styles
├── main.js                     # Landing page scripts
├── login.css / login.js        # Login page
├── register.css / register.js  # Registration page
├── contact.css / contact.js    # Contact page
├── forgot-password.css/.js     # Forgot password page
│
├── admin/admin.css             # Admin portal design system
├── admin/dashboard.css/.js     # Dashboard charts & widgets
├── admin/students.css/.js      # Students table & modals
├── admin/fees.css/.js          # Fee management UI
├── admin/shared.js             # Sidebar toggle, logout, dropdown
│
├── student/portal.css          # Student portal design system
├── teacher/portal.css          # Teacher portal design system
└── parent/portal.css           # Parent portal design system
```

---

## Pages at a Glance

### Landing Page (`index.html`)
- Animated page intro loader
- Sticky navbar with announcement ticker
- Full-screen hero with photo grid and floating stat cards
- Stats strip with animated counters
- About section, facilities grid, teacher profiles
- Campus gallery, admissions form, testimonials carousel
- Location map, CTA banner, footer

### Login (`login.html`)
- Role selector — Admin, Teacher, Student, Parent
- Left panel changes photo, quote and stats per role
- Form validation, password toggle, SSO buttons (Google/Microsoft)
- Redirects to correct portal on submit
- Demo credentials hint

### Registration (`register.html`)
- 3-step form: Student details → Parent details → Documents
- Password strength meter, file upload feedback
- Auto-redirects to login on success

### Admin Portal
- Collapsible sidebar with tooltips
- Dashboard with live KPI counters, attendance bar chart, fee donut chart
- Students table with search, filters, add/edit modal
- Settings with 7 panels: School Profile, Academic Year, Grading, Notifications, Roles & Permissions, Integrations, Security

### Teacher Portal
- Mobile-first layout with bottom navigation (6 tabs)
- Quick attendance widget with P/A/L buttons
- Gradebook with live grade chip updates
- Assignment creation modal with submission tracking
- Real-time chat UI for parent messages
- Leave application with balance tracker

### Student Portal
- Dashboard with today's schedule, grade bars, attendance ring
- Day view + week grid timetable
- Assignment filter tabs (Pending / Submitted / Graded)
- Fee payment modal with UPI/Card/Net Banking options
- Library with borrow/reserve functionality

### Parent Portal
- Child selector (multiple children support)
- Real-time attendance status hero card
- Bus tracking with live ETA and stop progress
- Fee payment bottom sheet modal
- Announcement feed with color-coded categories

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Custom design system with CSS variables |
| Vanilla JavaScript | Interactivity, DOM manipulation, animations |
| Google Fonts (Inter) | Typography |
| Unsplash | Placeholder images |

No frameworks, no build tools, no dependencies — opens directly in any browser.

---

## Design System

All portals share a consistent set of CSS custom properties:

```css
--blue: #1E40AF       /* Admin accent */
--green: #16A34A      /* Teacher accent */
--orange: #D97706     /* Parent accent */
--dark: #1E293B       /* Primary text */
--gray: #64748B       /* Secondary text */
--border: #E2E8F0     /* Borders */
--surface: #F1F5F9    /* Background */
```

Components used across all pages: cards, badges, buttons, modals, tables, bottom nav, avatar dropdowns, toggle switches, form inputs.

---

## How to Run

**Option 1 — Double-click `start.bat`** (Windows)
Automatically detects Python or Node.js and starts a local server at `http://localhost:5500`.

**Option 2 — Python**
```bash
python -m http.server 5500
```

**Option 3 — Node.js**
```bash
npx serve . -p 5500
```

**Option 4 — VS Code**
Install the Live Server extension and click "Go Live".

---

## Key Features

- 44 HTML pages across 5 portals
- Zero broken internal links
- Fully responsive — mobile bottom nav, collapsible admin sidebar
- Role-based login with portal redirect
- Page intro animation (plays once per session)
- Logout with confirmation on all pages
- Profile pages for all 4 user roles
- Working modals, carousels, charts, and form validation
- All data is static/dummy — no backend required

---

## Screenshots

| Page | Description |
|---|---|
| `index.html` | Landing page with hero, stats, facilities |
| `login.html` | Role-switching login with animated panel |
| `admin/dashboard.html` | Admin KPI dashboard |
| `teacher/dashboard.html` | Teacher daily view |
| `student/dashboard.html` | Student portal home |
| `parent/dashboard.html` | Parent overview with bus tracking |

---

## Author

Developed as part of an internship evaluation task.  
**Intern:** Prasad  
**Repository:** [github.com/Prasad-032/EDU-MNG-SCHOOL-PORTAL](https://github.com/Prasad-032/EDU-MNG-SCHOOL-PORTAL)

---

## License

This project is for educational and evaluation purposes only.
