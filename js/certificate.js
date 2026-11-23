/**
 * PinyinGo - Modul E-Sijil Pencapaian & Pendaftaran Pelajar (ELM 4322)
 * Kolej Vokasional Port Dickson
 * Disediakan untuk Cikgu Hajar Nur Atiqah Binti Mohd Adam
 */

const PINYINGO_TOPICS = {
  1: { num: 1, titleHz: "买食物", titlePy: "mǎi shí wù", titleBm: "Membeli Makanan", icon: "🍎" },
  2: { num: 2, titleHz: "买服装", titlePy: "mǎi fú zhuāng", titleBm: "Membeli Pakaian", icon: "👕" },
  3: { num: 3, titleHz: "我的爱好", titlePy: "wǒ de ài hào", titleBm: "Hobi Saya", icon: "🏸" },
  4: { num: 4, titleHz: "在办公室", titlePy: "zài bàn gōng shì", titleBm: "Di Pejabat", icon: "💼" },
  5: { num: 5, titleHz: "地名", titlePy: "dì míng", titleBm: "Nama Tempat", icon: "🗺️" },
  6: { num: 6, titleHz: "公共交通", titlePy: "gōng gòng jiāo tōng", titleBm: "Kenderaan Awam & Arah", icon: "🚇" },
  7: { num: 7, titleHz: "面试", titlePy: "miàn shì", titleBm: "Temuduga Kerjaya", icon: "👔" }
};

let currentCertTopicNum = 1;

// 1. Initializer on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  injectCertificateStyles();
  injectStudentModals();
  detectCurrentTopic();
  initStudentProfile();
});

function detectCurrentTopic() {
  const path = window.location.pathname;
  const match = path.match(/topik(\d+)\.html/i);
  if (match) {
    currentCertTopicNum = parseInt(match[1]);
  } else {
    currentCertTopicNum = 1;
  }
}

// 2. Inject CSS for Certificate & Print
function injectCertificateStyles() {
  if (document.getElementById('pinyingo-cert-styles')) return;
  const style = document.createElement('style');
  style.id = 'pinyingo-cert-styles';
  style.innerHTML = `
    @media print {
      body * {
        visibility: hidden !important;
      }
      #certificate-modal,
      #certificate-modal * {
        visibility: visible !important;
      }
      #certificate-modal {
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        z-index: 999999 !important;
        opacity: 1 !important;
      }
      #certificate-print-area {
        position: relative !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 auto !important;
        box-shadow: none !important;
        border: 4px solid #b45309 !important;
        background: #fdfbf7 !important;
        page-break-inside: avoid !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .no-print {
        display: none !important;
      }
      @page {
        size: A4 landscape;
        margin: 8mm;
      }
    }
  `;
  document.head.appendChild(style);
}

// 3. Inject Modals into DOM
function injectStudentModals() {
  if (document.getElementById('student-name-modal')) return;

  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = `
    <!-- STUDENT NAME MODAL -->
    <div id="student-name-modal" class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 hidden opacity-0">
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 relative transform transition-all scale-95 duration-200" id="student-modal-card">
        <div class="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-3xl mx-auto mb-3 shadow-sm">
          🎓
        </div>
        <h3 class="text-xl font-outfit font-black text-slate-900 text-center">
          Pendaftaran Nama Pelajar
        </h3>
        <p class="text-xs text-slate-500 text-center mt-1 leading-relaxed">
          Sila masukkan <strong>Nama Penuh</strong> anda. Nama ini akan dicetak secara rasmi pada <strong>E-Sijil Pencapaian</strong> setiap topik latihan.
        </p>

        <div class="mt-5 space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">
              Nama Penuh Pelajar (Huruf Besar):
            </label>
            <input type="text" id="student-name-input" 
              placeholder="CONTOH: MUHAMMAD AIMAN BIN ABDULLAH" 
              class="w-full px-4 py-3 rounded-2xl border-2 border-indigo-100 focus:border-indigo-600 focus:outline-none text-slate-900 font-bold text-sm tracking-wide transition placeholder:text-slate-300 placeholder:font-normal uppercase"
              onkeydown="if(event.key === 'Enter') saveStudentName()">
          </div>
          
          <p id="student-name-error" class="text-xs font-bold text-rose-500 hidden text-center">
            ⚠️ Sila masukkan nama penuh anda untuk meneruskan.
          </p>

          <button onclick="saveStudentName()" class="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-sm tracking-wide shadow-lg shadow-indigo-600/30 transition active:scale-98 flex items-center justify-center space-x-2">
            <span>Sahkan & Mula Belajar</span>
            <span>🚀</span>
          </button>

          <button id="student-modal-cancel-btn" onclick="closeStudentModal()" class="w-full py-2 text-center text-xs text-slate-400 hover:text-slate-600 font-bold transition hidden">
            Batal / Kekalkan Nama Sedia Ada
          </button>
        </div>
      </div>
    </div>

    <!-- CERTIFICATE MODAL -->
    <div id="certificate-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto hidden opacity-0 transition-all duration-300">
      <div class="relative w-full max-w-4xl my-auto">
        
        <!-- Top Action Bar (no-print) -->
        <div class="no-print flex items-center justify-between mb-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-white">
          <div class="flex items-center space-x-2">
            <span class="text-lg">📜</span>
            <span class="text-xs sm:text-sm font-bold tracking-wide">E-Sijil Pencapaian Modul Interaktif</span>
          </div>
          
          <!-- Topic Selector (Visible on Hub index.html or switchable) -->
          <div id="cert-topic-switcher-bar" class="hidden sm:flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-xl text-xs">
            <span class="text-slate-300 text-[11px] mr-1">Topik:</span>
            <select id="cert-topic-select" onchange="changeCertTopic(this.value)" class="bg-slate-800 text-amber-300 font-bold text-xs rounded-lg px-2 py-1 outline-none border border-slate-700">
              <option value="1">Topik 1: Membeli Makanan</option>
              <option value="2">Topik 2: Membeli Pakaian</option>
              <option value="3">Topik 3: Hobi Saya</option>
              <option value="4">Topik 4: Di Pejabat</option>
              <option value="5">Topik 5: Nama Tempat</option>
              <option value="6">Topik 6: Kenderaan Awam & Arah</option>
              <option value="7">Topik 7: Temuduga Kerjaya</option>
            </select>
          </div>

          <div class="flex items-center space-x-2">
            <button onclick="printCertificate()" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition active:scale-95">
              <span>🖨️</span>
              <span>Cetak / PDF</span>
            </button>
            <button onclick="promptStudentName(true)" class="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition" title="Tukar Ejaan Nama">
              <span>✏️ Nama</span>
            </button>
            <button onclick="closeCertificateModal()" class="w-8 h-8 rounded-xl bg-white/20 hover:bg-rose-600 text-white font-black text-sm flex items-center justify-center transition" title="Tutup">
              ✕
            </button>
          </div>
        </div>

        <!-- CERTIFICATE CARD -->
        <div id="certificate-print-area" class="bg-[#fcfaf5] text-slate-900 rounded-3xl p-5 sm:p-9 shadow-2xl border-4 sm:border-8 border-double border-amber-600/70 relative overflow-hidden">
          
          <!-- Background Watermark -->
          <div class="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none font-hanzi font-black text-[140px] sm:text-[220px] text-amber-950">
            华语
          </div>

          <!-- Corner Ornaments -->
          <div class="absolute top-2 left-3 text-amber-700/40 text-xl select-none">⚜️</div>
          <div class="absolute top-2 right-3 text-amber-700/40 text-xl select-none">⚜️</div>
          <div class="absolute bottom-2 left-3 text-amber-700/40 text-xl select-none">⚜️</div>
          <div class="absolute bottom-2 right-3 text-amber-700/40 text-xl select-none">⚜️</div>

          <!-- Certificate Inner Border Box -->
          <div class="border-2 border-amber-500/40 rounded-2xl p-5 sm:p-8 text-center relative z-10 bg-white/60 backdrop-blur-xs">
            
            <!-- Institution Title -->
            <div class="mb-3">
              <div class="inline-flex items-center justify-center space-x-2 mb-1">
                <span class="text-xl sm:text-2xl">🏛️</span>
                <span class="font-outfit font-black tracking-widest text-xs sm:text-sm text-amber-950 uppercase">KOLEJ VOKASIONAL PORT DICKSON</span>
              </div>
              <p class="text-[9px] sm:text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                JABATAN PENDIDIKAN TEKNIK & VOKASIONAL • KURSUS BAHASA MANDARIN II (ELM 4322)
              </p>
              
              <div class="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto my-2.5"></div>
              
              <h2 class="font-outfit font-black text-2xl sm:text-3xl text-amber-900 tracking-tight uppercase">
                SIJIL PENCAPAIAN
              </h2>
              <p class="text-[11px] sm:text-xs font-serif italic text-amber-800/80 mt-0.5">
                Certificate of Interactive Module Completion
              </p>
            </div>

            <!-- Recipient Statement -->
            <div class="my-4">
              <p class="text-xs sm:text-sm text-slate-600 font-serif italic">
                Dengan ini diperakui bahawa
              </p>
              
              <div class="my-2">
                <span id="cert-student-name" class="inline-block font-outfit font-black text-xl sm:text-3xl text-indigo-950 border-b-2 border-amber-600 pb-1 px-4 tracking-wide uppercase">
                  [NAMA PELAJAR]
                </span>
              </div>
              
              <p class="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                telah berjaya menguasai dan menyempurnakan modul pembelajaran serta latihan amali kendiri bagi sukatan:
              </p>
              
              <div class="mt-2 inline-block bg-amber-50/90 border border-amber-200/90 rounded-2xl px-4 py-1.5 shadow-xs">
                <span id="cert-topic-badge" class="font-outfit font-black text-xs sm:text-base text-amber-950">
                  TOPIK 1: 买食物 Membeli Makanan (mǎi shí wù)
                </span>
              </div>
              
              <p class="text-[10px] sm:text-[11px] text-slate-500 mt-2 font-medium">
                Merangkumi Penguasaan Kosa Kata Hanzi & Pinyin, Pembinaan Pola Ayat dan Amali Pertuturan Suara.
              </p>
            </div>

            <!-- Badges & Verification Row -->
            <div class="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto my-4 text-left bg-slate-50/90 p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 text-[9px] sm:text-xs">
              <div>
                <span class="block text-slate-400 font-bold">Tahap Penguasaan:</span>
                <span class="font-black text-emerald-700">⭐⭐⭐⭐⭐ CEMERLANG</span>
              </div>
              <div>
                <span class="block text-slate-400 font-bold">Tarikh Pencapaian:</span>
                <span id="cert-issue-date" class="font-black text-slate-800">23 November 2026</span>
              </div>
              <div>
                <span class="block text-slate-400 font-bold">No. Verifikasi:</span>
                <span id="cert-verify-code" class="font-mono font-bold text-slate-700">KVPD-ELM4322-T1</span>
              </div>
            </div>

            <!-- Signatures & Seal Footer -->
            <div class="mt-5 pt-3.5 border-t border-amber-200/70 flex items-end justify-between px-2 sm:px-6">
              <!-- Digital Seal -->
              <div class="text-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-double border-amber-600 bg-gradient-to-tr from-amber-400 via-amber-200 to-yellow-500 flex flex-col items-center justify-center shadow-md shadow-amber-500/20 mx-auto select-none">
                  <span class="text-xs sm:text-sm font-black text-amber-950">KVPD</span>
                  <span class="text-[8px] sm:text-[9px] font-black text-amber-900 tracking-tighter">ELM 4322</span>
                  <span class="text-[7px] font-bold text-amber-950">★ RASMI ★</span>
                </div>
                <span class="block text-[8px] sm:text-[9px] font-bold text-amber-900/70 mt-1">Meterai Pengesahan</span>
              </div>

              <!-- Official Signatory -->
              <div class="text-center sm:text-right">
                <div class="font-serif italic text-base sm:text-lg font-bold text-slate-800 tracking-wider">
                  Hajar Nur Atiqah
                </div>
                <div class="w-36 sm:w-48 h-0.5 bg-slate-800 mx-auto sm:ml-auto my-1"></div>
                <span class="block font-outfit font-black text-[10px] sm:text-xs text-slate-900 uppercase">
                  HAJAR NUR ATIQAH BINTI MOHD ADAM
                </span>
                <span class="block text-[9px] sm:text-[10px] text-slate-500 font-semibold">
                  Pensyarah Bahasa Mandarin (ELM 4322)
                </span>
                <span class="block text-[8px] sm:text-[9px] text-slate-400">
                  Kolej Vokasional Port Dickson
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);
}

// 4. Student Profile Management
function getStudentName() {
  return localStorage.getItem('pinyingo_student_name') || '';
}

function initStudentProfile() {
  const currentName = getStudentName();
  updateUIStudentName(currentName);

  if (!currentName) {
    // If name is not set, prompt after a short delay
    setTimeout(() => {
      promptStudentName(false);
    }, 600);
  }
}

function updateUIStudentName(name) {
  const display = name || 'Daftar Nama';
  
  // Header badges in topik pages
  const headerName = document.getElementById('header-student-name');
  if (headerName) headerName.innerText = display;

  // Header badges in index hub
  const indexName = document.getElementById('index-student-name');
  if (indexName) indexName.innerText = display;

  const heroName = document.getElementById('hero-student-name');
  if (heroName) heroName.innerText = name ? `, ${name}` : '';
}

function promptStudentName(canCancel = true) {
  const modal = document.getElementById('student-name-modal');
  const card = document.getElementById('student-modal-card');
  const input = document.getElementById('student-name-input');
  const cancelBtn = document.getElementById('student-modal-cancel-btn');
  const errorMsg = document.getElementById('student-name-error');

  if (!modal) return;

  input.value = getStudentName();
  errorMsg.classList.add('hidden');

  if (canCancel && getStudentName()) {
    cancelBtn.classList.remove('hidden');
  } else {
    cancelBtn.classList.add('hidden');
  }

  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    card.classList.remove('scale-95');
    card.classList.add('scale-100');
    input.focus();
  }, 20);
}

function closeStudentModal() {
  const modal = document.getElementById('student-name-modal');
  const card = document.getElementById('student-modal-card');
  if (!modal) return;

  modal.classList.add('opacity-0');
  card.classList.remove('scale-100');
  card.classList.add('scale-95');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 250);
}

function saveStudentName() {
  const input = document.getElementById('student-name-input');
  const errorMsg = document.getElementById('student-name-error');
  const val = input.value.trim().toUpperCase();

  if (!val || val.length < 2) {
    errorMsg.classList.remove('hidden');
    input.focus();
    return;
  }

  localStorage.setItem('pinyingo_student_name', val);
  updateUIStudentName(val);
  closeStudentModal();

  // If certificate modal is open, refresh certificate text
  const certName = document.getElementById('cert-student-name');
  if (certName) certName.innerText = val;
}

// 5. Open & Render Certificate Modal
function openTopicCertificate(topicNum) {
  const studentName = getStudentName();
  if (!studentName) {
    promptStudentName(false);
    return;
  }

  if (topicNum) {
    currentCertTopicNum = parseInt(topicNum);
  }

  renderCertificateData(currentCertTopicNum, studentName);

  const modal = document.getElementById('certificate-modal');
  if (!modal) return;

  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
  }, 20);

  // Trigger confetti celebration!
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function closeCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  if (!modal) return;

  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 250);
}

function changeCertTopic(val) {
  currentCertTopicNum = parseInt(val);
  renderCertificateData(currentCertTopicNum, getStudentName());
}

function renderCertificateData(topicNum, studentName) {
  const info = PINYINGO_TOPICS[topicNum] || PINYINGO_TOPICS[1];

  // Set student name
  const certName = document.getElementById('cert-student-name');
  if (certName) certName.innerText = studentName || 'PELAJAR KVPD';

  // Set topic badge
  const certTopic = document.getElementById('cert-topic-badge');
  if (certTopic) {
    certTopic.innerText = `TOPIK ${info.num}: ${info.titleHz} ${info.titleBm} (${info.titlePy})`;
  }

  // Set select dropdown value if exists
  const topicSelect = document.getElementById('cert-topic-select');
  if (topicSelect) {
    topicSelect.value = info.num.toString();
  }

  // Set date formatted in BM
  const dateEl = document.getElementById('cert-issue-date');
  if (dateEl) {
    const today = new Date();
    const months = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
    dateEl.innerText = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
  }

  // Set verification code (deterministic from student name + topic)
  const verifyEl = document.getElementById('cert-verify-code');
  if (verifyEl) {
    let hash = 0;
    const str = (studentName || 'KVPD') + info.num;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    const hashHex = Math.abs(hash).toString(16).toUpperCase().padStart(4, '0').slice(-4);
    verifyEl.innerText = `KVPD-ELM4322-T${info.num}-${hashHex}`;
  }
}

function printCertificate() {
  window.print();
}
