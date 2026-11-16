// ==========================================================================
// HASAN GÜRSES (hasangurses.com) - İNTERAKTİF ANİMASYON & UYGULAMA MOTORU
// ==========================================================================

let currentLang = localStorage.getItem('hg_lang') || 'tr';
let currentTheme = localStorage.getItem('hg_theme') || 'dark';
let currentFilter = 'all';
let currentTermTab = 'vision';
let typewriterTimeout = null;

// SVG Icons Library
const ICONS = {
  eye: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  brain: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>`,
  cpu: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
  shield: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
  smartphone: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,
  code: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  server: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>`,
  terminal: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
  database: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>`,
  github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  renderAllContent();
  initNeuralCanvas();
  initCursorGlow();
  initScrollEffects();
  initCommandPalette();
  initEvents();
});

// ==========================================================================
// 1. RENDER ALL PAGE SECTIONS FROM SITE_DATA
// ==========================================================================
function renderAllContent() {
  const t = SITE_DATA.ui[currentLang];
  const p = SITE_DATA.profile;

  // Update static i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  // Update placeholders
  const cmdInput = document.getElementById('cmd-input');
  if (cmdInput) cmdInput.placeholder = t.cmdPlaceholder;

  // Language Button label
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.textContent = currentLang.toUpperCase();

  // Hero About
  const heroAbout = document.getElementById('hero-about');
  if (heroAbout) heroAbout.textContent = p.about[currentLang];

  // Hero Stats
  const statsContainer = document.getElementById('hero-stats');
  if (statsContainer) {
    statsContainer.innerHTML = p.stats.map(s => `
      <div class="stat-card">
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label[currentLang]}</div>
      </div>
    `).join('');
  }

  // Hero Terminal
  renderTerminalContent(currentTermTab);

  // Start Typewriter
  startTypewriter(p.roles[currentLang]);

  // Projects
  renderProjects(currentFilter);

  // Experience & Education
  renderExperienceAndEducation();

  // Certificates
  renderCertificates();

  // Skills
  renderSkills();

  // Official CV Paper inside CV Modal
  renderOfficialCvPaper();
}

// ==========================================================================
// 2. HERO INTERACTIVE TERMINAL TABS
// ==========================================================================
function renderTerminalContent(tab) {
  currentTermTab = tab;
  const body = document.getElementById('terminal-body');
  if (!body) return;

  document.querySelectorAll('.term-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  if (tab === 'vision') {
    body.innerHTML = `
      <div><span class="code-comment"># Wellztech (ODTÜ Teknokent) - Milk AI Vision Pipeline</span></div>
      <div><span class="code-kw">import</span> torch</div>
      <div><span class="code-kw">from</span> vision_models <span class="code-kw">import</span> RTDETRDetector, ViTPoseEstimator, ActionGRU</div>
      <br/>
      <div><span class="code-kw">class</span> <span class="code-key">VisionAnalyticsPipeline</span>:</div>
      <div>&nbsp;&nbsp;<span class="code-kw">def</span> <span class="code-key">__init__</span>(self):</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;self.detector = RTDETRDetector(weights=<span class="code-str">"rtdetr_l.pt"</span>)</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;self.pose = ViTPoseEstimator(backbone=<span class="code-str">"vit_base"</span>)</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;self.temporal = ActionGRU(hidden_dim=<span class="code-num">256</span>)</div>
      <br/>
      <div>&nbsp;&nbsp;<span class="code-kw">def</span> <span class="code-key">infer_stream</span>(self, cctv_frame):</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;bboxes = self.detector.detect_humans(cctv_frame)</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;keypoints = self.pose.estimate(cctv_frame, bboxes)</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-kw">return</span> self.temporal.classify_action(keypoints)</div>
      <div class="vision-hud">
        <span>⚡ Pipeline: <strong>RT-DETR → ViTPose → GRU</strong></span>
        <span class="hud-badge">● CCTV READY</span>
      </div>
    `;
  } else if (tab === 'fokus') {
    body.innerHTML = `
      <div><span class="code-comment">// FOKUS - Physical Focus Protection & OS Decision Engine (.NET 9)</span></div>
      <div><span class="code-kw">using</span> System.IO.Pipes;</div>
      <div><span class="code-kw">using</span> Fokus.Core.WinApi;</div>
      <br/>
      <div><span class="code-kw">public async</span> Task <span class="code-key">MonitorFocusStreamAsync</span>(CancellationToken ct) {</div>
      <div>&nbsp;&nbsp;<span class="code-kw">using var</span> pipe = <span class="code-kw">new</span> NamedPipeClientStream(<span class="code-str">"."</span>, <span class="code-str">"FokusVisionPipe"</span>);</div>
      <div>&nbsp;&nbsp;<span class="code-kw">await</span> pipe.ConnectAsync(ct);</div>
      <div>&nbsp;&nbsp;<span class="code-kw">var</span> telemetry = <span class="code-kw">await</span> JsonRuleEngine.ReadScoreAsync(pipe);</div>
      <br/>
      <div>&nbsp;&nbsp;<span class="code-kw">if</span> (telemetry.FocusScore &lt; <span class="code-num">0.45</span>) {</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;ProcessSuspender.SuspendDistractingApps(telemetry.ActiveRules);</div>
      <div>&nbsp;&nbsp;}</div>
      <div>}</div>
      <div class="vision-hud">
        <span>🛡️ IPC: <strong>Named Pipes + Windows API</strong></span>
        <span class="hud-badge">● .NET 9 ACTIVE</span>
      </div>
    `;
  } else {
    body.innerHTML = `
      <div><span class="code-comment">// hasangurses.com — Developer Profile Manifest</span></div>
      <div>{</div>
      <div>&nbsp;&nbsp;<span class="code-key">"developer"</span>: <span class="code-str">"Hasan GÜRSES"</span>,</div>
      <div>&nbsp;&nbsp;<span class="code-key">"university"</span>: <span class="code-str">"Gazi Üniversitesi (Bilgisayar Müh.)"</span>,</div>
      <div>&nbsp;&nbsp;<span class="code-key">"location"</span>: <span class="code-str">"Maltepe, Ankara"</span>,</div>
      <div>&nbsp;&nbsp;<span class="code-key">"languages"</span>: [<span class="code-str">"Python"</span>, <span class="code-str">"Java"</span>, <span class="code-str">"C#"</span>, <span class="code-str">"C"</span>, <span class="code-str">"JavaScript"</span>],</div>
      <div>&nbsp;&nbsp;<span class="code-key">"ai_vision"</span>: [<span class="code-str">"PyTorch"</span>, <span class="code-str">"OpenCV"</span>, <span class="code-str">"RT-DETR"</span>, <span class="code-str">"ViTPose"</span>, <span class="code-str">"SVM/NLP"</span>],</div>
      <div>&nbsp;&nbsp;<span class="code-key">"backend"</span>: [<span class="code-str">"Spring Boot"</span>, <span class="code-str">"Node.js"</span>, <span class="code-str">"Flask"</span>, <span class="code-str">"REST API"</span>],</div>
      <div>&nbsp;&nbsp;<span class="code-key">"github"</span>: <span class="code-str">"github.com/HasanG55"</span></div>
      <div>}</div>
      <div class="vision-hud">
        <span>🚀 Status: <strong>Open to R&D & Software Projects</strong></span>
        <span class="hud-badge">● ONLINE</span>
      </div>
    `;
  }
}

// ==========================================================================
// 3. TYPEWRITER EFFECT
// ==========================================================================
function startTypewriter(roles) {
  const el = document.getElementById('typewriter-text');
  if (!el) return;
  if (typewriterTimeout) clearTimeout(typewriterTimeout);

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentWord = roles[roleIndex];
    if (isDeleting) {
      charIndex--;
      el.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      el.textContent = currentWord.substring(0, charIndex);
    }

    let delay = isDeleting ? 38 : 75;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    typewriterTimeout = setTimeout(tick, delay);
  }

  tick();
}

// ==========================================================================
// 4. PROJECTS GRID & 3D TILT + MODAL
// ==========================================================================
function renderProjects(filter = 'all') {
  currentFilter = filter;
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const t = SITE_DATA.ui[currentLang];
  const filtered = SITE_DATA.projects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'ai') return p.category === 'ai' || p.category === 'ai-system';
    if (filter === 'backend') return p.category === 'backend';
    if (filter === 'mobile') return p.category === 'mobile';
    return true;
  });

  grid.innerHTML = filtered.map(proj => `
    <article class="project-card" data-project-id="${proj.id}">
      <div>
        <div class="project-top">
          <div class="project-icon-box" style="color:${proj.accent}; border-color:${proj.accent}44; background:${proj.accent}18;">
            ${ICONS[proj.icon] || ICONS.code}
          </div>
          <span class="project-category-tag">${proj.categoryLabel[currentLang]}</span>
        </div>
        <h3 class="project-title">${proj.title[currentLang]}</h3>
        <p class="project-summary">${proj.summary[currentLang]}</p>
      </div>
      <div>
        <div class="tech-tags">
          ${proj.tech.map(item => `<span class="tech-tag">${item}</span>`).join('')}
        </div>
        <div class="project-actions">
          <button class="btn-text" onclick="openProjectModal('${proj.id}')">
            <span>${t.cardDetailsBtn}</span>
            ${ICONS.arrowRight}
          </button>
          <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn-github-link">
            ${ICONS.github}
            <span>${t.cardGithubBtn}</span>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  init3DTiltCards();
}

function init3DTiltCards() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

window.openProjectModal = function(projectId) {
  const proj = SITE_DATA.projects.find(p => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="project-category-tag">${proj.categoryLabel[currentLang]}</span>
        <h2 style="margin-top:10px; font-size:1.5rem;">${proj.title[currentLang]}</h2>
      </div>
      <button class="icon-btn" onclick="closeModal('project-modal')">✕</button>
    </div>
    <p style="color:var(--text-secondary); margin-bottom:20px;">${proj.summary[currentLang]}</p>
    <h4 style="margin-bottom:12px; color:var(--accent-cyan); font-family:var(--font-mono); font-size:0.88rem; text-transform:uppercase;">
      ${currentLang === 'tr' ? 'Teknik Mimari & Geliştirme Süreci' : 'Technical Architecture & Implementation'}
    </h4>
    <ul style="padding-left:20px; color:var(--text-primary); margin-bottom:24px; line-height:1.75;">
      ${proj.details[currentLang].map(d => `<li style="margin-bottom:8px;">${d}</li>`).join('')}
    </ul>
    <div class="tech-tags" style="margin-bottom:26px;">
      ${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
    </div>
    <div style="display:flex; justify-content:flex-end; gap:12px;">
      <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        ${ICONS.github}
        <span>GitHub (@HasanG55)</span>
      </a>
    </div>
  `;

  modal.classList.add('open');
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
};

// ==========================================================================
// 5. EXPERIENCE, EDUCATION & CERTIFICATES
// ==========================================================================
function renderExperienceAndEducation() {
  const expContainer = document.getElementById('experience-timeline');
  const eduContainer = document.getElementById('education-timeline');

  if (expContainer) {
    expContainer.innerHTML = SITE_DATA.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <span class="timeline-period">${exp.period[currentLang]}</span>
        <h4 class="timeline-role">${exp.role[currentLang]}</h4>
        <div class="timeline-org">${exp.company[currentLang]}</div>
        <ul class="timeline-list">
          ${exp.highlights[currentLang].map(h => `<li>${h}</li>`).join('')}
        </ul>
        <div class="tech-tags" style="margin-bottom:0;">
          ${exp.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  if (eduContainer) {
    eduContainer.innerHTML = SITE_DATA.education.map(edu => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <span class="timeline-period">${edu.period[currentLang]}</span>
        <h4 class="timeline-role">${edu.institution[currentLang]}</h4>
        <div class="timeline-org">${edu.department[currentLang]} • ${edu.degree[currentLang]}</div>
        <ul class="timeline-list">
          ${edu.highlights[currentLang].map(h => `<li>${h}</li>`).join('')}
        </ul>
        <div class="tech-tags" style="margin-bottom:0;">
          <span class="tech-tag">📍 ${edu.location[currentLang]}</span>
          <span class="tech-tag">B.Sc. Computer Engineering</span>
        </div>
      </div>
    `).join('');
  }
}

function renderCertificates() {
  const certGrid = document.getElementById('cert-grid');
  if (!certGrid) return;

  certGrid.innerHTML = SITE_DATA.certificates.map(c => `
    <div class="cert-card">
      <div class="cert-icon">${ICONS[c.icon] || ICONS.shield}</div>
      <div class="cert-info">
        <h4>${c.title}</h4>
        <p>${c.issuer}</p>
        <span class="cert-tag"># ${c.tag[currentLang]}</span>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// 6. SKILLS & TECH STACK
// ==========================================================================
function renderSkills() {
  const skillsGrid = document.getElementById('skills-grid');
  if (!skillsGrid) return;

  skillsGrid.innerHTML = SITE_DATA.skills.map(group => `
    <div class="skill-group-card">
      <div class="skill-group-header">
        <span style="color:var(--accent-cyan); display:flex;">${ICONS[group.icon] || ICONS.code}</span>
        <h3>${group.category[currentLang]}</h3>
      </div>
      <p class="skill-group-desc">${group.description[currentLang]}</p>
      <div>
        ${group.items.map(item => `
          <div class="skill-item">
            <div class="skill-meta">
              <span>${item.name}</span>
              <span class="skill-tag-pill">${item.tag}</span>
            </div>
            <div class="skill-bar-bg">
              <div class="skill-bar-fill" data-level="${item.level}" style="width: ${item.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// 7. OFFICIAL PRINT-READY CV SHEET
// ==========================================================================
function renderOfficialCvPaper() {
  const container = document.getElementById('cv-paper-container');
  if (!container) return;

  const p = SITE_DATA.profile;
  const isTr = currentLang === 'tr';

  container.innerHTML = `
    <div class="cv-paper">
      <div class="cv-paper-header">
        <div>
          <div class="cv-paper-name">${p.lastName}, ${p.firstName}</div>
          <div class="cv-paper-role">${p.title[currentLang]} — Gazi Üniversitesi</div>
          <div style="font-size:0.8rem; color:#475569; margin-top:4px;">
            ${isTr ? 'Doğum Tarihi ve Yeri: 2003, Samsun | Uyruğu: T.C. | Medeni Durumu: Bekar' : 'Born: 2003, Samsun | Nationality: Turkish | Marital Status: Single'}
          </div>
        </div>
        <div class="cv-paper-contact">
          <div><strong>Tel:</strong> ${p.phoneDisplay}</div>
          <div><strong>E-posta:</strong> ${p.emailPrimary}</div>
          <div><strong>Akademik:</strong> ${p.emailAcademic}</div>
          <div><strong>LinkedIn:</strong> linkedin.com/in/hasan-gurses</div>
          <div><strong>GitHub:</strong> github.com/HasanG55 | <strong>Web:</strong> hasangurses.com</div>
        </div>
      </div>

      <div class="cv-paper-section">
        <div class="cv-paper-section-title">${isTr ? 'HAKKIMDA' : 'SUMMARY'}</div>
        <div class="cv-paper-text">${p.about[currentLang]}</div>
      </div>

      <div class="cv-paper-section">
        <div class="cv-paper-section-title">${isTr ? 'EĞİTİM' : 'EDUCATION'}</div>
        ${SITE_DATA.education.map(edu => `
          <div class="cv-paper-item">
            <div class="cv-paper-row">
              <span>${edu.institution[currentLang]} — ${edu.department[currentLang]} (${edu.degree[currentLang]})</span>
              <span>${edu.period[currentLang]}</span>
            </div>
            <div class="cv-paper-sub">${p.location[currentLang]}</div>
          </div>
        `).join('')}
      </div>

      <div class="cv-paper-section">
        <div class="cv-paper-section-title">${isTr ? 'İŞ VE STAJ DENEYİMLERİ' : 'WORK & INTERNSHIP EXPERIENCE'}</div>
        ${SITE_DATA.experience.map(exp => `
          <div class="cv-paper-item">
            <div class="cv-paper-row">
              <span>${exp.company[currentLang]} – ${exp.role[currentLang]}</span>
              <span>${exp.period[currentLang]}</span>
            </div>
            <ul class="cv-paper-list">
              ${exp.highlights[currentLang].map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <div class="cv-paper-section">
        <div class="cv-paper-section-title">${isTr ? 'AKADEMİK VE BİREYSEL PROJELER' : 'ACADEMIC & PERSONAL PROJECTS'}</div>
        <ul class="cv-paper-list">
          ${SITE_DATA.projects.map(proj => `
            <li style="margin-bottom:6px;">
              <strong>${proj.title[currentLang]}:</strong> ${proj.summary[currentLang]}
              <em>(${proj.tech.join(', ')})</em>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="cv-paper-section">
        <div class="cv-paper-section-title">${isTr ? 'TEKNİK YETKİNLİKLER & SERTİFİKALAR' : 'TECHNICAL SKILLS & CERTIFICATES'}</div>
        <div class="cv-paper-grid-2">
          <div>
            <div><strong>${isTr ? 'Programlama Dilleri:' : 'Languages:'}</strong> Python, Java, C, C#, JavaScript</div>
            <div><strong>${isTr ? 'Yapay Zeka & Görü:' : 'AI & Vision:'}</strong> PyTorch, OpenCV, RT-DETR, ViTPose, Scikit-Learn</div>
            <div><strong>Web & Backend:</strong> Node.js, Express.js, Spring Boot, Flask, HTML, CSS, REST API</div>
            <div><strong>${isTr ? 'Araçlar & Dil:' : 'Tools & Language:'}</strong> Git/GitHub, Android Studio, VS Code, Linux/Ubuntu | ${isTr ? 'İngilizce (B1 Düzeyi)' : 'English (B1)'}</div>
          </div>
          <div>
            <div><strong>${isTr ? 'Sertifikalar:' : 'Certificates:'}</strong></div>
            <ul class="cv-paper-list" style="margin-top:2px;">
              <li>Introduction to Cybersecurity – CISCO</li>
              <li>Linux Unhatched – CISCO</li>
              <li>Veri Bilimine Giriş – BTK Akademi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 8. INTERACTIVE NEURAL NETWORK / COMPUTER VISION BACKGROUND CANVAS
// ==========================================================================
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let nodes = [];
  const nodeCount = Math.min(55, Math.floor((width * height) / 26000));
  const mouse = { x: -1000, y: -1000 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      radius: Math.random() * 1.8 + 1.1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.55)';
      ctx.fill();

      // Connect nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 145) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 145) * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connect to mouse cursor (Computer Vision keypoint effect)
      const mdx = n.x - mouse.x;
      const mdy = n.y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 180) {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - mdist / 180) * 0.45})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================================================
// 9. CURSOR SPOTLIGHT, SCROLL PROGRESS & COMMAND PALETTE
// ==========================================================================
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  window.addEventListener('mousemove', e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && docHeight > 0) {
      progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
    }

    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (scrollTop >= top) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
  });
}

function initCommandPalette() {
  const modal = document.getElementById('cmd-modal');
  const input = document.getElementById('cmd-input');
  const list = document.getElementById('cmd-list');

  const commands = [
    { label: '📄 CV Önizle & PDF İndir (Resume)', action: () => openCvModal() },
    { label: '🚀 Projelere Git (Projects)', action: () => location.hash = '#projects' },
    { label: '💼 Deneyim & Eğitime Git (Experience)', action: () => location.hash = '#experience' },
    { label: '⚡ Yeteneklere Git (Skills)', action: () => location.hash = '#skills' },
    { label: '✉️ Kişisel E-postayı Kopyala (hasangurses55@hotmail.com)', action: () => copyToClipboard('hasangurses55@hotmail.com') },
    { label: '🎓 Akademik E-postayı Kopyala (hasan.gurses@gazi.edu.tr)', action: () => copyToClipboard('hasan.gurses@gazi.edu.tr') },
    { label: '🐙 GitHub Profilini Aç (github.com/HasanG55)', action: () => window.open('https://github.com/HasanG55', '_blank') },
    { label: '🔗 LinkedIn Profilini Aç (linkedin.com/in/hasan-gurses)', action: () => window.open('https://linkedin.com/in/hasan-gurses', '_blank') },
    { label: '🌗 Tema Değiştir (Dark / Light Mode)', action: () => toggleTheme() },
    { label: '🌐 Dil Değiştir (TR / EN)', action: () => toggleLanguage() }
  ];

  function renderCmdList(query = '') {
    const q = query.toLowerCase();
    const matches = commands.filter(c => c.label.toLowerCase().includes(q));
    list.innerHTML = matches.map((c, idx) => `
      <li class="cmd-item" data-idx="${idx}">
        <span>${c.label}</span>
        <span class="kbd-hint">↵</span>
      </li>
    `).join('');

    list.querySelectorAll('.cmd-item').forEach((item, i) => {
      item.addEventListener('click', () => {
        closeModal('cmd-modal');
        matches[i].action();
      });
    });
  }

  window.openCmdPalette = function() {
    renderCmdList('');
    modal.classList.add('open');
    setTimeout(() => input.focus(), 50);
  };

  if (input) {
    input.addEventListener('input', e => renderCmdList(e.target.value));
  }

  window.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCmdPalette();
    } else if (e.key === 'Escape') {
      closeModal('project-modal');
      closeModal('cv-modal');
      closeModal('cmd-modal');
    }
  });
}

// ==========================================================================
// 10. UI EVENTS, COPY TO CLIPBOARD, THEME & LANGUAGE TOGGLES
// ==========================================================================
function initEvents() {
  // Terminal tabs
  document.querySelectorAll('.term-tab').forEach(btn => {
    btn.addEventListener('click', () => renderTerminalContent(btn.dataset.tab));
  });

  // Project filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });

  // Backdrop click to close modals
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  });

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Contact Form Submission -> Opens pre-filled Email client + shows toast
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const subject = document.getElementById('sender-subject').value.trim() || 'hasangurses.com İletişim Formu';
      const msg = document.getElementById('sender-message').value.trim();

      const body = encodeURIComponent(`Gönderen: ${name} (${email})\n\nMesaj:\n${msg}`);
      window.location.href = `mailto:${SITE_DATA.profile.emailPrimary}?subject=${encodeURIComponent(subject)}&body=${body}`;
      showToast(currentLang === 'tr' ? 'E-posta istemciniz açılıyor...' : 'Opening your email client...');
      contactForm.reset();
    });
  }
}

window.openCvModal = function() {
  renderOfficialCvPaper();
  const modal = document.getElementById('cv-modal');
  if (modal) modal.classList.add('open');
};

window.printOfficialCv = function() {
  window.print();
};

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    const t = SITE_DATA.ui[currentLang];
    showToast(`${t.copiedText} (${text})`);
  });
};

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

window.toggleLanguage = function() {
  currentLang = currentLang === 'tr' ? 'en' : 'tr';
  localStorage.setItem('hg_lang', currentLang);
  renderAllContent();
};

window.toggleTheme = function() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('hg_theme', currentTheme);
  applyTheme(currentTheme);
};

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// ==========================================================================
// 11. BM301 STAJ I SINAVI ÇALIŞMA MODÜLÜ & SİMÜLATÖR MOTORU
// ==========================================================================
const stajScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

const STAJ_RUBRICS = {
  1: [
    { name: 'Kurum ve Konum (WellztechAI / ODTÜ Teknokent)', weight: 5, keywords: ['wellztech', 'teknokent', 'odtü'] },
    { name: 'Faaliyet Alanı (Yapay Zeka / Görüntü İşleme / Hayvancılık-Tarım)', weight: 4, keywords: ['yapay zeka', 'görüntü', 'tarım', 'hayvancılık', 'süt', 'sağım', 'denetim', 'kamera'] },
    { name: 'Departman & Ekip Yapısı (12 kişilik Ar-Ge / Yusuf Onat Yılmaz)', weight: 5, keywords: ['ar-ge', 'arge', 'departman', 'yusuf', 'onat', 'mentör', '12', 'ekip'] },
    { name: 'Senin Görevin ve Proje (Milk AI / Model eğitimi / Veri ön işleme)', weight: 6, keywords: ['milk', 'model', 'eğitim', 'ön işleme', 'iskelet', 'normalizasyon', 'sorumlu', 'görev'] }
  ],
  2: [
    { name: 'Yazılım Dili ve Kütüphaneler (Python, PyTorch, OpenCV, NumPy)', weight: 4, keywords: ['python', 'pytorch', 'opencv', 'numpy'] },
    { name: 'Bulut ve Donanım Altyapısı (Lightning AI / NVIDIA L4 24GB GPU)', weight: 3, keywords: ['lightning', 'bulut', 'gpu', 'l4', 'nvidia', '24'] },
    { name: '1. Aşama: RT-DETR ile İnsan Tespiti (Bounding Box)', weight: 5, keywords: ['rt-detr', 'rtdetr', 'insan tespiti', 'nesne', 'kutu', 'bounding'] },
    { name: '2. Aşama: ViTPose ile 17 Eklem Noktası (İskelet Çıkarımı)', weight: 4, keywords: ['vitpose', '17', 'iskelet', 'eklem', 'anahtar nokta', 'keypoint'] },
    { name: '3. Aşama: 60 Kare (2.4 sn) Kayar Pencere & Çift Yönlü GRU (Bi-GRU)', weight: 4, keywords: ['gru', 'bi-gru', '60 kare', '2.4', 'kayar pencere', 'sliding', 'sınıflandırma'] }
  ],
  3: [
    { name: 'Problem Tanımı (Farklı kamerada düşüş / Overfitting / %71 F1)', weight: 4, keywords: ['overfitting', 'aşırı uyum', '71', 'farklı kamera', 'test', 'düş'] },
    { name: 'Kök Neden 1: Etiket Sızıntısı (Label Leakage) / Ham Piksel / Konum Ezberi', weight: 5, keywords: ['etiket sızıntısı', 'label leakage', 'ham', 'piksel', 'ezber', 'konum', 'mesafe', 'uzaklık'] },
    { name: 'Kök Neden 2 & Çözümü: Kapanma (Occlusion) / v<0.3 Enterpolasyon', weight: 4, keywords: ['kapanma', 'occlusion', 'arkasında', '0,0', 'enterpolasyon', 'önceki kare', '0.3', 'doldur'] },
    { name: 'Ana Çözüm: Gövde Referanslı Normalizasyon (Kalça merkezi + Omuz-kalça boyu)', weight: 4, keywords: ['gövde', 'normalizasyon', 'kalça', 'pelvis', 'omuz', 'merkez', '0,1', 'oran', 'böl'] },
    { name: 'Ölçülen Sonuç (F1 Skorunun %89.2 seviyesine yükselişi)', weight: 3, keywords: ['89', 'f1', 'yüksel', 'art'] }
  ],
  4: [
    { name: 'Yazılım Metodolojisi (Agile / Scrum / Çevik yaklaşım)', weight: 6, keywords: ['agile', 'scrum', 'çevik'] },
    { name: 'Planlama ve İletişim (1 Haftalık Sprint / Daily Stand-up toplantısı)', weight: 6, keywords: ['sprint', 'haftalık', 'stand-up', 'standup', 'günlük', 'toplantı'] },
    { name: 'Sürüm Kontrolü ve Git Akışı (Git / GitHub / Feature Branch / PR / Code Review)', weight: 8, keywords: ['git', 'github', 'branch', 'dal', 'pull request', 'pr', 'review', 'inceleme', 'main'] }
  ],
  5: [
    { name: 'İSG Önlemleri (Ofis ergonomisi/mola + Sahada çizme/tulum/ıslak zemin)', weight: 6, keywords: ['isg', 'ergonomi', 'mola', 'çizme', 'tulum', 'ıslak', 'saha', 'güvenlik'] },
    { name: 'KVKK ve Veri Gizliliği (Çalışan yüzlerinin bulanıklaştırılması / Anonimleştirme)', weight: 5, keywords: ['kvkk', 'bulanık', 'anonim', 'yüz', 'kişisel veri'] },
    { name: 'Ticari Gizlilik ve Lisanslar (NDA Sözleşmesi / MIT-Apache açık kaynak)', weight: 4, keywords: ['nda', 'gizlilik', 'ticari', 'lisans', 'açık kaynak', 'mit', 'apache'] },
    { name: 'Mesleki Kazanımlar (Gerçek saha verisi, ön işleme önemi, ekip çalışması)', weight: 5, keywords: ['kazanım', 'gerçek', 'teori', 'pratik', 'takım', 'ekip', 'ön işleme', 'öğren'] }
  ]
};

window.switchStajTab = function(tabName) {
  ['tuyolar', 'teknolojiler', 'simulator'].forEach(name => {
    const panel = document.getElementById('stajPanel-' + name);
    const btn = document.getElementById('stajBtn-' + name);
    if (panel) panel.classList.toggle('hidden', name !== tabName);
    if (btn) btn.classList.toggle('active', name === tabName);
  });
};

window.setStajFontSize = function(size, btn) {
  const area = document.getElementById('staj-readable-area');
  if (area) area.style.fontSize = size;
  document.querySelectorAll('.staj-size-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
};

window.toggleStajHint = function(qNum) {
  const box = document.getElementById('stajHint-' + qNum);
  if (box) box.classList.toggle('hidden');
};

window.gradeStajQuestion = function(qNum) {
  const input = document.getElementById('stajAns-' + qNum);
  const evalBox = document.getElementById('stajEval-' + qNum);
  const pill = document.getElementById('stajPill-' + qNum);
  if (!input || !evalBox || !pill) return;

  const raw = input.value.trim();
  const text = raw.toLocaleLowerCase('tr-TR');
  const words = raw.split(/\s+/).filter(Boolean).length;

  if (words < 5) {
    evalBox.classList.remove('hidden');
    evalBox.innerHTML = `<div style="color:#f59e0b; font-weight:700;">⚠️ Henüz çok kısa yazdın. Lütfen birkaç doğal cümleyle cevabını yazıp tekrar puanla.</div>`;
    stajScores[qNum] = 0;
    pill.textContent = '0 / 20 Puan';
    updateStajTotal();
    return;
  }

  let pts = 0;
  const hits = [];
  const misses = [];

  STAJ_RUBRICS[qNum].forEach(r => {
    const matched = r.keywords.some(k => text.includes(k));
    if (matched) {
      pts += r.weight;
      hits.push(r.name);
    } else {
      misses.push(r.name);
    }
  });

  let note = '';
  if (words < 16 && pts > 12) {
    pts = 12;
    note = `<div style="color:#f59e0b; font-weight:700; margin-bottom:10px;">⚠️ Anahtar kelimeleri yazmışsın ama cümlelerin biraz kısa. Sınavda tam puan için 3-4 tam cümle kurmalısın.</div>`;
  } else if (words >= 24 && pts >= 14 && pts < 20) {
    pts = Math.min(20, pts + 2);
  }

  stajScores[qNum] = pts;
  pill.textContent = pts + ' / 20 Puan';

  let status = '';
  if (pts >= 17) status = '🌟 Harika! Çok tutarlı, doğal ve tam puanlık bir cevap.';
  else if (pts >= 12) status = '👍 Güzel gidiyorsun! Ana mantık doğru, aşağıdaki 1-2 detayı da eklersen 20/20 olur.';
  else status = '🔧 Geliştirilmeli: Cevabın genel kalmış, aşağıdaki teknik detayları cümlene ekle.';

  let html = `
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:12px;">
      <strong>${status}</strong>
      <strong style="color:var(--accent-cyan); font-size:1.15em;">${pts} / 20 Puan</strong>
    </div>
    ${note}
  `;

  if (hits.length > 0) {
    html += `<div style="margin-bottom:10px;"><strong style="color:var(--accent-emerald);">✅ Yakaladığın Güçlü Noktalar:</strong><ul style="padding-left:22px; margin-top:6px;">${hits.map(h => `<li>${h}</li>`).join('')}</ul></div>`;
  }
  if (misses.length > 0) {
    html += `<div><strong style="color:#f59e0b;">💡 Tam Puan İçin Ekleyebileceğin Tüyolar:</strong><ul style="padding-left:22px; margin-top:6px;">${misses.map(m => `<li>${m}</li>`).join('')}</ul></div>`;
  }

  evalBox.innerHTML = html;
  evalBox.classList.remove('hidden');
  updateStajTotal();
};

window.gradeAllStajQuestions = function() {
  for (let i = 1; i <= 5; i++) {
    window.gradeStajQuestion(i);
  }
};

function updateStajTotal() {
  const total = stajScores[1] + stajScores[2] + stajScores[3] + stajScores[4] + stajScores[5];
  const txt = document.getElementById('stajTotalScoreText');
  const bar = document.getElementById('stajTotalScoreBar');
  if (txt) txt.textContent = total + ' / 100 Puan';
  if (bar) bar.style.width = total + '%';
}

window.copyStajAnswersForAI = function() {
  let out = "Kral kişisel sitemdeki 5 açık uçlu staj sorusuna şu cevapları yazdım, tutarlılığını inceler misin:\n\n";
  for (let i = 1; i <= 5; i++) {
    const val = (document.getElementById('stajAns-' + i)?.value || '').trim() || '(Boş bırakıldı)';
    out += `--- SORU ${i} CEVABIM ---\n${val}\n\n`;
  }
  navigator.clipboard.writeText(out).then(() => {
    const alertBox = document.getElementById('stajCopyAlert');
    if (alertBox) {
      alertBox.classList.remove('hidden');
      setTimeout(() => alertBox.classList.add('hidden'), 6000);
    }
    showToast('5 cevabın panoya kopyalandı!');
  });
};
