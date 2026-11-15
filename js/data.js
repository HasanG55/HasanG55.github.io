// ==========================================================================
// HASAN GÜRSES - KİŞİSEL WEB SİTESİ & CV VERİ DOSYASI (hasangurses.com)
// Sitedeki tüm metinleri, projeleri ve CV bilgilerini buradan kolayca güncelleyebilirsin.
// ==========================================================================

const SITE_DATA = {
  profile: {
    name: "Hasan Gürses",
    firstName: "Hasan",
    lastName: "GÜRSES",
    domain: "hasangurses.com",
    birthYear: "2003",
    birthPlace: "Samsun",
    nationality: "T.C.",
    maritalStatus: {
      tr: "Bekar",
      en: "Single"
    },
    phone: "+90 533 526 90 31",
    phoneDisplay: "0 (533) 526 90 31",
    emailPrimary: "hasangurses55@hotmail.com",
    emailAcademic: "hasan.gurses@gazi.edu.tr",
    github: "https://github.com/HasanG55",
    githubUser: "HasanG55",
    linkedin: "https://linkedin.com/in/hasan-gurses",
    linkedinUser: "hasan-gurses",
    location: {
      tr: "Gazi Üniversitesi Mühendislik Fakültesi, Bilgisayar Mühendisliği Bölümü, Maltepe / ANKARA",
      en: "Gazi University Faculty of Engineering, Dept. of Computer Engineering, Maltepe / ANKARA"
    },
    shortLocation: {
      tr: "Maltepe, Ankara",
      en: "Ankara, Turkey"
    },
    title: {
      tr: "Bilgisayar Mühendisliği Öğrencisi",
      en: "Computer Engineering Student"
    },
    roles: {
      tr: [
        "Bilgisayar Mühendisliği Öğrencisi",
        "Computer Vision & AI Geliştirici",
        "Backend & Sistem Geliştirici",
        "Full-Stack Yazılım Geliştirici"
      ],
      en: [
        "Computer Engineering Student",
        "Computer Vision & AI Developer",
        "Backend & Systems Developer",
        "Full-Stack Software Developer"
      ]
    },
    about: {
      tr: "Gazi Üniversitesi Bilgisayar Mühendisliği öğrencisi olarak teorik eğitimimi pratik endüstriyel ve akademik projelerle desteklemekteyim. Yazılım geliştirme sürecinde Bilgisayarlı Görü (Computer Vision), Derin Öğrenme, Web ve Mobil Uygulama mimarilerinde hem arka uç (Backend/AI) hem de kullanıcı arayüzü (Frontend) alanlarında uygulamalı deneyim sahibiyim.",
      en: "As a Computer Engineering student at Gazi University, I reinforce my theoretical background with practical industrial and academic projects. Throughout the software development lifecycle, I have hands-on experience in both backend (Backend/AI) and frontend architectures across Computer Vision, Deep Learning, Web, and Mobile applications."
    },
    stats: [
      {
        value: "Gazi Üni.",
        label: { tr: "Bilgisayar Mühendisliği", en: "Computer Engineering" }
      },
      {
        value: "ODTÜ Teknokent",
        label: { tr: "AI & Computer Vision Stajı", en: "AI & CV Internship" }
      },
      {
        value: "5+",
        label: { tr: "Uçtan Uca Proje", en: "End-to-End Projects" }
      },
      {
        value: "AI & Backend",
        label: { tr: "Odak Alanları", en: "Core Focus Areas" }
      }
    ]
  },

  experience: [
    {
      id: "wellztech",
      period: {
        tr: "07.2026 - 08.2026",
        en: "07.2026 - 08.2026"
      },
      company: {
        tr: "Wellztech Teknoloji (ODTÜ Teknokent)",
        en: "Wellztech Technology (METU Technopolis)"
      },
      role: {
        tr: "Stajyer Mühendis",
        en: "Intern Engineer"
      },
      location: {
        tr: "Ankara, Türkiye",
        en: "Ankara, Turkey"
      },
      badge: {
        tr: "Bilgisayarlı Görü & Derin Öğrenme",
        en: "Computer Vision & Deep Learning"
      },
      highlights: {
        tr: [
          "\"Milk AI\" projesi kapsamında CCTV video analitiği, iki aşamalı insan tespiti ve poz kestirimi (pose estimation) üzerine çalışıldı.",
          "Aksiyon tanıma süreçlerini optimize etmek amacıyla RT-DETR, ViTPose ve GRU modelleri entegre edilerek uçtan uca bilgisayarlı görü boru hatları (pipeline) geliştirildi."
        ],
        en: [
          "Worked on CCTV video analytics, two-stage human detection, and pose estimation within the scope of the \"Milk AI\" project.",
          "Developed end-to-end computer vision pipelines by integrating RT-DETR, ViTPose, and GRU models to optimize action recognition processes."
        ]
      },
      tech: ["Python", "PyTorch", "RT-DETR", "ViTPose", "GRU", "OpenCV", "CCTV Analytics"]
    }
  ],

  education: [
    {
      id: "gazi-ce",
      period: {
        tr: "2022 - Devam Ediyor",
        en: "2022 - Present"
      },
      institution: {
        tr: "Gazi Üniversitesi",
        en: "Gazi University"
      },
      department: {
        tr: "Mühendislik Fakültesi, Bilgisayar Mühendisliği Bölümü",
        en: "Faculty of Engineering, Department of Computer Engineering"
      },
      degree: {
        tr: "Lisans Derecesi",
        en: "Bachelor's Degree (B.Sc.)"
      },
      location: {
        tr: "Maltepe / Ankara",
        en: "Maltepe / Ankara"
      },
      highlights: {
        tr: [
          "Veri Yapıları ve Algoritmalar, Nesne Yönelimli Programlama, İşletim Sistemleri, Bilgisayar Ağları, Yapay Zeka ve Makine Öğrenmesi odaklı mühendislik eğitimi.",
          "Akademik araştırmalar ve uçtan uca yazılım mimarisi projeleriyle teorik bilginin pratiğe dönüştürülmesi."
        ],
        en: [
          "Core engineering education focused on Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, Computer Networks, AI, and Machine Learning.",
          "Translating theoretical knowledge into practice through academic research and end-to-end software architecture projects."
        ]
      }
    }
  ],

  projects: [
    {
      id: "fokus",
      title: {
        tr: "FOKUS — Fiziksel Odak Koruma ve Uyarı Sistemi",
        en: "FOKUS — Physical Focus Protection & Alert System"
      },
      shortTitle: "FOKUS",
      category: "ai-system",
      categoryLabel: {
        tr: "Sistem & Bilgisayarlı Görü",
        en: "Systems & Computer Vision"
      },
      featured: true,
      icon: "eye",
      accent: "#06b6d4",
      summary: {
        tr: "Kamera modülünden Named Pipe ile alınan verilere göre odak puanı hesaplayan ve JSON kurallarıyla dikkat dağıtıcı uygulamaları işletim sistemi seviyesinde askıya alan karar motoru.",
        en: "A decision engine that calculates focus scores from camera data via Named Pipes and suspends distracting processes at the OS level using configurable JSON rules."
      },
      details: {
        tr: [
          "Kamera modülünden gerçek zamanlı olarak Named Pipe (İsimli Boru) protokolü ile aktarılan verileri işleyerek kullanıcının anlık odak puanını hesaplar.",
          "Özelleştirilebilir JSON kural motoru sayesinde odak düşüşü tespit edildiğinde dikkat dağıtıcı masaüstü uygulamalarını Windows API üzerinden işletim sistemi seviyesinde otomatik olarak askıya alır (suspend/resume).",
          "Düşük gecikmeli süreçler arası iletişim (IPC) ve güvenli kaynak yönetimi mimarisiyle tasarlanmıştır."
        ],
        en: [
          "Processes real-time telemetry received from the camera module via Named Pipe IPC protocol to compute an instant user focus score.",
          "Automatically suspends and resumes distracting desktop applications at the OS level via Windows API based on customizable JSON rule definitions.",
          "Engineered with low-latency Inter-Process Communication (IPC) and safe system process handle management."
        ]
      },
      tech: ["C#", ".NET 9", "Windows API", "Named Pipes (IPC)", "JSON Rule Engine"],
      github: "https://github.com/HasanG55"
    },
    {
      id: "clickbait-detector",
      title: {
        tr: "Clickbait Detector — Tık Tuzağı Haber Tespit Projesi",
        en: "Clickbait Detector — NLP News Headline Analyzer"
      },
      shortTitle: "Clickbait Detector",
      category: "ai",
      categoryLabel: {
        tr: "Yapay Zeka & NLP",
        en: "AI & NLP"
      },
      featured: true,
      icon: "brain",
      accent: "#8b5cf6",
      summary: {
        tr: "32.000 satırlık veri seti üzerinde Doğal Dil İşleme (NLP) ve Makine Öğrenmesi (SVM) modeli eğitilerek tarayıcı üzerinde çalışan Flask API ve Chrome eklentisi geliştirildi.",
        en: "Trained an NLP and SVM machine learning model on a 32,000-row dataset and deployed it via a Flask REST API integrated with a live Chrome browser extension."
      },
      details: {
        tr: [
          "32.000 satırlık haber başlığı veri seti üzerinde NLTK ile metin ön işleme, kök bulma ve TF-IDF öznitelik çıkarımı gerçekleştirildi.",
          "Scikit-Learn kullanılarak Destek Vektör Makineleri (SVM) sınıflandırma modeli eğitildi ve yüksek doğruluk oranıyla optimize edildi.",
          "Eğitilen modeli gerçek zamanlı sunmak için Python Flask tabanlı bir REST API ve kullanıcıların tarayıcıda gezinirken anlık analiz yapabilmesini sağlayan Chrome eklentisi geliştirildi."
        ],
        en: [
          "Performed text preprocessing, tokenization, and TF-IDF feature extraction using NLTK on a 32,000-row news headline dataset.",
          "Trained and tuned a Support Vector Machine (SVM) classifier with Scikit-Learn for high-accuracy clickbait detection.",
          "Built a Python Flask REST API backend and a custom Chrome Extension allowing users to analyze headlines in real time while browsing."
        ]
      },
      tech: ["Python", "Scikit-Learn", "NLTK", "SVM", "Flask", "JavaScript", "Chrome Extension"],
      github: "https://github.com/HasanG55"
    },
    {
      id: "smart-irrigation",
      title: {
        tr: "Solar Powered Smart Irrigation Project",
        en: "Solar Powered Smart Irrigation Project"
      },
      shortTitle: "Smart Irrigation IoT",
      category: "backend",
      categoryLabel: {
        tr: "Backend & IoT",
        en: "Backend & IoT"
      },
      featured: true,
      icon: "cpu",
      accent: "#10b981",
      summary: {
        tr: "IoT tabanlı akıllı sulama projesinde kullanıcı müdahalesini ve acil durum bildirimlerini yöneten backend servisleri ve spam korumalı e-posta bildirim modülü geliştirildi.",
        en: "Developed Java Spring Boot backend services managing user overrides, emergency alerts, and a spam-protected SMTP notification module for an IoT solar irrigation system."
      },
      details: {
        tr: [
          "Güneş enerjisiyle çalışan IoT tabanlı akıllı sulama sisteminin merkezi arka uç (backend) servisleri Java ve Spring Boot ile geliştirildi.",
          "Sensör verilerine göre otonom sulama kararlarının yanı sıra uzaktan kullanıcı müdahalesini (manual override) yöneten RESTful API uç noktaları tasarlandı.",
          "Kritik eşik değerleri ve acil durumlar için Google SMTP entegrasyonlu, hız sınırlamalı (rate-limited / spam korumalı) akıllı e-posta bildirim modülü inşa edildi."
        ],
        en: [
          "Architected central backend microservices in Java and Spring Boot for a solar-powered IoT smart irrigation system.",
          "Designed RESTful API endpoints handling sensor telemetry, autonomous irrigation schedules, and remote manual user overrides.",
          "Implemented a spam-protected, rate-limited emergency email alerting module powered by Google SMTP."
        ]
      },
      tech: ["Java", "Spring Boot", "REST API", "Google SMTP", "IoT Backend"],
      github: "https://github.com/HasanG55"
    },
    {
      id: "tempshare",
      title: {
        tr: "TempShare — Güvenli Geçici Dosya Paylaşım Projesi",
        en: "TempShare — Secure Ephemeral File Sharing"
      },
      shortTitle: "TempShare",
      category: "backend",
      categoryLabel: {
        tr: "Web & Backend Güvenliği",
        en: "Web & Backend Security"
      },
      featured: false,
      icon: "shield",
      accent: "#f59e0b",
      summary: {
        tr: "Node.js ve Express.js kullanılarak kimlik doğrulama ve dosya transfer süreçlerini yöneten güvenli backend servisi ve loglama mimarisi oluşturuldu.",
        en: "Built a secure Node.js and Express.js backend service managing encrypted authentication, temporary file transfers, and structured audit logging."
      },
      details: {
        tr: [
          "Node.js ve Express.js üzerinde uçtan uca geçici dosya yükleme, süre bazlı erişim kontrolü ve güvenli indirme akışları geliştirildi.",
          "Bcrypt tabanlı parola özetleme (hashing) ile kimlik doğrulama ve yetkisiz erişim koruma katmanları eklendi.",
          "Dosya transfer yaşam döngüsünü ve sistem olaylarını izlemek için detaylı bir loglama mimarisi ve duyarlı web arayüzü oluşturuldu."
        ],
        en: [
          "Developed temporary file upload, time-bound access control, and secure download workflows using Node.js and Express.js.",
          "Integrated Bcrypt password hashing for authentication and protected file access layers.",
          "Created a comprehensive audit logging architecture alongside a clean HTML/CSS user interface."
        ]
      },
      tech: ["Node.js", "Express.js", "Bcrypt", "HTML5", "CSS3", "Security Logging"],
      github: "https://github.com/HasanG55"
    },
    {
      id: "tictactoe-android",
      title: {
        tr: "Tic Tac Toe — Modüler Android Mobil Oyunu",
        en: "Tic Tac Toe — Modular Android Mobile Game"
      },
      shortTitle: "Tic Tac Toe Android",
      category: "mobile",
      categoryLabel: {
        tr: "Mobil Uygulama",
        en: "Mobile Application"
      },
      featured: false,
      icon: "smartphone",
      accent: "#ec4899",
      summary: {
        tr: "Android Studio ve XML kullanılarak farklı ekran boyutlarına duyarlı (responsive) modüler mobil oyun arayüzü ve tema motoru tasarlandı.",
        en: "Designed a responsive, modular Android mobile game UI and dynamic theme engine using Java, XML, and Android Studio."
      },
      details: {
        tr: [
          "Android Studio ortamında Java ve XML kullanılarak farklı ekran çözünürlüklerine ve cihaz boyutlarına tam uyumlu (responsive) oyun arayüzü geliştirildi.",
          "Kullanıcı deneyimini zenginleştiren dinamik tema motoru ve temiz durum yönetimi (state management) mimarisi uygulandı."
        ],
        en: [
          "Built a fully responsive mobile game interface adapting to diverse screen sizes and densities using Java and XML in Android Studio.",
          "Implemented a modular custom theme engine and clean game-state management architecture."
        ]
      },
      tech: ["Java", "XML", "Android Studio", "Responsive UI"],
      github: "https://github.com/HasanG55"
    }
  ],

  skills: [
    {
      category: {
        tr: "Programlama Dilleri",
        en: "Programming Languages"
      },
      icon: "code",
      description: {
        tr: "Algoritma, sistem programlama ve uygulama geliştirmede kullandığım temel diller.",
        en: "Core languages used in algorithms, systems programming, and application development."
      },
      items: [
        { name: "Python", level: 92, tag: "AI / Backend" },
        { name: "Java", level: 88, tag: "Spring / Android" },
        { name: "C#", level: 85, tag: ".NET 9 / WinAPI" },
        { name: "C", level: 80, tag: "System / Core" },
        { name: "JavaScript", level: 85, tag: "Web / Node.js" }
      ]
    },
    {
      category: {
        tr: "Yapay Zeka & Bilgisayarlı Görü",
        en: "AI & Computer Vision"
      },
      icon: "eye",
      description: {
        tr: "Video analitiği, nesne tespiti, poz kestirimi ve doğal dil işleme teknolojileri.",
        en: "Video analytics, object detection, pose estimation, and natural language processing."
      },
      items: [
        { name: "PyTorch", level: 88, tag: "Deep Learning" },
        { name: "OpenCV", level: 90, tag: "Image Processing" },
        { name: "RT-DETR", level: 85, tag: "Object Detection" },
        { name: "ViTPose & GRU", level: 84, tag: "Pose & Action" },
        { name: "Scikit-Learn & NLTK", level: 86, tag: "ML & NLP" }
      ]
    },
    {
      category: {
        tr: "Web & Backend Mimarisi",
        en: "Web & Backend Architecture"
      },
      icon: "server",
      description: {
        tr: "Ölçeklenebilir API tasarımı, güvenlik, kimlik doğrulama ve modern web arayüzleri.",
        en: "Scalable API design, security, authentication, and modern web interfaces."
      },
      items: [
        { name: "Spring Boot", level: 86, tag: "Java Enterprise" },
        { name: "Node.js & Express.js", level: 85, tag: "REST Backend" },
        { name: "Flask", level: 88, tag: "Python API" },
        { name: "REST API & SMTP", level: 90, tag: "Integration" },
        { name: "HTML5 & CSS3", level: 88, tag: "Frontend UI" }
      ]
    },
    {
      category: {
        tr: "Geliştirme Araçları & Yetkinlikler",
        en: "Dev Tools & Competencies"
      },
      icon: "terminal",
      description: {
        tr: "Versiyon kontrolü, işletim sistemleri, geliştirme ortamları ve yabancı dil.",
        en: "Version control, operating systems, development environments, and languages."
      },
      items: [
        { name: "Git & GitHub", level: 90, tag: "Version Control" },
        { name: "Linux / Ubuntu", level: 84, tag: "OS / Shell" },
        { name: "Android Studio", level: 82, tag: "Mobile Dev" },
        { name: "VS Code", level: 95, tag: "IDE" },
        { name: "İngilizce (B1)", level: 70, tag: "Foreign Language" }
      ]
    }
  ],

  certificates: [
    {
      title: "Introduction to Cybersecurity",
      issuer: "CISCO Networking Academy",
      icon: "shield",
      tag: { tr: "Siber Güvenlik", en: "Cybersecurity" }
    },
    {
      title: "Linux Unhatched",
      issuer: "CISCO Networking Academy",
      icon: "terminal",
      tag: { tr: "Linux Sistemler", en: "Linux Systems" }
    },
    {
      title: "Veri Bilimine Giriş",
      issuer: "BTK Akademi",
      icon: "database",
      tag: { tr: "Veri Bilimi & Analitik", en: "Data Science" }
    }
  ],

  ui: {
    tr: {
      navAbout: "Hakkımda",
      navProjects: "Projeler",
      navExperience: "Deneyim & Eğitim",
      navSkills: "Yetenekler",
      navContact: "İletişim",
      btnCvPreview: "CV Görüntüle / İndir",
      heroBadge: "Gazi Üniversitesi • Bilgisayar Mühendisliği",
      heroGreeting: "Merhaba, ben",
      heroPrimaryBtn: "Projelerimi Keşfet",
      heroSecondaryBtn: "İnteraktif CV & PDF",
      heroContactBtn: "İletişime Geç",
      terminalTitle: "hasan@gazi-ai-lab: ~/vision-pipeline",
      projectsBadge: "PORTFOLYO & MİMARİ",
      projectsTitle: "Akademik ve Bireysel Projeler",
      projectsSubtitle: "Bilgisayarlı görü, doğal dil işleme, IoT backend servisleri ve işletim sistemi seviyesinde geliştirdiğim uçtan uca yazılım projeleri.",
      filterAll: "Tümü",
      filterAi: "Yapay Zeka & Görü",
      filterBackend: "Backend & Web",
      filterMobile: "Mobil",
      cardDetailsBtn: "Mimari Detaylar",
      cardGithubBtn: "GitHub",
      expBadge: "KARİYER & AKADEMİK GEÇMİŞ",
      expTitle: "Deneyim, Eğitim ve Sertifikalar",
      expSubtitle: "Endüstriyel Ar-Ge staj deneyimim, üniversite eğitimim ve tamamladığım teknik sertifikasyonlar.",
      tabExperience: "İş & Staj Deneyimi",
      tabEducation: "Eğitim",
      certTitle: "Sertifikalar & Başarılar",
      skillsBadge: "TEKNİK YETKİNLİKLER",
      skillsTitle: "Teknoloji Yığını & Yetenekler",
      skillsSubtitle: "Yapay zeka boru hatlarından arka uç servislerine kadar aktif olarak kullandığım diller, kütüphaneler ve araçlar.",
      contactBadge: "İLETİŞİM & BAĞLANTILAR",
      contactTitle: "Birlikte Çalışalım",
      contactSubtitle: "Staj, proje iş birlikleri, açık kaynak katkıları veya teknik konular üzerine konuşmak için bana doğrudan ulaşabilirsiniz.",
      formName: "Adınız Soyadınız",
      formEmail: "E-posta Adresiniz",
      formSubject: "Konu",
      formMessage: "Mesajınız",
      formSubmit: "E-posta Gönder",
      copyText: "Kopyala",
      copiedText: "Kopyalandı!",
      cvModalTitle: "Resmi Özgeçmiş (CV) Önizleme",
      cvPrintBtn: "PDF Olarak İndir / Yazdır",
      cvCloseBtn: "Kapat",
      cmdPlaceholder: "Komut yazın veya bölüm arayın... (Örn: CV, GitHub, Projeler)"
    },
    en: {
      navAbout: "About",
      navProjects: "Projects",
      navExperience: "Experience & Education",
      navSkills: "Skills",
      navContact: "Contact",
      btnCvPreview: "View / Download CV",
      heroBadge: "Gazi University • Computer Engineering",
      heroGreeting: "Hello, I'm",
      heroPrimaryBtn: "Explore Projects",
      heroSecondaryBtn: "Interactive CV & PDF",
      heroContactBtn: "Get in Touch",
      terminalTitle: "hasan@gazi-ai-lab: ~/vision-pipeline",
      projectsBadge: "PORTFOLIO & ARCHITECTURE",
      projectsTitle: "Academic & Personal Projects",
      projectsSubtitle: "End-to-end software projects spanning computer vision, natural language processing, IoT backend services, and OS-level tools.",
      filterAll: "All",
      filterAi: "AI & Vision",
      filterBackend: "Backend & Web",
      filterMobile: "Mobile",
      cardDetailsBtn: "Architecture Details",
      cardGithubBtn: "GitHub",
      expBadge: "CAREER & ACADEMIC BACKGROUND",
      expTitle: "Experience, Education & Certificates",
      expSubtitle: "My industrial R&D internship experience, university education, and technical certifications.",
      tabExperience: "Work & Internship",
      tabEducation: "Education",
      certTitle: "Certificates & Achievements",
      skillsBadge: "TECHNICAL COMPETENCIES",
      skillsTitle: "Tech Stack & Skills",
      skillsSubtitle: "Languages, frameworks, and tools I actively use across AI pipelines and backend architectures.",
      contactBadge: "CONTACT & LINKS",
      contactTitle: "Let's Connect",
      contactSubtitle: "Feel free to reach out for internships, project collaborations, open-source contributions, or tech discussions.",
      formName: "Your Full Name",
      formEmail: "Your Email Address",
      formSubject: "Subject",
      formMessage: "Your Message",
      formSubmit: "Send Email",
      copyText: "Copy",
      copiedText: "Copied!",
      cvModalTitle: "Official Resume (CV) Preview",
      cvPrintBtn: "Download PDF / Print",
      cvCloseBtn: "Close",
      cmdPlaceholder: "Type a command or search sections... (e.g., CV, GitHub, Projects)"
    }
  }
};
