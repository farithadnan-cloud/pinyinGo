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

// 2. Inject CSS for Certificate & Print (Optimized for Mobile & Desktop Printers)
function injectCertificateStyles() {
  if (document.getElementById('pinyingo-cert-styles')) return;
  const style = document.createElement('style');
  style.id = 'pinyingo-cert-styles';
  style.innerHTML = `
    @page {
      size: auto;
      margin: 8mm;
    }
    @media print {
      html, body {
        width: 100% !important;
        min-width: 100% !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        overflow: visible !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body > * {
        display: none !important;
      }
      #certificate-modal-container,
      #certificate-modal-container #certificate-modal {
        display: block !important;
        position: static !important;
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        opacity: 1 !important;
        overflow: visible !important;
      }
      #certificate-modal-container #certificate-modal .relative {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      #certificate-print-area {
        display: block !important;
        position: relative !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 auto !important;
        padding: 24px 30px !important;
        box-sizing: border-box !important;
        border: 4px double #b45309 !important;
        border-radius: 14px !important;
        background: #fdfbf7 !important;
        page-break-inside: avoid !important;
        page-break-after: avoid !important;
        break-inside: avoid !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      #certificate-print-area .inner-box {
        padding: 16px 24px !important;
      }
      #certificate-print-area img.kvpd-logo {
        height: 60px !important;
        margin-bottom: 4px !important;
      }
      #certificate-print-area h2 {
        font-size: 1.8rem !important;
        margin-top: 4px !important;
        margin-bottom: 2px !important;
      }
      #certificate-print-area .my-4 {
        margin-top: 10px !important;
        margin-bottom: 10px !important;
      }
      #certificate-print-area #cert-student-name {
        font-size: 1.8rem !important;
        padding-bottom: 4px !important;
      }
      #certificate-print-area .score-grid {
        margin-top: 10px !important;
        margin-bottom: 10px !important;
        padding: 10px 18px !important;
      }
      #certificate-print-area .footer-sig {
        margin-top: 14px !important;
        padding-top: 10px !important;
      }
      .no-print {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// 3. Inject Modals into DOM
function injectStudentModals() {
  if (document.getElementById('student-name-modal')) return;

  const modalContainer = document.createElement('div');
  modalContainer.id = 'certificate-modal-container';
  modalContainer.innerHTML = `
    <!-- STUDENT NAME MODAL -->
    <div id="student-name-modal" class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 hidden opacity-0 no-print">
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
        <div class="no-print flex flex-wrap items-center justify-between gap-2 mb-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-white">
          <div class="flex items-center space-x-2">
            <span class="text-lg">📜</span>
            <span class="text-xs sm:text-sm font-bold tracking-wide">E-Sijil Pencapaian Rasmi KVPD</span>
          </div>
          
          <!-- Topic Selector -->
          <div id="cert-topic-switcher-bar" class="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-xl text-xs">
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
            <button onclick="downloadCertificateImage()" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md transition active:scale-95" title="Muat Turun Imej Sijil (PNG)">
              <span>📥</span>
              <span class="hidden sm:inline">Simpan Imej</span>
            </button>
            <button onclick="promptStudentName(true)" class="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition" title="Tukar Ejaan Nama">
              <span>✏️ Nama</span>
            </button>
            <button onclick="closeCertificateModal()" class="w-8 h-8 rounded-xl bg-white/20 hover:bg-rose-600 text-white font-black text-sm flex items-center justify-center transition" title="Tutup">
              ✕
            </button>
          </div>
        </div>

        <!-- Unattempted / Incomplete Warning Banner (no-print) -->
        <div id="cert-unattempted-warning" class="no-print hidden mb-3 p-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs flex items-center justify-between shadow-sm">
          <div class="flex items-center space-x-2">
            <span class="text-lg">⚠️</span>
            <span id="cert-warning-text">Anda <strong>belum menyelesaikan semua soalan</strong> bagi Topik ini. Markah penuh rasmi akan dijana sebaik sahaja kesemua aktiviti diselesaikan.</span>
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
          <div class="inner-box border-2 border-amber-500/40 rounded-2xl p-5 sm:p-8 text-center relative z-10 bg-white/60 backdrop-blur-xs">
            
            <!-- Institution Title with Official KVPD Logo -->
            <div class="mb-3">
              <div class="flex flex-col items-center justify-center mb-1.5">
                <img src="https://ekvpd.com/v1/lp/lp/assets/images/logokv.png" alt="Logo Kolej Vokasional Port Dickson" class="kvpd-logo h-16 sm:h-20 object-contain filter drop-shadow-sm mb-1" onerror="this.onerror=null; this.src='assets/images/logokv.png';">
                <span class="font-outfit font-black tracking-widest text-xs sm:text-sm text-amber-950 uppercase mt-0.5">KOLEJ VOKASIONAL PORT DICKSON</span>
              </div>
              <p class="text-[10px] sm:text-xs font-bold text-slate-600 tracking-wider uppercase">
                JABATAN PENDIDIKAN UMUM
              </p>
              <p class="text-[9px] sm:text-[11px] font-extrabold text-amber-900/80 tracking-wider uppercase mt-0.5">
                KURSUS BAHASA MANDARIN II (ELM 4322)
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
              
              <div class="my-2.5">
                <span id="cert-student-name" class="inline-block font-outfit font-black text-2xl sm:text-3xl text-indigo-950 border-b-2 border-amber-600 pb-1 px-6 tracking-wide uppercase">
                  [NAMA PELAJAR]
                </span>
              </div>
              
              <p id="cert-statement-desc" class="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                telah berjaya menguasai dan menyempurnakan modul pembelajaran serta latihan amali kendiri bagi sukatan:
              </p>
              
              <div class="mt-2.5 inline-block bg-amber-50/90 border border-amber-300 rounded-2xl px-5 py-2 shadow-xs">
                <span id="cert-topic-badge" class="font-outfit font-black text-xs sm:text-base text-amber-950">
                  TOPIK 1: 买食物 Membeli Makanan (mǎi shí wù)
                </span>
              </div>
              
              <p class="text-[10px] sm:text-[11px] text-slate-500 mt-2 font-medium">
                Merangkumi Penguasaan Kosa Kata (40m), Pola Ayat (40m) dan Simulasi Pertuturan Chat Dialog 1 & 2 (20m).
              </p>
            </div>

            <!-- Badges & Verification Row: ACTUAL MARKS & GRADE -->
            <div class="score-grid grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto my-4 text-center bg-slate-50/95 p-3 rounded-2xl border border-slate-200/90 text-[10px] sm:text-xs">
              <div class="flex flex-col justify-center border-r border-slate-200 pr-2">
                <span class="block text-slate-400 font-bold uppercase text-[9px] mb-0.5">Markah Keseluruhan:</span>
                <span id="cert-score-display" class="font-outfit font-black text-sm sm:text-base text-slate-900 leading-tight">
                  0 / 100 (0%)
                </span>
              </div>
              <div class="flex flex-col justify-center items-center border-r border-slate-200 px-2">
                <span class="block text-slate-400 font-bold uppercase text-[9px] mb-0.5">Keputusan / Gred:</span>
                <span id="cert-grade-display" class="inline-block px-2.5 py-0.5 rounded-full font-black text-xs border text-slate-600 bg-slate-100 border-slate-300">
                  Belum Selesai
                </span>
              </div>
              <div class="flex flex-col justify-center pl-2">
                <span class="block text-slate-400 font-bold uppercase text-[9px] mb-0.5">Tarikh & No. Siri:</span>
                <span id="cert-issue-date" class="block font-bold text-slate-800 text-[10px]">23 November 2026</span>
                <span id="cert-verify-code" class="font-mono text-slate-500 text-[9px]">KVPD-ELM4322-T1</span>
              </div>
            </div>

            <!-- Detailed Breakdown Pill (Shows Bina Kata, Pola Ayat, Dialog 1, Dialog 2) -->
            <div id="cert-breakdown-row" class="text-[9px] sm:text-[10px] text-slate-500 font-semibold bg-white/70 py-1.5 px-3 rounded-xl border border-slate-200/60 max-w-lg mx-auto mb-2 flex items-center justify-around">
              <span>Bina Kata: <strong id="cert-bk-score" class="text-slate-700">0/40</strong></span>
              <span>•</span>
              <span>Pola Ayat: <strong id="cert-pa-score" class="text-slate-700">0/40</strong></span>
              <span>•</span>
              <span>Dialog 1: <strong id="cert-d1-score" class="text-slate-700">0/10</strong></span>
              <span>•</span>
              <span>Dialog 2: <strong id="cert-d2-score" class="text-slate-700">0/10</strong></span>
            </div>

            <!-- Signatures Footer -->
            <div class="footer-sig mt-6 pt-4 border-t border-amber-200/80 flex items-end justify-end px-3 sm:px-8">
              <!-- Official Signatory -->
              <div class="text-right">
                <div class="flex justify-end">
                  <img src="assets/images/signature.png" alt="Tandatangan Hajar Nur Atiqah" class="h-14 sm:h-16 w-auto object-contain -mb-1 pointer-events-none select-none">
                </div>
                <div class="w-40 sm:w-52 h-0.5 bg-slate-800 ml-auto my-1.5"></div>
                <span class="block font-outfit font-black text-[11px] sm:text-xs text-slate-900 uppercase">
                  HAJAR NUR ATIQAH BINTI MOHD ADAM
                </span>
                <span class="block text-[10px] sm:text-[11px] text-slate-600 font-semibold">
                  Pensyarah Bahasa Mandarin
                </span>
                <span class="block text-[9px] sm:text-[10px] text-slate-500">
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

  const certName = document.getElementById('cert-student-name');
  if (certName) certName.innerText = val;
}

// 5. Complete Topic Score Management (Bina Kata: 40m, Pola Ayat: 40m, Dialog 1: 10m, Dialog 2: 10m)
function saveTopicScore(topicNum, score, type) {
  const key = `pinyingo_score_topik_${topicNum}`;
  let data = {};
  try {
    data = JSON.parse(localStorage.getItem(key) || '{}');
  } catch (e) {}

  if (type === 'vocab') {
    data.vocabScore = score; // max 40
    data.vocabCompleted = true;
  } else if (type === 'sentence') {
    data.sentenceScore = score; // max 40
    data.sentenceCompleted = true;
  } else if (type === 'chat_d1') {
    data.chatD1Score = score; // 10
    data.chatD1Completed = true;
  } else if (type === 'chat_d2') {
    data.chatD2Score = score; // 10
    data.chatD2Completed = true;
  }

  const vScore = data.vocabScore || 0;
  const sScore = data.sentenceScore || 0;
  const c1Score = data.chatD1Score || 0;
  const c2Score = data.chatD2Score || 0;

  data.totalScore = vScore + sScore + c1Score + c2Score;
  data.allCompleted = Boolean(data.vocabCompleted && data.sentenceCompleted && data.chatD1Completed && data.chatD2Completed);
  data.lastUpdated = new Date().toISOString();

  localStorage.setItem(key, JSON.stringify(data));
  refreshChatDialogCard(topicNum);
}

function getTopicScore(topicNum) {
  const key = `pinyingo_score_topik_${topicNum}`;
  const raw = localStorage.getItem(key);
  if (!raw) {
    return {
      allCompleted: false,
      hasAttempted: false,
      vocabScore: 0,
      sentenceScore: 0,
      chatD1Score: 0,
      chatD2Score: 0,
      totalScore: 0,
      grade: 'Belum Selesai',
      gradeClass: 'text-slate-600 bg-slate-100 border-slate-300'
    };
  }

  try {
    const data = JSON.parse(raw);
    const vScore = data.vocabScore || 0;
    const sScore = data.sentenceScore || 0;
    const c1Score = data.chatD1Score || 0;
    const c2Score = data.chatD2Score || 0;
    const totalScore = vScore + sScore + c1Score + c2Score;

    const allCompleted = Boolean(data.vocabCompleted && data.sentenceCompleted && data.chatD1Completed && data.chatD2Completed);
    const hasAttempted = Boolean(data.vocabCompleted || data.sentenceCompleted || data.chatD1Completed || data.chatD2Completed || totalScore > 0);

    let grade = 'Belum Selesai';
    let gradeClass = 'text-slate-600 bg-slate-100 border-slate-300';

    if (allCompleted) {
      if (totalScore >= 80) {
        grade = 'Cemerlang (A)';
        gradeClass = 'text-emerald-800 bg-emerald-100 border-emerald-300 font-black';
      } else if (totalScore >= 65) {
        grade = 'Kepujian (B)';
        gradeClass = 'text-indigo-800 bg-indigo-100 border-indigo-300 font-black';
      } else if (totalScore >= 50) {
        grade = 'Lulus (C)';
        gradeClass = 'text-amber-800 bg-amber-100 border-amber-300 font-black';
      } else {
        grade = 'Perlu Ulang (D)';
        gradeClass = 'text-rose-800 bg-rose-100 border-rose-300 font-black';
      }
    } else if (hasAttempted) {
      grade = 'Dalam Proses (Belum Lengkap)';
      gradeClass = 'text-amber-800 bg-amber-100 border-amber-300 font-bold';
    }

    return {
      allCompleted,
      hasAttempted,
      vocabScore: vScore,
      sentenceScore: sScore,
      chatD1Score: c1Score,
      chatD2Score: c2Score,
      totalScore,
      grade,
      gradeClass
    };
  } catch (e) {
    return {
      allCompleted: false,
      hasAttempted: false,
      vocabScore: 0,
      sentenceScore: 0,
      chatD1Score: 0,
      chatD2Score: 0,
      totalScore: 0,
      grade: 'Belum Selesai',
      gradeClass: 'text-slate-600 bg-slate-100 border-slate-300'
    };
  }
}


// Auto-calculate and update dialog speech score based on correct sentences and words
function recordSentenceSpeechScore(topicNum, scenarioId, msgIdx, correctWords, totalWords) {
  if (!topicNum || !scenarioId) return;
  const progressKey = `pinyingo_chat_progress_${topicNum}_d${scenarioId}`;
  let progress = {};
  try {
    progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
  } catch (e) {}

  // Simpan markah tertinggi bagi ayat ini
  const prev = progress[msgIdx] || { correct: 0, total: totalWords, isPassed: false };
  const isPassed = correctWords >= totalWords && totalWords > 0;
  if (!progress[msgIdx] || correctWords >= (prev.correct || 0)) {
    progress[msgIdx] = {
      correct: correctWords,
      total: totalWords,
      isPassed: isPassed
    };
  }
  localStorage.setItem(progressKey, JSON.stringify(progress));

  // Kira markah dialog berdasarkan purata perkataan & ayat yang betul
  const scenarioData = (typeof CHAT_SCENARIOS !== 'undefined' && CHAT_SCENARIOS[scenarioId]) ? CHAT_SCENARIOS[scenarioId] : null;
  if (!scenarioData || !scenarioData.messages) return;

  const totalMessages = scenarioData.messages.length;
  let totalDialogWords = 0;
  let totalWordsCorrect = 0;
  let sentencesPassed = 0;

  scenarioData.messages.forEach((msg, i) => {
    const tCount = (msg.tokens && msg.tokens.length > 0) ? msg.tokens.length : (msg.hz ? msg.hz.replace(/[，。！？\s.,!?]/g, '').length : 1);
    totalDialogWords += tCount;

    const p = progress[i];
    if (p) {
      totalWordsCorrect += Math.min(p.correct || 0, tCount);
      if (p.isPassed || p.correct >= tCount) {
        sentencesPassed++;
      }
    }
  });

  const wordAcc = totalDialogWords > 0 ? (totalWordsCorrect / totalDialogWords) : 0;
  const sentenceAcc = totalMessages > 0 ? (sentencesPassed / totalMessages) : 0;
  const blendedAcc = (0.5 * wordAcc) + (0.5 * sentenceAcc);
  const dialogScore = Math.min(10, Math.max(0, Math.round(blendedAcc * 10)));

  const type = scenarioId == 1 ? 'chat_d1' : 'chat_d2';
  saveTopicScore(topicNum, dialogScore, type);

  return {
    dialogScore,
    sentencesPassed,
    totalMessages,
    totalWordsCorrect,
    totalDialogWords,
    percentage: Math.round(blendedAcc * 100)
  };
}

function refreshChatDialogCard(topicNum) {
  const label = document.getElementById('chat-completion-label') || document.getElementById('chat-dialog-label');
  const badge = document.getElementById('chat-completion-badge') || document.getElementById('chat-dialog-badge');
  const desc = document.getElementById('chat-completion-desc');
  if (!label || !badge) return;

  const curScenario = typeof currentScenarioId !== 'undefined' ? currentScenarioId : 1;
  const scoreData = getTopicScore(topicNum);
  const isD1 = curScenario == 1;
  const curScore = isD1 ? (scoreData.chatD1Score || 0) : (scoreData.chatD2Score || 0);

  // Ambil maklumat kemajuan sebutan
  const progressKey = `pinyingo_chat_progress_${topicNum}_d${curScenario}`;
  let progress = {};
  try {
    progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
  } catch (e) {}

  const scenarioData = (typeof CHAT_SCENARIOS !== 'undefined' && CHAT_SCENARIOS[curScenario]) ? CHAT_SCENARIOS[curScenario] : null;
  let totalMessages = scenarioData ? scenarioData.messages.length : 0;
  let totalDialogWords = 0;
  let totalWordsCorrect = 0;
  let sentencesPassed = 0;

  if (scenarioData) {
    scenarioData.messages.forEach((msg, i) => {
      const tCount = (msg.tokens && msg.tokens.length > 0) ? msg.tokens.length : (msg.hz ? msg.hz.replace(/[，。！？\s.,!?]/g, '').length : 1);
      totalDialogWords += tCount;
      const p = progress[i];
      if (p) {
        totalWordsCorrect += Math.min(p.correct || 0, tCount);
        if (p.isPassed || p.correct >= tCount) {
          sentencesPassed++;
          const passBadge = document.getElementById(`badge-pass-${i}`);
          if (passBadge) passBadge.classList.remove('hidden');
        }
      }
    });
  }

  label.innerText = `Markah Pertuturan Dialog ${curScenario}`;

  if (curScore >= 10 && sentencesPassed === totalMessages) {
    badge.className = "px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border-2 border-emerald-400";
    badge.innerText = `10 / 10 Markah Penuh ✓ (${sentencesPassed}/${totalMessages} Ayat Lulus)`;
    if (desc) desc.innerText = `Tahniah! Kesemua ${totalMessages} ayat dan ${totalDialogWords} perkataan berjaya disebut dengan sempurna (10/10 markah disimpan automatik ke E-Sijil).`;
  } else if (curScore > 0 || sentencesPassed > 0 || totalWordsCorrect > 0) {
    badge.className = "px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-900 border-2 border-indigo-400";
    badge.innerText = `${curScore} / 10 Markah (${sentencesPassed}/${totalMessages} Ayat Lulus, ${totalWordsCorrect}/${totalDialogWords} Kata)`;
    if (desc) desc.innerText = `Markah telah dikira & disimpan automatik ke E-Sijil: ${sentencesPassed}/${totalMessages} ayat lulus, ${totalWordsCorrect}/${totalDialogWords} perkataan betul.`;
  } else {
    badge.className = "px-3 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-500 border border-slate-300";
    badge.innerText = `0 / 10 Markah`;
    if (desc) desc.innerText = `Markah dijana & disimpan secara automatik ke dalam E-Sijil sebaik sahaja anda menguji sebutan ayat di atas.`;
  }
}

function completeCurrentChatDialog() {
  const curScenario = typeof currentScenarioId !== 'undefined' ? currentScenarioId : 1;
  const scoreData = getTopicScore(currentCertTopicNum);
  const curScore = curScenario === 1 ? (scoreData.chatD1Score || 0) : (scoreData.chatD2Score || 0);

  if (typeof playBeep === 'function') playBeep('success');
  if (typeof confetti === 'function') {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  }

  const type = curScenario === 1 ? 'chat_d1' : 'chat_d2';
  saveTopicScore(currentCertTopicNum, curScore, type);

  const updatedData = getTopicScore(currentCertTopicNum);
  if (updatedData.allCompleted) {
    setTimeout(() => {
      alert(`🎉 TAHNIAH! Anda telah menyelesaikan SEMUA aktiviti pembelajaran & latihan bagi Topik ini!\n\n• Bina Kata: ${updatedData.vocabScore}/40\n• Pola Ayat: ${updatedData.sentenceScore}/40\n• Pertuturan Dialog 1: ${updatedData.chatD1Score}/10\n• Pertuturan Dialog 2: ${updatedData.chatD2Score}/10\n\nJUMLAH KESELURUHAN: ${updatedData.totalScore} / 100 (${updatedData.grade})\n\nTekan butang 'Sijil' di atas untuk melihat dan mencetak E-Sijil rasmi anda!`);
      openTopicCertificate(currentCertTopicNum);
    }, 400);
  } else {
    setTimeout(() => {
      alert(`✅ Markah Pertuturan Dialog ${curScenario}: ${curScore}/10 Markah telah disimpan dan disahkan ke dalam sistem!\n\nJumlah markah terkumpul topik ini: ${updatedData.totalScore} / 100.\nSila lengkapkan baki latihan lain untuk melayakkan diri menerima E-Sijil rasmi.`);
    }, 300);
  }
}

// 7. Open & Render Certificate Modal
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

  const scoreData = getTopicScore(currentCertTopicNum);
  if (scoreData.allCompleted && scoreData.totalScore >= 50 && typeof confetti === 'function') {
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
  const scoreData = getTopicScore(topicNum);

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

  // Set score display
  const scoreDisplay = document.getElementById('cert-score-display');
  if (scoreDisplay) {
    scoreDisplay.innerText = `${scoreData.totalScore} / 100 (${scoreData.totalScore}%)`;
    scoreDisplay.className = scoreData.allCompleted 
      ? "font-outfit font-black text-sm sm:text-base text-emerald-700 leading-tight" 
      : "font-outfit font-black text-sm sm:text-base text-slate-700 leading-tight";
  }

  // Set grade display
  const gradeDisplay = document.getElementById('cert-grade-display');
  if (gradeDisplay) {
    gradeDisplay.innerText = scoreData.grade;
    gradeDisplay.className = `inline-block px-2.5 py-0.5 rounded-full font-black text-xs border ${scoreData.gradeClass}`;
  }

  // Set breakdown pills
  const bkScore = document.getElementById('cert-bk-score');
  const paScore = document.getElementById('cert-pa-score');
  const d1Score = document.getElementById('cert-d1-score');
  const d2Score = document.getElementById('cert-d2-score');

  if (bkScore) bkScore.innerText = `${scoreData.vocabScore}/40`;
  if (paScore) paScore.innerText = `${scoreData.sentenceScore}/40`;
  if (d1Score) d1Score.innerText = `${scoreData.chatD1Score}/10`;
  if (d2Score) d2Score.innerText = `${scoreData.chatD2Score}/10`;

  // Warning banner & statement text
  const warningBanner = document.getElementById('cert-unattempted-warning');
  const warningText = document.getElementById('cert-warning-text');
  const descEl = document.getElementById('cert-statement-desc');

  if (scoreData.allCompleted) {
    if (warningBanner) warningBanner.classList.add('hidden');
    if (descEl) {
      descEl.innerText = "telah berjaya menguasai dan menyempurnakan kesemua modul pembelajaran serta latihan amali kendiri bagi sukatan:";
    }
  } else {
    if (warningBanner) warningBanner.classList.remove('hidden');
    if (warningText) {
      warningText.innerHTML = `Status Latihan: <strong>${scoreData.totalScore}/100 Markah Terkumpul</strong>. Anda belum menyelesaikan kesemua soalan latihan (Bina Kata 40m, Pola Ayat 40m, Dialog 1 10m, Dialog 2 10m). Sila lengkapkan kesemua aktiviti untuk mengesahkan gred rasmi.`;
    }
    if (descEl) {
      descEl.innerText = "Status Modul: Pelajar sedang menjalani pembelajaran kendiri (latihan belum diselesaikan sepenuhnya) bagi sukatan:";
    }
  }

  // Set date formatted in BM
  const dateEl = document.getElementById('cert-issue-date');
  if (dateEl) {
    const today = new Date();
    const months = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
    dateEl.innerText = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
  }

  // Set verification code
  const verifyEl = document.getElementById('cert-verify-code');
  if (verifyEl) {
    let hash = 0;
    const str = (studentName || 'KVPD') + info.num + (scoreData.totalScore || 0);
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    const hashHex = Math.abs(hash).toString(16).toUpperCase().padStart(4, '0').slice(-4);
    verifyEl.innerText = `KVPD-ELM4322-T${info.num}-${hashHex}`;
  }
}

// 8. Robust Print / PDF Engine
function printCertificate() {
  window.print();
}

// 9. Download Certificate as High-Definition Image (PNG)
function downloadCertificateImage() {
  const printArea = document.getElementById('certificate-print-area');
  if (!printArea) return;

  if (typeof html2canvas === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    script.onload = () => captureAndDownload(printArea);
    document.head.appendChild(script);
  } else {
    captureAndDownload(printArea);
  }
}

function captureAndDownload(targetEl) {
  const studentName = (getStudentName() || 'Pelajar').replace(/\s+/g, '_');
  const filename = `Sijil_PinyinGo_${studentName}_Topik${currentCertTopicNum}.png`;

  html2canvas(targetEl, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: '#fcfaf5',
    logging: false
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}
