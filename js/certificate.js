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

// 2. Inject CSS for Certificate & Print (Fixes iOS Safari / Android / Desktop Paper Scaling)
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
      #certificate-print-area img {
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

        <!-- Unattempted Warning Banner (no-print) -->
        <div id="cert-unattempted-warning" class="no-print hidden mb-3 p-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs flex items-center justify-between shadow-sm">
          <div class="flex items-center space-x-2">
            <span class="text-lg">⚠️</span>
            <span>Anda <strong>belum menyelesaikan</strong> latihan bagi Topik ini. Markah semasa adalah <strong>0 / 100</strong>. Sila lengkapkan soalan latihan terlebih dahulu untuk menjana markah rasmi anda.</span>
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
                <img src="https://ekvpd.com/v1/lp/lp/assets/images/logokv.png" alt="Logo Kolej Vokasional Port Dickson" class="h-16 sm:h-20 object-contain filter drop-shadow-sm mb-1" onerror="this.onerror=null; this.src='assets/images/logokv.png';">
                <span class="font-outfit font-black tracking-widest text-xs sm:text-sm text-amber-950 uppercase mt-0.5">KOLEJ VOKASIONAL PORT DICKSON</span>
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
                Merangkumi Penguasaan Kosa Kata Hanzi & Pinyin, Pembinaan Pola Ayat dan Amali Pertuturan Suara.
              </p>
            </div>

            <!-- Badges & Verification Row: ACTUAL MARKS & GRADE -->
            <div class="score-grid grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto my-4 text-center bg-slate-50/95 p-3 rounded-2xl border border-slate-200/90 text-[10px] sm:text-xs">
              <div class="flex flex-col justify-center border-r border-slate-200 pr-2">
                <span class="block text-slate-400 font-bold uppercase text-[9px] mb-0.5">Markah:</span>
                <span id="cert-score-display" class="font-outfit font-black text-sm sm:text-base text-slate-900 leading-tight">
                  0 / 100 (0%)
                </span>
              </div>
              <div class="flex flex-col justify-center items-center border-r border-slate-200 px-2">
                <span class="block text-slate-400 font-bold uppercase text-[9px] mb-0.5">Keputusan:</span>
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

// 5. Topic Score Management (Persisted in localStorage)
function saveTopicScore(topicNum, score, type = 'vocab') {
  const key = `pinyingo_score_topik_${topicNum}`;
  let data = {};
  try {
    data = JSON.parse(localStorage.getItem(key) || '{}');
  } catch (e) {}

  if (type === 'vocab') {
    data.vocabScore = score;
    data.vocabCompleted = true;
  } else if (type === 'sentence') {
    data.sentenceScore = score;
    data.sentenceCompleted = true;
  }

  // Calculate final score
  if (data.vocabScore !== undefined && data.sentenceScore !== undefined) {
    data.finalScore = Math.round((data.vocabScore + data.sentenceScore) / 2);
  } else {
    data.finalScore = data.vocabScore !== undefined ? data.vocabScore : data.sentenceScore;
  }

  data.completed = true;
  data.lastUpdated = new Date().toISOString();
  localStorage.setItem(key, JSON.stringify(data));
}

function getTopicScore(topicNum) {
  const key = `pinyingo_score_topik_${topicNum}`;
  const raw = localStorage.getItem(key);
  if (!raw) {
    return {
      hasAttempted: false,
      score: 0,
      grade: 'Belum Selesai',
      gradeClass: 'text-slate-600 bg-slate-100 border-slate-300'
    };
  }

  try {
    const data = JSON.parse(raw);
    const score = data.finalScore !== undefined ? data.finalScore : 0;
    const hasAttempted = data.vocabCompleted || data.sentenceCompleted || data.completed;

    if (!hasAttempted) {
      return {
        hasAttempted: false,
        score: 0,
        grade: 'Belum Selesai',
        gradeClass: 'text-slate-600 bg-slate-100 border-slate-300'
      };
    }

    let grade = 'Belum Selesai';
    let gradeClass = 'text-slate-600 bg-slate-100 border-slate-300';

    if (score >= 80) {
      grade = 'Cemerlang (A)';
      gradeClass = 'text-emerald-800 bg-emerald-100 border-emerald-300 font-black';
    } else if (score >= 65) {
      grade = 'Kepujian (B)';
      gradeClass = 'text-indigo-800 bg-indigo-100 border-indigo-300 font-black';
    } else if (score >= 50) {
      grade = 'Lulus (C)';
      gradeClass = 'text-amber-800 bg-amber-100 border-amber-300 font-black';
    } else {
      grade = 'Perlu Ulang (D)';
      gradeClass = 'text-rose-800 bg-rose-100 border-rose-300 font-black';
    }

    return {
      hasAttempted: true,
      score,
      grade,
      gradeClass
    };
  } catch (e) {
    return {
      hasAttempted: false,
      score: 0,
      grade: 'Belum Selesai',
      gradeClass: 'text-slate-600 bg-slate-100 border-slate-300'
    };
  }
}

// 6. Open & Render Certificate Modal
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
  if (scoreData.hasAttempted && scoreData.score >= 50 && typeof confetti === 'function') {
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
    if (scoreData.hasAttempted) {
      scoreDisplay.innerText = `${scoreData.score} / 100 (${scoreData.score}%)`;
      scoreDisplay.className = "font-outfit font-black text-sm sm:text-base text-emerald-700 leading-tight";
    } else {
      scoreDisplay.innerText = `0 / 100 (0%)`;
      scoreDisplay.className = "font-outfit font-black text-sm sm:text-base text-slate-400 leading-tight";
    }
  }

  // Set grade display
  const gradeDisplay = document.getElementById('cert-grade-display');
  if (gradeDisplay) {
    gradeDisplay.innerText = scoreData.grade;
    gradeDisplay.className = `inline-block px-2.5 py-0.5 rounded-full font-black text-xs border ${scoreData.gradeClass}`;
  }

  // Warning banner & statement text
  const warningBanner = document.getElementById('cert-unattempted-warning');
  const descEl = document.getElementById('cert-statement-desc');

  if (scoreData.hasAttempted) {
    if (warningBanner) warningBanner.classList.add('hidden');
    if (descEl) {
      descEl.innerText = "telah berjaya menguasai dan menyempurnakan modul pembelajaran serta latihan amali kendiri bagi sukatan:";
    }
  } else {
    if (warningBanner) warningBanner.classList.remove('hidden');
    if (descEl) {
      descEl.innerText = "Status Modul: Pelajar sedang menjalani pembelajaran kendiri (belum melengkapkan soalan latihan) bagi sukatan:";
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
    const str = (studentName || 'KVPD') + info.num + (scoreData.score || 0);
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    const hashHex = Math.abs(hash).toString(16).toUpperCase().padStart(4, '0').slice(-4);
    verifyEl.innerText = `KVPD-ELM4322-T${info.num}-${hashHex}`;
  }
}

// 7. Robust Print / PDF Engine
function printCertificate() {
  window.print();
}

// 8. Download Certificate as High-Definition Image (PNG) for mobile/iPhone saving
function downloadCertificateImage() {
  const printArea = document.getElementById('certificate-print-area');
  if (!printArea) return;

  if (typeof html2canvas === 'undefined') {
    // Dynamically load html2canvas if not yet loaded
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
