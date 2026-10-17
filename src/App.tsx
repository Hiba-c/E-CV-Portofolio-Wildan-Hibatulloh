import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Briefcase,
  Mail,
  MapPin,
  ArrowRight,
  Download,
  Send,
  Award,
  CheckCircle2,
  X,
  ExternalLink,
  Menu,
  Sun,
  Moon,
  ShieldCheck,
  Calendar,
  Copy,
  Check,
} from 'lucide-react';

interface Certification {
  id: string;
  credentialCode: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  skills: string[];
  description: string;
}

export default function App() {
  const [activeNav, setActiveNav] = useState<'beranda' | 'tentang' | 'proyek' | 'sertifikasi' | 'kontak'>('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [aboutPhoto, setAboutPhoto] = useState<'creative' | 'formal'>('creative');

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('wildan_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('wildan_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('wildan_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsContactModalOpen(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  const handleCopyId = (idText: string) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const projects = [
    {
      id: 1,
      title: 'KAH - Langit Tour & ERP',
      description: 'Sistem informasi pariwisata dan manajemen reservasi berbasis web.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      tags: ['Laravel', 'MySQL', 'TailwindCSS'],
      details: 'Platform digital terintegrasi untuk perusahaan agen pariwisata dengan fitur reservasi paket wisata, manajemen inventaris hotel, invoice otomatis, dan dashboard keuangan real-time.',
    },
    {
      id: 2,
      title: 'Mobile App Design',
      description: 'Desain UI/UX aplikasi mobile untuk mendukung proses pembelajaran.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
      tags: ['Figma', 'UI/UX', 'Design'],
      details: 'Rancangan antarmuka pengguna komprehensif untuk aplikasi mobile edutech, dilengkapi design system, flow pendaftaran terarah, kuis interaktif, dan gamifikasi progres belajar.',
    },
    {
      id: 3,
      title: 'Sosial Media Content',
      description: 'Video dan foto untuk kebutuhan promosi, edukasi, dan storytelling.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      tags: ['Premiere Pro', 'CapCut', 'Content'],
      details: 'Produksi video vertikal Reels/TikTok dan feed promosi visual berorientasi engagement tinggi, mencakup proses riset naskah, pengambilan gambar sinematik, color grading, dan motion graphics.',
    },
    {
      id: 4,
      title: 'Branding & Visual Identity',
      description: 'Desain logo, feed Instagram, dan materi promosi.',
      image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=800&q=80',
      tags: ['Illustrator', 'Photoshop', 'Branding'],
      details: 'Pembangunan identitas visual menyeluruh mencakup pedoman logo (guidelines), palet warna korporat, tipografi, kartu nama, kop surat, hingga paket template media sosial.',
    },
  ];

  const certifications: Certification[] = [
    {
      id: 'cert-1',
      title: 'BNSP Certified Junior Web Developer',
      issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
      year: '2023',
      credentialCode: 'BNSP-JWD-77491-2023',
      category: 'Web Development',
      skills: ['HTML5 & CSS3', 'JavaScript Modern', 'RESTful API', 'MySQL Database', 'Git Version Control'],
      description:
        'Sertifikasi kompetensi kerja berstandar nasional (SKKNI). Memvalidasi keahlian perancangan arsitektur web modern, integrasi database relasional, penerapan clean code, dan deployment aplikasi.',
    },
    {
      id: 'cert-2',
      title: 'Belajar Fundamental Front-End Web Development',
      issuer: 'Dicoding Academy Indonesia',
      year: '2023',
      credentialCode: 'DICODING-FE-88124',
      category: 'Frontend Engineering',
      skills: ['Web Components', 'Custom Elements', 'Fetch API', 'Webpack Bundler', 'Shadow DOM'],
      description:
        'Kurikulum terakreditasi industri teknologi global. Mengembangkan aplikasi web modular berbasis komponen kustom, arsitektur single-page app (SPA), dan optimasi performa rendering.',
    },
    {
      id: 'cert-3',
      title: 'Google UX Design Specialization',
      issuer: 'Google Career Certificates & Coursera',
      year: '2022',
      credentialCode: 'GGL-UX-990142',
      category: 'UI/UX Design',
      skills: ['User Research', 'Wireframing', 'Figma Prototyping', 'Usability Testing', 'Design Systems'],
      description:
        'Spesialisasi profesional komprehensif dari Google yang mencakup seluruh siklus UX: riset pengguna, perumusan persona, arsitektur informasi, perancangan prototipe interaktif di Figma, dan audit aksesibilitas.',
    },
    {
      id: 'cert-4',
      title: 'UI/UX Design Masterclass & Prototyping',
      issuer: 'BuildWithAngga',
      year: '2022',
      credentialCode: 'BWA-UIUX-5521',
      category: 'Product Design',
      skills: ['Design System', 'Auto Layout Figma', 'Micro-interactions', 'Design Handoff'],
      description:
        'Pelatihan praktis desain antarmuka produk digital dengan standar tim industri. Fokus pada pembuatan token warna, hierarki komponen atomik, dan penyusunan prototipe dengan micro-interaction realistis.',
    },
    {
      id: 'cert-5',
      title: 'Belajar Dasar Pemrograman JavaScript',
      issuer: 'Dicoding Academy Indonesia',
      year: '2022',
      credentialCode: 'DICODING-JS-33108',
      category: 'Programming',
      skills: ['OOP JavaScript', 'Functional Programming', 'Async/Await', 'Unit Testing', 'Error Handling'],
      description:
        'Pendalaman logika pemrograman tingkat tinggi, penguasaan paradigma asynchronous JavaScript, penanganan state fungsional, dan penulisan unit testing otomatis menggunakan Jest framework.',
    },
    {
      id: 'cert-6',
      title: 'Database Design & SQL Specialist',
      issuer: 'Digital Talent Scholarship - Kominfo',
      year: '2023',
      credentialCode: 'DTS-KOMINFO-4402',
      category: 'Database Management',
      skills: ['Relational Schema', 'Query Optimization', 'Database Normalization', 'Index Tuning'],
      description:
        'Program sertifikasi keahlian pengelolaan basis data relasional. Mencakup normalisasi data 3NF, pembuatan relasi kompleks, indexing performa tinggi, dan optimasi query skala enterprise.',
    },
  ];

  const scrollToSection = (id: string, navKey: 'beranda' | 'tentang' | 'proyek' | 'sertifikasi' | 'kontak') => {
    setActiveNav(navKey);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] dark:bg-[#0B1315] text-[#2C3E50] dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#0F5B66] selection:text-white transition-colors duration-300">
      {/* ========================================================= */}
      {/* NAVBAR                                                    */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 bg-[#F8FAF9]/95 dark:bg-[#0B1315]/95 backdrop-blur-md border-b border-gray-100 dark:border-[#1A2E33] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('beranda', 'beranda');
            }}
            className="flex items-center"
          >
            <BrandLogo isDark={isDarkMode} />
          </a>

          {/* Desktop Navigation & Theme Switcher */}
          <div className="hidden md:flex items-center space-x-7">
            <nav className="flex items-center space-x-7 text-xs font-bold tracking-widest text-gray-600 dark:text-slate-300">
              <button
                onClick={() => scrollToSection('beranda', 'beranda')}
                className={`pb-1 transition-all relative ${
                  activeNav === 'beranda'
                    ? 'text-[#0F5B66] dark:text-[#2DD4BF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0F5B66] dark:after:bg-[#2DD4BF]'
                    : 'hover:text-[#0F5B66] dark:hover:text-[#2DD4BF]'
                }`}
              >
                BERANDA
              </button>
              <button
                onClick={() => scrollToSection('tentang-saya', 'tentang')}
                className={`pb-1 transition-all relative ${
                  activeNav === 'tentang'
                    ? 'text-[#0F5B66] dark:text-[#2DD4BF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0F5B66] dark:after:bg-[#2DD4BF]'
                    : 'hover:text-[#0F5B66] dark:hover:text-[#2DD4BF]'
                }`}
              >
                TENTANG SAYA
              </button>
              <button
                onClick={() => scrollToSection('proyek', 'proyek')}
                className={`pb-1 transition-all relative ${
                  activeNav === 'proyek'
                    ? 'text-[#0F5B66] dark:text-[#2DD4BF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0F5B66] dark:after:bg-[#2DD4BF]'
                    : 'hover:text-[#0F5B66] dark:hover:text-[#2DD4BF]'
                }`}
              >
                PROYEK
              </button>
              <button
                onClick={() => scrollToSection('pelatihan', 'sertifikasi')}
                className={`pb-1 transition-all relative ${
                  activeNav === 'sertifikasi'
                    ? 'text-[#0F5B66] dark:text-[#2DD4BF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0F5B66] dark:after:bg-[#2DD4BF]'
                    : 'hover:text-[#0F5B66] dark:hover:text-[#2DD4BF]'
                }`}
              >
                PELATIHAN
              </button>
              <button
                onClick={() => scrollToSection('kontak', 'kontak')}
                className={`pb-1 transition-all relative ${
                  activeNav === 'kontak'
                    ? 'text-[#0F5B66] dark:text-[#2DD4BF] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0F5B66] dark:after:bg-[#2DD4BF]'
                    : 'hover:text-[#0F5B66] dark:hover:text-[#2DD4BF]'
                }`}
              >
                KONTAK
              </button>
            </nav>

            {/* Dark / Light Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
              title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
              className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-[#152529] dark:hover:bg-[#1c3338] text-gray-700 dark:text-teal-300 border border-gray-200 dark:border-[#22393F] transition-all cursor-pointer shadow-xs"
            >
              {isDarkMode ? (
                <Sun size={17} className="text-amber-400 rotate-0 transition-transform duration-300" />
              ) : (
                <Moon size={17} className="text-[#0F5B66] transition-transform duration-300" />
              )}
              <span className="text-[11px] font-bold tracking-wide uppercase pr-1">
                {isDarkMode ? 'LIGHT' : 'DARK'}
              </span>
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-gray-100 dark:bg-[#152529] text-gray-700 dark:text-teal-300 border border-gray-200 dark:border-[#22393F]"
            >
              {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-[#0F5B66]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-slate-300 hover:text-[#0F5B66] rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#121E21] border-b border-gray-100 dark:border-[#1E3237] px-6 py-4 space-y-3 shadow-lg">
            <button
              onClick={() => scrollToSection('beranda', 'beranda')}
              className="block w-full text-left py-2 text-xs font-bold tracking-widest text-[#0F5B66] dark:text-[#2DD4BF]"
            >
              BERANDA
            </button>
            <button
              onClick={() => scrollToSection('tentang-saya', 'tentang')}
              className="block w-full text-left py-2 text-xs font-bold tracking-widest text-gray-700 dark:text-slate-200 hover:text-[#0F5B66] dark:hover:text-[#2DD4BF]"
            >
              TENTANG SAYA
            </button>
            <button
              onClick={() => scrollToSection('proyek', 'proyek')}
              className="block w-full text-left py-2 text-xs font-bold tracking-widest text-gray-700 dark:text-slate-200 hover:text-[#0F5B66] dark:hover:text-[#2DD4BF]"
            >
              PROYEK
            </button>
            <button
              onClick={() => scrollToSection('pelatihan', 'sertifikasi')}
              className="block w-full text-left py-2 text-xs font-bold tracking-widest text-gray-700 dark:text-slate-200 hover:text-[#0F5B66] dark:hover:text-[#2DD4BF]"
            >
              PELATIHAN
            </button>
            <button
              onClick={() => scrollToSection('kontak', 'kontak')}
              className="block w-full text-left py-2 text-xs font-bold tracking-widest text-gray-700 dark:text-slate-200 hover:text-[#0F5B66] dark:hover:text-[#2DD4BF]"
            >
              KONTAK
            </button>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* HERO SECTION                                              */}
      {/* ========================================================= */}
      <section id="beranda" className="pt-8 pb-14 md:py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          {/* Grid remains 2 columns (side-by-side) on tablet (md:) and desktop (lg:) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Left Content (Text) */}
            <div className="md:col-span-7 space-y-4 lg:space-y-5">
              {/* Sub-bab Header Tanpa Strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.25em] text-[#0F5B66] dark:text-[#2DD4BF] uppercase block">
                  WELCOME TO MY PORTFOLIO
                </span>
              </motion.div>

              {/* Main Headline (scales responsively for mobile, tablet, and desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-0.5"
              >
                <h1 className="text-4xl sm:text-5xl md:text-[34px] lg:text-[54px] font-extrabold tracking-tight text-[#0F5B66] dark:text-[#2DD4BF] leading-[1.08]">
                  WILDAN
                  <br />
                  HIBATULLOH
                </h1>
                <p className="text-xs md:text-[11px] lg:text-sm font-bold tracking-[0.2em] text-gray-700 dark:text-slate-300 uppercase pt-1 lg:pt-2">
                  INFORMATION SYSTEMS STUDENT
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-[13px] md:text-[12.5px] lg:text-[14.5px] leading-relaxed text-gray-600 dark:text-slate-300 max-w-xl"
              >
                Saya adalah mahasiswa Sistem Informasi yang memiliki minat besar dalam teknologi, desain, dan
                pengembangan solusi digital. Berfokus pada pembelajaran, pengalaman proyek, dan kolaborasi untuk terus
                berkembang di bidang teknologi informasi.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-3 lg:gap-4 pt-2 lg:pt-3"
              >
                <button
                  onClick={() => scrollToSection('proyek', 'proyek')}
                  className="inline-flex items-center gap-2 bg-[#0F5B66] hover:bg-[#0c4750] dark:bg-[#137482] dark:hover:bg-[#0F5B66] text-white text-[11px] lg:text-xs font-bold tracking-wider uppercase px-5 lg:px-6 py-2.5 lg:py-3 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer group"
                >
                  <span>VIEW PROJECTS</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="inline-flex items-center gap-2 border-2 border-[#0F5B66] dark:border-[#2DD4BF] hover:bg-[#0F5B66]/5 dark:hover:bg-[#2DD4BF]/10 text-[#0F5B66] dark:text-[#2DD4BF] text-[11px] lg:text-xs font-bold tracking-wider uppercase px-5 lg:px-6 py-2 lg:py-2.5 rounded-full transition-all cursor-pointer"
                >
                  <span>DOWNLOAD CV</span>
                  <Download size={14} />
                </button>
              </motion.div>
            </div>

            {/* Right Hero Image / Artwork (Stays side-by-side in one row on tablet) */}
            <div className="md:col-span-5 flex justify-center md:justify-end relative">
              <div className="relative w-[280px] sm:w-[320px] md:w-[240px] lg:w-[380px] aspect-[4/5] flex items-end justify-center">
                {/* Backdrop shape with smooth motion */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: isDarkMode ? 0.8 : 0.9, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 bg-[#D7ECEE] dark:bg-[#143339] rounded-[48%_52%_42%_58%/46%_48%_52%_54%] scale-95 -z-10 transform translate-x-2 translate-y-2 transition-colors"
                  style={{
                    boxShadow: '0 20px 40px -15px rgba(15, 91, 102, 0.2)',
                  }}
                ></motion.div>

                {/* Ambient glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.25 }}
                  className="absolute w-[80%] h-[80%] bg-[#E8F6F7] dark:bg-[#0F4750]/30 rounded-full blur-xl -z-10 top-6 left-6"
                ></motion.div>

                {/* Portrait Photo Container with fade-in and slide-up */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full rounded-b-3xl overflow-hidden flex items-end justify-center"
                >
                  <img
                    src="/src/assets/images/wildan_hero_portrait_1792139929707.jpg"
                    alt="Wildan Hibatulloh Portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter brightness-[1.01] contrast-[1.02]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F8FAF9]/80 dark:from-[#0B1315]/90 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ABOUT & SKILLS SECTION (2 COLUMNS)                        */}
      {/* ========================================================= */}
      <section id="tentang-saya" className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: ABOUT ME */}
            <div className="lg:col-span-7 space-y-4">
              {/* Sub-bab Header Tanpa Strip */}
              <div className="mb-2">
                <h2 className="text-xs font-extrabold tracking-[0.25em] text-[#0F5B66] dark:text-[#2DD4BF] uppercase">
                  ABOUT ME
                </h2>
              </div>

              {/* Card Container */}
              <div className="bg-white dark:bg-[#121E21] rounded-2xl p-6 sm:p-7 border border-gray-100 dark:border-[#1E3237] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none space-y-6 transition-colors">
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className="w-28 sm:w-36 h-36 sm:h-44 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-[#22393F] bg-[#E8F6F7] dark:bg-[#152529] relative group">
                      <img
                        src={
                          aboutPhoto === 'creative'
                            ? '/src/assets/images/wildan_hero_portrait_1792139929707.jpg'
                            : '/src/assets/images/wildan_profile_photo_1792139841005.jpg'
                        }
                        alt="Wildan Hibatulloh"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-all duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-[9px] font-bold text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                        {aboutPhoto === 'creative' ? 'Studio' : 'Formal'}
                      </div>
                    </div>
                    {/* Toggle photo style */}
                    <div className="flex rounded-lg bg-gray-100 dark:bg-[#162529] p-0.5 text-[10px] font-bold border border-gray-200 dark:border-[#22393F]">
                      <button
                        type="button"
                        onClick={() => setAboutPhoto('creative')}
                        className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                          aboutPhoto === 'creative'
                            ? 'bg-[#0F5B66] text-white shadow-xs'
                            : 'text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white'
                        }`}
                      >
                        Studio
                      </button>
                      <button
                        type="button"
                        onClick={() => setAboutPhoto('formal')}
                        className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                          aboutPhoto === 'formal'
                            ? 'bg-[#0F5B66] text-white shadow-xs'
                            : 'text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white'
                        }`}
                      >
                        Formal
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">Hi, I'm</p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F5B66] dark:text-[#2DD4BF] tracking-tight">
                      WILDAN HIBATULLOH
                    </h3>
                    <p className="text-[13px] leading-relaxed text-gray-600 dark:text-slate-300 pt-1">
                      Saya adalah mahasiswa Sistem Informasi yang memiliki minat besar dalam teknologi, desain, dan
                      pengembangan solusi digital. Saya percaya bahwa teknologi dapat menjadi alat untuk menciptakan
                      dampak positif, dan saya terus belajar untuk memberikan kontribusi terbaik.
                    </p>
                  </div>
                </div>

                {/* 2 Info Sub-Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="bg-[#FAFBFB] dark:bg-[#162529] rounded-xl p-3.5 border border-gray-100 dark:border-[#22393F] flex items-center gap-3 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#0F5B66]/10 dark:bg-[#2DD4BF]/15 flex items-center justify-center text-[#0F5B66] dark:text-[#2DD4BF] shrink-0">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800 dark:text-slate-100 leading-tight">S1 Sistem Informasi</p>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-tight mt-0.5">Universitas Jenderal Soedirman</p>
                      <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5">2021 - Sekarang</p>
                    </div>
                  </div>

                  <div className="bg-[#FAFBFB] dark:bg-[#162529] rounded-xl p-3.5 border border-gray-100 dark:border-[#22393F] flex items-center gap-3 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#0F5B66]/10 dark:bg-[#2DD4BF]/15 flex items-center justify-center text-[#0F5B66] dark:text-[#2DD4BF] shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800 dark:text-slate-100 leading-tight">Banyumas</p>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-tight mt-0.5">Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: SKILLS */}
            <div className="lg:col-span-5 space-y-4">
              {/* Sub-bab Header Tanpa Strip */}
              <div className="mb-2">
                <h2 className="text-xs font-extrabold tracking-[0.25em] text-[#0F5B66] dark:text-[#2DD4BF] uppercase">
                  SKILLS
                </h2>
              </div>

              {/* Skills Card */}
              <div className="bg-white dark:bg-[#121E21] rounded-2xl p-6 border border-gray-100 dark:border-[#1E3237] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none space-y-6 transition-colors">
                {/* Desain & Produksi */}
                <div>
                  <h4 className="text-[11px] font-extrabold tracking-wider text-gray-700 dark:text-slate-200 uppercase mb-3">
                    DESAIN &amp; PRODUKSI
                  </h4>
                  <div className="grid grid-cols-5 gap-2.5 text-center">
                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-[#001E36] flex items-center justify-center text-[#31A8FF] font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                        Ps
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">Photoshop</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-[#330000] flex items-center justify-center text-[#FF9A00] font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                        Ai
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">Illustrator</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-[#00005B] flex items-center justify-center text-[#EA77FF] font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                        Pr
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">Premiere Pro</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-[#00005B] flex items-center justify-center text-[#9999FF] font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                        Ae
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">After Effects</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-gray-50 dark:bg-[#1A2C31] border border-gray-100 dark:border-[#263E44] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform p-2">
                        <svg viewBox="0 0 38 57" fill="none" className="w-full h-full">
                          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
                          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
                          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
                          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
                          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">Figma</span>
                    </div>
                  </div>
                </div>

                {/* Pengembangan */}
                <div>
                  <h4 className="text-[11px] font-extrabold tracking-wider text-gray-700 dark:text-slate-200 uppercase mb-3">
                    PENGEMBANGAN
                  </h4>
                  <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-center">
                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-100/60 dark:border-red-900/40 flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
                        <svg viewBox="0 0 50 50" fill="none" className="w-6 h-6">
                          <path d="M43.8 15.6L25.9 5.3C25.3 4.9 24.1 5.3L6.2 15.6C5.6 15.9 5.2 16.6 5.2 17.3V38C5.2 38.7 5.6 39.4 6.2 39.7L24.1 50C24.4 50.2 24.7 50.3 25 50.3C25.3 50.3 25.6 50.2 25.9 50L43.8 39.7C44.4 39.4 44.8 38.7 44.8 38V17.3C44.8 16.6 44.4 15.9 43.8 15.6Z" fill="#FF2D20" />
                          <path d="M25 8L41 17.2V35.6L25 44.8L9 35.6V17.2L25 8Z" fill="#FF4438" />
                          <path d="M25 21L33 16.5L33 25.5L25 30L25 21Z" fill="#FFFFFF" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">Laravel</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-100/60 dark:border-blue-900/40 flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
                        <svg viewBox="0 0 100 100" fill="none" className="w-7 h-7">
                          <path d="M85 45C85 25.7 69.3 10 50 10C30.7 10 15 25.7 15 45C15 57.5 21.5 68.5 31.4 74.8L28 85L41.2 78.4C44 79.4 47 80 50 80C69.3 80 85 64.3 85 45Z" fill="#00758F" />
                          <path d="M52 28C42 28 35 34 35 43C35 55 58 53 58 63C58 66 55 68 50 68C44 68 40 65 38 61L30 65C34 72 41 76 50 76C61 76 68 70 68 61C68 49 45 51 45 41C45 38 48 36 52 36C57 36 60 38 62 42L70 38C66 32 60 28 52 28Z" fill="#F29111" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">MySQL</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-[#F7DF1E] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform text-[#000000] font-black text-sm">
                        JS
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">JavaScript</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-100/60 dark:border-cyan-900/40 flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
                        <svg viewBox="0 0 54 33" fill="none" className="w-6 h-6">
                          <path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8C16.2 7.2 19.35 5.85 22.95 6.75C25.0041 7.26353 26.4719 8.75382 28.0963 10.4031C30.7431 13.0903 33.7828 16.1765 40.5 16.1765C47.7 16.1765 52.2 12.5765 54 5.37647C51.3 8.97647 48.15 10.3265 44.55 9.42647C42.4959 8.91294 41.0281 7.42265 39.4037 5.77335C36.7569 3.08618 33.7172 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27C2.7 23.4 5.85 22.05 9.45 22.95C11.5041 23.4635 12.9719 24.9538 14.5963 26.6031C17.2431 29.2903 20.2828 32.3765 27 32.3765C34.2 32.3765 38.7 28.7765 40.5 21.5765C37.8 25.1765 34.65 26.5265 31.05 25.6265C28.9959 25.1129 27.5281 23.6226 25.9037 21.9734C23.2569 19.2862 20.2172 16.2 13.5 16.2Z" fill="#38BDF8" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">TailwindCSS</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-100/60 dark:border-sky-900/40 flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
                        <svg viewBox="0 0 100 100" fill="none" className="w-6 h-6">
                          <path d="M72 15L35 44L20 33L10 39L23 50L10 61L20 67L35 56L72 85C75 87 80 85 80 81V19C80 15 75 13 72 15Z" fill="#007ACC" />
                          <path d="M80 81V19C80 15 75 13 72 15L35 44L72 85C75 87 80 85 80 81Z" fill="#1F9CF0" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">VS Code</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-100/60 dark:border-orange-900/40 flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
                        <svg viewBox="0 0 100 100" fill="none" className="w-6 h-6">
                          <path d="M92.7 44.5L55.5 7.3C52.4 4.2 47.4 4.2 44.3 7.3L34.1 17.5L46.8 30.2C49.9 29.2 53.4 30 55.9 32.5C58.4 35 59.2 38.5 58.2 41.6L70.4 53.8C73.5 52.8 77 53.6 79.5 56.1C82.8 59.4 82.8 64.7 79.5 68C76.2 71.3 70.9 71.3 67.6 68C64.9 65.3 64.2 61.5 65.4 58.3L54 46.9L54 70.2C54.8 70.8 55.6 71.6 56.2 72.5C58.9 76.5 57.9 81.9 53.9 84.6C49.9 87.3 44.5 86.3 41.8 82.3C39.1 78.3 40.1 72.9 44.1 70.2C45.2 69.4 46.5 69 47.8 68.9L47.8 45.3C46.5 45.2 45.2 44.7 44.1 43.9C40.6 41.6 39.4 37 41.2 33.1L28.6 20.5L7.3 41.8C4.2 44.9 4.2 49.9 7.3 53L44.5 90.2C47.6 93.3 52.6 93.3 55.7 90.2L92.7 53.2C95.8 50.1 95.8 45.1 92.7 44.5Z" fill="#F05032" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">Git</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform text-gray-900 dark:text-slate-100">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017C2 16.446 4.843 20.198 8.789 21.523C9.289 21.614 9.472 21.304 9.472 21.042C9.472 20.806 9.463 20.021 9.458 19.191C6.677 19.803 6.089 17.834 6.089 17.834C5.635 16.666 4.978 16.353 4.978 16.353C4.07 15.727 5.047 15.74 5.047 15.74C6.05 15.811 6.579 16.786 6.579 16.786C7.472 18.334 8.919 17.887 9.489 17.629C9.579 16.974 9.838 16.527 10.125 16.273C7.904 16.018 5.569 15.148 5.569 11.267C5.569 10.162 5.959 9.259 6.602 8.551C6.5 8.296 6.155 7.265 6.702 5.882C6.702 5.882 7.541 5.61 9.45 6.923C10.25 6.697 11.1 6.584 11.95 6.58C12.8 6.584 13.65 6.697 14.45 6.923C16.358 5.61 17.195 5.882 17.195 5.882C17.744 7.265 17.399 8.296 17.297 8.551C17.942 9.259 18.33 10.162 18.33 11.267C18.33 15.158 15.99 16.014 13.76 16.264C14.12 16.577 14.45 17.202 14.45 18.163C14.45 19.539 14.438 20.648 14.438 20.985C14.438 21.25 14.618 21.564 15.127 21.464C19.07 20.134 21.91 16.388 21.91 11.96C21.91 6.438 17.433 2 12 2Z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">GitHub</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="w-11 h-11 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform text-gray-900 dark:text-slate-100 font-bold text-sm">
                        <svg viewBox="0 0 100 100" fill="currentColor" className="w-6 h-6">
                          <path d="M19 19C21.5 19 23 20.5 24 22L76 83V23C76 21 77.5 19 80 19C82.5 19 84 21 84 23V85C84 87.5 82.5 89 80 89C77.5 89 76 87.5 75 86L23 25V85C23 87 21.5 89 19 89C16.5 89 15 87 15 85V23C15 20.5 16.5 19 19 19Z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">Notion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* EDUCATION & EXPERIENCE SECTION (2 TIMELINE COLUMNS)       */}
      {/* ========================================================= */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* EDUCATION */}
            <div className="bg-white dark:bg-[#121E21] rounded-2xl p-6 sm:p-7 border border-gray-100 dark:border-[#1E3237] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#0F5B66] dark:bg-[#156B78] text-white flex items-center justify-center shrink-0">
                  <GraduationCap size={16} />
                </div>
                <h3 className="text-xs font-extrabold tracking-[0.2em] text-[#0F5B66] dark:text-[#2DD4BF] uppercase">
                  EDUCATION
                </h3>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#0F5B66]/30 dark:before:bg-[#2DD4BF]/30">
                <div className="relative group">
                  <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-[#0F5B66] dark:bg-[#2DD4BF] ring-4 ring-[#E8F4F5] dark:ring-[#173036]"></div>
                  <span className="text-[11px] font-medium text-gray-400 dark:text-slate-500 block mb-0.5">2021 - Sekarang</span>
                  <h4 className="text-[13px] font-bold text-gray-800 dark:text-slate-100 leading-tight">S1 Sistem Informasi</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Universitas Jenderal Soedirman</p>
                </div>

                <div className="relative group">
                  <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-[#0F5B66] dark:bg-[#2DD4BF] ring-4 ring-[#E8F4F5] dark:ring-[#173036]"></div>
                  <span className="text-[11px] font-medium text-gray-400 dark:text-slate-500 block mb-0.5">2018 - 2021</span>
                  <h4 className="text-[13px] font-bold text-gray-800 dark:text-slate-100 leading-tight">SMA Negeri 1 Purwokerto</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">IPA</p>
                </div>

                <div className="relative group">
                  <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-[#0F5B66] dark:bg-[#2DD4BF] ring-4 ring-[#E8F4F5] dark:ring-[#173036]"></div>
                  <span className="text-[11px] font-medium text-gray-400 dark:text-slate-500 block mb-0.5">2015 - 2018</span>
                  <h4 className="text-[13px] font-bold text-gray-800 dark:text-slate-100 leading-tight">SMP Negeri 2 Purwokerto</h4>
                </div>
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="bg-white dark:bg-[#121E21] rounded-2xl p-6 sm:p-7 border border-gray-100 dark:border-[#1E3237] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#0F5B66] dark:bg-[#156B78] text-white flex items-center justify-center shrink-0">
                  <Briefcase size={16} />
                </div>
                <h3 className="text-xs font-extrabold tracking-[0.2em] text-[#0F5B66] dark:text-[#2DD4BF] uppercase">
                  EXPERIENCE
                </h3>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#0F5B66]/30 dark:before:bg-[#2DD4BF]/30">
                <div className="relative group">
                  <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-[#0F5B66] dark:bg-[#2DD4BF] ring-4 ring-[#E8F4F5] dark:ring-[#173036]"></div>
                  <h4 className="text-[13px] font-bold text-gray-800 dark:text-slate-100 leading-tight">Freelance Content Creator</h4>
                  <span className="text-[11px] font-medium text-gray-400 dark:text-slate-500 block mb-1">2024 - Sekarang</span>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    Membuat konten edukatif di bidang teknologi, desain, dan pengembangan diri.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-[#0F5B66] dark:bg-[#2DD4BF] ring-4 ring-[#E8F4F5] dark:ring-[#173036]"></div>
                  <h4 className="text-[13px] font-bold text-gray-800 dark:text-slate-100 leading-tight">Project Trainee - Klab.id</h4>
                  <span className="text-[11px] font-medium text-gray-400 dark:text-slate-500 block mb-1">2023 - 2024</span>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    Membantu dalam pengembangan website dan fitur internal perusahaan.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute -left-[19px] top-1.5 w-3 h-3 rounded-full bg-[#0F5B66] dark:bg-[#2DD4BF] ring-4 ring-[#E8F4F5] dark:ring-[#173036]"></div>
                  <h4 className="text-[13px] font-bold text-gray-800 dark:text-slate-100 leading-tight">Content Creator - Guruku Media</h4>
                  <span className="text-[11px] font-medium text-gray-400 dark:text-slate-500 block mb-1">2022 - 2023</span>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    Membuat konten pembelajaran dan promosi di media sosial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* MY PROJECTS SECTION                                       */}
      {/* ========================================================= */}
      <section id="proyek" className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Sub-bab Header Tanpa Strip */}
          <div className="mb-6">
            <h2 className="text-xs font-extrabold tracking-[0.25em] text-[#0F5B66] dark:text-[#2DD4BF] uppercase">
              MY PROJECTS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj.id)}
                className="bg-white dark:bg-[#121E21] rounded-2xl border border-gray-100 dark:border-[#1E3237] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_8px_24px_rgba(15,91,102,0.1)] hover:-translate-y-1 transition-all cursor-pointer flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-slate-800">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0F5B66]/0 group-hover:bg-[#0F5B66]/10 dark:group-hover:bg-[#2DD4BF]/10 transition-colors"></div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[13.5px] font-extrabold text-gray-800 dark:text-slate-100 group-hover:text-[#0F5B66] dark:group-hover:text-[#2DD4BF] transition-colors leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 mt-auto">
                    {proj.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-[#EAF5F6] dark:bg-[#163036] text-[#0F5B66] dark:text-[#2DD4BF] px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PELATIHAN & SERTIFIKASI (KARTU/DIV SENDIRI DENGAN DETAIL)  */}
      {/* ========================================================= */}
      <section id="pelatihan" className="py-12">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          {/* Sub-bab Header Tanpa Strip */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-xs font-extrabold tracking-[0.25em] text-[#0F5B66] dark:text-[#2DD4BF] uppercase">
                PELATIHAN &amp; SERTIFIKASI
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Koleksi program sertifikasi dan pelatihan kompetensi. Klik kartu untuk melihat rincian kredensial.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-gray-400 dark:text-slate-500">
              {certifications.length} Sertifikat Terverifikasi
            </span>
          </div>

          {/* Grid Kartu Sertifikat / Pelatihan Mandiri */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="bg-white dark:bg-[#121E21] hover:bg-[#FDFEFE] dark:hover:bg-[#152529] rounded-2xl p-5 border border-gray-100 dark:border-[#1E3237] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_8px_24px_rgba(15,91,102,0.08)] hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top: Icon Badge & Category Tag */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#0F5B66]/10 dark:bg-[#2DD4BF]/15 text-[#0F5B66] dark:text-[#2DD4BF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Award size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EAF5F6] dark:bg-[#163036] text-[#0F5B66] dark:text-[#2DD4BF] px-2.5 py-1 rounded-full">
                      {cert.category}
                    </span>
                  </div>

                  {/* Middle: Nama Pelatihan / Sertifikat */}
                  <h3 className="text-sm font-extrabold text-gray-800 dark:text-slate-100 group-hover:text-[#0F5B66] dark:group-hover:text-[#2DD4BF] transition-colors leading-snug line-clamp-2">
                    {cert.title}
                  </h3>

                  {/* Penerbit & Info */}
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
                    <span className="line-clamp-1">{cert.issuer}</span>
                  </p>
                </div>

                {/* Bottom Card Footer: Tahun & Action */}
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-[#1E3237] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-gray-400 dark:text-slate-500 flex items-center gap-1">
                    <Calendar size={13} />
                    {cert.year}
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-[#0F5B66] dark:text-[#2DD4BF] group-hover:translate-x-0.5 transition-transform text-[11px]">
                    Detail Sertifikat
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CONTACT ME SECTION (2 COLUMNS)                            */}
      {/* ========================================================= */}
      <section id="kontak" className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Sub-bab Header Tanpa Strip */}
              <div>
                <h2 className="text-xs font-extrabold tracking-[0.25em] text-[#0F5B66] dark:text-[#2DD4BF] uppercase">
                  CONTACT ME
                </h2>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:2045wildan@gmail.com"
                  className="flex items-center gap-3.5 group text-gray-700 dark:text-slate-300 hover:text-[#0F5B66] dark:hover:text-[#2DD4BF] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[#0F5B66] dark:bg-[#166B77] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <Mail size={16} />
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium">wildan@gmail.com</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/wildanhbtllh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 group text-gray-700 dark:text-slate-300 hover:text-[#0F5B66] dark:hover:text-[#2DD4BF] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[#0F5B66] dark:bg-[#166B77] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium">@wildanhbtllh</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/wildan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 group text-gray-700 dark:text-slate-300 hover:text-[#0F5B66] dark:hover:text-[#2DD4BF] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[#0F5B66] dark:bg-[#166B77] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium">linkedin.com/in/wildan</span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 text-gray-700 dark:text-slate-300">
                  <div className="w-9 h-9 rounded-full bg-[#0F5B66] dark:bg-[#166B77] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={16} />
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium">Yogyakarta, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Right: Call to action */}
            <div className="lg:col-span-7 lg:border-l lg:border-gray-200 dark:lg:border-[#1E3237] lg:pl-12 space-y-4">
              <span className="text-[11px] font-extrabold tracking-[0.25em] text-gray-400 dark:text-slate-500 uppercase block">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F5B66] dark:text-[#2DD4BF] tracking-tight leading-[1.1]">
                LET'S WORK
                <br />
                TOGETHER
              </h2>
              <p className="text-[13.5px] leading-relaxed text-gray-600 dark:text-slate-300 max-w-lg">
                Saya terbuka untuk kolaborasi, proyek, atau peluang kerja baru. Jangan ragu untuk menghubungi saya.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#0F5B66] hover:bg-[#0c4750] dark:bg-[#137482] dark:hover:bg-[#0F5B66] text-white text-xs font-bold tracking-wider uppercase px-6 py-3 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <span>SEND MESSAGE</span>
                  <Send size={14} />
                </button>
                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="inline-flex items-center gap-2 border-2 border-[#0F5B66] dark:border-[#2DD4BF] hover:bg-[#0F5B66]/5 dark:hover:bg-[#2DD4BF]/10 text-[#0F5B66] dark:text-[#2DD4BF] text-xs font-bold tracking-wider uppercase px-6 py-2.5 rounded-full transition-all cursor-pointer"
                >
                  <span>VIEW CV</span>
                  <Download size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER                                                    */}
      {/* ========================================================= */}
      <footer className="border-t border-gray-100 dark:border-[#1A2E33] py-8 bg-[#F8FAF9] dark:bg-[#0B1315] transition-colors">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Logo */}
          <BrandLogo size="sm" isDark={isDarkMode} />

          <p className="text-xs text-gray-400 dark:text-slate-500">
            &copy; 2026 Wildan Hibatulloh &bull; All rights reserved
          </p>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* INTERACTIVE MODALS                                        */}
      {/* ========================================================= */}

      {/* 1. DETAIL SERTIFIKAT MODAL (DIPILIH DARI KARTU)            */}
      {selectedCert !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#121E21] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-gray-100 dark:border-[#1E3237] relative transition-colors max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 dark:text-slate-400 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Header Sertifikat */}
            <div className="flex items-start gap-4 mb-5 pr-8">
              <div className="w-14 h-14 rounded-2xl bg-[#0F5B66]/10 dark:bg-[#2DD4BF]/15 text-[#0F5B66] dark:text-[#2DD4BF] flex items-center justify-center shrink-0">
                <Award size={30} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EAF5F6] dark:bg-[#163036] text-[#0F5B66] dark:text-[#2DD4BF] px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                  {selectedCert.category}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-slate-100 leading-snug">
                  {selectedCert.title}
                </h3>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-400 mt-1">
                  Diterbitkan oleh: <span className="font-semibold text-gray-700 dark:text-slate-200">{selectedCert.issuer}</span>
                </p>
              </div>
            </div>

            {/* Metadata Card */}
            <div className="bg-[#F8FAF9] dark:bg-[#162529] rounded-2xl p-4 border border-gray-100 dark:border-[#22393F] space-y-3 mb-5">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-200/70 dark:border-[#22393F]">
                <span className="text-gray-500 dark:text-slate-400">ID Kredensial Resmi</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#0F5B66] dark:text-[#2DD4BF] text-[11px] bg-white dark:bg-[#121E21] px-2 py-0.5 rounded border border-gray-200 dark:border-[#1E3237]">
                    {selectedCert.credentialCode}
                  </span>
                  <button
                    onClick={() => handleCopyId(selectedCert.credentialCode)}
                    title="Salin ID"
                    className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {copiedId ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-200/70 dark:border-[#22393F]">
                <span className="text-gray-500 dark:text-slate-400">Tahun Terbit</span>
                <span className="font-bold text-gray-700 dark:text-slate-200">{selectedCert.year}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-slate-400">Status Validasi</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck size={15} /> Terverifikasi &amp; Sah
                </span>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-2 mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                Deskripsi &amp; Cakupan Materi
              </h4>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-slate-300 bg-gray-50 dark:bg-[#152529]/60 p-3.5 rounded-xl border border-gray-100 dark:border-[#22393F]">
                {selectedCert.description}
              </p>
            </div>

            {/* Kompetensi yang Diperoleh */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                Kompetensi &amp; Keterampilan Teruji
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCert.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-[#EAF5F6] dark:bg-[#163036] text-[#0F5B66] dark:text-[#2DD4BF] px-3 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  alert(`Membuka sertifikat resmi ${selectedCert.title} (Kredensial ID: ${selectedCert.credentialCode})`);
                }}
                className="flex-1 bg-[#0F5B66] hover:bg-[#0c4750] dark:bg-[#137482] dark:hover:bg-[#0F5B66] text-white text-xs font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Lihat Sertifikat Asli</span>
                <ExternalLink size={14} />
              </button>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 bg-gray-100 hover:bg-gray-200 dark:bg-[#18272B] dark:hover:bg-[#1F3338] text-gray-700 dark:text-slate-200 text-xs font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SEND MESSAGE MODAL */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#121E21] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-[#1E3237] relative transition-colors">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 dark:text-slate-400 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-extrabold text-[#0F5B66] dark:text-[#2DD4BF]">Send a Message</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
              Kirimkan pesan langsung ke email Wildan untuk mendiskusikan proyek Anda.
            </p>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 size={48} className="mx-auto text-emerald-500 animate-bounce" />
                <p className="text-sm font-bold text-gray-800 dark:text-slate-100">Pesan Berhasil Terkirim!</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Terima kasih, saya akan membalas segera.</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4 mt-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nama Anda"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-[#22393F] bg-white dark:bg-[#18272B] dark:text-white focus:outline-none focus:border-[#0F5B66] dark:focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#0F5B66]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Alamat Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-[#22393F] bg-white dark:bg-[#18272B] dark:text-white focus:outline-none focus:border-[#0F5B66] dark:focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#0F5B66]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Pesan / Brief Proyek</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ceritakan tentang proyek atau ide kolaborasi Anda..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-[#22393F] bg-white dark:bg-[#18272B] dark:text-white focus:outline-none focus:border-[#0F5B66] dark:focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#0F5B66] resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0F5B66] hover:bg-[#0c4750] dark:bg-[#137482] dark:hover:bg-[#0F5B66] text-white text-xs font-bold tracking-wider uppercase py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>KIRIM SEKARANG</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. VIEW / DOWNLOAD CV MODAL */}
      {isCvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#121E21] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 dark:border-[#1E3237] relative transition-colors">
            <button
              onClick={() => setIsCvModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 dark:text-slate-400 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#0F5B66]/10 dark:bg-[#2DD4BF]/15 text-[#0F5B66] dark:text-[#2DD4BF] flex items-center justify-center mx-auto">
                <Download size={28} />
              </div>
              <h3 className="text-xl font-extrabold text-[#0F5B66] dark:text-[#2DD4BF]">Curriculum Vitae</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Wildan Hibatulloh &bull; Information Systems Student &bull; Updated 2024
              </p>
            </div>

            <div className="bg-[#FAFBFB] dark:bg-[#162529] rounded-2xl p-4 border border-gray-100 dark:border-[#22393F] text-xs space-y-3 mb-6 transition-colors">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-[#22393F] pb-2">
                <span className="font-bold text-gray-700 dark:text-slate-200">Format Dokumen</span>
                <span className="text-gray-500 dark:text-slate-400 font-mono">PDF (2.4 MB)</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-[#22393F] pb-2">
                <span className="font-bold text-gray-700 dark:text-slate-200">Bahasa</span>
                <span className="text-gray-500 dark:text-slate-400">Bahasa Indonesia &amp; English</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700 dark:text-slate-200">Isi Ringkasan</span>
                <span className="text-gray-500 dark:text-slate-400">Profil, Pendidikan, Pengalaman, Portfolio</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert('CV Wildan Hibatulloh siap diunduh (Simulasi download berkas PDF).');
                  setIsCvModalOpen(false);
                }}
                className="flex-1 bg-[#0F5B66] hover:bg-[#0c4750] dark:bg-[#137482] dark:hover:bg-[#0F5B66] text-white text-xs font-bold tracking-wider uppercase py-3 rounded-xl transition-all shadow-sm text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={14} />
                <span>UNDUH PDF</span>
              </a>
              <button
                onClick={() => setIsCvModalOpen(false)}
                className="px-5 bg-gray-100 hover:bg-gray-200 dark:bg-[#18272B] dark:hover:bg-[#1F3338] text-gray-700 dark:text-slate-200 text-xs font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. PROJECT DETAIL MODAL */}
      {selectedProject !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          {(() => {
            const proj = projects.find((p) => p.id === selectedProject);
            if (!proj) return null;
            return (
              <div className="bg-white dark:bg-[#121E21] rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border border-gray-100 dark:border-[#1E3237] relative transition-colors">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 text-white bg-black/60 hover:bg-black/80 p-1.5 rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="relative aspect-[16/9] w-full bg-gray-100 dark:bg-slate-800">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0F5B66] dark:text-[#2DD4BF]">{proj.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{proj.description}</p>
                  </div>

                  <p className="text-xs leading-relaxed text-gray-600 dark:text-slate-300 bg-gray-50 dark:bg-[#162529] p-3.5 rounded-xl border border-gray-100 dark:border-[#22393F]">
                    {proj.details}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-[#EAF5F6] dark:bg-[#163036] text-[#0F5B66] dark:text-[#2DD4BF] px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        alert(`Membuka live demo untuk ${proj.title}`);
                        setSelectedProject(null);
                      }}
                      className="flex-1 bg-[#0F5B66] hover:bg-[#0c4750] dark:bg-[#137482] dark:hover:bg-[#0F5B66] text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Lihat Demo Live</span>
                      <ExternalLink size={14} />
                    </button>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-5 bg-gray-100 hover:bg-gray-200 dark:bg-[#18272B] dark:hover:bg-[#1F3338] text-gray-700 dark:text-slate-200 text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
