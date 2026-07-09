/* =========================================================================
   DOMPET — Frontend Logic (Vanilla JS + Fetch API)
   Menghubungkan UI ke backend Flask (routes/controllers yang sudah dibuat).
   =========================================================================
   PENTING SOAL CORS:
   Backend Flask ini TIDAK menyertakan flask-cors di requirements.txt.
   Karena frontend (file ini) dan backend berjalan di origin/port berbeda,
   browser akan memblokir request lintas-origin kecuali kamu mengaktifkan CORS
   di sisi Flask. Caranya:

      pip install flask-cors

   lalu di app.py backend tambahkan:

      from flask_cors import CORS
      app = Flask(__name__)
      CORS(app)   # <-- tambahkan baris ini setelah app dibuat

   Tanpa ini, semua request fetch di bawah akan gagal dengan error CORS
   di console browser meskipun backend sudah jalan normal.
   ========================================================================= */

const CONFIG = {
  // Ganti sesuai alamat server Flask kamu (default flask run / app.run())
  API_BASE_URL: "http://127.0.0.1:5000",
};

/* =========================================================================
   STATE & STORAGE HELPERS
   ========================================================================= */
const state = {
  token: localStorage.getItem("dompet_token") || null,
  user: JSON.parse(localStorage.getItem("dompet_user") || "null"),
  kategoriList: [],       // cache semua kategori (untuk dropdown & mapping nama)
  transaksiList: [],
  targetList: [],
  dashboardChart: null,
};

function saveSession(token, user) {
  state.token = token;
  state.user = user;
  localStorage.setItem("dompet_token", token);
  localStorage.setItem("dompet_user", JSON.stringify(user));
}

function clearSession() {
  state.token = null;
  state.user = null;
  localStorage.removeItem("dompet_token");
  localStorage.removeItem("dompet_user");
}

/* =========================================================================
   API HELPER (fetch wrapper)
   ========================================================================= */
async function apiRequest(path, { method = "GET", body = null, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth && state.token) {
    headers["Authorization"] = `Bearer ${state.token}`;
  }

  let response;
  try {
    response = await fetch(`${CONFIG.API_BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  } catch (err) {
    // Biasanya ini terjadi karena server belum jalan atau masalah CORS
    throw new Error("Tidak bisa menghubungi server. Pastikan backend Flask berjalan dan CORS aktif.");
  }

  let data = {};
  try {
    data = await response.json();
  } catch (e) {
    data = {};
  }

  if (response.status === 401) {
    // Token invalid/expired -> paksa logout
    clearSession();
    showAuthScreen();
    throw new Error(data.message || "Sesi berakhir, silakan masuk kembali.");
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Terjadi kesalahan pada server.");
  }

  return data;
}

/* =========================================================================
   TOAST NOTIFICATIONS
   ========================================================================= */
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const bg = type === "success" ? "text-bg-success" : "text-bg-danger";
  const icon = type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill";

  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center ${bg} border-0`;
  toastEl.setAttribute("role", "alert");
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body"><i class="bi ${icon} me-2"></i>${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>`;
  container.appendChild(toastEl);

  const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
  toast.show();
  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}

function handleError(err) {
  console.error(err);
  showToast(err.message || "Terjadi kesalahan.", "danger");
}

/* =========================================================================
   FORMAT HELPERS
   ========================================================================= */
function formatRupiah(amount) {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatTanggal(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function initials(name) {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
}

/* =========================================================================
   AUTH: REGISTER / LOGIN / LOGOUT
   ========================================================================= */
const homepageScreen = document.getElementById("homepageScreen");
const authScreen = document.getElementById("authScreen");
const appShell = document.getElementById("appShell");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

function showHomepage() {
  homepageScreen.classList.remove("d-none");
  authScreen.classList.add("d-none");
  appShell.classList.add("d-none");
}

function showAuthScreen(mode = "login") {
  homepageScreen.classList.add("d-none");
  authScreen.classList.remove("d-none");
  appShell.classList.add("d-none");
  if (mode === "register") {
    loginForm.classList.add("d-none");
    registerForm.classList.remove("d-none");
  } else {
    registerForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
  }
}

function showAppShell() {
  homepageScreen.classList.add("d-none");
  authScreen.classList.add("d-none");
  appShell.classList.remove("d-none");
}

function goToLogin() {
  if (state.token && state.user) {
    bootApp();
  } else {
    showAuthScreen("login");
  }
}

document.getElementById("homeGoLogin").addEventListener("click", goToLogin);
document.getElementById("homeGoRegister").addEventListener("click", () => showAuthScreen("register"));
document.getElementById("heroGoLogin").addEventListener("click", goToLogin);
document.getElementById("heroGoRegister").addEventListener("click", () => showAuthScreen("register"));
document.getElementById("authBackHome").addEventListener("click", (e) => {
  e.preventDefault();
  showHomepage();
});

document.getElementById("showRegister").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("d-none");
  registerForm.classList.remove("d-none");
});

document.getElementById("showLogin").addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("d-none");
  loginForm.classList.remove("d-none");
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await apiRequest("/login", {
      method: "POST",
      auth: false,
      body: { email, password },
    });
    saveSession(res.token, res.user);
    showToast(`Selamat datang kembali, ${res.user.nama}!`);
    loginForm.reset();
    await bootApp();
  } catch (err) {
    handleError(err);
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nama = document.getElementById("registerNama").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;

  try {
    await apiRequest("/register", {
      method: "POST",
      auth: false,
      body: { nama, email, password },
    });
    showToast("Registrasi berhasil! Silakan masuk.");
    registerForm.reset();
    registerForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
  } catch (err) {
    handleError(err);
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  clearSession();
  showHomepage();
  showToast("Kamu telah keluar.");
});

/* =========================================================================
   NAVIGATION (SPA sections)
   ========================================================================= */
const sectionMeta = {
  dashboard: { title: "Dashboard", eyebrow: "Ringkasan" },
  transaksi: { title: "Transaksi", eyebrow: "Kelola" },
  anggaran: { title: "Anggaran", eyebrow: "Kelola" },
  laporan: { title: "Laporan", eyebrow: "Analisis" },
  profil: { title: "Profil", eyebrow: "Akun" },
};

function navigateTo(sectionKey) {
  document.querySelectorAll(".content-section").forEach((el) => el.classList.add("d-none"));
  document.getElementById(`section-${sectionKey}`).classList.remove("d-none");

  document.querySelectorAll(".nav-link-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.section === sectionKey);
  });

  document.getElementById("sectionTitle").textContent = sectionMeta[sectionKey].title;
  document.getElementById("sectionEyebrow").textContent = sectionMeta[sectionKey].eyebrow;

  // Muat data tiap kali section dibuka
  if (sectionKey === "dashboard") loadDashboard();
  if (sectionKey === "transaksi") loadTransaksi();
  if (sectionKey === "anggaran") { loadKategori(); loadTarget(); }
  if (sectionKey === "laporan") loadLaporan();
  if (sectionKey === "profil") loadProfil();

  closeMobileSidebar();
}

document.querySelectorAll("[data-section]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo(el.dataset.section);
  });
});

/* Sub-tabs inside Anggaran (Kategori / Target Tabungan) */
document.querySelectorAll(".sub-tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.subtab;
    document.querySelectorAll(".sub-tab-btn").forEach((b) => b.classList.toggle("active", b === btn));
    document.querySelectorAll(".subtab-panel").forEach((panel) => {
      panel.classList.toggle("d-none", panel.id !== `subtab-${target}`);
    });
  });
});

/* Mobile sidebar toggle */
const sidebarEl = document.querySelector(".sidebar");
let backdropEl = document.querySelector(".sidebar-backdrop");
if (!backdropEl) {
  backdropEl = document.createElement("div");
  backdropEl.className = "sidebar-backdrop";
  document.body.appendChild(backdropEl);
}
document.getElementById("mobileMenuBtn").addEventListener("click", () => {
  sidebarEl.classList.add("open");
  backdropEl.classList.add("show");
});
backdropEl.addEventListener("click", closeMobileSidebar);
function closeMobileSidebar() {
  sidebarEl.classList.remove("open");
  backdropEl.classList.remove("show");
}

/* =========================================================================
   ISI SALDO MANUAL
   Karena backend tidak punya kolom saldo tersendiri (saldo = total pemasukan
   - total pengeluaran), mengisi saldo manual dilakukan dengan mencatatnya
   sebagai transaksi Pemasukan pada kategori khusus "Saldo Manual" yang
   dibuat otomatis kalau belum ada.
   ========================================================================= */
const SALDO_MANUAL_LABEL = "Saldo Manual";

async function ensureSaldoManualKategori() {
  await ensureKategoriLoaded();
  let kategori = state.kategoriList.find(
    (k) => k.nama_kategori.toLowerCase() === SALDO_MANUAL_LABEL.toLowerCase() && k.tipe === "pemasukan"
  );

  if (!kategori) {
    await apiRequest("/kategori", {
      method: "POST",
      body: { nama_kategori: SALDO_MANUAL_LABEL, tipe: "pemasukan", icon: "💰" },
    });
    await ensureKategoriLoaded();
    kategori = state.kategoriList.find(
      (k) => k.nama_kategori.toLowerCase() === SALDO_MANUAL_LABEL.toLowerCase() && k.tipe === "pemasukan"
    );
  }
  return kategori;
}

const saldoForm = document.getElementById("saldoForm");
const saldoModal = new bootstrap.Modal(document.getElementById("saldoModal"));

document.getElementById("btnIsiSaldo").addEventListener("click", () => {
  saldoForm.reset();
  document.getElementById("saldoTanggal").valueAsDate = new Date();
});

saldoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const jumlah = Number(document.getElementById("saldoJumlah").value);
  const tanggal = document.getElementById("saldoTanggal").value;
  const catatan = document.getElementById("saldoCatatan").value.trim() || "Saldo manual";

  try {
    const kategori = await ensureSaldoManualKategori();
    await apiRequest("/transaksi", {
      method: "POST",
      body: { kategori_id: kategori.id, jumlah, tanggal, catatan },
    });
    saldoModal.hide();
    showToast("Saldo berhasil ditambahkan.");
    await loadDashboard();
  } catch (err) {
    handleError(err);
  }
});

/* =========================================================================
   DASHBOARD
   ========================================================================= */
async function loadDashboard() {
  try {
    const [dashRes] = await Promise.all([
      apiRequest("/dashboard"),
      ensureKategoriLoaded(),
    ]);

    const d = dashRes.data;
    document.getElementById("dbSaldo").textContent = formatRupiah(d.saldo);
    document.getElementById("dbPemasukan").textContent = formatRupiah(d.total_pemasukan);
    document.getElementById("dbPengeluaran").textContent = formatRupiah(d.total_pengeluaran);
    document.getElementById("dbTargetCount").textContent = `${d.jumlah_target} target`;

    renderDashboardChart(d.total_pemasukan, d.total_pengeluaran);
    await renderRecentTransaksi();
  } catch (err) {
    handleError(err);
  }
}

function renderDashboardChart(pemasukan, pengeluaran) {
  const ctx = document.getElementById("dashboardChart");
  const data = {
    labels: ["Pemasukan", "Pengeluaran"],
    datasets: [{
      data: [pemasukan || 0, pengeluaran || 0],
      backgroundColor: ["#0F6E5D", "#E8A33D"],
      borderWidth: 0,
    }],
  };

  if (state.dashboardChart) {
    state.dashboardChart.data = data;
    state.dashboardChart.update();
    return;
  }

  state.dashboardChart = new Chart(ctx, {
    type: "doughnut",
    data,
    options: {
      cutout: "68%",
      plugins: {
        legend: { position: "bottom", labels: { boxWidth: 10, font: { family: "Inter" } } },
      },
    },
  });
}

async function renderRecentTransaksi() {
  const res = await apiRequest("/transaksi");
  const list = (res.data || []).slice(0, 5);
  const tbody = document.getElementById("dbRecentTransaksi");

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-3">Belum ada transaksi</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((trx) => {
    const kategori = getKategoriById(trx.kategori_id);
    const isIncome = kategori?.tipe === "pemasukan";
    return `
      <tr>
        <td>${formatTanggal(trx.tanggal)}</td>
        <td>${kategori ? `${kategori.icon || ""} ${kategori.nama_kategori}` : "-"}</td>
        <td class="text-muted">${trx.catatan || "-"}</td>
        <td class="text-end ${isIncome ? "amount-positive" : "amount-negative"}">
          ${isIncome ? "+" : "-"} ${formatRupiah(trx.jumlah)}
        </td>
      </tr>`;
  }).join("");
}

/* =========================================================================
   KATEGORI (cache untuk dipakai di modul lain)
   ========================================================================= */
async function ensureKategoriLoaded() {
  const res = await apiRequest("/kategori");
  state.kategoriList = res.data || [];
  return state.kategoriList;
}

function getKategoriById(id) {
  return state.kategoriList.find((k) => k.id === id);
}

async function loadKategori() {
  try {
    await ensureKategoriLoaded();
    renderKategoriGrid();
  } catch (err) {
    handleError(err);
  }
}

function renderKategoriGrid() {
  const grid = document.getElementById("kategoriGrid");
  const empty = document.getElementById("kategoriEmpty");

  if (state.kategoriList.length === 0) {
    grid.innerHTML = "";
    empty.classList.remove("d-none");
    return;
  }
  empty.classList.add("d-none");

  grid.innerHTML = state.kategoriList.map((k) => `
    <div class="category-card">
      <div class="d-flex gap-3">
        <div class="category-card-icon">${k.icon || "🏷️"}</div>
        <div>
          <p class="category-card-name mb-1">${k.nama_kategori}</p>
          <span class="badge-tipe ${k.tipe === "pemasukan" ? "badge-tipe--in" : "badge-tipe--out"}">
            ${k.tipe === "pemasukan" ? "Pemasukan" : "Pengeluaran"}
          </span>
        </div>
      </div>
      <div class="category-card-actions">
        <button class="btn-row-action" onclick="openEditKategori(${k.id})"><i class="bi bi-pencil"></i></button>
        <button class="btn-row-action text-danger" onclick="confirmDeleteKategori(${k.id})"><i class="bi bi-trash3"></i></button>
      </div>
    </div>
  `).join("");
}

const kategoriForm = document.getElementById("kategoriForm");
const kategoriModalEl = document.getElementById("kategoriModal");
const kategoriModal = new bootstrap.Modal(kategoriModalEl);

document.getElementById("btnAddKategori").addEventListener("click", () => {
  kategoriForm.reset();
  document.getElementById("kategoriId").value = "";
  document.getElementById("kategoriModalTitle").textContent = "Tambah Kategori";
});

window.openEditKategori = function (id) {
  const k = getKategoriById(id);
  if (!k) return;
  document.getElementById("kategoriId").value = k.id;
  document.getElementById("kategoriNama").value = k.nama_kategori;
  document.getElementById("kategoriTipe").value = k.tipe;
  document.getElementById("kategoriIcon").value = k.icon || "";
  document.getElementById("kategoriModalTitle").textContent = "Edit Kategori";
  kategoriModal.show();
};

kategoriForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("kategoriId").value;
  const payload = {
    nama_kategori: document.getElementById("kategoriNama").value.trim(),
    tipe: document.getElementById("kategoriTipe").value,
    icon: document.getElementById("kategoriIcon").value.trim(),
  };

  try {
    if (id) {
      await apiRequest(`/kategori/${id}`, { method: "PUT", body: payload });
      showToast("Kategori berhasil diperbarui.");
    } else {
      await apiRequest("/kategori", { method: "POST", body: payload });
      showToast("Kategori berhasil ditambahkan.");
    }
    kategoriModal.hide();
    await loadKategori();
  } catch (err) {
    handleError(err);
  }
});

window.confirmDeleteKategori = function (id) {
  openConfirmModal(
    "Hapus kategori ini?",
    "Transaksi yang memakai kategori ini bisa jadi tidak tampil dengan benar.",
    async () => {
      try {
        await apiRequest(`/kategori/${id}`, { method: "DELETE" });
        showToast("Kategori berhasil dihapus.");
        await loadKategori();
      } catch (err) {
        handleError(err);
      }
    }
  );
};

/* =========================================================================
   TRANSAKSI
   ========================================================================= */
async function loadTransaksi() {
  try {
    await ensureKategoriLoaded();
    populateKategoriDropdown(getSelectedJenis());
    const res = await apiRequest("/transaksi");
    state.transaksiList = res.data || [];
    renderTransaksiTable();
  } catch (err) {
    handleError(err);
  }
}

function populateKategoriDropdown(tipe) {
  const select = document.getElementById("transaksiKategori");
  const hint = document.getElementById("transaksiKategoriEmptyHint");
  const filtered = state.kategoriList.filter((k) => k.tipe === tipe);

  select.innerHTML = filtered.map((k) =>
    `<option value="${k.id}">${k.icon || ""} ${k.nama_kategori}</option>`
  ).join("");

  if (filtered.length === 0) {
    select.disabled = true;
    hint.classList.remove("d-none");
  } else {
    select.disabled = false;
    hint.classList.add("d-none");
  }
}

function getSelectedJenis() {
  const checked = document.querySelector('input[name="transaksiJenis"]:checked');
  return checked ? checked.value : "pemasukan";
}

document.querySelectorAll('input[name="transaksiJenis"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    populateKategoriDropdown(radio.value);
  });
});

function renderTransaksiTable() {
  const tbody = document.getElementById("transaksiTableBody");
  const empty = document.getElementById("transaksiEmpty");

  if (state.transaksiList.length === 0) {
    tbody.innerHTML = "";
    empty.classList.remove("d-none");
    return;
  }
  empty.classList.add("d-none");

  tbody.innerHTML = state.transaksiList.map((trx) => {
    const kategori = getKategoriById(trx.kategori_id);
    const isIncome = kategori?.tipe === "pemasukan";
    return `
      <tr>
        <td>${formatTanggal(trx.tanggal)}</td>
        <td>
          ${kategori ? `${kategori.icon || ""} ${kategori.nama_kategori}` : "-"}
          ${kategori ? `<span class="badge-tipe ${isIncome ? "badge-tipe--in" : "badge-tipe--out"} ms-1">${isIncome ? "Masuk" : "Keluar"}</span>` : ""}
        </td>
        <td class="text-muted">${trx.catatan || "-"}</td>
        <td class="text-end ${isIncome ? "amount-positive" : "amount-negative"}">
          ${isIncome ? "+" : "-"} ${formatRupiah(trx.jumlah)}
        </td>
        <td class="text-end">
          <button class="btn-row-action" onclick="openEditTransaksi(${trx.id})"><i class="bi bi-pencil"></i></button>
          <button class="btn-row-action text-danger" onclick="confirmDeleteTransaksi(${trx.id})"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>`;
  }).join("");
}

const transaksiForm = document.getElementById("transaksiForm");
const transaksiModal = new bootstrap.Modal(document.getElementById("transaksiModal"));

document.getElementById("btnAddTransaksi").addEventListener("click", () => {
  transaksiForm.reset();
  document.getElementById("transaksiId").value = "";
  document.getElementById("transaksiModalTitle").textContent = "Tambah Transaksi";
  document.getElementById("transaksiTanggal").valueAsDate = new Date();
  document.getElementById("jenisPemasukan").checked = true;
  populateKategoriDropdown("pemasukan");
});

window.openEditTransaksi = function (id) {
  const trx = state.transaksiList.find((t) => t.id === id);
  if (!trx) return;
  const kategori = getKategoriById(trx.kategori_id);
  const tipe = kategori?.tipe || "pemasukan";

  document.getElementById(tipe === "pemasukan" ? "jenisPemasukan" : "jenisPengeluaran").checked = true;
  populateKategoriDropdown(tipe);

  document.getElementById("transaksiId").value = trx.id;
  document.getElementById("transaksiKategori").value = trx.kategori_id;
  document.getElementById("transaksiJumlah").value = trx.jumlah;
  document.getElementById("transaksiTanggal").value = trx.tanggal;
  document.getElementById("transaksiCatatan").value = trx.catatan || "";
  document.getElementById("transaksiModalTitle").textContent = "Edit Transaksi";
  transaksiModal.show();
};

transaksiForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const kategoriSelect = document.getElementById("transaksiKategori");
  if (kategoriSelect.disabled || !kategoriSelect.value) {
    showToast(`Belum ada kategori "${getSelectedJenis() === "pemasukan" ? "Pemasukan" : "Pengeluaran"}". Tambahkan dulu di menu Kategori.`, "danger");
    return;
  }

  const id = document.getElementById("transaksiId").value;
  const payload = {
    kategori_id: Number(kategoriSelect.value),
    jumlah: Number(document.getElementById("transaksiJumlah").value),
    tanggal: document.getElementById("transaksiTanggal").value,
    catatan: document.getElementById("transaksiCatatan").value.trim(),
  };

  try {
    if (id) {
      await apiRequest(`/transaksi/${id}`, { method: "PUT", body: payload });
      showToast("Transaksi berhasil diperbarui.");
    } else {
      await apiRequest("/transaksi", { method: "POST", body: payload });
      showToast("Transaksi berhasil ditambahkan.");
    }
    transaksiModal.hide();
    await loadTransaksi();
  } catch (err) {
    handleError(err);
  }
});

window.confirmDeleteTransaksi = function (id) {
  openConfirmModal(
    "Hapus transaksi ini?",
    "Data transaksi yang dihapus tidak dapat dikembalikan.",
    async () => {
      try {
        await apiRequest(`/transaksi/${id}`, { method: "DELETE" });
        showToast("Transaksi berhasil dihapus.");
        await loadTransaksi();
      } catch (err) {
        handleError(err);
      }
    }
  );
};

/* =========================================================================
   TARGET TABUNGAN
   ========================================================================= */
async function loadTarget() {
  try {
    const res = await apiRequest("/target");
    state.targetList = res.data || [];
    renderTargetGrid();
  } catch (err) {
    handleError(err);
  }
}

function renderTargetGrid() {
  const grid = document.getElementById("targetGrid");
  const empty = document.getElementById("targetEmpty");

  if (state.targetList.length === 0) {
    grid.innerHTML = "";
    empty.classList.remove("d-none");
    return;
  }
  empty.classList.add("d-none");

  grid.innerHTML = state.targetList.map((t) => {
    const percent = t.nominal_target > 0
      ? Math.min(100, Math.round((t.nominal_terkumpul / t.nominal_target) * 100))
      : 0;
    return `
      <div class="target-card">
        <div class="target-card-head">
          <div>
            <p class="target-card-name mb-1">${t.nama_target}</p>
            <p class="target-card-deadline mb-0"><i class="bi bi-calendar-event"></i> ${formatTanggal(t.deadline)}</p>
          </div>
          <div class="category-card-actions">
            <button class="btn-row-action" onclick="openEditTarget(${t.id})"><i class="bi bi-pencil"></i></button>
            <button class="btn-row-action text-danger" onclick="confirmDeleteTarget(${t.id})"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
        <div class="target-card-numbers">
          <span><strong>${formatRupiah(t.nominal_terkumpul)}</strong> terkumpul</span>
          <span>${percent}% dari ${formatRupiah(t.nominal_target)}</span>
        </div>
      </div>`;
  }).join("");
}

const targetForm = document.getElementById("targetForm");
const targetModal = new bootstrap.Modal(document.getElementById("targetModal"));

document.getElementById("btnAddTarget").addEventListener("click", () => {
  targetForm.reset();
  document.getElementById("targetId").value = "";
  document.getElementById("targetTerkumpul").value = 0;
  document.getElementById("targetModalTitle").textContent = "Tambah Target Tabungan";
});

window.openEditTarget = function (id) {
  const t = state.targetList.find((x) => x.id === id);
  if (!t) return;
  document.getElementById("targetId").value = t.id;
  document.getElementById("targetNama").value = t.nama_target;
  document.getElementById("targetNominal").value = t.nominal_target;
  document.getElementById("targetTerkumpul").value = t.nominal_terkumpul;
  document.getElementById("targetDeadline").value = t.deadline;
  document.getElementById("targetModalTitle").textContent = "Edit Target Tabungan";
  targetModal.show();
};

targetForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("targetId").value;
  const payload = {
    nama_target: document.getElementById("targetNama").value.trim(),
    nominal_target: Number(document.getElementById("targetNominal").value),
    nominal_terkumpul: Number(document.getElementById("targetTerkumpul").value || 0),
    deadline: document.getElementById("targetDeadline").value,
  };

  try {
    if (id) {
      await apiRequest(`/target/${id}`, { method: "PUT", body: payload });
      showToast("Target berhasil diperbarui.");
    } else {
      await apiRequest("/target", { method: "POST", body: payload });
      showToast("Target berhasil ditambahkan.");
    }
    targetModal.hide();
    await loadTarget();
  } catch (err) {
    handleError(err);
  }
});

window.confirmDeleteTarget = function (id) {
  openConfirmModal(
    "Hapus target tabungan ini?",
    "Progres tabungan yang sudah tercatat akan hilang.",
    async () => {
      try {
        await apiRequest(`/target/${id}`, { method: "DELETE" });
        showToast("Target berhasil dihapus.");
        await loadTarget();
      } catch (err) {
        handleError(err);
      }
    }
  );
};

/* =========================================================================
   LAPORAN BULANAN
   ========================================================================= */
const namaBulan = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function populateLaporanFilter() {
  const bulanSelect = document.getElementById("laporanBulan");
  if (bulanSelect.options.length === 0) {
    bulanSelect.innerHTML = namaBulan.map((b, i) =>
      `<option value="${i + 1}">${b}</option>`
    ).join("");
  }
  const now = new Date();
  bulanSelect.value = now.getMonth() + 1;
  document.getElementById("laporanTahun").value = now.getFullYear();
}

async function loadLaporan() {
  populateLaporanFilter();
  await fetchLaporan();
}

document.getElementById("laporanFilterForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetchLaporan();
});

async function fetchLaporan() {
  const bulan = document.getElementById("laporanBulan").value;
  const tahun = document.getElementById("laporanTahun").value;

  try {
    const res = await apiRequest(`/laporan?bulan=${bulan}&tahun=${tahun}`);
    const d = res.data;

    document.getElementById("reportPemasukan").textContent = formatRupiah(d.total_pemasukan);
    document.getElementById("reportPengeluaran").textContent = formatRupiah(d.total_pengeluaran);
    document.getElementById("reportSaldo").textContent = formatRupiah(d.saldo);

    const tbody = document.getElementById("reportTableBody");
    const empty = document.getElementById("reportEmpty");
    const list = d.transaksi || [];

    if (list.length === 0) {
      tbody.innerHTML = "";
      empty.classList.remove("d-none");
      return;
    }
    empty.classList.add("d-none");

    tbody.innerHTML = list.map((trx) => {
      const isIncome = trx.kategori?.tipe === "pemasukan";
      return `
        <tr>
          <td>${formatTanggal(trx.tanggal)}</td>
          <td>${trx.kategori ? `${trx.kategori.icon || ""} ${trx.kategori.nama_kategori}` : "-"}</td>
          <td class="text-muted">${trx.catatan || "-"}</td>
          <td class="text-end ${isIncome ? "amount-positive" : "amount-negative"}">
            ${isIncome ? "+" : "-"} ${formatRupiah(trx.jumlah)}
          </td>
        </tr>`;
    }).join("");
  } catch (err) {
    handleError(err);
  }
}

/* =========================================================================
   PROFIL
   ========================================================================= */
async function loadProfil() {
  try {
    const res = await apiRequest("/profile");
    const u = res.data;
    document.getElementById("profileNama").value = u.nama;
    document.getElementById("profileEmail").value = u.email;
  } catch (err) {
    handleError(err);
  }
}

document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    nama: document.getElementById("profileNama").value.trim(),
    email: document.getElementById("profileEmail").value.trim(),
  };

  try {
    await apiRequest("/profile", { method: "PUT", body: payload });
    // Update sesi lokal agar nama di header ikut ter-update
    const updatedUser = { ...state.user, ...payload };
    saveSession(state.token, updatedUser);
    updateUserHeader();
    showToast("Profil berhasil diperbarui.");
  } catch (err) {
    handleError(err);
  }
});

document.getElementById("btnDeleteAccount").addEventListener("click", () => {
  openConfirmModal(
    "Hapus akun secara permanen?",
    "Semua data transaksi, kategori, dan target tabunganmu akan ikut terhapus.",
    async () => {
      try {
        await apiRequest("/profile", { method: "DELETE" });
        showToast("Akun berhasil dihapus.");
        clearSession();
        showAuthScreen();
      } catch (err) {
        handleError(err);
      }
    }
  );
});

/* =========================================================================
   CONFIRM MODAL (generik untuk semua aksi hapus)
   ========================================================================= */
const confirmModalEl = document.getElementById("confirmModal");
const confirmModal = new bootstrap.Modal(confirmModalEl);
let pendingConfirmAction = null;

function openConfirmModal(title, message, onConfirm) {
  document.getElementById("confirmTitle").textContent = title;
  document.getElementById("confirmMessage").textContent = message;
  pendingConfirmAction = onConfirm;
  confirmModal.show();
}

document.getElementById("confirmActionBtn").addEventListener("click", async () => {
  if (pendingConfirmAction) {
    await pendingConfirmAction();
  }
  confirmModal.hide();
  pendingConfirmAction = null;
});

/* =========================================================================
   HEADER / USER CHIP
   ========================================================================= */
function updateUserHeader() {
  if (!state.user) return;
  document.getElementById("userNameLabel").textContent = state.user.nama;
  document.getElementById("userAvatar").textContent = initials(state.user.nama);
}

/* =========================================================================
   BOOTSTRAP APP (dipanggil setelah login / saat reload halaman)
   ========================================================================= */
async function bootApp() {
  showAppShell();
  updateUserHeader();
  navigateTo("dashboard");
}

/* =========================================================================
   INIT ON PAGE LOAD
   ========================================================================= */
(function init() {
  // Selalu mulai di Homepage saat pertama kali membuka web.
  // Sesi login (jika ada) tetap tersimpan dan dipakai begitu user menekan Masuk/Daftar dari Homepage.
  showHomepage();
})();
