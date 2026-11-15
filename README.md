# 🌐 Hasan Gürses — Kişisel Portfolyo & İnteraktif CV (`hasangurses.com`)

Gazi Üniversitesi Bilgisayar Mühendisliği öğrencisi **Hasan Gürses** için özel olarak tasarlanmış; yaratıcı, interaktif ve animasyon odaklı kişisel web sitesi ve CV platformu.

## ✨ Öne Çıkan Özellikler

1. **İnteraktif Yapay Zeka & Bilgisayarlı Görü Arka Planı (`#neural-canvas`):** Fare hareketlerinize duyarlı, gerçek zamanlı düğüm bağlantıları (keypoint & neural graph) oluşturan özel HTML5 Canvas animasyonu.
2. **Canlı Kod & Mimari Terminali (Hero):** Wellztech (ODTÜ Teknokent) *Milk AI* bilgisayarlı görü boru hattı (`vision_pipeline.py`), *FOKUS* `.NET 9 / Windows API` karar motoru (`fokus_engine.cs`) ve geliştirici manifestosu (`profile.json`) arasında geçiş yapılabilen interaktif terminal kartı.
3. **3D Perspektif & Spotlight Destekli Proje Vitrini:** Kategorilere göre filtrelenebilen (`Tümü`, `Yapay Zeka & Görü`, `Backend & Web`, `Mobil`), üzerine gelindiğinde 3D eğim ve ışık efekti veren proje kartları + her proje için detaylı mimari modal penceresi.
4. **Tek Tıkla Resmi CV Önizleme & PDF İndirme:** Sitedeki **"CV Görüntüle / İndir"** butonuna tıklandığında açılan resmi A4 formatındaki özgeçmiş önizlemesi ve özel `@media print` kurallarıyla **1 sayfalık kusursuz PDF çıktısı** alma özelliği.
5. **Çift Dil (`TR` / `EN`) & Çift Tema (`Dark` / `Light`):** Yurt dışı başvuruları için tek tıkla Türkçe/İngilizce geçişi ve Koyu/Açık tema desteği.
6. **Hızlı Komut Paleti (`Ctrl + K`):** Klavyeden `Ctrl + K` (veya üst menüdeki `⌘ Ctrl+K` butonu) ile bölümlere hızlıca gitme, e-posta kopyalama veya CV indirme.
7. **Tek Dosyadan Kolay Yönetim:** Tüm CV bilgileri, projeler, sertifikalar ve iletişim bilgileri `js/data.js` dosyasındadır. HTML kodlarına dokunmadan sadece `js/data.js` dosyasını düzenleyerek siteyi güncelleyebilirsiniz.

---

## 📁 Proje Klasör Yapısı

```text
hasangurses.com/
├── index.html       # Ana sayfa ve modallar (Proje detay, CV PDF önizleme, Komut paleti)
├── CNAME            # GitHub Pages özel alan adı (hasangurses.com) tanımı
├── css/
│   └── style.css    # Tüm modern stiller, animasyonlar ve PDF yazdırma (@media print) kuralları
└── js/
    ├── data.js      # Tüm kişisel bilgiler, CV, projeler ve TR/EN çevirileri (Tek merkezden yönetim)
    └── main.js      # Canvas animasyonu, 3D tilt, filtreleme, daktilo efekti ve uygulama mantığı
```

---

## 🚀 `hasangurses.com` Alan Adı (Domain) ile Ücretsiz Yayınlama Rehberi

Bu proje saf HTML/CSS/JS ile sıfır bağımlılıkla geliştirildiği için **sunucu ücreti ödemeden (0 TL)** **GitHub Pages**, **Vercel** veya **Netlify** üzerinden `hasangurses.com` alan adınızla saniyeler içinde yayınlanabilir.

### Seçenek 1: GitHub Pages ile Yayınlama (Önerilen)
1. GitHub hesabınızda (`github.com/HasanG55`) **`hasangurses.com`** veya **`HasanG55.github.io`** adında Public bir repo oluşturun.
2. Bu klasördeki tüm dosyaları (`index.html`, `CNAME`, `css/`, `js/`) repoya yükleyin.
3. Reponuzun **Settings → Pages** sekmesine gidin ve **Branch** olarak `main` seçip kaydedin.
4. Domaini satın aldığınız firmanın (Turhost, Güzel Hosting, Cloudflare, Namecheap, GoDaddy vb.) **DNS Yönetim Paneli**ne gidip şu kayıtları ekleyin:
   - **A Kayıtları (`@` veya `hasangurses.com` için):**
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME Kaydı (`www` için):**
     - Ad: `www` → Hedef: `hasang55.github.io`
5. GitHub Pages ayarlarında **Enforce HTTPS** kutucuğunu işaretleyin (ücretsiz SSL sertifikası otomatik tanımlanır).

### Seçenek 2: Vercel veya Netlify ile Yayınlama
1. [Vercel](https://vercel.com) veya [Netlify](https://netlify.com) hesabınıza GitHub ile giriş yapın.
2. Projeyi sürükle-bırak yapın veya GitHub reponuzu bağlayın.
3. **Domains** sekmesinden `hasangurses.com` alan adınızı ekleyin ve ekranda verilen DNS yönlendirmesini domain panelinize girin.
