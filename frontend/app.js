/* =============================================================
   SMARTBUDGET v5 — Frontend Logic
   ============================================================= */

const CONFIG = { API_BASE_URL: "http://127.0.0.1:5000" };

// ── I18N ──────────────────────────────────────────────────────
const TRANSLATIONS = {
  id: {
    "home.subtitle":"Rumah Tangga",
    "home.pill":"Aplikasi Keuangan Rumah Tangga Terbaik",
    "home.heroTitle":"Kelola Keuangan Keluarga<br>Lebih Cerdas &amp; Rapi",
    "home.heroDesc":"Catat pemasukan, pengeluaran, dan pantau target tabungan keluargamu dalam satu tempat. Laporan bulanan otomatis, mudah dipahami, dan 100% gratis.",
    "home.startFree":"Mulai Gratis Sekarang","home.haveAccount":"Sudah Punya Akun","home.registerFree":"Daftar Gratis",
    "home.stat1":"Gratis &amp; Aman","home.stat2":"Fitur Lengkap","home.stat3":"Transaksi &amp; Kategori",
    "home.feat1Title":"Catat Transaksi","home.feat1Desc":"Pemasukan dan pengeluaran harian tercatat rapi berdasarkan kategori yang bisa kamu buat sendiri.",
    "home.feat2Title":"Atur Anggaran","home.feat2Desc":"Kelola kategori custom dan target tabungan keluarga dalam satu tampilan yang mudah dipahami.",
    "home.feat3Title":"Laporan Bulanan","home.feat3Desc":"Pantau arus kas rumah tangga per bulan dengan grafik dan ringkasan yang ringkas dan jelas.",
    "auth.login":"Masuk","auth.logout":"Keluar","auth.register":"Daftar Sekarang",
    "auth.loginTitle":"Masuk ke Akunmu","auth.registerTitle":"Buat Akun Baru",
    "auth.backHome":"Kembali ke beranda","auth.tagline":"Catat pemasukan, pengeluaran, dan target tabungan keluargamu di satu tempat.",
    "auth.fullName":"Nama Lengkap","auth.noAccount":"Belum punya akun?","auth.registerNow":"Daftar sekarang",
    "auth.haveAccount":"Sudah punya akun?","auth.loginHere":"Masuk di sini",
    "nav.mainMenu":"Menu Utama","nav.dashboard":"Dashboard","nav.transaksi":"Transaksi",
    "nav.anggaran":"Anggaran","nav.laporan":"Laporan","nav.profil":"Profil","nav.account":"Akun",
    "dash.saldo":"Saldo Saat Ini","dash.topUp":"Isi Saldo","dash.totalIncome":"Total Pemasukan",
    "dash.totalExpense":"Total Pengeluaran","dash.savingTarget":"Target Tabungan",
    "dash.chartTitle":"Pemasukan vs Pengeluaran","dash.recentTrx":"Transaksi Terbaru",
    "dash.topUpInfo":"Nominal ini akan dicatat sebagai transaksi <strong>Pemasukan</strong> pada kategori <strong>\"Saldo Manual\"</strong>.",
    "dash.addToSaldo":"Tambahkan ke Saldo",
    "trx.allTrx":"Semua Transaksi","trx.add":"Tambah Transaksi","trx.date":"Tanggal",
    "trx.category":"Kategori","trx.note":"Catatan","trx.amount":"Jumlah","trx.type":"Jenis Transaksi",
    "trx.income":"Pemasukan","trx.expense":"Pengeluaran",
    "trx.noCategory":"Belum ada kategori untuk jenis ini. Tambahkan dulu lewat menu Kategori.",
    "trx.emptyTitle":"Belum ada transaksi","trx.emptyDesc":"Yuk catat transaksi pertamamu sekarang.",
    "kat.title":"Kategori","kat.incomeExpense":"Kategori Pemasukan &amp; Pengeluaran",
    "kat.add":"Tambah Kategori","kat.name":"Nama Kategori","kat.type":"Tipe",
    "kat.iconHint":"(pilih atau ketik emoji)","kat.emptyTitle":"Belum ada kategori",
    "kat.emptyDesc":"Tambahkan kategori pemasukan atau pengeluaran dulu.",
    "target.title":"Target Tabungan","target.add":"Tambah Target","target.name":"Nama Target",
    "target.nominal":"Nominal Target (Rp)","target.collected":"Nominal Terkumpul (Rp)",
    "target.emptyTitle":"Belum ada target tabungan","target.emptyDesc":"Mulai buat tujuan menabungmu sekarang.",
    "laporan.title":"Laporan Bulanan","laporan.show":"Tampilkan","laporan.monthSaldo":"Saldo Bulan Ini",
    "laporan.download":"Unduh Laporan:","laporan.thisWeek":"Minggu Ini","laporan.thisMonth":"Bulan Ini",
    "laporan.thisYear":"Tahun Ini","laporan.downloadFilter":"Unduh Filter Aktif",
    "laporan.chartTitle":"Grafik Arus Kas","laporan.emptyTitle":"Tidak ada data",
    "laporan.emptyDesc":"Tidak ada transaksi pada bulan &amp; tahun yang dipilih.",
    "profil.editInfo":"Edit Informasi","profil.saveChanges":"Simpan Perubahan",
    "profil.dangerZone":"Zona Berbahaya","profil.dangerDesc":"Menghapus akun akan menghilangkan semua data secara permanen.",
    "profil.deleteAccount":"Hapus Akun Permanen","settings.title":"Pengaturan",
    "settings.language":"Bahasa","settings.languageDesc":"Pilih bahasa tampilan aplikasi",
    "settings.darkMode":"Mode Gelap","settings.darkModeDesc":"Gunakan tema warna gelap",
    "common.seeAll":"Lihat semua","common.action":"Aksi","common.cancel":"Batal",
    "common.save":"Simpan","common.optional":"(opsional)","common.yesDelete":"Ya, Hapus",
    "section.dashboard":"Dashboard","section.transaksi":"Transaksi","section.anggaran":"Anggaran",
    "section.laporan":"Laporan","section.profil":"Profil",
    "eyebrow.dashboard":"Ringkasan","eyebrow.transaksi":"Kelola","eyebrow.anggaran":"Kelola",
    "eyebrow.laporan":"Analisis","eyebrow.profil":"Akun",
    "months":["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
  },
  en: {
    "home.subtitle":"Household","home.pill":"Best Household Finance App",
    "home.heroTitle":"Manage Family Finances<br>Smarter &amp; Tidier",
    "home.heroDesc":"Record income, expenses, and track your family savings goals in one place. 100% free.",
    "home.startFree":"Start for Free","home.haveAccount":"I Already Have an Account","home.registerFree":"Register Free",
    "home.stat1":"Free &amp; Secure","home.stat2":"Full Features","home.stat3":"Transactions &amp; Categories",
    "home.feat1Title":"Record Transactions","home.feat1Desc":"Daily income and expenses recorded neatly by category.",
    "home.feat2Title":"Manage Budget","home.feat2Desc":"Manage custom categories and family savings targets.",
    "home.feat3Title":"Monthly Reports","home.feat3Desc":"Track household cash flow per month with concise charts.",
    "auth.login":"Sign In","auth.logout":"Sign Out","auth.register":"Register Now",
    "auth.loginTitle":"Sign In to Your Account","auth.registerTitle":"Create New Account",
    "auth.backHome":"Back to homepage","auth.tagline":"Record your family finances in one place.",
    "auth.fullName":"Full Name","auth.noAccount":"Don't have an account?","auth.registerNow":"Register now",
    "auth.haveAccount":"Already have an account?","auth.loginHere":"Sign in here",
    "nav.mainMenu":"Main Menu","nav.dashboard":"Dashboard","nav.transaksi":"Transactions",
    "nav.anggaran":"Budget","nav.laporan":"Reports","nav.profil":"Profile","nav.account":"Account",
    "dash.saldo":"Current Balance","dash.topUp":"Top Up","dash.totalIncome":"Total Income",
    "dash.totalExpense":"Total Expenses","dash.savingTarget":"Savings Targets",
    "dash.chartTitle":"Income vs Expenses","dash.recentTrx":"Recent Transactions",
    "dash.topUpInfo":"This amount will be recorded as <strong>Income</strong> under <strong>\"Manual Balance\"</strong>.",
    "dash.addToSaldo":"Add to Balance",
    "trx.allTrx":"All Transactions","trx.add":"Add Transaction","trx.date":"Date",
    "trx.category":"Category","trx.note":"Note","trx.amount":"Amount","trx.type":"Type",
    "trx.income":"Income","trx.expense":"Expense",
    "trx.noCategory":"No category for this type. Add one in the Category menu.",
    "trx.emptyTitle":"No transactions yet","trx.emptyDesc":"Start recording your first transaction now.",
    "kat.title":"Categories","kat.incomeExpense":"Income &amp; Expense Categories",
    "kat.add":"Add Category","kat.name":"Category Name","kat.type":"Type",
    "kat.iconHint":"(pick or type emoji)","kat.emptyTitle":"No categories yet",
    "kat.emptyDesc":"Add an income or expense category first.",
    "target.title":"Savings Targets","target.add":"Add Target","target.name":"Target Name",
    "target.nominal":"Target Amount (Rp)","target.collected":"Collected (Rp)",
    "target.emptyTitle":"No savings targets yet","target.emptyDesc":"Start creating your savings goals now.",
    "laporan.title":"Monthly Reports","laporan.show":"Show","laporan.monthSaldo":"This Month Balance",
    "laporan.download":"Download:","laporan.thisWeek":"This Week","laporan.thisMonth":"This Month",
    "laporan.thisYear":"This Year","laporan.downloadFilter":"Download Filter",
    "laporan.chartTitle":"Cash Flow Chart","laporan.emptyTitle":"No data",
    "laporan.emptyDesc":"No transactions for this month &amp; year.",
    "profil.editInfo":"Edit Info","profil.saveChanges":"Save Changes",
    "profil.dangerZone":"Danger Zone","profil.dangerDesc":"Deleting your account permanently removes all data.",
    "profil.deleteAccount":"Delete Account","settings.title":"Settings",
    "settings.language":"Language","settings.languageDesc":"Choose display language",
    "settings.darkMode":"Dark Mode","settings.darkModeDesc":"Use dark color theme",
    "common.seeAll":"See all","common.action":"Action","common.cancel":"Cancel",
    "common.save":"Save","common.optional":"(optional)","common.yesDelete":"Yes, Delete",
    "section.dashboard":"Dashboard","section.transaksi":"Transactions","section.anggaran":"Budget",
    "section.laporan":"Reports","section.profil":"Profile",
    "eyebrow.dashboard":"Overview","eyebrow.transaksi":"Manage","eyebrow.anggaran":"Manage",
    "eyebrow.laporan":"Analysis","eyebrow.profil":"Account",
    "months":["January","February","March","April","May","June","July","August","September","October","November","December"],
  },
};

let currentLang = localStorage.getItem("sb_lang") || "id";
function t(key) { return TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS["id"]?.[key] ?? key; }
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t(el.dataset.i18n);
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll(".lang-pill").forEach((p) => p.classList.toggle("active", p.dataset.lang === currentLang));
  document.documentElement.lang = currentLang;
}
function setLang(lang) { currentLang = lang; localStorage.setItem("sb_lang", lang); applyTranslations(); }

// ── DARK MODE ─────────────────────────────────────────────────
let isDark = localStorage.getItem("sb_theme") === "dark";

function applyTheme(dark) {
  isDark = dark;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  localStorage.setItem("sb_theme", dark ? "dark" : "light");
  const t1 = document.getElementById("themeToggle");
  const t2 = document.getElementById("themeToggle2");
  if (t1) t1.checked = dark;
  if (t2) t2.checked = dark;
  updateChartsForTheme();
}
function updateChartsForTheme() {
  const tc = isDark ? "#94a3b8" : "#475569";
  const gc = isDark ? "rgba(45,49,72,0.8)" : "rgba(226,232,240,0.6)";
  [state.dashboardChart, state.laporanChart, state.dbMonthChart].forEach((c) => {
    if (!c) return;
    if (c.options.plugins?.legend?.labels) c.options.plugins.legend.labels.color = tc;
    if (c.options.scales?.x?.ticks) c.options.scales.x.ticks.color = tc;
    if (c.options.scales?.y?.ticks) c.options.scales.y.ticks.color = tc;
    if (c.options.scales?.y?.grid)  c.options.scales.y.grid.color  = gc;
    c.update();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(isDark);
  const t1 = document.getElementById("themeToggle");
  const t2 = document.getElementById("themeToggle2");
  if (t1) t1.addEventListener("change", () => applyTheme(t1.checked));
  if (t2) t2.addEventListener("change", () => applyTheme(t2.checked));
  document.querySelectorAll(".lang-pill").forEach((p) => p.addEventListener("click", () => setLang(p.dataset.lang)));
  applyTranslations();
});

// ── STATE ──────────────────────────────────────────────────────
const state = {
  token: localStorage.getItem("dompet_token") || null,
  user:  JSON.parse(localStorage.getItem("dompet_user") || "null"),
  kategoriList: [],
  transaksiList: [],
  targetList: [],
  laporanCache: [],
  dashboardChart: null,
  laporanChart: null,
  dbMonthChart: null,
};
function saveSession(token, user) {
  state.token = token; state.user = user;
  localStorage.setItem("dompet_token", token);
  localStorage.setItem("dompet_user", JSON.stringify(user));
}
function clearSession() {
  state.token = null; state.user = null;
  localStorage.removeItem("dompet_token");
  localStorage.removeItem("dompet_user");
}

// ── API ────────────────────────────────────────────────────────
async function apiRequest(path, { method="GET", body=null, auth=true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth && state.token) headers["Authorization"] = `Bearer ${state.token}`;
  let response;
  try {
    response = await fetch(`${CONFIG.API_BASE_URL}${path}`, {
      method, headers, body: body ? JSON.stringify(body) : null,
    });
  } catch {
    throw new Error("Tidak bisa menghubungi server. Pastikan backend berjalan.");
  }
  let data = {};
  try { data = await response.json(); } catch { data = {}; }
  if (response.status === 401) { clearSession(); showAuthScreen(); throw new Error(data.message || "Sesi berakhir."); }
  if (!response.ok || data.success === false) throw new Error(data.message || "Terjadi kesalahan.");
  return data;
}

// ── TOAST ──────────────────────────────────────────────────────
function showToast(msg, type="success", ms=3800) {
  const icons = { success:"bi-check-circle-fill", danger:"bi-exclamation-triangle-fill", warning:"bi-exclamation-circle-fill", info:"bi-info-circle-fill" };
  const id = `toast-${Date.now()}`;
  const el = document.createElement("div");
  el.className = `toast toast--${type}`; el.id = id;
  el.innerHTML = `<i class="bi ${icons[type]||icons.info} toast-icon"></i><span style="flex:1;">${msg}</span>
    <button class="toast-close" onclick="dismissToast('${id}')"><i class="bi bi-x-lg"></i></button>`;
  document.getElementById("toastContainer").appendChild(el);
  el._timer = setTimeout(() => dismissToast(id), ms);
}
window.dismissToast = function(id) {
  const el = document.getElementById(id); if (!el) return;
  clearTimeout(el._timer);
  el.style.cssText += "opacity:0;transform:translateX(20px);transition:opacity .3s,transform .3s";
  setTimeout(() => el.remove(), 320);
};
function handleError(err) { console.error(err); showToast(err.message || "Terjadi kesalahan.", "danger"); }

// ── HELPERS ────────────────────────────────────────────────────
function formatRupiah(n) {
  return new Intl.NumberFormat("id-ID", { style:"currency", currency:"IDR", minimumFractionDigits:0 }).format(Number(n)||0);
}
function formatTanggal(s) {
  if (!s) return "-";
  const d = new Date(s); if (isNaN(d)) return s;
  return d.toLocaleDateString("id-ID", { day:"numeric", month:"short", year:"numeric" });
}
function initials(name) {
  if (!name) return "?";
  const p = name.trim().split(" ");
  return p.length >= 2 ? (p[0][0]+p[1][0]).toUpperCase() : p[0][0].toUpperCase();
}
function animateValue(id, val, fmt) {
  const el = document.getElementById(id); if (!el) return;
  el.style.cssText += "opacity:0;transform:translateY(6px);transition:opacity .25s,transform .25s";
  setTimeout(() => { el.textContent = fmt(val); el.style.opacity="1"; el.style.transform="translateY(0)"; }, 120);
}
function setButtonLoading(btn, loading) {
  if (!btn) return;
  if (loading) { btn.disabled=true; btn.dataset.orig=btn.innerHTML; btn.innerHTML=`<span class="spinner spinner--sm spinner--white"></span> Memproses...`; }
  else         { btn.disabled=false; btn.innerHTML=btn.dataset.orig||""; }
}

// ── SCREENS ────────────────────────────────────────────────────
const homepageScreen = document.getElementById("homepageScreen");
const authScreen     = document.getElementById("authScreen");
const appShell       = document.getElementById("appShell");
const loginForm      = document.getElementById("loginForm");
const registerForm   = document.getElementById("registerForm");
function show(el)     { if (el) el.style.display="block"; }
function hide(el)     { if (el) el.style.display="none"; }
function showFlex(el) { if (el) el.style.display="flex"; }
function showHomepage()   { show(homepageScreen); hide(authScreen); hide(appShell); document.title="SmartBudget"; }
function showAuthScreen(m="login") {
  hide(homepageScreen); showFlex(authScreen); hide(appShell);
  m==="register" ? (hide(loginForm),show(registerForm)) : (hide(registerForm),show(loginForm));
}
function showAppShell() { hide(homepageScreen); hide(authScreen); appShell.style.display="block"; }

// ── AUTH EVENTS ────────────────────────────────────────────────
function goToLogin() { state.token && state.user ? bootApp() : showAuthScreen("login"); }
document.getElementById("homeGoLogin").addEventListener("click", goToLogin);
document.getElementById("homeGoRegister").addEventListener("click", () => showAuthScreen("register"));
document.getElementById("heroGoLogin").addEventListener("click", goToLogin);
document.getElementById("heroGoRegister").addEventListener("click", () => showAuthScreen("register"));
document.getElementById("authBackHome").addEventListener("click", (e) => { e.preventDefault(); showHomepage(); });
document.getElementById("showRegister").addEventListener("click", (e) => { e.preventDefault(); hide(loginForm); show(registerForm); });
document.getElementById("showLogin").addEventListener("click", (e) => { e.preventDefault(); hide(registerForm); show(loginForm); });

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = loginForm.querySelector('[type="submit"]');
  setButtonLoading(btn, true);
  try {
    const res = await apiRequest("/login", { method:"POST", auth:false, body:{
      email: document.getElementById("loginEmail").value.trim(),
      password: document.getElementById("loginPassword").value,
    }});
    saveSession(res.token, res.user);
    showToast(`Selamat datang, ${res.user.nama}!`);
    loginForm.reset();
    await bootApp();
  } catch(err) { handleError(err); }
  finally { setButtonLoading(btn, false); }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = registerForm.querySelector('[type="submit"]');
  setButtonLoading(btn, true);
  try {
    await apiRequest("/register", { method:"POST", auth:false, body:{
      nama:     document.getElementById("registerNama").value.trim(),
      email:    document.getElementById("registerEmail").value.trim(),
      password: document.getElementById("registerPassword").value,
    }});
    showToast("Registrasi berhasil! Silakan masuk.");
    registerForm.reset(); hide(registerForm); show(loginForm);
  } catch(err) { handleError(err); }
  finally { setButtonLoading(btn, false); }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  clearSession();
  if (state.dashboardChart) { state.dashboardChart.destroy(); state.dashboardChart=null; }
  if (state.laporanChart)   { state.laporanChart.destroy();   state.laporanChart=null; }
  if (state.dbMonthChart)   { state.dbMonthChart.destroy();   state.dbMonthChart=null; }
  state.kategoriList=[];
  showHomepage();
  showToast("Kamu telah keluar.", "info");
});

// ── MODAL ──────────────────────────────────────────────────────
window.openModal = function(id) {
  const el = document.getElementById(id); if (!el) return;
  el.style.display="flex";
  document.body.style.overflow="hidden";
  el._bd = (e) => { if (e.target===el) closeModal(id); };
  el.addEventListener("click", el._bd);
};
window.closeModal = function(id) {
  const el = document.getElementById(id); if (!el) return;
  el.style.display="none";
  document.body.style.overflow="";
  if (el._bd) el.removeEventListener("click", el._bd);
};
document.addEventListener("keydown", (e) => {
  if (e.key!=="Escape") return;
  document.querySelectorAll(".modal-overlay").forEach((m) => { if (m.style.display==="flex") closeModal(m.id); });
});

// ── SIDEBAR (mobile) ───────────────────────────────────────────
const sidebar  = document.getElementById("sidebar");
const backdrop = document.getElementById("sidebarBackdrop");
function openMobileSidebar()  { sidebar.classList.add("open");    backdrop.classList.add("show");    document.body.style.overflow="hidden"; }
function closeMobileSidebar() { sidebar.classList.remove("open"); backdrop.classList.remove("show"); document.body.style.overflow=""; }
document.getElementById("mobileMenuBtn")?.addEventListener("click", openMobileSidebar);
backdrop?.addEventListener("click", closeMobileSidebar);

// ── NAVIGATION ─────────────────────────────────────────────────
function navigateTo(key) {
  document.querySelectorAll(".content-section").forEach((el) => el.style.display="none");
  const sec = document.getElementById(`section-${key}`);
  if (sec) sec.style.display="block";
  document.querySelectorAll(".nav-link-item").forEach((el) => el.classList.toggle("active", el.dataset.section===key));
  document.getElementById("sectionTitle").textContent   = t(`section.${key}`);
  document.getElementById("sectionEyebrow").textContent = t(`eyebrow.${key}`);
  document.title = `SmartBudget — ${t(`section.${key}`)}`;
  if (key==="dashboard") loadDashboard();
  if (key==="transaksi") loadTransaksi();
  if (key==="anggaran")  { loadKategori(); loadTarget(); }
  if (key==="laporan")   loadLaporan();
  if (key==="profil")    loadProfil();
  closeMobileSidebar();
}
document.querySelectorAll("[data-section]").forEach((el) => {
  el.addEventListener("click", (e) => { e.preventDefault(); navigateTo(el.dataset.section); });
});
document.querySelectorAll(".sub-tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tgt = btn.dataset.subtab;
    document.querySelectorAll(".sub-tab-btn").forEach((b) => b.classList.toggle("active", b===btn));
    document.querySelectorAll(".subtab-panel").forEach((p) => { p.style.display = p.id===`subtab-${tgt}` ? "block" : "none"; });
    if (tgt==="spending") loadSpending();
  });
});

// ── KATEGORI ───────────────────────────────────────────────────
let _katLoading = null;
async function ensureKategoriLoaded(force=false) {
  if (!force && state.kategoriList.length>0) return state.kategoriList;
  if (_katLoading) return _katLoading;
  _katLoading = apiRequest("/kategori")
    .then((res) => { state.kategoriList=res.data||[]; return state.kategoriList; })
    .finally(() => { _katLoading=null; });
  return _katLoading;
}
function getKategoriById(id) { return state.kategoriList.find((k) => k.id===id); }

async function loadKategori() {
  try { await ensureKategoriLoaded(true); renderKategoriGrid(); } catch(err) { handleError(err); }
}
function renderKategoriGrid() {
  const grid  = document.getElementById("kategoriGrid");
  const empty = document.getElementById("kategoriEmpty");
  if (!state.kategoriList.length) { grid.innerHTML=""; empty.style.display="block"; return; }
  empty.style.display="none";
  grid.innerHTML = state.kategoriList.map((k) => `
    <div class="category-card">
      <div class="category-card-icon">${k.icon||"🏷️"}</div>
      <div class="category-card-info">
        <div class="category-card-name">${k.nama_kategori}</div>
        <span class="category-card-badge category-card-badge--${k.tipe==="pemasukan"?"in":"out"}">
          <i class="bi bi-${k.tipe==="pemasukan"?"arrow-down-left":"arrow-up-right"}"></i>
          ${k.tipe==="pemasukan" ? t("trx.income") : t("trx.expense")}
        </span>
      </div>
      <div class="category-card-actions">
        <button class="btn-row-action" onclick="openEditKategori(${k.id})"><i class="bi bi-pencil"></i></button>
        <button class="btn-row-action btn-row-action--danger" onclick="confirmDeleteKategori(${k.id})"><i class="bi bi-trash3"></i></button>
      </div>
    </div>`).join("");
}

const _iconInput = document.getElementById("kategoriIcon");
function highlightIconPicker(icon) {
  document.querySelectorAll(".icon-pick-btn").forEach((b) => b.classList.toggle("active", !!icon && b.dataset.icon===icon));
}
document.querySelectorAll(".icon-pick-btn").forEach((btn) => {
  btn.addEventListener("click", () => { _iconInput.value=btn.dataset.icon; highlightIconPicker(btn.dataset.icon); });
});
_iconInput.addEventListener("input", () => highlightIconPicker(_iconInput.value.trim()));

document.getElementById("btnAddKategori").addEventListener("click", () => {
  document.getElementById("kategoriForm").reset();
  document.getElementById("kategoriId").value="";
  document.getElementById("kategoriModalTitle").textContent=t("kat.add");
  highlightIconPicker("");
  openModal("kategoriModal");
});
window.openEditKategori = function(id) {
  const k=getKategoriById(id); if (!k) return;
  document.getElementById("kategoriId").value   = k.id;
  document.getElementById("kategoriNama").value = k.nama_kategori;
  document.getElementById("kategoriTipe").value = k.tipe;
  document.getElementById("kategoriIcon").value = k.icon||"";
  document.getElementById("kategoriModalTitle").textContent="Edit Kategori";
  highlightIconPicker(k.icon||"");
  openModal("kategoriModal");
};
document.getElementById("kategoriForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id  = document.getElementById("kategoriId").value;
  const btn = e.target.querySelector('[type="submit"]');
  const payload = {
    nama_kategori: document.getElementById("kategoriNama").value.trim(),
    tipe:  document.getElementById("kategoriTipe").value,
    icon:  document.getElementById("kategoriIcon").value.trim() || "🏷️",
  };
  if (!payload.nama_kategori) { showToast("Nama kategori tidak boleh kosong.", "danger"); return; }
  setButtonLoading(btn, true);
  try {
    if (id) { await apiRequest(`/kategori/${id}`, { method:"PUT", body:payload }); showToast("Kategori diperbarui."); }
    else     { await apiRequest("/kategori",        { method:"POST",body:payload }); showToast("Kategori ditambahkan."); }
    closeModal("kategoriModal");
    await loadKategori();
  } catch(err) { handleError(err); }
  finally { setButtonLoading(btn, false); }
});
window.confirmDeleteKategori = function(id) {
  openConfirmModal("Hapus kategori ini?", "Transaksi yang memakai kategori ini mungkin tidak tampil.", async () => {
    try { await apiRequest(`/kategori/${id}`,{method:"DELETE"}); showToast("Kategori dihapus."); await loadKategori(); }
    catch(err) { handleError(err); }
  });
};

// ── SALDO MANUAL ───────────────────────────────────────────────
const SALDO_LABEL = "Saldo Manual";
async function ensureSaldoKategori() {
  let kat = null;
  try {
    const res = await apiRequest("/kategori", { method:"POST", body:{ nama_kategori:SALDO_LABEL, tipe:"pemasukan", icon:"💰" }});
    if (Array.isArray(res.data) && res.data.length>0 && res.data[0].id) kat=res.data[0];
  } catch(err) { console.warn("ensureSaldoKategori:", err.message); }
  if (!kat || !kat.id) {
    await ensureKategoriLoaded(true);
    kat = state.kategoriList.find((k) => k.nama_kategori.toLowerCase()===SALDO_LABEL.toLowerCase() && k.tipe==="pemasukan");
  }
  if (!kat || !kat.id) throw new Error("Gagal menyiapkan kategori Saldo Manual. Coba restart backend.");
  return kat;
}
document.getElementById("btnIsiSaldo")?.addEventListener("click", () => {
  document.getElementById("saldoForm").reset();
  document.getElementById("saldoTanggal").valueAsDate = new Date();
  openModal("saldoModal");
});
window.setSaldoQuick = function(amount) {
  document.getElementById("saldoJumlah").value = amount;
  document.getElementById("saldoJumlah").focus();
};
document.getElementById("saldoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const jumlah  = Number(document.getElementById("saldoJumlah").value);
  const tanggal = document.getElementById("saldoTanggal").value;
  const catatan = document.getElementById("saldoCatatan").value.trim() || "Saldo manual";
  if (!jumlah||jumlah<=0) { showToast("Masukkan jumlah yang valid.", "danger"); return; }
  if (!tanggal)           { showToast("Pilih tanggal.", "danger"); return; }
  const btn = e.target.querySelector('[type="submit"]');
  setButtonLoading(btn, true);
  try {
    const kat = await ensureSaldoKategori();
    await apiRequest("/transaksi", { method:"POST", body:{ kategori_id:kat.id, jumlah, tanggal, catatan }});
    closeModal("saldoModal");
    showToast("Saldo berhasil ditambahkan! 💰");
    state.kategoriList=[];
    await loadDashboard();
  } catch(err) { handleError(err); }
  finally { setButtonLoading(btn, false); }
});

// ── DASHBOARD ──────────────────────────────────────────────────
async function loadDashboard() {
  try {
    const [dashRes] = await Promise.all([apiRequest("/dashboard"), ensureKategoriLoaded()]);
    const d = dashRes.data;

    // ── Ringkasan keseluruhan ──
    animateValue("dbSaldo",       d.saldo,             formatRupiah);
    animateValue("dbPemasukan",   d.total_pemasukan,   formatRupiah);
    animateValue("dbPengeluaran", d.total_pengeluaran, formatRupiah);

    const allTrx  = await apiRequest("/transaksi");
    const trxList = allTrx.data || [];
    const incCnt  = trxList.filter((x) => getKategoriById(x.kategori_id)?.tipe==="pemasukan").length;
    const expCnt  = trxList.filter((x) => getKategoriById(x.kategori_id)?.tipe!=="pemasukan").length;
    const el1 = document.getElementById("dbPemasukanCount");
    const el2 = document.getElementById("dbPengeluaranCount");
    if (el1) el1.textContent = `${incCnt} transaksi`;
    if (el2) el2.textContent = `${expCnt} transaksi`;

    const tgtRes  = await apiRequest("/target");
    const tgtList = tgtRes.data || [];
    const tgtDone = tgtList.filter((t) => t.nominal_terkumpul>=t.nominal_target).length;
    const elTc = document.getElementById("dbTargetCount");
    const elTp = document.getElementById("dbTargetProgress");
    if (elTc) elTc.textContent = `${tgtList.length} target`;
    if (elTp) elTp.textContent = tgtList.length ? `${tgtDone} tercapai` : "";

    renderDashboardChart(d.total_pemasukan, d.total_pengeluaran);
    renderHealthCard(d.total_pemasukan, d.total_pengeluaran);
    renderWeekStrip(trxList);
    renderRecentTransaksi(trxList.slice(0, 5));

    // ── Widget laporan bulan ini ──
    renderDashboardMonthWidget(d);
  } catch(err) { handleError(err); }
}

function renderDashboardMonthWidget(d) {
  const BULAN = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  const labelEl = document.getElementById("dbMonthLabel");
  if (labelEl) labelEl.textContent = `${BULAN[(d.bulan||1)-1]} ${d.tahun||""}`;

  animateValue("dbMonthPemasukan",   d.bulan_pemasukan||0,   formatRupiah);
  animateValue("dbMonthPengeluaran", d.bulan_pengeluaran||0, formatRupiah);
  animateValue("dbMonthSaldo",       d.bulan_saldo||0,       formatRupiah);

  const trxBulan = d.bulan_transaksi || [];
  const emptyEl  = document.getElementById("dbMonthEmpty");
  const ctx      = document.getElementById("dbMonthChart");

  if (!trxBulan.length) {
    if (emptyEl) emptyEl.style.display = "block";
    if (ctx)     ctx.style.display     = "none";
    return;
  }
  if (emptyEl) emptyEl.style.display = "none";
  if (ctx)     ctx.style.display     = "block";

  // Bangun data per hari
  const dayMap = {};
  trxBulan.forEach((trx) => {
    const day = trx.tanggal?.slice(0,10) || "?";
    if (!dayMap[day]) dayMap[day] = { pemasukan:0, pengeluaran:0 };
    if (trx.kategori?.tipe === "pemasukan") dayMap[day].pemasukan   += Number(trx.jumlah);
    else                                    dayMap[day].pengeluaran += Number(trx.jumlah);
  });
  const labels   = Object.keys(dayMap).sort();
  const incData  = labels.map((d) => dayMap[d].pemasukan);
  const expData  = labels.map((d) => dayMap[d].pengeluaran);
  const shortLbl = labels.map((d) => {
    const dt = new Date(d);
    return isNaN(dt) ? d : dt.toLocaleDateString("id-ID", { day:"numeric", month:"short" });
  });
  const tc = isDark ? "#94a3b8" : "#475569";
  const gc = isDark ? "rgba(45,49,72,0.8)" : "rgba(226,232,240,0.6)";
  const cd = {
    labels: shortLbl,
    datasets: [
      { label:"Pemasukan",   data:incData, backgroundColor:"rgba(16,185,129,0.80)", borderWidth:0, borderRadius:5, borderSkipped:false },
      { label:"Pengeluaran", data:expData, backgroundColor:"rgba(239,68,68,0.80)",  borderWidth:0, borderRadius:5, borderSkipped:false },
    ],
  };

  if (state.dbMonthChart) {
    state.dbMonthChart.data = cd;
    state.dbMonthChart.update("active");
    return;
  }
  state.dbMonthChart = new Chart(ctx, {
    type: "bar", data: cd,
    options: {
      responsive: true, animation: { duration:500 },
      plugins: {
        legend: { position:"top", align:"end", labels:{ boxWidth:11, padding:14, font:{ family:"Inter", size:12, weight:"600" }, color:tc }},
        tooltip: { callbacks: { label:(c) => ` ${c.dataset.label}: ${formatRupiah(c.raw)}` }},
      },
      scales: {
        x: { grid:{ display:false }, ticks:{ font:{ family:"Inter", size:10 }, color:tc }},
        y: { grid:{ color:gc }, ticks:{ font:{ family:"Inter", size:10 }, color:tc, callback:(v) => {
          if (v>=1e6) return `${(v/1e6).toFixed(1)}jt`;
          if (v>=1e3) return `${(v/1e3).toFixed(0)}rb`;
          return v;
        }}},
      },
    },
  });
}

function renderDashboardChart(inc, exp) {
  const ctx = document.getElementById("dashboardChart"); if (!ctx) return;
  const tc      = isDark ? "#94a3b8" : "#475569";
  const hasData = (inc>0 || exp>0);
  const d0      = hasData ? (inc||0) : 1;
  const d1      = hasData ? (exp||0) : 1;
  const bg      = hasData ? ["#10b981","#ef4444"] : ["#cbd5e1","#e2e8f0"];

  const centerPlugin = {
    id: "sbCenter",
    afterDraw(chart) {
      const { width, height, ctx:c } = chart;
      c.save(); c.textAlign="center"; c.textBaseline="middle";
      const cx=width/2, cy=height/2-10;
      if (!hasData) {
        c.font="600 12px Inter,sans-serif"; c.fillStyle=tc;
        c.fillText("Belum ada data", cx, cy);
      } else {
        const saldo=inc-exp;
        c.font="700 13px Inter,sans-serif";
        c.fillStyle = saldo>=0 ? "#059669" : "#ef4444";
        c.fillText((saldo>=0?"+":"")+formatRupiah(saldo), cx, cy);
      }
      c.restore();
    },
  };

  const cd = {
    labels: [t("trx.income"), t("trx.expense")],
    datasets: [{ data:[d0,d1], backgroundColor:bg, hoverBackgroundColor:hasData?["#059669","#dc2626"]:bg, borderWidth:0, hoverOffset:hasData?6:0 }],
  };

  if (state.dashboardChart) {
    const ds = state.dashboardChart.data.datasets[0];
    state.dashboardChart.data.labels = cd.labels;
    ds.data=cd.datasets[0].data; ds.backgroundColor=bg;
    ds.hoverBackgroundColor=hasData?["#059669","#dc2626"]:bg;
    state.dashboardChart.options.plugins.tooltip.enabled=hasData;
    state.dashboardChart.update("active");
    return;
  }
  state.dashboardChart = new Chart(ctx, {
    type:"doughnut", data:cd, plugins:[centerPlugin],
    options:{
      cutout:"70%", animation:{animateRotate:true,duration:700},
      plugins:{
        legend:{ position:"bottom", labels:{ boxWidth:13,padding:18,font:{family:"Inter",size:13,weight:"600"},color:tc }},
        tooltip:{ enabled:hasData, callbacks:{ label:(c)=>` ${formatRupiah(c.raw)}` }},
      },
    },
  });
}

function renderHealthCard(inc, exp) {
  const el = document.getElementById("dbHealthCard"); if (!el) return;
  if (!inc && !exp) { el.innerHTML=""; return; }
  const ratio = inc>0 ? ((inc-exp)/inc)*100 : -100;
  let cls="health-card", icon="💰", title="", desc="";
  if (ratio>=30)       { cls="health-card";              icon="💚"; title="Keuangan Sehat";   desc=`Penghematan ${ratio.toFixed(0)}% dari pemasukan. Pertahankan!`; }
  else if (ratio>=0)   { cls="health-card health-warning"; icon="⚠️"; title="Keuangan Waspada"; desc=`Penghematan hanya ${ratio.toFixed(0)}%. Coba kurangi pengeluaran.`; }
  else                  { cls="health-card health-danger";  icon="🚨"; title="Keuangan Defisit"; desc=`Pengeluaran melebihi pemasukan ${formatRupiah(exp-inc)}. Segera tinjau anggaran!`; }
  el.innerHTML=`<div class="${cls}"><div class="health-label">Kesehatan Keuangan</div><div class="health-title">${title}</div><div class="health-desc">${desc}</div><div class="health-badge">${icon}</div></div>`;
}

function renderWeekStrip(trxList) {
  const el = document.getElementById("dbWeekStrip"); if (!el) return;
  const DAY=["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
  const today=new Date();
  const days=[];
  for (let i=6;i>=0;i--) { const d=new Date(today); d.setDate(today.getDate()-i); days.push(d); }
  el.innerHTML = days.map((d) => {
    const iso=d.toISOString().slice(0,10);
    const dayTrx=trxList.filter((trx)=>trx.tanggal?.slice(0,10)===iso);
    const hasIn =dayTrx.some((trx)=>getKategoriById(trx.kategori_id)?.tipe==="pemasukan");
    const hasOut=dayTrx.some((trx)=>getKategoriById(trx.kategori_id)?.tipe!=="pemasukan");
    const totOut=dayTrx.filter((trx)=>getKategoriById(trx.kategori_id)?.tipe!=="pemasukan").reduce((s,trx)=>s+Number(trx.jumlah),0);
    const isToday=iso===today.toISOString().slice(0,10);
    let dot="week-day-dot";
    if (hasIn&&hasOut) dot+=" week-day-dot--both";
    else if (hasIn)     dot+=" week-day-dot--in";
    else if (hasOut)    dot+=" week-day-dot--out";
    const amt=totOut>0?`<span style="color:var(--danger);font-size:10px;font-weight:700;">${totOut>=1e6?(totOut/1e6).toFixed(1)+"jt":totOut>=1e3?(totOut/1e3).toFixed(0)+"rb":"-"}</span>`:`<span style="color:var(--text-muted);font-size:10px;">-</span>`;
    return `<div class="week-day${isToday?" today":""}"><div class="week-day-label">${DAY[d.getDay()]}</div><div class="${dot}"></div><div class="week-day-amount">${d.getDate()}</div>${amt}</div>`;
  }).join("");
}

function renderRecentTransaksi(list) {
  const tbody=document.getElementById("dbRecentTransaksi");
  if (!list.length) {
    tbody.innerHTML=`<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:28px;font-size:14px;"><i class="bi bi-inbox" style="font-size:20px;display:block;margin-bottom:6px;"></i>${t("trx.emptyTitle")}</td></tr>`;
    return;
  }
  tbody.innerHTML = list.map((trx) => {
    const kat=getKategoriById(trx.kategori_id); const isIn=kat?.tipe==="pemasukan";
    return `<tr>
      <td style="color:var(--text-secondary);font-size:13px;white-space:nowrap;">${formatTanggal(trx.tanggal)}</td>
      <td>${kat?`<span style="margin-right:5px;">${kat.icon||""}</span><strong>${kat.nama_kategori}</strong>`:"-"}</td>
      <td style="color:var(--text-muted);font-size:13px;">${trx.catatan||"-"}</td>
      <td style="text-align:right;white-space:nowrap;"><span class="amount-pill amount-pill--${isIn?"in":"out"}">${isIn?"+":"−"} ${formatRupiah(trx.jumlah)}</span></td>
    </tr>`;
  }).join("");
}

// ── TRANSAKSI ──────────────────────────────────────────────────
async function loadTransaksi() {
  try {
    await ensureKategoriLoaded();
    populateKategoriDropdown(getSelectedJenis());
    populateTrxKategoriFilter();
    const res = await apiRequest("/transaksi");
    state.transaksiList = res.data || [];
    applyTrxFilters();
  } catch(err) { handleError(err); }
}
function getSelectedJenis() { return document.querySelector('input[name="transaksiJenis"]:checked')?.value||"pemasukan"; }

function populateKategoriDropdown(tipe) {
  const sel  = document.getElementById("transaksiKategori");
  const hint = document.getElementById("transaksiKategoriEmptyHint");
  const items= state.kategoriList.filter((k)=>k.tipe===tipe);
  sel.innerHTML = items.map((k)=>`<option value="${k.id}">${k.icon||""} ${k.nama_kategori}</option>`).join("");
  sel.disabled  = !items.length;
  hint.style.display = items.length?"none":"block";
}
document.querySelectorAll('input[name="transaksiJenis"]').forEach((r)=>r.addEventListener("change",()=>populateKategoriDropdown(r.value)));

function populateTrxKategoriFilter() {
  const sel = document.getElementById("trxFilterKategori"); if (!sel) return;
  const saved=sel.value;
  sel.innerHTML=`<option value="">Semua Kategori</option>`+state.kategoriList.map((k)=>`<option value="${k.id}">${k.icon||""} ${k.nama_kategori}</option>`).join("");
  if (saved) sel.value=saved;
}

function initTrxFilters() {
  ["trxSearch","trxFilterType","trxFilterKategori","trxFilterPeriod"].forEach((id)=>{
    const el=document.getElementById(id);
    if (el) el.addEventListener(id==="trxSearch"?"input":"change", applyTrxFilters);
  });
}

function applyTrxFilters() {
  const query  = (document.getElementById("trxSearch")?.value||"").toLowerCase().trim();
  const type   = document.getElementById("trxFilterType")?.value||"";
  const katId  = document.getElementById("trxFilterKategori")?.value||"";
  const period = document.getElementById("trxFilterPeriod")?.value||"";
  const now=new Date(), todayStr=now.toISOString().slice(0,10);
  const sow=new Date(now); sow.setDate(now.getDate()-now.getDay()); sow.setHours(0,0,0,0);

  const filtered = state.transaksiList.filter((trx) => {
    const kat=getKategoriById(trx.kategori_id); const isIn=kat?.tipe==="pemasukan";
    if (type==="pemasukan"   && !isIn)  return false;
    if (type==="pengeluaran" &&  isIn)  return false;
    if (katId && String(trx.kategori_id)!==katId) return false;
    if (period) {
      const d=trx.tanggal?.slice(0,10);
      if (period==="today" && d!==todayStr) return false;
      if (period==="week"  && new Date(d)<sow) return false;
      if (period==="month") { const dt=new Date(d); if (dt.getFullYear()!==now.getFullYear()||dt.getMonth()!==now.getMonth()) return false; }
    }
    if (query) { const h=[trx.catatan||"",kat?.nama_kategori||""].join(" ").toLowerCase(); if (!h.includes(query)) return false; }
    return true;
  });
  renderTransaksiTable(filtered);
}

function renderTransaksiTable(list) {
  const data  = list!==undefined ? list : state.transaksiList;
  const tbody = document.getElementById("transaksiTableBody");
  const empty = document.getElementById("transaksiEmpty");
  const noRes = document.getElementById("transaksiNoResult");
  const count = document.getElementById("trxCount");

  if (!state.transaksiList.length) {
    tbody.innerHTML=""; empty.style.display="block";
    if (noRes) noRes.style.display="none"; if (count) count.textContent=""; return;
  }
  empty.style.display="none";
  if (!data.length) {
    tbody.innerHTML=""; if (noRes) noRes.style.display="block"; if (count) count.textContent="0 transaksi"; return;
  }
  if (noRes) noRes.style.display="none";
  if (count) count.textContent=`${data.length} transaksi`;

  const sorted=[...data].sort((a,b)=>(b.tanggal||"").localeCompare(a.tanggal||""));
  tbody.innerHTML = sorted.map((trx) => {
    const kat=getKategoriById(trx.kategori_id); const isIn=kat?.tipe==="pemasukan";
    return `<tr>
      <td style="color:var(--text-secondary);font-size:13px;white-space:nowrap;">${formatTanggal(trx.tanggal)}</td>
      <td>
        ${kat?`<span style="margin-right:5px;font-size:16px;">${kat.icon||""}</span><strong>${kat.nama_kategori}</strong>`:"-"}
        ${kat?`<span class="badge-tipe badge-tipe--${isIn?"in":"out"}">${isIn?t("trx.income"):t("trx.expense")}</span>`:""}
      </td>
      <td style="color:var(--text-muted);font-size:13px;">${trx.catatan||"-"}</td>
      <td style="text-align:right;white-space:nowrap;"><span class="amount-pill amount-pill--${isIn?"in":"out"}">${isIn?"+":"−"} ${formatRupiah(trx.jumlah)}</span></td>
      <td style="text-align:right;white-space:nowrap;">
        <button class="btn-row-action" onclick="openEditTransaksi(${trx.id})" title="Edit"><i class="bi bi-pencil"></i></button>
        <button class="btn-row-action btn-row-action--danger" onclick="confirmDeleteTransaksi(${trx.id})" title="Hapus"><i class="bi bi-trash3"></i></button>
      </td>
    </tr>`;
  }).join("");
}

document.getElementById("btnAddTransaksi").addEventListener("click", () => {
  document.getElementById("transaksiForm").reset();
  document.getElementById("transaksiId").value="";
  document.getElementById("transaksiModalTitle").textContent=t("trx.add");
  document.getElementById("transaksiTanggal").valueAsDate=new Date();
  document.getElementById("jenisPemasukan").checked=true;
  populateKategoriDropdown("pemasukan");
  openModal("transaksiModal");
});
window.openEditTransaksi = function(id) {
  const trx=state.transaksiList.find((x)=>x.id===id); if (!trx) return;
  const kat=getKategoriById(trx.kategori_id); const tipe=kat?.tipe||"pemasukan";
  document.getElementById(tipe==="pemasukan"?"jenisPemasukan":"jenisPengeluaran").checked=true;
  populateKategoriDropdown(tipe);
  document.getElementById("transaksiId").value       = trx.id;
  document.getElementById("transaksiKategori").value = trx.kategori_id;
  document.getElementById("transaksiJumlah").value   = trx.jumlah;
  document.getElementById("transaksiTanggal").value  = trx.tanggal;
  document.getElementById("transaksiCatatan").value  = trx.catatan||"";
  document.getElementById("transaksiModalTitle").textContent="Edit Transaksi";
  openModal("transaksiModal");
};
document.getElementById("transaksiForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const sel=document.getElementById("transaksiKategori");
  if (sel.disabled||!sel.value) { showToast(t("trx.noCategory"),"danger"); return; }
  const id=document.getElementById("transaksiId").value;
  const btn=e.target.querySelector('[type="submit"]');
  const payload={ kategori_id:Number(sel.value), jumlah:Number(document.getElementById("transaksiJumlah").value), tanggal:document.getElementById("transaksiTanggal").value, catatan:document.getElementById("transaksiCatatan").value.trim() };
  setButtonLoading(btn,true);
  try {
    if (id) { await apiRequest(`/transaksi/${id}`,{method:"PUT",body:payload}); showToast("Transaksi diperbarui."); }
    else     { await apiRequest("/transaksi",       {method:"POST",body:payload}); showToast("Transaksi ditambahkan."); }
    closeModal("transaksiModal");
    await loadTransaksi();
  } catch(err) { handleError(err); }
  finally { setButtonLoading(btn,false); }
});
window.confirmDeleteTransaksi = function(id) {
  openConfirmModal("Hapus transaksi ini?", "Data yang dihapus tidak dapat dikembalikan.", async () => {
    try { await apiRequest(`/transaksi/${id}`,{method:"DELETE"}); showToast("Transaksi dihapus."); await loadTransaksi(); }
    catch(err) { handleError(err); }
  });
};

// ── TARGET ──────────────────────────────────────────────────────
async function loadTarget() {
  try { const res=await apiRequest("/target"); state.targetList=res.data||[]; renderTargetGrid(); }
  catch(err) { handleError(err); }
}
function renderTargetGrid() {
  const grid=document.getElementById("targetGrid"); const empty=document.getElementById("targetEmpty");
  if (!state.targetList.length) { grid.innerHTML=""; empty.style.display="block"; return; }
  empty.style.display="none";
  grid.innerHTML = state.targetList.map((tgt) => {
    const pct=tgt.nominal_target>0?Math.min(100,Math.round((tgt.nominal_terkumpul/tgt.nominal_target)*100)):0;
    const isDone=pct>=100;
    return `<div class="target-card">
      <div class="target-card-head">
        <div class="target-card-name-wrap">
          <div class="target-card-name">${tgt.nama_target}</div>
          <div class="target-card-deadline"><i class="bi bi-calendar-event"></i> ${formatTanggal(tgt.deadline)}
            ${isDone?'<span class="badge badge-success" style="margin-left:6px;"><i class="bi bi-check-circle-fill"></i> Tercapai!</span>':""}
          </div>
        </div>
        <div class="target-card-actions">
          <button class="btn-row-action" onclick="openEditTarget(${tgt.id})"><i class="bi bi-pencil"></i></button>
          <button class="btn-row-action btn-row-action--danger" onclick="confirmDeleteTarget(${tgt.id})"><i class="bi bi-trash3"></i></button>
        </div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%;${isDone?"background:linear-gradient(90deg,var(--accent),var(--cyan));":""}"></div></div>
      <div class="target-card-numbers">
        <span><strong>${formatRupiah(tgt.nominal_terkumpul)}</strong> terkumpul</span>
        <span class="target-card-pct ${isDone?"target-card-pct--done":""}">${pct}%</span>
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">dari target ${formatRupiah(tgt.nominal_target)}</div>
    </div>`;
  }).join("");
}
document.getElementById("btnAddTarget").addEventListener("click", () => {
  document.getElementById("targetForm").reset();
  document.getElementById("targetId").value=""; document.getElementById("targetTerkumpul").value=0;
  document.getElementById("targetModalTitle").textContent="Tambah Target Tabungan";
  openModal("targetModal");
});
window.openEditTarget = function(id) {
  const tgt=state.targetList.find((x)=>x.id===id); if (!tgt) return;
  document.getElementById("targetId").value=tgt.id; document.getElementById("targetNama").value=tgt.nama_target;
  document.getElementById("targetNominal").value=tgt.nominal_target; document.getElementById("targetTerkumpul").value=tgt.nominal_terkumpul;
  document.getElementById("targetDeadline").value=tgt.deadline;
  document.getElementById("targetModalTitle").textContent="Edit Target Tabungan";
  openModal("targetModal");
};
document.getElementById("targetForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id=document.getElementById("targetId").value; const btn=e.target.querySelector('[type="submit"]');
  const payload={ nama_target:document.getElementById("targetNama").value.trim(), nominal_target:Number(document.getElementById("targetNominal").value), nominal_terkumpul:Number(document.getElementById("targetTerkumpul").value||0), deadline:document.getElementById("targetDeadline").value };
  setButtonLoading(btn,true);
  try {
    if (id) { await apiRequest(`/target/${id}`,{method:"PUT",body:payload}); showToast("Target diperbarui."); }
    else     { await apiRequest("/target",       {method:"POST",body:payload}); showToast("Target ditambahkan."); }
    closeModal("targetModal"); await loadTarget();
  } catch(err) { handleError(err); }
  finally { setButtonLoading(btn,false); }
});
window.confirmDeleteTarget = function(id) {
  openConfirmModal("Hapus target tabungan ini?", "Progres tabungan yang sudah tercatat akan hilang.", async () => {
    try { await apiRequest(`/target/${id}`,{method:"DELETE"}); showToast("Target dihapus."); await loadTarget(); }
    catch(err) { handleError(err); }
  });
};

// ── SPENDING PER KATEGORI ──────────────────────────────────────
async function loadSpending() {
  const listEl=document.getElementById("spendingList"); const emptyEl=document.getElementById("spendingEmpty");
  const labelEl=document.getElementById("spendingPeriodLabel"); if (!listEl) return;
  try {
    const now=new Date(); const bulan=now.getMonth()+1; const tahun=now.getFullYear();
    if (labelEl) labelEl.textContent=`${BULAN_NAMES[now.getMonth()]} ${tahun}`;
    const res=await apiRequest(`/laporan?bulan=${bulan}&tahun=${tahun}`);
    const trxList=(res.data?.transaksi||[]).filter((trx)=>trx.kategori?.tipe!=="pemasukan");
    if (!trxList.length) { listEl.innerHTML=""; emptyEl.style.display="block"; return; }
    emptyEl.style.display="none";
    const map={};
    trxList.forEach((trx)=>{ const key=trx.kategori?.nama_kategori||"Lainnya"; const icon=trx.kategori?.icon||"🏷️"; if (!map[key]) map[key]={total:0,icon}; map[key].total+=Number(trx.jumlah); });
    const entries=Object.entries(map).sort((a,b)=>b[1].total-a[1].total);
    const maxVal=entries[0][1].total;
    listEl.innerHTML=entries.map(([name,{total,icon}])=>{
      const pct=Math.round((total/maxVal)*100);
      return `<div class="spending-item"><div class="spending-item-head"><div class="spending-item-icon">${icon}</div><div class="spending-item-name">${name}</div><div class="spending-item-amount spending-item-amount--out">${formatRupiah(total)}</div></div><div class="spending-bar-track"><div class="spending-bar-fill spending-bar-fill--out" style="width:${pct}%"></div></div></div>`;
    }).join("");
  } catch(err) { handleError(err); }
}

// ── LAPORAN ────────────────────────────────────────────────────
const BULAN_NAMES=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

function populateLaporanFilter() {
  const sel=document.getElementById("laporanBulan");
  if (!sel.options.length) sel.innerHTML=BULAN_NAMES.map((b,i)=>`<option value="${i+1}">${b}</option>`).join("");
  const now=new Date(); sel.value=now.getMonth()+1; document.getElementById("laporanTahun").value=now.getFullYear();
}
async function loadLaporan() {
  populateLaporanFilter();
  // Pasang listener filter tabel (hanya sekali)
  if (!document.getElementById("reportSearch").__laporanBound) {
    document.getElementById("reportSearch").__laporanBound = true;
    document.getElementById("reportSearch").addEventListener("input", applyReportTableFilter);
    document.getElementById("reportFilterType").addEventListener("change", applyReportTableFilter);
  }
  await fetchLaporan();
}
document.getElementById("laporanFilterForm").addEventListener("submit", async (e)=>{ e.preventDefault(); await fetchLaporan(); });

async function fetchLaporan() {
  const bulan=document.getElementById("laporanBulan").value;
  const tahun=document.getElementById("laporanTahun").value;
  // Reset filter tabel saat fetch baru
  const searchEl=document.getElementById("reportSearch");
  const typeEl=document.getElementById("reportFilterType");
  if (searchEl) searchEl.value="";
  if (typeEl) typeEl.value="";
  try {
    const res=await apiRequest(`/laporan?bulan=${bulan}&tahun=${tahun}`);
    const d=res.data;
    state.laporanCache=d.transaksi||[];
    animateValue("reportPemasukan",   d.total_pemasukan,   formatRupiah);
    animateValue("reportPengeluaran", d.total_pengeluaran, formatRupiah);
    animateValue("reportSaldo",       d.saldo,             formatRupiah);
    renderLaporanChart(state.laporanCache);
    applyReportTableFilter();
  } catch(err) { handleError(err); }
}

function applyReportTableFilter() {
  const query  = (document.getElementById("reportSearch")?.value||"").toLowerCase().trim();
  const type   = document.getElementById("reportFilterType")?.value||"";
  const tbody  = document.getElementById("reportTableBody");
  const empty  = document.getElementById("reportEmpty");
  const count  = document.getElementById("reportCount");

  if (!state.laporanCache.length) {
    tbody.innerHTML=""; empty.style.display="block";
    if (count) count.textContent="";
    return;
  }
  empty.style.display="none";

  const filtered = state.laporanCache.filter((trx) => {
    const isIn = trx.kategori?.tipe==="pemasukan";
    if (type==="pemasukan"   && !isIn)  return false;
    if (type==="pengeluaran" &&  isIn)  return false;
    if (query) {
      const hay = [trx.catatan||"", trx.kategori?.nama_kategori||""].join(" ").toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });

  if (count) count.textContent = `${filtered.length} transaksi`;

  if (!filtered.length) {
    tbody.innerHTML=`<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:28px;font-size:14px;"><i class="bi bi-search" style="font-size:20px;display:block;margin-bottom:6px;"></i>Tidak ada hasil yang cocok.</td></tr>`;
    return;
  }

  tbody.innerHTML=filtered.map((trx)=>{
    const isIn=trx.kategori?.tipe==="pemasukan";
    return `<tr>
      <td style="color:var(--text-secondary);font-size:13px;white-space:nowrap;">${formatTanggal(trx.tanggal)}</td>
      <td>${trx.kategori?`<span style="margin-right:5px;">${trx.kategori.icon||""}</span><strong>${trx.kategori.nama_kategori}</strong><span class="badge-tipe badge-tipe--${isIn?"in":"out"}" style="margin-left:6px;">${isIn?"Pemasukan":"Pengeluaran"}</span>`:"-"}</td>
      <td style="color:var(--text-muted);font-size:13px;">${trx.catatan||"-"}</td>
      <td style="text-align:right;white-space:nowrap;"><span class="amount-pill amount-pill--${isIn?"in":"out"}">${isIn?"+":"−"} ${formatRupiah(trx.jumlah)}</span></td>
    </tr>`;
  }).join("");
}

function renderLaporanChart(list) {
  const ctx=document.getElementById("laporanChart"); if (!ctx) return;
  const dayMap={};
  list.forEach((trx)=>{ const day=trx.tanggal?.slice(0,10)||"?"; if (!dayMap[day]) dayMap[day]={pemasukan:0,pengeluaran:0}; if (trx.kategori?.tipe==="pemasukan") dayMap[day].pemasukan+=Number(trx.jumlah); else dayMap[day].pengeluaran+=Number(trx.jumlah); });
  const labels=Object.keys(dayMap).sort();
  const incData=labels.map((d)=>dayMap[d].pemasukan);
  const expData=labels.map((d)=>dayMap[d].pengeluaran);
  const shortLbls=labels.map((d)=>{ const dt=new Date(d); return isNaN(dt)?d:dt.toLocaleDateString("id-ID",{day:"numeric",month:"short"}); });
  const tc=isDark?"#94a3b8":"#475569"; const gc=isDark?"rgba(45,49,72,0.8)":"rgba(226,232,240,0.6)";
  const cd={ labels:shortLbls, datasets:[
    { label:t("trx.income"),  data:incData, backgroundColor:"rgba(16,185,129,0.80)", borderWidth:0, borderRadius:6, borderSkipped:false },
    { label:t("trx.expense"), data:expData, backgroundColor:"rgba(239,68,68,0.80)",  borderWidth:0, borderRadius:6, borderSkipped:false },
  ]};
  if (state.laporanChart) { state.laporanChart.data=cd; state.laporanChart.update("active"); return; }
  state.laporanChart=new Chart(ctx,{
    type:"bar", data:cd,
    options:{ responsive:true, animation:{duration:600},
      plugins:{ legend:{position:"top",align:"end",labels:{boxWidth:12,padding:16,font:{family:"Inter",size:12,weight:"600"},color:tc}}, tooltip:{callbacks:{label:(c)=>` ${c.dataset.label}: ${formatRupiah(c.raw)}`}} },
      scales:{ x:{grid:{display:false},ticks:{font:{family:"Inter",size:11},color:tc}}, y:{grid:{color:gc},ticks:{font:{family:"Inter",size:11},color:tc,callback:(v)=>{ if(v>=1e6) return `${(v/1e6).toFixed(1)}jt`; if(v>=1e3) return `${(v/1e3).toFixed(0)}rb`; return v; }}} },
    },
  });
}

// ── DOWNLOAD CSV ────────────────────────────────────────────────
window.downloadLaporan = async function(mode) {
  let list=[], label=""; const now=new Date();
  if (mode==="filter") {
    list=state.laporanCache;
    label=`${BULAN_NAMES[(document.getElementById("laporanBulan").value||1)-1]}_${document.getElementById("laporanTahun").value}`;
  } else {
    try {
      const res=await apiRequest("/transaksi"); const all=res.data||[]; await ensureKategoriLoaded();
      if (mode==="minggu") { const sow=new Date(now); sow.setDate(now.getDate()-now.getDay()); sow.setHours(0,0,0,0); list=all.filter((trx)=>new Date(trx.tanggal)>=sow); label=`Minggu_${sow.toISOString().slice(0,10)}`; }
      else if (mode==="bulan") { list=all.filter((trx)=>{ const d=new Date(trx.tanggal); return d.getFullYear()===now.getFullYear()&&d.getMonth()===now.getMonth(); }); label=`${BULAN_NAMES[now.getMonth()]}_${now.getFullYear()}`; }
      else if (mode==="tahun") { list=all.filter((trx)=>new Date(trx.tanggal).getFullYear()===now.getFullYear()); label=`Tahun_${now.getFullYear()}`; }
      list=list.map((trx)=>{ const k=getKategoriById(trx.kategori_id); return {...trx,kategori:k?{nama_kategori:k.nama_kategori,tipe:k.tipe,icon:k.icon}:null}; });
    } catch(err) { handleError(err); return; }
  }
  if (!list.length) { showToast("Tidak ada data untuk diunduh.","warning"); return; }
  const BOM="\uFEFF";
  const header=["Tanggal","Kategori","Tipe","Catatan","Jumlah (Rp)"];
  const rows=list.map((trx)=>{ const isIn=trx.kategori?.tipe==="pemasukan"; return [`"${trx.tanggal||""}"`,`"${trx.kategori?.nama_kategori||"-"}"`,`"${isIn?"Pemasukan":"Pengeluaran"}"`,`"${(trx.catatan||"").replace(/"/g,'""')}"`,isIn?Number(trx.jumlah):-Number(trx.jumlah)]; });
  const totalIn=list.filter((t)=>t.kategori?.tipe==="pemasukan").reduce((s,t)=>s+Number(t.jumlah),0);
  const totalOut=list.filter((t)=>t.kategori?.tipe!=="pemasukan").reduce((s,t)=>s+Number(t.jumlah),0);
  rows.push([],['"TOTAL PEMASUKAN"',"","","",totalIn],['"TOTAL PENGELUARAN"',"","","",-totalOut],['"SALDO"',"","","",totalIn-totalOut]);
  const csv=BOM+[header.join(","),...rows.map((r)=>r.join(","))].join("\r\n");
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
  const url=URL.createObjectURL(blob);
  const a=Object.assign(document.createElement("a"),{href:url,download:`SmartBudget_${label}.csv`});
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  showToast(`SmartBudget_${label}.csv berhasil diunduh.`);
};

// ── PROFIL ──────────────────────────────────────────────────────
async function loadProfil() {
  try {
    const res=await apiRequest("/profile");
    document.getElementById("profileNama").value  = res.data.nama;
    document.getElementById("profileEmail").value = res.data.email;
    updateProfileSection(res.data.nama, res.data.email);
  } catch(err) { handleError(err); }
}
function updateProfileSection(nama, email) {
  const a=document.getElementById("profileAvatarBig"); const n=document.getElementById("profileAvatarName"); const em=document.getElementById("profileAvatarEmail");
  if (a) a.textContent=initials(nama); if (n) n.textContent=nama||"-"; if (em) em.textContent=email||"-";
}
document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn=e.target.querySelector('[type="submit"]');
  const payload={ nama:document.getElementById("profileNama").value.trim(), email:document.getElementById("profileEmail").value.trim() };
  setButtonLoading(btn,true);
  try {
    await apiRequest("/profile",{method:"PUT",body:payload});
    saveSession(state.token,{...state.user,...payload});
    updateUserHeader(); updateProfileSection(payload.nama,payload.email);
    showToast("Profil berhasil diperbarui.");
  } catch(err) { handleError(err); }
  finally { setButtonLoading(btn,false); }
});
document.getElementById("btnDeleteAccount").addEventListener("click", () => {
  openConfirmModal("Hapus akun secara permanen?", "Semua data transaksi, kategori, dan target tabunganmu akan ikut terhapus.", async () => {
    try { await apiRequest("/profile",{method:"DELETE"}); clearSession(); showToast("Akun berhasil dihapus."); showAuthScreen(); }
    catch(err) { handleError(err); }
  });
});

// ── CONFIRM MODAL ───────────────────────────────────────────────
let _confirmCb=null;
function openConfirmModal(title, msg, cb) {
  document.getElementById("confirmTitle").textContent   = title;
  document.getElementById("confirmMessage").textContent = msg;
  _confirmCb=cb; openModal("confirmModal");
}
document.getElementById("confirmActionBtn").addEventListener("click", async () => {
  if (!_confirmCb) return;
  const btn=document.getElementById("confirmActionBtn"); setButtonLoading(btn,true);
  try { await _confirmCb(); }
  finally { setButtonLoading(btn,false); closeModal("confirmModal"); _confirmCb=null; }
});

// ── USER HEADER ─────────────────────────────────────────────────
function updateUserHeader() {
  if (!state.user) return;
  document.getElementById("userNameLabel").textContent = state.user.nama;
  document.getElementById("userAvatar").textContent    = initials(state.user.nama);
}

// ── DEFAULT CATEGORIES SEED ─────────────────────────────────────
const DEFAULT_CATEGORIES=[
  {nama_kategori:"Gaji",             tipe:"pemasukan",   icon:"💼"},
  {nama_kategori:"Bonus",            tipe:"pemasukan",   icon:"🎁"},
  {nama_kategori:"Freelance",        tipe:"pemasukan",   icon:"💻"},
  {nama_kategori:"Investasi",        tipe:"pemasukan",   icon:"📈"},
  {nama_kategori:"Bisnis",           tipe:"pemasukan",   icon:"🏦"},
  {nama_kategori:"Transfer Masuk",   tipe:"pemasukan",   icon:"💸"},
  {nama_kategori:"Lainnya (Masuk)",  tipe:"pemasukan",   icon:"💰"},
  {nama_kategori:"Makan & Minum",    tipe:"pengeluaran", icon:"🍔"},
  {nama_kategori:"Kopi & Jajan",     tipe:"pengeluaran", icon:"☕"},
  {nama_kategori:"Transport",        tipe:"pengeluaran", icon:"🚗"},
  {nama_kategori:"Bensin",           tipe:"pengeluaran", icon:"⛽"},
  {nama_kategori:"Belanja",          tipe:"pengeluaran", icon:"🛍️"},
  {nama_kategori:"Pakaian",          tipe:"pengeluaran", icon:"👕"},
  {nama_kategori:"Listrik & Air",    tipe:"pengeluaran", icon:"💡"},
  {nama_kategori:"Pulsa & Internet", tipe:"pengeluaran", icon:"📶"},
  {nama_kategori:"Sewa & Rumah",     tipe:"pengeluaran", icon:"🏠"},
  {nama_kategori:"Asuransi",         tipe:"pengeluaran", icon:"🛡️"},
  {nama_kategori:"Kesehatan",        tipe:"pengeluaran", icon:"🏥"},
  {nama_kategori:"Pendidikan",       tipe:"pengeluaran", icon:"🎓"},
  {nama_kategori:"Hiburan",          tipe:"pengeluaran", icon:"🎬"},
  {nama_kategori:"Olahraga & Hobi",  tipe:"pengeluaran", icon:"⚽"},
  {nama_kategori:"Liburan & Travel", tipe:"pengeluaran", icon:"✈️"},
  {nama_kategori:"Hewan Peliharaan", tipe:"pengeluaran", icon:"🐾"},
  {nama_kategori:"Hadiah",           tipe:"pengeluaran", icon:"🎁"},
  {nama_kategori:"Amal & Donasi",    tipe:"pengeluaran", icon:"🙏"},
  {nama_kategori:"Cicilan & Utang",  tipe:"pengeluaran", icon:"💳"},
  {nama_kategori:"Pajak & Admin",    tipe:"pengeluaran", icon:"🧾"},
  {nama_kategori:"Lainnya (Keluar)", tipe:"pengeluaran", icon:"🏷️"},
];
async function seedDefaultKategori() {
  await ensureKategoriLoaded(true);
  if (state.kategoriList.filter((k)=>k.tipe==="pengeluaran").length>=3) return;
  await Promise.allSettled(DEFAULT_CATEGORIES.map((cat)=>apiRequest("/kategori",{method:"POST",body:cat}).catch(()=>{})));
  await ensureKategoriLoaded(true);
}

// ── BOOT + INIT ─────────────────────────────────────────────────
async function bootApp() {
  showAppShell();
  updateUserHeader();
  initTrxFilters();
  seedDefaultKategori().catch(()=>{});
  navigateTo("dashboard");
}

(function init() {
  showHomepage();
})();
