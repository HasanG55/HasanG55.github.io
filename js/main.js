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
// 11. BM301 STAJ I SINAVI 15 SORULUK TAM HAVUZ & SİMÜLATÖR MOTORU
// ==========================================================================
const stajScores = {};

const STAJ_15_QUESTIONS = [
  {
    num: 1,
    cat: 'kurum',
    isBanko: true,
    badge: 'SORU 1 (ANA BANKO) • KURUM YAPISI VE MÜHENDİSİN ROLÜ',
    title: 'Staj yaptığınız kurumun faaliyet alanını, departman/organizasyon yapısını ve bir bilgisayar mühendisi olarak bu kurumdaki görev ve sorumluluklarınızı açıklayınız.',
    tips: [
      'Sadece "Yazılım şirketinde staj yaptım" deme; <strong>ODTÜ Teknokent</strong>\'te bir <strong>Ar-Ge şirketi</strong> olduğunu mutlaka vurgula.',
      'Şirketteki departmanları say (Ar-Ge, Yazılım, Saha Operasyonları) ve kendi bulunduğun <strong>12 kişilik Ar-Ge ekibini</strong> ve mentörün <strong>Yusuf Onat Yılmaz</strong>\'ı yaz.',
      'Senin görevinin <strong>Milk AI</strong> projesinde veri ön işleme, iskelet normalizasyonu ve derin öğrenme model eğitimi olduğunu net söyle.'
    ],
    keywords: ['WellztechAI (ODTÜ Teknokent)', '12 Kişilik Ar-Ge Departmanı', 'Yusuf Onat Yılmaz', 'Milk AI Projesi', 'Veri Ön İşleme & Model Eğitimi'],
    answer: '"Stajımı ODTÜ Teknokent\'te bulunan <strong>WellztechAI Teknoloji ve Yazılım A.Ş.</strong>\'de tamamladım. Şirket; tarım, hayvancılık ve endüstriyel tesisler için görüntü işleme ve yapay zeka tabanlı denetim sistemleri geliştiriyor. Kurumda Genel Müdürlük altında Ar-Ge, Yazılım Geliştirme, Saha Operasyonları ve İdari birimler yer alıyor. Ben 12 kişilik teknik <strong>Ar-Ge departmanında</strong>, Genel Müdür ve Kıdemli Mühendis <strong>Yusuf Onat Yılmaz</strong> mentörlüğünde çalıştım. Bir bilgisayar mühendisi olarak görevim; <strong>Milk AI</strong> projesinde sağımhane kameralarından sağım kurallarına uyulup uyulmadığını tespit eden derin öğrenme modellerini geliştirmek, veri ön işleme hattını kurmak ve model başarısını artırmaktı."',
    rubrics: [
      { name: 'Kurum ve Konum (WellztechAI / ODTÜ Teknokent)', weight: 5, kw: ['wellztech', 'teknokent', 'odtü'] },
      { name: 'Faaliyet Alanı (Yapay Zeka / Görüntü İşleme / Hayvancılık-Tarım)', weight: 4, kw: ['yapay zeka', 'görüntü', 'tarım', 'hayvancılık', 'süt', 'sağım', 'denetim'] },
      { name: 'Departman & Ekip Yapısı (12 kişilik Ar-Ge / Yusuf Onat Yılmaz)', weight: 5, kw: ['ar-ge', 'arge', 'departman', 'yusuf', 'onat', 'mentör', '12', 'ekip'] },
      { name: 'Senin Görevin ve Proje (Milk AI / Model eğitimi / Ön işleme)', weight: 6, kw: ['milk', 'model', 'eğitim', 'ön işleme', 'iskelet', 'normalizasyon', 'görev', 'sorumlu'] }
    ]
  },
  {
    num: 2,
    cat: 'teknoloji',
    isBanko: true,
    badge: 'SORU 2 (ANA BANKO) • KULLANILAN TEKNOLOJİLER VE NEDEN SEÇİLDİKLERİ',
    title: 'Staj projenizde kullandığınız programlama dillerini, kütüphaneleri, çerçeveleri (framework) ve donanım altyapısını belirterek bu teknolojilerin neden tercih edildiğini açıklayınız.',
    tips: [
      'Teknolojileri sadece isim olarak sıralama; <strong>"Hangi teknolojiyi ne amaçla kullandığını"</strong> yanına 1 cümleyle yaz.',
      'Hem yazılım araçlarını (<strong>Python, PyTorch, OpenCV, NumPy</strong>) hem de bulut GPU donanımını (<strong>Lightning AI, NVIDIA L4 24GB GPU</strong>) birlikte yaz.'
    ],
    keywords: ['Python 3.10 & PyTorch', 'OpenCV & NumPy', 'RT-DETR & ViTPose & Bi-GRU', 'Lightning AI Bulutu', 'NVIDIA L4 GPU (24 GB VRAM)'],
    answer: '"Projede ana programlama dili olarak <strong>Python</strong> kullandık. Derin öğrenme modellerini (RT-DETR, ViTPose ve Bi-GRU) kurmak ve GPU üzerinde eğitmek için <strong>PyTorch</strong> kütüphanesini tercih ettik. Güvenlik kamerası (CCTV) videolarını karelere ayırmak ve görüntü kırpma işlemleri yapmak için <strong>OpenCV</strong>, iskelet koordinatlarının matris ve normalizasyon hesaplamaları için ise <strong>NumPy</strong> kullandık. Modellerin eğitimi yüksek işlem gücü gerektirdiği için yerel bilgisayarlar yerine <strong>Lightning AI</strong> bulut platformu üzerinde 24 GB VRAM kapasiteli <strong>NVIDIA L4 GPU</strong> donanımını kullandık."',
    rubrics: [
      { name: 'Dil ve Derin Öğrenme Çerçevesi (Python & PyTorch)', weight: 6, kw: ['python', 'pytorch'] },
      { name: 'Görüntü İşleme ve Matematik (OpenCV & NumPy)', weight: 5, kw: ['opencv', 'numpy', 'video', 'kare', 'matris'] },
      { name: 'Kullanılan Yapay Zeka Modelleri (RT-DETR, ViTPose, GRU)', weight: 5, kw: ['rt-detr', 'rtdetr', 'vitpose', 'gru'] },
      { name: 'Bulut ve Donanım Altyapısı (Lightning AI & NVIDIA L4 24GB GPU)', weight: 4, kw: ['lightning', 'bulut', 'gpu', 'l4', 'nvidia', '24'] }
    ]
  },
  {
    num: 3,
    cat: 'teknoloji',
    isBanko: true,
    badge: 'SORU 3 (ANA BANKO) • SİSTEM MİMARİSİ VE VERİ AKIŞ ADIMLARI',
    title: 'Üzerinde çalıştığınız projenin çalışma mantığını ve uçtan uca sistem mimarisini (girdiden çıktıya veri akış adımlarını) blok diyagram çizerek açıklayınız.',
    tips: [
      'Kağıdın ortasına mutlaka <strong>CCTV Video ➔ RT-DETR ➔ ViTPose ➔ Gövde Normalizasyonu ➔ Bi-GRU</strong> kutularını alt alta çiz!',
      'Her kutunun ne girdi alıp ne çıktı ürettiğini 1\'er cümleyle açıkla.'
    ],
    keywords: ['İki Aşamalı Mimari (Two-Stage)', '1. RT-DETR (İnsan Tespiti)', '2. ViTPose (17 Eklem Noktası)', '60 Kare (2.4 sn) Kayar Pencere', '3. Çift Yönlü GRU (Bi-GRU)'],
    answer: '"Geliştirdiğimiz sistem güvenlik kamerası görüntülerini adım adım işleyen çok aşamalı bir boru hattından (pipeline) oluşuyor:<br><strong>1. İnsan Tespiti (RT-DETR):</strong> Kamera görüntüsündeki arka planı ve inekleri elemek için önce RT-DETR modeliyle sadece sağım çalışanını tespit edip kutu içine (bounding box) alıyoruz.<br><strong>2. İskelet Çıkarımı (ViTPose):</strong> Kırpılan kişi görüntüsünü ViTPose modeline vererek omuz, dirsek, bilek ve kalça gibi <strong>17 anahtar eklem noktasını</strong> çıkarıyoruz.<br><strong>3. Ön İşleme ve Kayar Pencere:</strong> Koordinatları gövdeye göre normalize edip <strong>2.4 saniyelik (60 karelik) kayar pencereler</strong> haline getiriyoruz.<br><strong>4. Eylem Sınıflandırma (Bi-GRU):</strong> Bu 60 karelik zaman serisini <strong>Çift Yönlü GRU (Bi-GRU)</strong> ağına vererek çalışanın meme temizliği mi, ön daldırma mı yoksa sağım başlığı takma işlemi mi yaptığını sınıflandırıyoruz."',
    rubrics: [
      { name: '1. Aşama: RT-DETR ile İnsan Tespiti (Bounding Box)', weight: 5, kw: ['rt-detr', 'rtdetr', 'insan tespiti', 'kutu', 'bounding'] },
      { name: '2. Aşama: ViTPose ile 17 Eklem Noktası Çıkarımı', weight: 5, kw: ['vitpose', '17', 'iskelet', 'eklem', 'keypoint'] },
      { name: 'Ön İşleme ve Zaman Penceresi (Normalizasyon + 60 Kare / 2.4 sn)', weight: 5, kw: ['60 kare', '2.4', 'kayar pencere', 'sliding', 'normalizasyon'] },
      { name: '3. Aşama: Çift Yönlü GRU (Bi-GRU) ile Eylem Sınıflandırma', weight: 5, kw: ['gru', 'bi-gru', 'zaman serisi', 'sınıflandırma', 'eylem'] }
    ]
  },
  {
    num: 4,
    cat: 'veri',
    isBanko: true,
    badge: 'SORU 4 (ANA BANKO • EN KRİTİK SORU) • KARŞILAŞILAN TEKNİK PROBLEM VE ÇÖZÜMÜ',
    title: 'Staj süresince projenizde karşılaştığınız en önemli teknik problem neydi? Bu problemin kaynağını nasıl tespit ettiniz ve çözmek için nasıl bir mühendislik yöntemi uyguladınız?',
    tips: [
      'Bu soru stajı bizzat yaptığını kanıtlayan en önemli sorudur! <strong>"Sorun neydi ➔ Neden kaynaklandı ➔ Nasıl çözdük ➔ F1 skoru kaçtan kaça çıktı"</strong> sırasıyla yaz.',
      '<strong>Etiket Sızıntısı (Label Leakage)</strong> kavramını ve <strong>F1 skorunun %71\'den %89.2\'ye çıktığını</strong> mutlaka belirt.'
    ],
    keywords: ['Overfitting (Farklı Kamerada Düşüş)', 'Etiket Sızıntısı (Label Leakage)', 'Gövde Referanslı Normalizasyon', 'Kalça Merkezi (0,0) + Omuz-Kalça Boyu', 'F1: %71 ➔ %89.2'],
    answer: '"Karşılaştığımız en büyük sorun, hareket sınıflandıran modelin eğitim verisinde %95 doğruluk verirken, farklı kamera açısına sahip test videolarında <strong>F1 skorunun %71\'e düşmesiydi (overfitting)</strong>. Hatayı incelediğimizde kök nedenin modele doğrudan görüntüdeki <strong>ham piksel koordinatlarını (x, y)</strong> vermemiz olduğunu gördük. Model kişinin kol hareketini öğrenmek yerine, ekranda durduğu yeri ve kameraya uzaklığını ezberlemişti (<strong>Etiket Sızıntısı / Label Leakage</strong>). Ayrıca çalışanın eli ineğin arkasında kaldığında (<strong>kapanma / occlusion</strong>) koordinatların (0,0) olması modele ani sıçrama hatası yaptırıyordu.<br><strong>Çözüm olarak Gövde Referanslı Normalizasyon</strong> uyguladık: Kişinin kalça ortasını <code>(0,0)</code> başlangıç noktası kabul ettik ve tüm eklem noktalarını kişinin <strong>omuz-kalça boyuna</strong> bölerek <code>[0, 1]</code> aralığına ölçekledik. Görünürlük skoru düşük (<code>v &lt; 0.3</code>) olan kayıp noktaları da bir önceki karenin konumuyla doldurduk (enterpolasyon). Böylece F1 skorumuz <strong>%71\'den %89.2\'ye yükseldi</strong>."',
    rubrics: [
      { name: 'Problem Tanımı (Farklı kamerada düşüş / Overfitting / %71 F1)', weight: 4, kw: ['overfitting', 'aşırı uyum', '71', 'farklı kamera', 'test', 'düş'] },
      { name: 'Kök Neden: Etiket Sızıntısı (Label Leakage) / Ham Piksel / Konum Ezberi', weight: 5, kw: ['etiket sızıntısı', 'label leakage', 'ham', 'piksel', 'ezber', 'konum', 'mesafe'] },
      { name: 'Kapanma (Occlusion) Sorunu ve v<0.3 Enterpolasyonu', weight: 4, kw: ['kapanma', 'occlusion', 'arkasında', '0,0', 'enterpolasyon', 'önceki kare', '0.3', 'doldur'] },
      { name: 'Ana Çözüm: Gövde Referanslı Normalizasyon (Kalça merkezi + Omuz-kalça boyu)', weight: 4, kw: ['gövde', 'normalizasyon', 'kalça', 'pelvis', 'omuz', 'merkez', '0,1', 'oran', 'böl'] },
      { name: 'Ölçülen Sonuç (F1 Skorunun %89.2 seviyesine yükselişi)', weight: 3, kw: ['89', 'f1', 'yüksel', 'art'] }
    ]
  },
  {
    num: 5,
    cat: 'kurum',
    isBanko: true,
    badge: 'SORU 5 (ANA BANKO) • YAZILIM METODOLOJİSİ, İSG, KVKK VE KAZANIMLAR',
    title: 'Staj yaptığınız kurumda uygulanan yazılım geliştirme metodolojisini, İSG ve veri gizliliği (etik) kurallarını ve stajın size kattığı mesleki kazanımları açıklayınız.',
    tips: [
      'Süreç için <strong>Agile/Scrum, 1 haftalık Sprint, Daily Stand-up ve Git PR</strong> sürecini yaz.',
      'Etik ve güvenlik için <strong>KVKK kapsamında çalışan yüzlerini bulanıklaştırma (anonimleştirme)</strong> ve <strong>NDA gizlilik sözleşmesi</strong> detayını ekle.'
    ],
    keywords: ['Agile / Scrum & 1 Haftalık Sprint', 'Git Feature Branch & PR', 'Ofis Ergonomisi & Saha İSG', 'KVKK Yüz Bulanıklaştırma', 'NDA Gizlilik Sözleşmesi'],
    answer: '"<strong>Yazılım Süreci:</strong> Projeyi <strong>Agile / Scrum</strong> metodolojisiyle, <strong>1 haftalık Sprintler</strong> ve sabahları 15 dakikalık <strong>Daily Stand-up</strong> toplantılarıyla yürüttük. Kodları <strong>Git ve GitHub</strong> üzerinde <code>feature branch</code>, <strong>Pull Request (PR)</strong> ve <strong>Code Review</strong> adımlarıyla yönettik.<br><strong>İSG ve Etik (KVKK):</strong> Ofiste ergonomik çalışma düzenine, çiftlik sahasında ise kaymaz çizme ve koruyucu tulum kurallarına uyuldu. <strong>KVKK</strong> gereği kamera kayıtlarındaki çalışanların yüzleri otomatik bulanıklaştırılarak <strong>anonimleştirildi</strong> ve ticari veriler <strong>Gizlilik Sözleşmesi (NDA)</strong> ile korundu.<br><strong>Kazanım:</strong> Teorik yapay zeka modellerini gerçek saha verilerinde çalıştırmayı ve veri ön işlemenin model başarısındaki kritik rolünü öğrendim."',
    rubrics: [
      { name: 'Metodoloji ve Git Süreci (Agile/Scrum, Sprint, Git PR)', weight: 5, kw: ['agile', 'scrum', 'sprint', 'git', 'pull request', 'pr', 'branch'] },
      { name: 'İSG Önlemleri (Ofis ergonomisi + Sahada çizme/tulum)', weight: 5, kw: ['isg', 'ergonomi', 'mola', 'çizme', 'tulum', 'ıslak', 'saha'] },
      { name: 'KVKK ve Etik (Yüz bulanıklaştırma / Anonimleştirme / NDA)', weight: 5, kw: ['kvkk', 'bulanık', 'anonim', 'yüz', 'nda', 'gizlilik'] },
      { name: 'Mesleki Kazanımlar (Gerçek saha verisi, ön işleme önemi)', weight: 5, kw: ['kazanım', 'gerçek', 'teori', 'pratik', 'ön işleme', 'öğren'] }
    ]
  },
  {
    num: 6,
    cat: 'kurum',
    isBanko: false,
    badge: 'SORU 6 • SÜRÜM KONTROLÜ (GIT), DALLANMA STRATEJİSİ VE KOD KALİTESİ',
    title: 'Projede ekip içi kod bütünlüğü, sürüm kontrolü (Git/GitHub), dallanma (branching) stratejisi ve kod inceleme (Code Review) süreçleri nasıl yürütülmüştür?',
    tips: [
      'Bazı hocalar doğrudan "Şirkette Git\'i nasıl kullandınız, çakışmaları (conflict) nasıl önlediniz?" diye sorar.',
      'Doğrudan <code>main</code> dalına kod atmanın yasak olduğunu, <code>feature branch</code> açıp <strong>Pull Request (PR)</strong> ve <strong>Code Review</strong> yaptığınızı anlat.'
    ],
    keywords: ['Git & GitHub', 'Main Dalı Koruması', 'Feature Branch (Özellik Dalı)', 'Pull Request (PR)', 'Code Review (Kod İncelemesi)'],
    answer: '"Ekip içinde kod karmaşasını ve çakışmaları (merge conflict) önlemek için <strong>Git ve GitHub</strong> üzerinde disiplinli bir dallanma (branching) stratejisi uyguladık. Çalışan ana kodu korumak amacıyla doğrudan <code>main</code> dalına kod gönderimi (push) kapalıydı. Geliştirdiğimiz her yeni özellik veya hata düzeltmesi için ayrı bir özellik dalı (örneğin <code>feature/body-normalization</code> veya <code>feature/gru-training</code>) açtık. Geliştirme ve yerel testler bittiğinde GitHub üzerinden <strong>Pull Request (PR)</strong> oluşturduk. Kıdemli mühendisler tarafından yapılan <strong>Code Review (kod incelemesi)</strong> sonrasında okunabilirlik ve performans onayı alan kodlar ana dala birleştirildi (merge edildi)."',
    rubrics: [
      { name: 'Git ve GitHub Kullanımı', weight: 5, kw: ['git', 'github', 'versiyon', 'sürüm'] },
      { name: 'Main Dalı Koruması ve Feature Branch Stratejisi', weight: 7, kw: ['main', 'feature', 'branch', 'dal', 'ayrı'] },
      { name: 'Pull Request (PR) ve Code Review Süreci', weight: 8, kw: ['pull request', 'pr', 'code review', 'inceleme', 'merge', 'birleştir'] }
    ]
  },
  {
    num: 7,
    cat: 'veri',
    isBanko: false,
    badge: 'SORU 7 • VERİ ÖN İŞLEME (PREPROCESSING) VE VERİ TEMİZLEME ADIMLARI',
    title: 'Projenizde kullanılan veriler nasıl elde edildi? Ham veriyi modele vermeden önce hangi veri temizleme, filtreleme ve ön işleme (preprocessing) adımlarını uyguladınız?',
    tips: [
      'Veri ön işleme senin raporunun en güçlü olduğu yer! <strong>1) Güven skoru filtreleme (v < 0.3), 2) Eksik veri enterpolasyonu (forward-fill), 3) Gövde referanslı normalizasyon ve 4) 60 karelik kayar pencereleme</strong> adımlarını maddeler halinde yaz.'
    ],
    keywords: ['CCTV Kamera Kayıtları', 'Güven Skoru Filtreleme (v < 0.3)', 'Forward-Fill Enterpolasyon', 'Gövde Referanslı Normalizasyon', '60 Kare Kayar Pencere'],
    answer: '"Verilerimiz süt sağım tesislerindeki güvenlik kameralarından (1080p, 25 FPS) alınan gerçek sağım videolarından elde edildi. Ham veriyi doğrudan modele vermek yerine 4 aşamalı bir veri ön işleme hattı kurduk:<br><strong>1. Güven Skoru Filtreleme:</strong> ViTPose\'dan çıkan 17 eklem noktasından görünürlük güven skoru <code>v &lt; 0.3</code> olan gürültülü tahminleri tespit ettik.<br><strong>2. Eksik Veri Tamamlama (Enterpolasyon):</strong> İneğin arkasında kalarak kaybolan eklemleri (0,0) yapmak yerine, bir önceki geçerli karenin koordinatıyla doldurduk (forward-fill).<br><strong>3. Gövde Referanslı Normalizasyon:</strong> Kalça merkezini (0,0) orijin alıp tüm koordinatları omuz-kalça boyuna bölerek <code>[0,1]</code> aralığına ölçekledik.<br><strong>4. Pencereleme:</strong> Sürekli akışı <strong>2.4 saniyelik (60 kare) kayar pencerelere</strong> bölerek zaman serisi tensörleri haline getirdik."',
    rubrics: [
      { name: 'Veri Kaynağı (CCTV Kamera / 25 FPS Video)', weight: 4, kw: ['kamera', 'cctv', 'video', '25 fps', 'sağım'] },
      { name: 'Görünürlük Skoru Filtreleme ve Enterpolasyon (v < 0.3)', weight: 6, kw: ['0.3', 'görünürlük', 'güven', 'enterpolasyon', 'önceki kare', 'doldur'] },
      { name: 'Gövde Referanslı Normalizasyon (Kalça merkezi + Omuz-kalça boyu)', weight: 6, kw: ['gövde', 'normalizasyon', 'kalça', 'pelvis', 'omuz', '0,1'] },
      { name: 'Kayar Pencereleme (60 Kare / 2.4 sn Sekans)', weight: 4, kw: ['60 kare', '2.4', 'pencere', 'sliding', 'tensör'] }
    ]
  },
  {
    num: 8,
    cat: 'veri',
    isBanko: false,
    badge: 'SORU 8 • TEST SÜREÇLERİ, DOĞRULAMA VE PERFORMANS METRİKLERİ',
    title: 'Geliştirdiğiniz yazılımın veya modelin başarısını nasıl test ettiniz? Hangi değerlendirme metriklerini (Precision, Recall, F1-Skoru, K-Fold vb.) neden kullandınız?',
    tips: [
      'Hocalar "Neden sadece Accuracy (Doğruluk) kullanmadınız da F1-Skoru kullandınız?" sorusunun cevabına bayılır!',
      'Cevap: Sağım videolarında bazı hareketler kısa, bazıları uzun sürdüğü için <strong>sınıf dengesizliği (class imbalance)</strong> vardır; bu yüzden <strong>Precision, Recall ve F1-Skoru</strong> ile <strong>5-Katlı Çapraz Doğrulama (5-Fold Cross Validation)</strong> kullandık.'
    ],
    keywords: ['Sınıf Dengesizliği (Class Imbalance)', 'Precision (Kesinlik) & Recall (Duyarlılık)', 'Macro F1-Skoru (%89.2)', '5-Katlı Çapraz Doğrulama (5-Fold CV)', 'Confusion Matrix (Hata Matrisi)'],
    answer: '"Gerçek sağım videolarında bazı işlemler (örneğin sağım başlığı takma veya meme temizliği) süre olarak birbirinden farklı olduğu için veri setinde <strong>sınıf dengesizliği (class imbalance)</strong> bulunuyordu. Bu nedenle tek başına Accuracy (doğruluk) metriği yanıltıcı olacağından; yanlış alarmları ölçen <strong>Precision (Kesinlik)</strong>, kaçırılan eylemleri ölçen <strong>Recall (Duyarlılık)</strong> ve ikisinin harmonik ortalaması olan <strong>F1-Skoru</strong> metriklerini kullandık. Ayrıca modelin ezber yapmadığından emin olmak için <strong>5-Katlı Çapraz Doğrulama (5-Fold Cross Validation)</strong> ve <strong>Hata Matrisi (Confusion Matrix)</strong> analizi uyguladık. Normalizasyon sonrasında test F1 skorumuzu <strong>%71\'den %89.2\'ye</strong> çıkardık."',
    rubrics: [
      { name: 'Sınıf Dengesizliği (Class Imbalance) Nedeniyle F1 Tercihi', weight: 6, kw: ['dengesiz', 'imbalance', 'yanıltıcı', 'f1'] },
      { name: 'Precision (Kesinlik) ve Recall (Duyarlılık) Metrikleri', weight: 5, kw: ['precision', 'kesinlik', 'recall', 'duyarlılık'] },
      { name: 'Çapraz Doğrulama (K-Fold / 5-Fold) ve Hata Matrisi (Confusion Matrix)', weight: 5, kw: ['fold', 'çapraz doğrulama', 'confusion', 'hata matrisi'] },
      { name: 'Elde Edilen Sayısal Sonuç (%71 -> %89.2)', weight: 4, kw: ['89', '71'] }
    ]
  },
  {
    num: 9,
    cat: 'teknoloji',
    isBanko: false,
    badge: 'SORU 9 • ALTERNATİF YÖNTEM KARŞILAŞTIRMASI VE TASARIM KARARLARI',
    title: 'Projenizde kullandığınız mimari ve algoritmaları (İki aşamalı yapı, RT-DETR ve Bi-GRU) diğer alternatif yöntemlere (Tek aşamalı modeller, YOLO, LSTM vb.) göre neden tercih ettiniz?',
    tips: [
      'Mühendislikte "Neden X yerine Y seçtiniz?" sorusu çok sık sorulur. 3 net karşılaştırma yap:',
      '1) <strong>Tek aşamalı yerine İki Aşamalı (Top-Down):</strong> Arka planı ve inekleri elemek için.',
      '2) <strong>Klasik YOLO yerine RT-DETR:</strong> NMS gecikmesi olmadığı ve kalabalık/kapanmalı sahnede transformer dikkat mekanizması daha iyi çalıştığı için.',
      '3) <strong>LSTM yerine Bi-GRU:</strong> %30 daha az parametreli olduğu, daha hızlı çalıştığı ve aşırı uyumu (overfitting) azalttığı için.'
    ],
    keywords: ['Top-Down (İki Aşamalı) vs Bottom-Up', 'RT-DETR vs YOLO (NMS Gecikmesi Yok)', 'Bi-GRU vs LSTM (%30 Daha Az Parametre)', 'Hız ve Doğruluk Dengesi'],
    answer: '"Projemizde 3 önemli mühendislik tercihi yaptık:<br><strong>1. Tek aşamalı yerine İki Aşamalı (Top-Down) Mimari:</strong> Sağımhanede karmaşık ekipmanlar ve inekler bulunduğu için önce insanı bulup (RT-DETR) sonra sadece o kutu içinde iskelet çıkarmak (ViTPose) arka plan gürültüsünü tamamen kesti.<br><strong>2. Klasik YOLO yerine RT-DETR:</strong> RT-DETR, Hungarian matching kullandığı için NMS (Non-Maximum Suppression) son işleme gecikmesine ihtiyaç duymaz ve kısmi kapanmalarda (occlusion) daha kararlı kutular üretir.<br><strong>3. LSTM yerine Çift Yönlü GRU (Bi-GRU):</strong> GRU yapısı LSTM\'e göre yaklaşık <strong>%30 daha az parametreye</strong> sahiptir. Bu sayede 60 karelik pencerelerde hem daha hızlı çıkarım (inference) sağladı hem de aşırı uyum (overfitting) riskini azalttı."',
    rubrics: [
      { name: 'İki Aşamalı (Top-Down) Mimari Seçim Nedeni (Arka plan gürültüsünü eleme)', weight: 7, kw: ['iki aşamalı', 'top-down', 'arka plan', 'gürültü', 'kırp'] },
      { name: 'RT-DETR Seçim Nedeni (NMS gecikmesi olmaması / Transformer)', weight: 6, kw: ['rt-detr', 'nms', 'hungarian', 'gecikme', 'yolo'] },
      { name: 'Bi-GRU vs LSTM Karşılaştırması (%30 az parametre / Hız / Overfitting)', weight: 7, kw: ['gru', 'lstm', 'parametre', '30', 'hız'] }
    ]
  },
  {
    num: 10,
    cat: 'veri',
    isBanko: false,
    badge: 'SORU 10 • VERİ YAPILARI, ALGORİTMALAR VE KARMAŞIKLIK / PERFORMANS',
    title: 'Projenizde verileri işlerken hangi temel veri yapılarını ve algoritmaları kullandınız? Bellek ve çalışma süresi (performans) açısından nasıl bir yapı kurdunuz?',
    tips: [
      'Bilgisayar mühendisliği hocaları staj projende hangi veri yapılarını kullandığını sormayı sever.',
      'Cevap olarak: <strong>Çok boyutlu tensörler/matrisler</strong> <code>(60, 17, 2)</code>, <strong>Kayar Pencere Kuyruğu (Sliding Window / FIFO Deque)</strong>, <strong>Hungarian Matching</strong> ve döngüler yerine <strong>NumPy Vektörizasyonu</strong> kullandığını söyle!'
    ],
    keywords: ['Çok Boyutlu Tensörler (60x34)', 'FIFO Kuyruk / Kayar Pencere (Deque)', 'NumPy Vektörizasyonu (O(1) Matris İşlemi)', 'Hungarian Matching Algoritması'],
    answer: '"Projede gerçek zamanlı video akışını (25 FPS) gecikmesiz işleyebilmek için uygun veri yapıları seçtik. Her karede çıkarılan 17 eklem noktasını tutmak ve son 2.4 saniyeyi (60 kareyi) hafızada kaydırmak için <strong>FIFO (İlk Giren İlk Çıkar) mantığında çalışan Kayar Pencere Kuyruğu (Sliding Window / Deque)</strong> veri yapısını kullandık. Bu yapı sayesinde yeni kare geldiğinde eski kare <code>O(1)</code> zamanda atılarak <code>(Batch, 60, 34)</code> boyutlu <strong>3 boyutlu PyTorch tensörleri</strong> oluşturuldu. Ayrıca normalizasyon hesaplarında iç içe <code>for</code> döngüleri kullanmak yerine <strong>NumPy vektörizasyonu (broadcasting)</strong> kullanarak hesaplama süresini milisaniyelerin altına indirdik."',
    rubrics: [
      { name: 'Kayar Pencere / FIFO Kuyruk (Deque) Veri Yapısı', weight: 7, kw: ['kuyruk', 'fifo', 'deque', 'kayar pencere', 'sliding'] },
      { name: 'Çok Boyutlu Tensör ve Matris Yapıları (60x34 / 17x2)', weight: 7, kw: ['tensör', 'matris', '60', '34', '17', 'boyut'] },
      { name: 'NumPy Vektörizasyonu ve Performans Optimizasyonu', weight: 6, kw: ['vektör', 'numpy', 'döngü', 'o(1)', 'hız', 'performans'] }
    ]
  },
  {
    num: 11,
    cat: 'teknoloji',
    isBanko: false,
    badge: 'SORU 11 • DONANIM KISITLARI, BULUT BİLİŞİM VE GPU KAYNAK YÖNETİMİ',
    title: 'Staj projenizin donanım gereksinimleri nelerdi? Yerel bilgisayarlar yerine bulut altyapısı (Cloud GPU) kullanmanın avantajları ve kaynak yönetimi konusunda neler yaptınız?',
    tips: [
      'Derin öğrenme modelleri yerel standart bilgisayarlarda çok yavaş eğitilir. Bu yüzden <strong>Lightning AI</strong> bulut platformunda <strong>24 GB VRAM\'li NVIDIA L4 GPU</strong> kullandığınızı, bellek (VRAM) taşmasını önlemek için <strong>Batch Size</strong> ve <strong>Mixed Precision (FP16)</strong> optimizasyonu yaptığınızı anlat.'
    ],
    keywords: ['Lightning AI Bulut Platformu', 'NVIDIA L4 GPU (24 GB VRAM)', 'CUDA Hızlandırma', 'Batch Size & Bellek Yönetimi', 'Otomatik Kapanan Eğitim Betikleri'],
    answer: '"Yüksek çözünürlüklü (1080p) videolar üzerinde RT-DETR ve ViTPose gibi Transformer tabanlı derin öğrenme modellerini çalıştırmak yüksek GPU belleği (VRAM) ve paralel işlem gücü gerektiriyordu. Yerel bilgisayarlarımız bu yük için yetersiz kaldığından <strong>Lightning AI</strong> bulut platformunu kullandık ve eğitimleri <strong>24 GB VRAM kapasiteli NVIDIA L4 GPU</strong> üzerinde <strong>CUDA</strong> hızlandırmasıyla gerçekleştirdik. Bulut kredi maliyetini ve bellek tüketimini optimize etmek için uygun <strong>Batch Size</strong> seçimi yaptık, çıkarılan iskelet özniteliklerini diske önbellekledik (caching) ve eğitim bittiğinde sunucuyu açık unutmayacak otomatik sonlanan betikler kullandık."',
    rubrics: [
      { name: 'Bulut Platformu ve GPU Modeli (Lightning AI / NVIDIA L4 24GB VRAM)', weight: 8, kw: ['lightning', 'l4', '24', 'vram', 'nvidia', 'bulut'] },
      { name: 'Neden Bulut GPU Seçildi? (Yüksek çözünürlüklü video ve Transformer maliyeti)', weight: 6, kw: ['yerel', 'yetersiz', 'transformer', 'video', 'cuda', 'hız'] },
      { name: 'Kaynak ve Bellek Optimizasyonu (Batch size, önbellekleme, maliyet kontrolü)', weight: 6, kw: ['batch', 'bellek', 'önbellek', 'cache', 'maliyet', 'betik'] }
    ]
  },
  {
    num: 12,
    cat: 'veri',
    isBanko: false,
    badge: 'SORU 12 • GERÇEK DÜNYA KISITLARI VE UÇ DURUMLAR (EDGE CASES)',
    title: 'Saha/gerçek ortam koşullarında (kamera açısı değişimi, düşük ışık, nesnelerin birbirini kapatması / occlusion vb.) sistemin hata yapmaması için hangi önlemleri aldınız?',
    tips: [
      'Sağımhane ortamı laboratuvar gibi temiz değildir! 3 gerçek dünya zorluğunu ve çözümünü yaz:',
      '1) <strong>Farklı kamera açısı ve mesafe</strong> ➔ Gövde referanslı normalizasyon.',
      '2) <strong>İneğin çalışanı kapatması (Occlusion)</strong> ➔ v < 0.3 filtreleme ve önceki kareyle enterpolasyon.',
      '3) <strong>Anlık titreme ve gürültü</strong> ➔ 60 karelik (2.4 sn) zamansal pencere ile yumuşatma.'
    ],
    keywords: ['Kamera Açısı Değişimi ➔ Gövde Normalizasyonu', 'Kapanma (Occlusion) ➔ v<0.3 Enterpolasyon', 'Anlık Gürültü ➔ 60 Kare Pencere', 'Dayanıklılık (Robustness)'],
    answer: '"Gerçek sağımhane ortamında buhar, ıslak zemin yansıması, farklı kamera montaj açıları ve ineklerin personeli kapatması gibi ciddi zorluklar vardı. Sistemi bu uç durumlara (edge cases) karşı dayanıklı hale getirmek için 3 önlem aldık:<br><strong>1. Kamera Açısı ve Mesafe Farkı:</strong> Kişinin kalça merkezini (0,0) alıp koordinatları omuz-kalça boyuna bölerek kameranın nereye takıldığından bağımsız bir yapı kurduk.<br><strong>2. Kısmi Kapanma (Occlusion):</strong> Sağımcının kolu ineğin veya sağım başlığının arkasında kaldığında üretilen düşük güvenli (<code>v &lt; 0.3</code>) koordinatları eleyip önceki geçerli kareyle tamamladık.<br><strong>3. Anlık Tahmin Titremeleri:</strong> Tek bir kareye bakıp karar vermek yerine <strong>60 karelik (2.4 sn)</strong> pencere üzerinden Bi-GRU ile zamansal karar vererek anlık gürültüleri engelledik."',
    rubrics: [
      { name: 'Kamera Açısı ve Mesafe Çözümü (Gövde Normalizasyonu)', weight: 7, kw: ['kamera açısı', 'mesafe', 'gövde', 'normalizasyon', 'kalça'] },
      { name: 'Kapanma (Occlusion) Çözümü (v<0.3 Filtreleme ve Enterpolasyon)', weight: 7, kw: ['kapanma', 'occlusion', 'inek', '0.3', 'enterpolasyon', 'önceki kare'] },
      { name: 'Zamansal Bütünlük (60 Kare / 2.4 sn Pencere ile Gürültü Önleme)', weight: 6, kw: ['60 kare', '2.4', 'zaman', 'pencere', 'gürültü', 'titreme'] }
    ]
  },
  {
    num: 13,
    cat: 'kurum',
    isBanko: false,
    badge: 'SORU 13 • İŞ SAĞLIĞI VE GÜVENLİĞİ (İSG) ÖNLEMLERİ',
    title: 'Staj yaptığınız ofis ortamında ve saha/tesis ziyaretlerinde karşılaşılabilecek İş Sağlığı ve Güvenliği (İSG) riskleri nelerdir ve bunlara karşı hangi tedbirler alınmıştır?',
    tips: [
      'İSG tek başına ayrı bir soru olarak gelirse <strong>ikiye ayırarak</strong> cevap ver: <strong>1) Ofis / Yazılım Ortamı İSG Kuralları</strong> ve <strong>2) Çiftlik / Saha Testi İSG Kuralları</strong>. Böylece çok dolgun ve tam puanlık bir cevabın olur!'
    ],
    keywords: ['Ofis Ergonomisi & Ekran Mesafesi', 'Göz Dinlendirme Molaları', 'Elektrik ve Kablo Güvenliği', 'Saha: Kaymaz Çizme & Tulum', 'Hayvan Güvenlik Mesafesi'],
    answer: '"Staj süresince İSG kuralları hem ofis hem de saha ortamı için iki aşamada uygulandı:<br><strong>1. Ofis ve Laboratuvar Ortamında:</strong> Uzun süre bilgisayar başında çalışmaya bağlı kas-iskelet rahatsızlıklarını önlemek için ergonomik koltuk ve ekran yüksekliği ayarlandı, her saat başı kısa göz dinlendirme molaları verildi ve sunucu/güç kablolarının geçiş alanlarını kapatmayacak şekilde yalıtılmasına dikkat edildi.<br><strong>2. Çiftlik Saha Ziyaretlerinde:</strong> Sağımhanelerde zemin sürekli yıkandığı için kayma ve düşme riskine karşı <strong>kaymaz tabanlı çelik burunlu iş çizmesi</strong> giyildi, hijyen ve biyolojik risklere karşı <strong>koruyucu tek kullanımlık tulum ve eldiven</strong> kullanıldı ve büyükbaş hayvanların ani hareketlerine karşı güvenli mesafe korundu."',
    rubrics: [
      { name: 'Ofis İSG Önlemleri (Ergonomi, ekran molaları, elektrik/kablo güvenliği)', weight: 10, kw: ['ofis', 'ergonomi', 'ekran', 'mola', 'göz', 'kablo', 'elektrik'] },
      { name: 'Saha / Tesis İSG Önlemleri (Islak zemin, kaymaz çizme, koruyucu tulum, hayvan mesafesi)', weight: 10, kw: ['saha', 'çiftlik', 'ıslak', 'kaymaz', 'çizme', 'tulum', 'hayvan'] }
    ]
  },
  {
    num: 14,
    cat: 'kurum',
    isBanko: false,
    badge: 'SORU 14 • MÜHENDİSLİK ETİĞİ, VERİ GİZLİLİĞİ (KVKK) VE LİSANSLAR',
    title: 'Projenizde mühendislik etiği, Kişisel Verilerin Korunması Kanunu (KVKK), kurumsal bilgi güvenliği (NDA) ve açık kaynak yazılım lisansları açısından hangi kurallara dikkat edildi?',
    tips: [
      'Bu soruda 3 madde yazacaksın: <strong>1) KVKK (Çalışan yüzlerinin bulanıklaştırılması), 2) NDA (Çiftlik ticari sırlarının korunması), 3) Açık Kaynak Lisansları (MIT / Apache 2.0 uyumu ve akademik dürüstlük)</strong>.'
    ],
    keywords: ['KVKK (Yüz Bulanıklaştırma / Anonimleştirme)', 'NDA (Gizlilik Sözleşmesi)', 'Açık Kaynak Lisansları (MIT, Apache 2.0)', 'Tarafsız Performans Raporlama'],
    answer: '"Projemiz doğrudan kamera görüntüleri ve kurumsal saha verileri içerdiği için mühendislik etiğine ve yasal standartlara sıkı şekilde uyuldu:<br><strong>1. KVKK ve Kişisel Veri Gizliliği:</strong> Sağımhane kameralarındaki çalışanların kimliklerinin ifşa olmaması için yüz bölgeleri veri setine işlenmeden önce otomatik olarak <strong>bulanıklaştırıldı (anonimleştirildi)</strong> ve model yalnızca sayısal iskelet koordinatları üzerinde eğitildi.<br><strong>2. Ticari Sır ve NDA:</strong> Çiftliklerin isimleri, üretim kapasiteleri ve şirket içi algoritmalar <strong>Gizlilik Sözleşmesi (NDA)</strong> kapsamında korundu; veriler yetkisiz kişisel cihazlara aktarılmadı.<br><strong>3. Lisanslar ve Akademik Dürüstlük:</strong> Kullandığımız kütüphanelerin (PyTorch, OpenCV vb.) <strong>MIT ve Apache 2.0</strong> açık kaynak lisanslarına uyuldu ve model test sonuçları (F1 skorları) hiçbir çarpıtma olmadan şeffafça raporlandı."',
    rubrics: [
      { name: 'KVKK ve Kişisel Veri Gizliliği (Yüz bulanıklaştırma / Anonimleştirme)', weight: 8, kw: ['kvkk', 'yüz', 'bulanık', 'anonim', 'kişisel veri', 'kimlik'] },
      { name: 'Ticari Gizlilik (NDA Gizlilik Sözleşmesi / Çiftlik bilgilerinin korunması)', weight: 6, kw: ['nda', 'gizlilik', 'ticari', 'çiftlik', 'sözleşme'] },
      { name: 'Açık Kaynak Lisans Uyumu (MIT, Apache 2.0) ve Dürüst Raporlama', weight: 6, kw: ['lisans', 'açık kaynak', 'mit', 'apache', 'etik', 'şeffaf'] }
    ]
  },
  {
    num: 15,
    cat: 'kurum',
    isBanko: false,
    badge: 'SORU 15 • TEORİ-PRATİK İLİŞKİSİ, MESLEKİ KAZANIMLAR VE GELECEK ÇALIŞMALAR',
    title: 'Üniversitede aldığınız teorik derslerin stajınıza katkısı ne oldu? Stajın size kazandırdığı mesleki yetkinlikleri ve projenin gelecekte nasıl geliştirilebileceğini açıklayınız.',
    tips: [
      'Okuldaki derslerle bağlantı kurmak hocaların çok hoşuna gider! <strong>Doğrusal Cebir (matris/normalizasyon), Veri Yapıları (kayar pencere kuyruğu), Algoritmalar ve Yapay Zeka/Görüntü İşleme</strong> derslerini pratiğe döktüğünü söyle.',
      'Gelecek çalışma olarak da modelin <strong>TensorRT / ONNX</strong> ile uç cihazlarda (Jetson vb.) anlık sesli uyarı verecek şekilde optimize edilebileceğini ekle.'
    ],
    keywords: ['Doğrusal Cebir & Veri Yapıları Dersleri', 'Görüntü İşleme & Yapay Zeka Teorisi', 'Kirli Saha Verisiyle Başa Çıkma', 'Gelecek: TensorRT / ONNX & Uç Cihaz (Edge AI)'],
    answer: '"Üniversitede aldığım <strong>Doğrusal Cebir</strong> dersindeki koordinat dönüşümleri ve vektör uzayı bilgisi gövde referanslı normalizasyon algoritmasını kurmamda; <strong>Veri Yapıları ve Algoritmalar</strong> dersi ise kayar pencere (sliding window) ve tensör işlemlerini verimli yazmamda doğrudan temel oluşturdu.<br>Bu staj bana hazır ve temiz akademik veri setleriyle çalışmak yerine, gerçek dünyanın gürültülü ve kapanmalı kamera verilerinde mühendislik problemi çözmeyi, ayrıca <strong>Scrum ve Git</strong> ile bir Ar-Ge ekibinin parçası olmayı kazandırdı.<br><strong>Gelecek çalışma olarak:</strong> Geliştirdiğimiz boru hattının <strong>ONNX / TensorRT</strong> formatına dönüştürülerek çiftlikteki uç cihazlarda (Edge AI / NVIDIA Jetson) internet bağlantısına gerek kalmadan anlık sesli uyarı üretecek şekilde yaygınlaştırılması planlanmaktadır."',
    rubrics: [
      { name: 'Üniversite Dersleriyle İlişki (Doğrusal Cebir, Veri Yapıları, Görüntü İşleme)', weight: 7, kw: ['ders', 'doğrusal cebir', 'lineer', 'veri yapıları', 'algoritma', 'teori', 'okul'] },
      { name: 'Mesleki Kazanımlar (Gerçek saha verisi, problem çözme, Scrum/Git ekip çalışması)', weight: 7, kw: ['kazanım', 'gerçek', 'saha', 'scrum', 'git', 'ekip', 'problem'] },
      { name: 'Gelecek Çalışmalar ve İyileştirme Önerisi (ONNX, TensorRT, Edge AI / Jetson)', weight: 6, kw: ['gelecek', 'onnx', 'tensorrt', 'edge', 'jetson', 'uç cihaz', 'anlık'] }
    ]
  }
];

function renderStajModule() {
  renderStajTuyolar('all');
  renderStajSimulator();
}

window.filterStajQuestions = function(cat) {
  ['all', 'banko', 'teknoloji', 'veri', 'kurum'].forEach(c => {
    const btn = document.getElementById('stajCat-' + c);
    if (btn) btn.classList.toggle('active', c === cat);
  });
  renderStajTuyolar(cat);
};

function renderStajTuyolar(filterCat) {
  const container = document.getElementById('staj-tuyolar-list');
  if (!container) return;

  const filtered = STAJ_15_QUESTIONS.filter(q => {
    if (filterCat === 'all') return true;
    if (filterCat === 'banko') return q.isBanko;
    return q.cat === filterCat;
  });

  container.innerHTML = filtered.map(q => `
    <div class="staj-q-card ${q.isBanko ? 'staj-card-featured' : ''}">
      <div class="staj-q-badge">${q.badge}</div>
      <h3 class="staj-q-title">${q.num}. "${q.title}"</h3>

      <div class="staj-tip-box">
        <strong>💡 Cevap Tüyosu (Hoca Neye Puan Verir?):</strong>
        <ul>
          ${q.tips.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>

      <div class="staj-keywords">
        <span>🔑 Anahtar Kelimeler:</span>
        ${q.keywords.map(k => `<code>${k}</code>`).join('')}
      </div>

      <div class="staj-natural-answer">
        <div class="staj-ans-header">✍️ Sınavda Kağıda Rahatça Yazabileceğin Doğal Cevap:</div>
        <p>${q.answer}</p>
      </div>
    </div>
  `).join('');
}

function renderStajSimulator() {
  const container = document.getElementById('staj-simulator-list');
  if (!container) return;

  container.innerHTML = STAJ_15_QUESTIONS.map(q => `
    <div class="staj-q-card ${q.isBanko ? 'staj-card-featured' : ''}">
      <div class="staj-sim-header">
        <div>
          <span class="staj-q-badge">${q.badge}</span>
          <h3 class="staj-q-title">${q.num}. ${q.title}</h3>
        </div>
        <span class="staj-score-pill" id="stajPill-${q.num}">? / 20 Puan</span>
      </div>
      <textarea id="stajAns-${q.num}" class="staj-textarea" rows="4" placeholder="Cevabını sınav kağıdına yazar gibi buraya kendi cümlelerinle yaz... (Anahtar ipuçları: ${q.keywords.join(', ')})"></textarea>
      <div class="staj-sim-actions">
        <button class="btn btn-primary" onclick="gradeStajQuestion(${q.num})">✅ ${q.num}. Soruyu Kontrol Et & Puanla</button>
        <button class="btn btn-secondary" onclick="toggleStajHint(${q.num})">👁️ Doğal Örnek Cevabı Göster / Gizle</button>
      </div>
      <div id="stajEval-${q.num}" class="staj-eval-box hidden"></div>
      <div id="stajHint-${q.num}" class="staj-natural-answer hidden" style="margin-top:14px;">
        <div class="staj-ans-header">✍️ Doğal Örnek Cevap:</div>
        <p>${q.answer}</p>
      </div>
    </div>
  `).join('');
}

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
  document.querySelectorAll('.staj-font-controls .staj-size-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
};

window.toggleStajHint = function(qNum) {
  const box = document.getElementById('stajHint-' + qNum);
  if (box) box.classList.toggle('hidden');
};

window.gradeStajQuestion = function(qNum) {
  const qObj = STAJ_15_QUESTIONS.find(x => x.num === qNum);
  const input = document.getElementById('stajAns-' + qNum);
  const evalBox = document.getElementById('stajEval-' + qNum);
  const pill = document.getElementById('stajPill-' + qNum);
  if (!qObj || !input || !evalBox || !pill) return;

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

  qObj.rubrics.forEach(r => {
    const matched = r.kw.some(k => text.includes(k));
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
  STAJ_15_QUESTIONS.forEach(q => {
    const val = (document.getElementById('stajAns-' + q.num)?.value || '').trim();
    if (val.length > 0) {
      window.gradeStajQuestion(q.num);
    }
  });
};

function updateStajTotal() {
  const answeredNums = Object.keys(stajScores).filter(k => stajScores[k] > 0);
  const count = answeredNums.length;
  const sum = answeredNums.reduce((acc, k) => acc + stajScores[k], 0);
  const maxPossible = count * 20;
  const pct = maxPossible > 0 ? Math.round((sum / maxPossible) * 100) : 0;

  const txt = document.getElementById('stajTotalScoreText');
  const bar = document.getElementById('stajTotalScoreBar');
  if (txt) txt.textContent = `${sum} / ${maxPossible || 100} Puan (${count} Soru Cevaplandı • Başarı: %${pct})`;
  if (bar) bar.style.width = pct + '%';
}

window.copyStajAnswersForAI = function() {
  let out = "Kral kişisel sitemdeki açık uçlu staj sorularına şu cevapları yazdım, tutarlılığını inceler misin:\n\n";
  STAJ_15_QUESTIONS.forEach(q => {
    const val = (document.getElementById('stajAns-' + q.num)?.value || '').trim();
    if (val) {
      out += `--- SORU ${q.num} (${q.badge}) ---\n${val}\n\n`;
    }
  });
  navigator.clipboard.writeText(out).then(() => {
    const alertBox = document.getElementById('stajCopyAlert');
    if (alertBox) {
      alertBox.classList.remove('hidden');
      setTimeout(() => alertBox.classList.add('hidden'), 6000);
    }
    showToast('Yazdığın cevaplar panoya kopyalandı!');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  renderStajModule();
});
