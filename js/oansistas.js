// Gerenciador de Oansistas, Talentos e Fichas - Ministério OANSE Maanaim

class OansistasManager {
  constructor() {
    this.currentClub = null; // 'ursinho', 'faisca', etc.
    this.currentYearFilter = "2027"; // 'todos', '2027', '2026', etc.
    this.currentMemberTypeFilter = "todos"; // 'todos', 'oansista', 'lider'
    this.selectedOansistaId = null; // ID do oansista selecionado para abrir a ficha
    this.isOansistasDropdownOpen = false; // Controle de exibição da lista de nomes cadastrados
    this.currentSemesterTab = "sem1"; // 'sem1' (Fev-Jun) ou 'sem2' (Ago-Nov)
    this.isAuthenticated = false;
    this.isMasterAdmin = false;
    this.oansistas = this.loadOansistas();
    this.activeAccordion = {}; // { [oansistaId]: 'grau' }
    this.init();
  }

  loadOansistas() {
    const defaultData = [
      {
        id: "oan-1",
        type: "oansista",
        year: 2027,
        club: "flama",
        manual: "flama_sabia",
        name: "Lucas Gabriel Silva",
        age: 9,
        birthDate: "2018-04-12",
        address: "Rua das Flores, 142 - Bairro Esperança",
        phone: "(11) 98765-4321",
        livingWith: "Os pais",
        attendance: {
          "2027-02-06": "P",
          "2027-02-13": "P",
          "2027-02-20": "P",
          "2027-02-27": "F"
        },
        sections: {
          pi: [2, 3, 4],
          grau: [5, 6],
          e1: [5, 7],
          e2: [4],
          e3: [],
          e4: [],
          t1: [],
          t2: [],
          t3: [],
          t4: []
        },
        bonusActivities: {
          biblia: 3,
          farda: 3,
          visitante: 1,
          tarefa: 2,
          concurso_biblico: 0,
          olimpiadas: 0
        },
        customTalentosBonus: 0,
        notes: "Muito participativo e dedicado na memorização dos versículos."
      },
      {
        id: "lid-1",
        type: "lider",
        year: 2027,
        club: "flama",
        role: "Líder de Equipe Flama",
        manual: "flama_sabia",
        name: "Carlos Eduardo Santos",
        age: 32,
        birthDate: "1995-03-14",
        address: "Av. Maanaim, 310",
        phone: "(11) 98765-1100",
        livingWith: "Cônjuge",
        attendance: {
          "2027-02-06": "P",
          "2027-02-13": "P",
          "2027-02-20": "P",
          "2027-02-27": "P"
        },
        sections: {
          pi: [1, 2],
          grau: [1, 2, 3],
          e1: [1, 2],
          e2: [],
          e3: [],
          e4: [],
          t1: [],
          t2: [],
          t3: [],
          t4: []
        },
        bonusActivities: {
          biblia: 4,
          farda: 4,
          visitante: 1,
          tarefa: 0,
          concurso_biblico: 1,
          olimpiadas: 0
        },
        customTalentosBonus: 0,
        notes: "Líder exemplar do Clube Flama. 1 presença = 1 talento somado."
      },
      {
        id: "oan-2",
        type: "oansista",
        year: 2027,
        club: "faisca",
        manual: "faisca_saltador",
        name: "Sofia Oliveira Santos",
        age: 7,
        birthDate: "2020-08-25",
        address: "Av. Brasil, 850, Apto 32",
        phone: "(11) 97123-9988",
        livingWith: "Os pais",
        attendance: {
          "2027-02-06": "P",
          "2027-02-13": "P"
        },
        sections: {
          pi: [1],
          grau: [2, 3, 4],
          e1: [2, 3],
          e2: [],
          e3: [],
          e4: [],
          t1: [],
          t2: [],
          t3: [],
          t4: []
        },
        bonusActivities: {
          biblia: 2,
          farda: 2,
          visitante: 0,
          tarefa: 1,
          concurso_biblico: 0,
          olimpiadas: 0
        },
        customTalentosBonus: 0,
        notes: "Excelente comportamento no Círculo Oanse."
      },
      {
        id: "lid-2",
        type: "lider",
        year: 2027,
        club: "ursinho",
        role: "Conselheira dos Ursinhos",
        manual: "ursinho_amor",
        name: "Juliana Martins",
        age: 27,
        birthDate: "1999-08-11",
        address: "Rua das Acácias, 45",
        phone: "(11) 98111-2233",
        livingWith: "Os pais",
        attendance: {
          "2027-02-06": "P",
          "2027-02-13": "P",
          "2027-02-20": "P"
        },
        sections: {

          abraco: [1, 2, 3]
        },
        bonusActivities: {
          biblia: 3,
          farda: 3,
          visitante: 0,
          tarefa: 0,
          concurso_biblico: 0,
          olimpiadas: 0
        },
        customTalentosBonus: 0,
        notes: "Coordena as histórias de fantoches dos Ursinhos."
      },
      {
        id: "oan-3",
        type: "oansista",
        year: 2027,
        club: "ursinho",
        manual: "ursinho_amor",
        name: "Benício Alencar",
        age: 4,
        birthDate: "2022-11-03",
        address: "Rua Primavera, 55",
        phone: "(11) 96543-2211",
        livingWith: "Só mãe",
        attendance: {
          "2027-02-06": "P",
          "2027-02-13": "P"
        },
        sections: {

          abraco: [1, 2, 3, 4, 5, 6],
          dia_especial: [1]
        },
        bonusActivities: {
          biblia: 2,
          farda: 2,
          visitante: 1,
          tarefa: 0,
          concurso_biblico: 0,
          olimpiadas: 0
        },
        customTalentosBonus: 0,
        notes: "Adora as histórias de fantoche do Ursinho."
      },
      {
        id: "oan-4",
        type: "oansista",
        year: 2027,
        club: "tocha",
        manual: "tocha_carneiro",
        name: "Mateus Henrique Costa",
        age: 11,
        birthDate: "2016-01-18",
        address: "Rua do Carvalho, 204",
        phone: "(11) 99887-1122",
        livingWith: "Avós",
        attendance: {
          "2027-02-06": "P",
          "2027-02-13": "P",
          "2027-02-20": "P"
        },
        sections: {
          pi: [1, 2, 3, 4, 5],
          grau: [6, 7, 8],
          e1: [4, 5],
          e2: [3, 4],
          e3: [],
          e4: [],
          t1: [],
          t2: [],
          t3: [],
          t4: []
        },
        bonusActivities: {
          biblia: 3,
          farda: 3,
          visitante: 0,
          tarefa: 3,
          concurso_biblico: 0,
          olimpiadas: 0
        },
        customTalentosBonus: 0,
        notes: "Treinando para o Concurso Bíblico regional."
      }
    ];

    try {
      const saved = localStorage.getItem("oanse_oansistas_maanaim");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.some(o => o.type === "lider")) {
          const leaders = defaultData.filter(d => d.type === "lider");
          return [...leaders, ...parsed];
        }
        return parsed;
      }
    } catch (e) {
      console.error("Erro ao carregar oansistas:", e);
    }
    return defaultData;
  }

  saveOansistas() {
    try {
      localStorage.setItem("oanse_oansistas_maanaim", JSON.stringify(this.oansistas));
      if (window.firebaseSync && window.firebaseSync.isConfigured) {
        window.firebaseSync.saveToCloud({ oansistas: this.oansistas });
      }
    } catch (e) {
      console.error("Erro ao salvar oansistas:", e);
    }
  }

  init() {
    this.checkSession();
    this.attachAuthListeners();
  }

  checkSession() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("dropdown") === "open") {
      this.isOansistasDropdownOpen = true;
    }
    const targetOan = urlParams.get("oan");
    if (targetOan) {
      this.selectedOansistaId = targetOan;
    }
    const urlClub = urlParams.get("club");
    if (urlClub && (CLUBS_DATA[urlClub] || urlClub === "todos")) {
      this.currentClub = urlClub;
      this.isAuthenticated = true;
      this.isMasterAdmin = (urlClub === "todos");
      this.showLeaderArea();
      return;
    }

    const savedClub = sessionStorage.getItem("oanse_logged_club");
    const isMaster = sessionStorage.getItem("oanse_is_master") === "true";

    if (savedClub) {
      this.currentClub = savedClub;
      this.isAuthenticated = true;
      this.isMasterAdmin = isMaster;
      this.showLeaderArea();
    } else {
      this.showLoginScreen();
    }
  }

  authenticate(password) {
    if (!password || typeof password !== "string") {
      return { success: false, message: "Por favor, digite a senha de acesso." };
    }

    const raw = password.trim();
    // Normalização completa: minúsculas, sem acentos (NFD), sem espaços
    const clean = raw
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "");

    if (!clean) {
      return { success: false, message: "Por favor, digite a senha de acesso." };
    }

    // 1. Senha Mestra (Pastor / Coordenação Geral - Todos os Clubes)
    const masterAliases = ["maanaim2027", "maanaim", "admin2027", "admin", "coordenacao", "pastor"];
    if (masterAliases.includes(clean) || raw === MASTER_PASSWORD) {
      this.isAuthenticated = true;
      this.isMasterAdmin = true;
      this.currentClub = "todos";
      sessionStorage.setItem("oanse_logged_club", "todos");
      sessionStorage.setItem("oanse_is_master", "true");
      this.showLeaderArea();
      return { success: true, club: "todos", isMaster: true };
    }

    // 2. Mapeamento de variantes aceitas para cada clube (com ou sem 2027, plural, sem acentos)
    const clubAliases = {
      ursinho: ["ursinho2027", "ursinho", "ursinhos2027", "ursinhos", "clubeursinho", "clubeursinhos"],
      faisca: ["faisca2027", "faisca", "faiscas2027", "faiscas", "clubefaisca", "clubefaiscas"],
      flama: ["flama2027", "flama", "flamas2027", "flamas", "clubeflama", "clubeflamas"],
      tocha: ["tocha2027", "tocha", "tochas2027", "tochas", "clubetocha", "clubetochas"],
      jv: ["jv2027", "jv", "jovensvencedores", "jovensvencedores2027", "clubejv"],
      vq7: ["vq72027", "vq7", "v247", "v2472027", "clubevq7"]
    };

    // 3. Testar cada clube cadastrado
    for (const [clubKey, data] of Object.entries(CLUBS_DATA)) {
      const allowed = clubAliases[clubKey] || [];
      const officialNorm = (data.password || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

      if (raw === data.password || clean === officialNorm || allowed.includes(clean)) {
        this.isAuthenticated = true;
        this.isMasterAdmin = false;
        this.currentClub = clubKey;
        sessionStorage.setItem("oanse_logged_club", clubKey);
        sessionStorage.setItem("oanse_is_master", "false");
        this.showLeaderArea();
        return { success: true, club: clubKey, isMaster: false };
      }
    }

    return { 
      success: false, 
      message: "Senha não reconhecida. Verifique com a liderança do seu clube ou coordenação." 
    };
  }

  logout() {
    this.isAuthenticated = false;
    this.currentClub = null;
    this.isMasterAdmin = false;
    this.selectedOansistaId = null;
    sessionStorage.removeItem("oanse_logged_club");
    sessionStorage.removeItem("oanse_is_master");
    this.showLoginScreen();
  }

  showLoginScreen() {
    const loginBox = document.getElementById("leaderLoginSection");
    const dashboard = document.getElementById("leaderDashboardSection");
    if (loginBox) loginBox.classList.remove("hidden");
    if (dashboard) dashboard.classList.add("hidden");
  }

  showLeaderArea() {
    const loginBox = document.getElementById("leaderLoginSection");
    const dashboard = document.getElementById("leaderDashboardSection");
    if (loginBox) loginBox.classList.add("hidden");
    if (dashboard) dashboard.classList.remove("hidden");

    this.renderClubHeader();
    this.renderOansistasList();
  }

  renderClubHeader() {
    const container = document.getElementById("leaderClubHeaderInfo");
    if (!container) return;

    if (this.currentClub === "todos") {
      const pageWatermark = document.getElementById("leaderClubPageBgWatermark");
      if (pageWatermark) pageWatermark.src = "assets/img/oanse-logo.png";

      container.innerHTML = `
        <div class="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 sm:p-5 rounded-2xl shadow-md">
          <!-- Marca d'água com a logo geral no fundo -->
          <div class="absolute -right-6 -bottom-8 w-48 sm:w-56 h-48 sm:h-56 opacity-15 pointer-events-none select-none z-0">
            <img src="assets/img/oanse-logo.png" class="w-full h-full object-contain filter brightness-125" alt="">
          </div>

          <div class="relative z-10 flex items-center space-x-3 min-w-0">
            <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center p-2 backdrop-blur-sm border border-white/20 shrink-0">
              <img src="assets/img/oanse-logo.png" class="w-full h-full object-contain" alt="OANSE">
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] sm:text-xs bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full uppercase">Acesso Geral</span>
                <span class="text-xs text-blue-200">Coordenação / Pastores</span>
              </div>
              <h2 class="text-lg md:text-2xl font-black truncate">Todos os Clubes OANSE Maanaim</h2>
            </div>
          </div>

          <div class="relative z-10 flex items-center gap-2 w-full md:w-auto">
            <select id="leaderClubFilterSelect" class="flex-1 md:flex-initial bg-white/10 text-white border border-white/20 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white">
              <option value="todos" class="text-slate-800">Filtrar: Todos os Clubes</option>
              ${Object.values(CLUBS_DATA).map(c => `
                <option value="${c.id}" class="text-slate-800">${c.name} (${c.age})</option>
              `).join("")}
            </select>
            <button onclick="oansistasManager.logout()" class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-1.5 border border-white/20 shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              <span>Sair</span>
            </button>
          </div>
        </div>
      `;

      document.getElementById("leaderClubFilterSelect")?.addEventListener("change", (e) => {
        const val = e.target.value;
        const wm = document.getElementById("leaderClubPageBgWatermark");
        if (wm) {
          wm.src = (val !== "todos" && CLUBS_DATA[val]) ? CLUBS_DATA[val].badge : "assets/img/oanse-logo.png";
        }
        this.renderOansistasList(val);
      });
    } else {
      const club = CLUBS_DATA[this.currentClub];
      if (!club) return;

      const pageWatermark = document.getElementById("leaderClubPageBgWatermark");
      const watermarkSrc = (this.currentClub === "vq7") ? "assets/img/vq7-white.png" : club.badge;
      if (pageWatermark) pageWatermark.src = watermarkSrc;

      container.innerHTML = `
        <div class="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl shadow-md border" style="background: linear-gradient(135deg, ${club.colorDark}, ${club.color}); color: white;">
          <!-- Marca d'água minimamente transparente com a logo do clube no fundo -->
          <div class="absolute -right-6 -bottom-8 w-48 sm:w-56 h-48 sm:h-56 opacity-15 pointer-events-none select-none z-0">
            <img src="${watermarkSrc}" class="w-full h-full object-contain filter brightness-125" alt="">
          </div>

          <div class="relative z-10 flex items-center space-x-3 min-w-0">
            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1.5 shadow-md shrink-0 flex items-center justify-center">
              <img src="${club.badge}" class="w-full h-full object-contain" alt="${club.name}">
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-[10px] sm:text-xs bg-white text-slate-900 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">${club.fullName}</span>
                <span class="text-xs text-white/80">${club.age}</span>
              </div>
              <h2 class="text-lg md:text-2xl font-black mt-0.5 truncate">Painel de Liderança • ${club.name}</h2>
              <p class="text-[11px] sm:text-xs text-white/90 italic truncate">Lema: "${club.motto.replace(/^"|"$/g, '')}"</p>
            </div>
          </div>

          <div class="relative z-10 flex items-center gap-2 w-full md:w-auto justify-end">
            <button onclick="oansistasManager.openNewOansistaModal('${club.id}')" class="flex-1 md:flex-initial px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow transition flex items-center justify-center gap-1.5 sm:gap-2">
              <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
              <span>Novo Oansista</span>
            </button>
            <button onclick="oansistasManager.logout()" class="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/20 shrink-0" title="Trocar de clube / Sair">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </button>
          </div>
        </div>
      `;
    }
  }

  /**
   * Gera todos os Sábados de Fevereiro a Junho e de Agosto a Novembro
   */
  getOfficialSaturdays(year = 2027) {
    // 1º Semestre: Fevereiro (1), Março (2), Abril (3), Maio (4), Junho (5)
    // 2º Semestre: Agosto (7), Setembro (8), Outubro (9), Novembro (10)
    const sem1Months = [1, 2, 3, 4, 5];
    const sem2Months = [7, 8, 9, 10];

    const generateForMonths = (months) => {
      const dates = [];
      months.forEach(m => {
        const daysInMonth = new Date(year, m + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
          const d = new Date(year, m, day);
          if (d.getDay() === 6) { // Sábado
            const dateStr = `${year}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dates.push({
              dateStr: dateStr,
              formatted: `${String(day).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}`,
              monthName: MONTH_NAMES[m],
              monthIndex: m
            });
          }
        }
      });
      return dates;
    };

    return {
      sem1: generateForMonths(sem1Months),
      sem2: generateForMonths(sem2Months)
    };
  }

  /**
   * Cálculo dos Talentos Totais de um Oansista
   */
  calculateTotalTalentos(oan) {
    let total = 0;
    const manualKey = oan.manual || (oan.club === "ursinho" ? "ursinho_amor" : `${oan.club}_default`);

    // 1. Somar seções padrão
    if (oan.sections) {
      for (const [catId, numbers] of Object.entries(oan.sections)) {
        if (Array.isArray(numbers)) {
          numbers.forEach(num => {
            const sectionKey = `${catId}_${num}`;
            const val = getSectionTalentValue(manualKey, sectionKey);
            total += val;
          });
        }
      }
    }

    // 2. Somar atividades bônus
    if (oan.bonusActivities) {
      SPECIAL_ACTIVITIES.forEach(act => {
        const count = oan.bonusActivities[act.id] || 0;
        total += count * act.points;
      });
    }

    // 3. Somar bônus customizado
    if (oan.customTalentosBonus) {
      total += parseFloat(oan.customTalentosBonus) || 0;
    }

    // 4. REGRA OFICIAL DE LÍDER: 1 presença de líder = 1 talento!
    if (oan.type === "lider" && oan.attendance) {
      const presencasLider = Object.values(oan.attendance).filter(status => status === "P").length;
      total += presencasLider;
    }

    return parseFloat(total.toFixed(1));
  }

  renderOansistasList(filterClub = null) {
    const container = document.getElementById("oansistasCardsContainer");
    if (!container) return;

    let targetClub = filterClub || (this.currentClub === "todos" ? null : this.currentClub);
    let list = this.oansistas;

    if (targetClub && targetClub !== "todos") {
      list = list.filter(o => o.club === targetClub);
    }

    // Filtro por Ano
    const yearSelect = document.getElementById("filterYearSelect");
    const selectedYear = yearSelect ? yearSelect.value : this.currentYearFilter;
    if (selectedYear && selectedYear !== "todos") {
      list = list.filter(o => (o.year || 2027).toString() === selectedYear.toString());
    }

    // Filtro por Tipo de Ficha (Todos / Oansistas / Líderes)
    const typeSelect = document.getElementById("filterMemberTypeSelect");
    const selectedType = typeSelect ? typeSelect.value : (this.currentMemberTypeFilter || "todos");
    if (selectedType && selectedType !== "todos") {
      list = list.filter(o => (o.type || "oansista") === selectedType);
    }

    // Campo de busca
    const searchInput = document.getElementById("searchOansistaInput");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    if (query) {
      list = list.filter(o => 
        o.name.toLowerCase().includes(query) ||
        (o.phone && o.phone.includes(query)) ||
        (o.address && o.address.toLowerCase().includes(query)) ||
        (o.role && o.role.toLowerCase().includes(query))
      );
    }

    // Indicador de contagem
    const countEl = document.getElementById("oansistasCountBadge");
    if (countEl) {
      if (selectedType === "lider") countEl.textContent = `${list.length} líder(es)`;
      else if (selectedType === "oansista") countEl.textContent = `${list.length} oansista(s)`;
      else countEl.textContent = `${list.length} cadastrado(s)`;
    }

    if (list.length === 0) {
      this.selectedOansistaId = null;
      container.innerHTML = `
        <div class="col-span-full py-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
          <div class="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
          </div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-white">Nenhum cadastro encontrado</h3>
          <p class="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">Verifique os filtros de clube, ano e tipo de ficha.</p>
          <div class="flex items-center justify-center gap-3">
            <button onclick="oansistasManager.openNewOansistaModal('${targetClub || 'flama'}', 'oansista')" class="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow hover:bg-emerald-700 transition">
              + Oansista
            </button>
            <button onclick="oansistasManager.openNewOansistaModal('${targetClub || 'flama'}', 'lider')" class="px-4 py-2 bg-slate-700 text-white rounded-xl font-bold shadow hover:bg-slate-800 transition">
              + Líder
            </button>
          </div>
        </div>
      `;
      return;
    }

    // Só apresenta a ficha se o usuário tiver selecionado um nome explicitamente
    let selectedOan = null;
    if (this.selectedOansistaId && list.some(o => o.id === this.selectedOansistaId)) {
      selectedOan = list.find(o => o.id === this.selectedOansistaId);
    } else {
      this.selectedOansistaId = null;
    }

    // 1. Renderizar as Abas / Seletor de Oansistas
    const tabsHtml = this.renderOansistasTabs(list, selectedOan);

    // 2. Renderizar a Ficha APENAS se houver oansista selecionado, senão exibe estado de aguardo
    let cardHtml = "";
    if (selectedOan) {
      cardHtml = `
        <div class="max-w-4xl mx-auto transition-all duration-300">
          ${this.renderOansistaCard(selectedOan)}
        </div>
      `;
    } else {
      cardHtml = `
        <div class="bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center flex flex-col items-center justify-center my-4 max-w-2xl mx-auto shadow-xs">
          <div class="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 shadow-xs">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <h4 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2">
            Nenhuma ficha aberta no momento
          </h4>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed mb-5">
            A ficha só é apresentada ao selecionar o nome da criança ou líder. Clique no botão <strong>"Ver Cadastrados"</strong> acima para escolher quem deseja visualizar.
          </p>
          <button type="button" 
                  onclick="oansistasManager.openOansistasDropdown()"
                  class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-xs rounded-xl shadow-md transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>
            <span>Escolher Nome na Lista (${list.length})</span>
          </button>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="w-full space-y-6">
        ${tabsHtml}
        ${cardHtml}
      </div>
    `;
  }

  /**
   * Fecha a ficha atualmente aberta e retorna para a tela inicial do clube
   */
  closeFicha() {
    this.selectedOansistaId = null;
    this.renderOansistasList();
  }

  /**
   * Abre diretamente o dropdown de oansistas cadastrados
   */
  openOansistasDropdown() {
    this.isOansistasDropdownOpen = true;
    this.renderOansistasList();
    setTimeout(() => {
      const menu = document.getElementById("oansistasDropdownMenu");
      if (menu) {
        menu.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 50);
  }

  /**
   * Alterna a visibilidade do menu/dropdown de oansistas cadastrados
   */
  toggleOansistasDropdown() {
    this.isOansistasDropdownOpen = !this.isOansistasDropdownOpen;
    const menu = document.getElementById("oansistasDropdownMenu");
    const chevron = document.getElementById("oansistasDropdownChevron");
    if (menu) {
      if (this.isOansistasDropdownOpen) {
        menu.classList.remove("hidden");
      } else {
        menu.classList.add("hidden");
      }
    }
    if (chevron) {
      if (this.isOansistasDropdownOpen) {
        chevron.classList.add("rotate-180");
      } else {
        chevron.classList.remove("rotate-180");
      }
    }
  }

  /**
   * Renderiza a lista expansível com os nomes dos cadastrados
   */
  renderDropdownListHtml(list) {
    return `
      <div id="oansistasDropdownMenu" class="${this.isOansistasDropdownOpen ? 'block' : 'hidden'} mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 transition-all">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>
            <span>Clique no nome para abrir a ficha completa:</span>
          </span>
          <span class="text-xs text-slate-500 font-semibold">${list.length} cadastrado(s)</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
          ${list.map(oan => {
            const isSelected = oan.id === this.selectedOansistaId;
            const isLider = oan.type === "lider";
            const club = CLUBS_DATA[oan.club] || CLUBS_DATA.ursinho;
            const talentos = this.calculateTotalTalentos(oan);

            const activeClass = isLider 
              ? 'bg-slate-300 dark:bg-slate-700 border-slate-700 text-slate-950 dark:text-white font-black shadow-md ring-2 ring-slate-600/30'
              : 'bg-blue-50 dark:bg-blue-900/40 border-blue-600 text-blue-950 dark:text-blue-100 font-black shadow-xs ring-2 ring-blue-500/20';
            
            const inactiveClass = isLider
              ? 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 hover:border-slate-400 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold'
              : 'bg-slate-50/80 dark:bg-slate-700/40 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-400 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold';

            return `
              <button type="button"
                      onclick="oansistasManager.selectOansista('${oan.id}')"
                      class="w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${isSelected ? activeClass : inactiveClass}">
                <div class="flex items-center gap-2.5 min-w-0 flex-1">
                  <div class="w-9 h-9 rounded-lg ${isLider ? 'bg-slate-800 text-white font-black text-sm' : 'bg-white p-1 border border-slate-200'} shrink-0 flex items-center justify-center shadow-2xs">
                    ${isLider ? '👔' : `<img src="${club.badge}" class="w-full h-full object-contain" alt="${club.name}">`}
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                      <span>${oan.name}</span>
                      ${isLider ? '<span class="text-[9px] bg-slate-700 text-white px-1.5 py-0.2 rounded font-black shrink-0">Líder</span>' : ''}
                    </div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                      ${club.name} • ${isLider ? (oan.role || 'Líder') : (oan.age + ' anos')}
                    </div>
                  </div>
                </div>
                <div class="text-right shrink-0 flex flex-col items-end">
                  <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200/60 dark:border-amber-800/40">T$ ${talentos}</span>
                  ${isSelected ? `<span class="text-[10px] ${isLider ? 'text-slate-800 dark:text-slate-200' : 'text-blue-600 dark:text-blue-400'} font-black mt-0.5">✓ Aberto</span>` : ''}
                </div>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  /**
   * Renderiza a barra com os dados do oansista e o botão de abrir cadastrados
   */
  renderOansistasTabs(list, selectedOan) {
    if (!selectedOan) {
      return `
        <div class="bg-white dark:bg-slate-800 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-1 shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-2xs">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                    Aguardando Seleção
                  </span>
                  <span class="text-xs text-slate-500 font-semibold">${list.length} cadastrado(s)</span>
                </div>
                <h3 class="text-sm sm:text-lg font-black text-slate-900 dark:text-white truncate">
                  Selecione um nome para abrir a ficha
                </h3>
              </div>
            </div>

            <!-- Botão Ver Cadastrados -->
            <div class="shrink-0 w-full sm:w-auto">
              <button type="button" 
                      onclick="oansistasManager.toggleOansistasDropdown()"
                      id="btnToggleOansistasList"
                      class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 border border-blue-500">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span>Ver Cadastrados (${list.length})</span>
                <svg id="oansistasDropdownChevron" class="w-4 h-4 shrink-0 transition-transform duration-200 ${this.isOansistasDropdownOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          </div>

          ${this.renderDropdownListHtml(list)}
        </div>
      `;
    }

    const isSelectedLider = selectedOan.type === "lider";
    const selectedClub = CLUBS_DATA[selectedOan.club] || CLUBS_DATA.ursinho;

    return `
      <div class="bg-white dark:bg-slate-800 p-3.5 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <!-- Identificação do Oansista ou Líder Atualmente Aberto na Ficha -->
          <div class="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${isSelectedLider ? 'bg-slate-800 text-white border-2 border-slate-600' : 'bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600'} p-1 shrink-0 flex items-center justify-center shadow-2xs">
              ${isSelectedLider 
                ? '<span class="text-xl sm:text-2xl">👔</span>' 
                : `<img src="${selectedClub.badge}" class="w-full h-full object-contain" alt="${selectedClub.name}">`
              }
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-[10px] font-black uppercase tracking-wider ${isSelectedLider ? 'bg-slate-700 text-amber-300' : 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300'} px-2 py-0.5 rounded-full flex items-center gap-1">
                  ${isSelectedLider ? '👔 Ficha Aberta' : 'Ficha Aberta'}
                </span>
                <span class="text-xs text-slate-500 dark:text-slate-400 font-semibold truncate">
                  ${selectedClub.name} • ${isSelectedLider ? (selectedOan.role || 'Líder') : (selectedOan.age + ' anos')}
                </span>
              </div>
              <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
                ${selectedOan.name}
              </h3>
            </div>
          </div>

          <!-- Botões de Ação: Fechar Ficha e Trocar Cadastrado em Grade de 2 colunas no celular -->
          <div class="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto shrink-0">
            <button type="button" 
                    onclick="oansistasManager.closeFicha()"
                    title="Fechar visualização desta ficha"
                    class="w-full sm:w-auto px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 dark:bg-slate-700 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-600 transition flex items-center justify-center gap-1.5 shadow-2xs">
              <svg class="w-4 h-4 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              <span>Fechar</span>
            </button>

            <button type="button" 
                    onclick="oansistasManager.toggleOansistasDropdown()"
                    id="btnToggleOansistasList"
                    class="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-1.5 sm:gap-2 border border-blue-500">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span>Trocar (${list.length})</span>
              <svg id="oansistasDropdownChevron" class="w-4 h-4 shrink-0 transition-transform duration-200 ${this.isOansistasDropdownOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
        </div>

        ${this.renderDropdownListHtml(list)}
      </div>
    `;
  }

  selectOansista(id) {
    this.selectedOansistaId = id;
    this.isOansistasDropdownOpen = false;
    this.renderOansistasList();
    setTimeout(() => {
      const card = document.getElementById(`card-${id}`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

  setAttendance(oanId, dateStr, status) {
    const oan = this.oansistas.find(o => o.id === oanId);
    if (!oan) return;

    if (!oan.attendance) oan.attendance = {};
    
    // Se clicar no mesmo que já está marcado, limpa (opcional) ou define
    if (oan.attendance[dateStr] === status) {
      delete oan.attendance[dateStr];
    } else {
      oan.attendance[dateStr] = status;
    }

    this.saveOansistas();
    this.renderOansistasList();
  }

  setSemesterAttendance(oanId, semesterKey, status) {
    const oan = this.oansistas.find(o => o.id === oanId);
    if (!oan) return;

    const satObj = this.getOfficialSaturdays(oan.year || 2027);
    const dates = satObj[semesterKey] || [];

    if (!oan.attendance) oan.attendance = {};
    dates.forEach(d => {
      oan.attendance[d.dateStr] = status;
    });

    this.saveOansistas();
    this.renderOansistasList();
  }

  renderOansistaCard(oan) {
    const isLider = oan.type === "lider";
    const club = CLUBS_DATA[oan.club] || CLUBS_DATA.ursinho;
    const totalTalentos = this.calculateTotalTalentos(oan);
    const manualOptions = club.manuals || [];
    const oanYear = oan.year || 2027;

    // Sábados oficiais de Fevereiro a Junho e de Agosto a Novembro
    const allSaturdays = this.getOfficialSaturdays(oanYear);

    // Contagem de presenças em sábados
    const attendanceEntries = Object.entries(oan.attendance || {});
    const totalPresencas = attendanceEntries.filter(([_, status]) => status === "P").length;
    const totalFaltas = attendanceEntries.filter(([_, status]) => status === "F").length;
    const totalRegistros = totalPresencas + totalFaltas;
    const freqPercent = totalRegistros > 0 ? Math.round((totalPresencas / totalRegistros) * 100) : 100;

    const isUrsinho = oan.club === "ursinho";
    const categoriesToRender = isUrsinho ? URSINHO_CATEGORIES : SECTION_CATEGORIES;

    // Card cinza padrão para líderes de todos os clubes conforme solicitado
    const cardBorderBg = isLider
      ? "bg-slate-200/90 dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500 shadow-xl"
      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md";

    const headerBg = isLider
      ? "bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white border-b border-slate-500"
      : "bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/80 border-b border-slate-100 dark:border-slate-700/60";

    return `
      <div class="${cardBorderBg} rounded-3xl transition-all duration-200 flex flex-col overflow-hidden relative" id="card-${oan.id}">
        
        <!-- Header do Card com Talento em Destaque e Seletor de Ano -->
        <div class="p-3.5 sm:p-5 ${headerBg}">
          <div class="flex items-start justify-between gap-2.5 sm:gap-3">
            <div class="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0 flex-1">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-1.5 ${isLider ? 'bg-slate-900 text-white border border-slate-600' : 'bg-white shadow-xs border border-slate-100'} shrink-0 flex items-center justify-center">
                ${isLider 
                  ? '<span class="text-2xl sm:text-3xl">👔</span>' 
                  : `<img src="${club.badge}" class="w-full h-full object-contain" alt="${club.name}">`
                }
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5 flex-wrap">
                  ${isLider 
                    ? `<span class="text-[10px] sm:text-[11px] font-black uppercase px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-2xs">
                         👔 Líder
                       </span>
                       <span class="text-[11px] sm:text-xs font-bold text-slate-200 bg-white/15 px-2 sm:px-2.5 py-0.5 rounded-full truncate">
                         ${club.fullName}
                       </span>`
                    : `<span class="text-[10px] sm:text-[11px] font-black uppercase px-2 sm:px-2.5 py-0.5 rounded-full" style="background-color: ${club.colorLight}; color: ${club.colorDark};">
                         ${club.name}
                       </span>
                       <span class="text-[11px] sm:text-xs font-semibold text-slate-500">${oan.age} anos</span>`
                  }
                  
                  <!-- SELETOR DE ANO NO CARD -->
                  <div class="inline-flex items-center gap-1 ${isLider ? 'bg-white/10 text-white border-white/20' : 'bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-200/80'} px-2 py-0.5 rounded-md border text-[10px] sm:text-[11px] font-bold">
                    <span>Ano:</span>
                    <select onchange="oansistasManager.updateOanYear('${oan.id}', this.value)" class="bg-transparent font-black cursor-pointer focus:outline-none ${isLider ? 'text-white' : ''}">
                      <option value="2026" ${oanYear === 2026 ? 'selected' : ''} class="text-slate-900">2026</option>
                      <option value="2027" ${oanYear === 2027 ? 'selected' : ''} class="text-slate-900">2027</option>
                      <option value="2028" ${oanYear === 2028 ? 'selected' : ''} class="text-slate-900">2028</option>
                      <option value="2029" ${oanYear === 2029 ? 'selected' : ''} class="text-slate-900">2029</option>
                      <option value="2030" ${oanYear === 2030 ? 'selected' : ''} class="text-slate-900">2030</option>
                    </select>
                  </div>
                </div>
                <h3 class="text-lg sm:text-2xl font-black ${isLider ? 'text-white' : 'text-slate-800 dark:text-white'} truncate mt-0.5" title="${oan.name}">
                  ${oan.name}
                </h3>
                ${isLider ? `<p class="text-[11px] sm:text-xs text-slate-300 font-medium truncate">Função: <strong>${oan.role || 'Líder do Clube'}</strong> • ${oan.age} anos</p>` : ''}
              </div>
            </div>

            <!-- Destaque de Talentos (Moeda Oanse) e Botão Fechar -->
            <div class="flex flex-col items-end shrink-0 gap-1 sm:gap-1.5">
              <button type="button" 
                      onclick="oansistasManager.closeFicha()" 
                      class="px-2 sm:px-2.5 py-1 rounded-xl ${isLider ? 'bg-slate-900/80 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-600' : 'bg-white/80 dark:bg-slate-700/80 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'} text-[11px] sm:text-xs font-bold transition flex items-center gap-1 shadow-2xs" 
                      title="Fechar visualização desta ficha">
                <svg class="w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                <span>Fechar</span>
              </button>
              <div class="flex items-center gap-1 sm:gap-1.5 ${isLider ? 'bg-slate-950 text-amber-400 border border-amber-400/40' : 'bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300'} px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl shadow-xs">
                <span class="text-xs font-extrabold text-amber-500">T$</span>
                <span class="text-xl sm:text-3xl font-black tracking-tight" id="talentos-val-${oan.id}">${totalTalentos}</span>
              </div>
              <span class="text-[9px] sm:text-[10px] font-bold ${isLider ? 'text-slate-300' : 'text-slate-500'} uppercase tracking-wider">Talentos</span>
              ${isLider ? `<span class="text-[9px] text-emerald-400 font-bold block">1 pres. = 1 T$</span>` : ''}
            </div>
          </div>

          <!-- Seleção do Manual em andamento e Frequência -->
          <div class="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t ${isLider ? 'border-slate-600/70 text-slate-300' : 'border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-300'} text-xs">
            <div class="flex items-center space-x-2 w-full sm:w-auto">
              <span class="font-bold shrink-0">${isLider ? 'Manual:' : 'Manual:'}</span>
              <select onchange="oansistasManager.updateManual('${oan.id}', this.value)" class="flex-1 sm:flex-initial text-xs font-semibold ${isLider ? 'bg-slate-950 text-white border-slate-600' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600'} border rounded-lg px-2.5 py-1 focus:outline-none">
                ${manualOptions.map(m => {
                  const mKey = `${oan.club}_${m.id}`;
                  return `<option value="${mKey}" ${oan.manual === mKey ? 'selected' : ''}>${m.name}</option>`;
                }).join("")}
              </select>
            </div>

            <!-- Frequência / Presença resumida -->
            <div class="text-[11px] font-bold flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              <span class="${isLider ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/40' : 'text-emerald-600 dark:text-emerald-400'} px-2 py-0.5 rounded font-black">
                P: ${totalPresencas} ${isLider ? `(+${totalPresencas} T$)` : ''}
              </span>
              <span class="${isLider ? 'text-rose-400' : 'text-rose-600 dark:text-rose-400'} font-black">F: ${totalFaltas}</span>
              <span class="${isLider ? 'bg-white/10 text-slate-200' : 'bg-slate-100 dark:bg-slate-700'} px-2 py-0.5 rounded font-black">${freqPercent}% Freq.</span>
            </div>
          </div>
        </div>

        <!-- Dados Cadastrais e Seções -->
        <div class="p-4 sm:p-5 space-y-4 flex-1">
          
          <!-- Informações de Contato e Família -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${isLider ? 'bg-slate-100 dark:bg-slate-900/60 border-slate-300 dark:border-slate-600' : 'bg-slate-50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-700/60'} p-3 rounded-2xl border">
            <div>
              <span class="text-slate-500 block">${isLider ? 'Cargo / Função:' : 'Nascimento:'}</span>
              <span class="font-bold text-slate-700 dark:text-slate-200">${isLider ? (oan.role || 'Líder de Clube') : (oan.birthDate ? this.formatDate(oan.birthDate) : 'Não informado')}</span>
            </div>
            <div>
              <span class="text-slate-500 block">Telefone / Whats:</span>
              <span class="font-bold text-slate-700 dark:text-slate-200">${oan.phone || 'Não informado'}</span>
            </div>
            <div class="sm:col-span-2">
              <span class="text-slate-500 block">Endereço:</span>
              <span class="font-bold text-slate-700 dark:text-slate-200 truncate block">${oan.address || 'Não informado'}</span>
            </div>
            <div class="sm:col-span-2">
              <span class="text-slate-500">${isLider ? 'Estado / Convivência:' : 'Mora com os pais:'}</span>
              <span class="font-black ${isLider ? 'text-slate-800 dark:text-slate-200' : 'text-blue-600 dark:text-blue-400'} ml-1">${oan.livingWith || (isLider ? 'Cônjuge' : 'Os pais')}</span>
            </div>
          </div>

          <!-- CONTROLE DE PRESENÇA NOS SÁBADOS (1 PRESENÇA DE LÍDER = 1 TALENTO) -->
          <div class="border ${isLider ? 'border-slate-300 dark:border-slate-600 bg-white/90 dark:bg-slate-900/60' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'} rounded-2xl p-3.5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span>Presença ${isLider ? 'do Líder' : ''} nos Sábados (${oanYear})</span>
                </h4>
                ${isLider 
                  ? `<p class="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                       ⭐ <strong>Regra do Líder:</strong> 1 presença marcada (<strong>P</strong>) = <strong>1 talento</strong> adicionado ao saldo!
                     </p>`
                  : `<p class="text-[10px] text-slate-500 mt-0.5">Sábados oficiais: Fev a Jun • Ago a Nov. Marque P ou F:</p>`
                }
              </div>

              <!-- Abas de Semestre (1º e 2º) -->
              <div class="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl self-start sm:self-auto">
                <button onclick="oansistasManager.switchSemesterTab('sem1')" class="px-2.5 py-1 text-[11px] font-black rounded-lg transition ${this.currentSemesterTab === 'sem1' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-2xs' : 'text-slate-600 dark:text-slate-300'}">
                  1º Sem (Fev-Jun)
                </button>
                <button onclick="oansistasManager.switchSemesterTab('sem2')" class="px-2.5 py-1 text-[11px] font-black rounded-lg transition ${this.currentSemesterTab === 'sem2' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-2xs' : 'text-slate-600 dark:text-slate-300'}">
                  2º Sem (Ago-Nov)
                </button>
              </div>
            </div>

            <!-- Grade de Sábados do Semestre Ativo -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
              ${(this.currentSemesterTab === 'sem1' ? allSaturdays.sem1 : allSaturdays.sem2).map(sat => {
                const status = (oan.attendance && oan.attendance[sat.dateStr]) || "";
                return `
                  <div class="p-2 rounded-xl border flex items-center justify-between text-xs transition ${
                    status === 'P' ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' :
                    status === 'F' ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800' :
                    'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700'
                  }">
                    <div class="font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                      <span>${sat.formatted}</span>
                      <span class="block text-[9px] text-slate-400 font-normal">${sat.monthName.substring(0, 3)}</span>
                    </div>

                    <!-- Botões P e F Diretos -->
                    <div class="flex items-center gap-1">
                      <button onclick="oansistasManager.setAttendance('${oan.id}', '${sat.dateStr}', 'P')" 
                              class="w-6 h-6 rounded-md font-black text-xs transition ${
                                status === 'P' 
                                  ? 'bg-emerald-600 text-white shadow-xs' 
                                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 border border-slate-200 dark:border-slate-600'
                              }" title="Presente">
                        P
                      </button>
                      <button onclick="oansistasManager.setAttendance('${oan.id}', '${sat.dateStr}', 'F')" 
                              class="w-6 h-6 rounded-md font-black text-xs transition ${
                                status === 'F' 
                                  ? 'bg-rose-600 text-white shadow-xs' 
                                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50 border border-slate-200 dark:border-slate-600'
                              }" title="Falta">
                        F
                      </button>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>

            <!-- Ações rápidas do semestre -->
            <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
              <span>Ações rápidas do semestre:</span>
              <div class="flex items-center gap-2">
                <button onclick="oansistasManager.setSemesterAttendance('${oan.id}', '${this.currentSemesterTab}', 'P')" class="font-bold text-emerald-600 hover:underline">
                  Marcar todos P
                </button>
                <span>•</span>
                <button onclick="oansistasManager.setSemesterAttendance('${oan.id}', '${this.currentSemesterTab}', '')" class="font-bold text-slate-400 hover:underline">
                  Limpar
                </button>
              </div>
            </div>
          </div>

          <!-- SEÇÕES DA CRIANÇA E MARCAÇÃO DE NÚMEROS (SEM LEGENDA SUPERIOR) -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>Marcar Seções do Manual</span>
              </h4>
              <span class="text-[10px] font-bold text-slate-500">Clique para abrir</span>
            </div>

            <div class="space-y-1.5">
              ${categoriesToRender.map(cat => this.renderSectionAccordionItem(oan, cat)).join("")}
            </div>
          </div>

          <!-- BÔNUS DE ATIVIDADES E TALENTOS EXTRAS (COM BOTÕES PARA SOMAR E DIMINUIR) -->
          <div class="border border-amber-200 dark:border-amber-900/60 rounded-2xl p-3 bg-amber-50/50 dark:bg-amber-950/20">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
                Atividades & Pontos Extras
              </h4>
              <span class="text-[10px] text-amber-700 dark:text-amber-400 font-bold">Use [+] ou [-]</span>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${SPECIAL_ACTIVITIES.map(act => {
                const count = (oan.bonusActivities && oan.bonusActivities[act.id]) || 0;
                return `
                  <div class="p-2 rounded-xl border border-amber-200/80 dark:border-amber-900/60 bg-white dark:bg-slate-800 flex items-center justify-between shadow-2xs">
                    <div class="min-w-0 pr-1">
                      <div class="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate flex items-center gap-1">
                        <span>${act.icon}</span>
                        <span>${act.name}</span>
                      </div>
                      <div class="text-[9px] text-amber-600 font-bold">+${act.points} T$ cada</div>
                    </div>

                    <!-- Controles de Diminuir [-] e Aumentar [+] -->
                    <div class="flex items-center space-x-1 shrink-0 bg-slate-50 dark:bg-slate-700/60 p-0.5 rounded-lg border border-slate-200 dark:border-slate-600">
                      <button onclick="oansistasManager.decrementBonus('${oan.id}', '${act.id}')" 
                              class="w-6 h-6 rounded-md bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-black text-xs flex items-center justify-center border border-slate-200 shadow-2xs transition active:scale-95" 
                              title="Diminuir 1">
                        -
                      </button>
                      <span class="w-6 text-center text-xs font-black text-slate-800 dark:text-white">
                        ${count}
                      </span>
                      <button onclick="oansistasManager.incrementBonus('${oan.id}', '${act.id}')" 
                              class="w-6 h-6 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-black text-xs flex items-center justify-center shadow-2xs transition active:scale-95" 
                              title="Adicionar 1">
                        +
                      </button>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

        </div>

        <!-- Rodapé do Card: Ações (Editar, Imprimir Ficha, Excluir) -->
        <div class="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex items-center space-x-1 flex-wrap gap-1">
            <button onclick="oansistasManager.printFicha('${oan.id}')" class="px-2.5 py-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              <span>Imprimir</span>
            </button>
            <button onclick="oansistasManager.openEditModal('${oan.id}')" class="px-2.5 py-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              <span>Editar</span>
            </button>
            <button onclick="oansistasManager.closeFicha()" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-black transition flex items-center gap-1 border border-rose-200 dark:border-rose-800/60 ml-0.5" title="Fechar visualização desta ficha">
              <svg class="w-3.5 h-3.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              <span>Fechar Ficha</span>
            </button>
          </div>

          <button onclick="oansistasManager.deleteOansista('${oan.id}')" class="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition" title="Excluir Oansista">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>

      </div>
    `;
  }

  switchSemesterTab(semKey) {
    this.currentSemesterTab = semKey;
    this.renderOansistasList();
  }

  /**
   * Renderiza cada item do Accordion de seções
   */
  renderSectionAccordionItem(oan, cat) {
    const activeCat = this.activeAccordion[oan.id];
    const isOpen = activeCat === cat.id;
    const completedNumbers = (oan.sections && oan.sections[cat.id]) || [];
    const countCompleted = completedNumbers.length;

    let buttonsHtml = "";
    if (cat.items) {
      // PI Ursinho (A, B)
      const manualKey = oan.manual || (oan.club === "ursinho" ? "ursinho_amor" : `${oan.club}_default`);
      buttonsHtml = cat.items.map(it => {
        const isDone = completedNumbers.includes(it.num);
        const sectionKey = `${cat.id}_${it.num}`;
        const val = getSectionTalentValue(manualKey, sectionKey);
        return `
          <button onclick="oansistasManager.toggleSectionNumber('${oan.id}', '${cat.id}', ${it.num})" class="px-3 py-1.5 text-xs font-bold rounded-xl border transition flex items-center justify-between gap-2 ${
            isDone 
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-emerald-500'
          }">
            <span>${it.label}</span>
            <span class="text-[10px] opacity-90 font-mono">+${val}T$</span>
          </button>
        `;
      }).join("");
    } else {
      const max = cat.max || 17;
      const manualKey = oan.manual || (oan.club === "ursinho" ? "ursinho_amor" : `${oan.club}_default`);

      buttonsHtml = Array.from({ length: max }, (_, idx) => idx + 1).map(num => {
        const isDone = completedNumbers.includes(num);
        const sectionKey = `${cat.id}_${num}`;
        const val = getSectionTalentValue(manualKey, sectionKey);

        return `
          <button onclick="oansistasManager.toggleSectionNumber('${oan.id}', '${cat.id}', ${num})" class="w-8 h-8 sm:w-9 sm:h-9 text-xs font-black rounded-xl border transition flex flex-col items-center justify-center leading-none ${
            isDone 
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs scale-105 ring-2 ring-emerald-300 dark:ring-emerald-900' 
              : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-emerald-400'
          }" title="Seção ${num} (+${val} T$)">
            <span>${num}</span>
            <span class="text-[8px] opacity-80 font-normal leading-tight">${val > 0 ? `+${val}` : ''}</span>
          </button>
        `;
      }).join("");
    }

    return `
      <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800/80">
        <button onclick="oansistasManager.toggleAccordion('${oan.id}', '${cat.id}')" class="w-full px-3 py-2 text-left flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
          <div class="flex items-center space-x-2">
            <span class="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-black text-slate-600 dark:text-slate-300">
              ${cat.short || 'S'}
            </span>
            <span>${cat.label}</span>
            ${countCompleted > 0 ? `
              <span class="text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded-full">
                ${countCompleted} falada(s)
              </span>
            ` : ''}
          </div>
          <svg class="w-4 h-4 text-slate-400 transition transform ${isOpen ? 'rotate-180 text-emerald-600' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>

        <div class="${isOpen ? 'block' : 'hidden'} p-3 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-700">
          <p class="text-[10px] text-slate-500 mb-2">Clique no número para marcar como falado (soma imediata aos talentos):</p>
          <div class="flex flex-wrap gap-1.5">
            ${buttonsHtml}
          </div>
        </div>
      </div>
    `;
  }

  toggleAccordion(oanId, catId) {
    if (this.activeAccordion[oanId] === catId) {
      delete this.activeAccordion[oanId];
    } else {
      this.activeAccordion[oanId] = catId;
    }
    this.renderOansistasList();
  }

  toggleSectionNumber(oanId, catId, num) {
    const oan = this.oansistas.find(o => o.id === oanId);
    if (!oan) return;

    if (!oan.sections) oan.sections = {};
    if (!oan.sections[catId]) oan.sections[catId] = [];

    const idx = oan.sections[catId].indexOf(num);
    if (idx > -1) {
      oan.sections[catId].splice(idx, 1);
    } else {
      oan.sections[catId].push(num);
      oan.sections[catId].sort((a, b) => a - b);
    }

    this.saveOansistas();
    this.renderOansistasList();
  }

  updateManual(oanId, newManualKey) {
    const oan = this.oansistas.find(o => o.id === oanId);
    if (!oan) return;
    oan.manual = newManualKey;
    this.saveOansistas();
    this.renderOansistasList();
  }

  updateOanYear(oanId, newYear) {
    const oan = this.oansistas.find(o => o.id === oanId);
    if (!oan) return;
    oan.year = parseInt(newYear) || 2027;
    this.saveOansistas();
    this.renderOansistasList();
  }

  incrementBonus(oanId, bonusKey) {
    const oan = this.oansistas.find(o => o.id === oanId);
    if (!oan) return;

    if (!oan.bonusActivities) oan.bonusActivities = {};
    oan.bonusActivities[bonusKey] = (oan.bonusActivities[bonusKey] || 0) + 1;

    this.saveOansistas();
    this.renderOansistasList();
  }

  decrementBonus(oanId, bonusKey) {
    const oan = this.oansistas.find(o => o.id === oanId);
    if (!oan) return;

    if (!oan.bonusActivities) oan.bonusActivities = {};
    const current = oan.bonusActivities[bonusKey] || 0;
    if (current > 0) {
      oan.bonusActivities[bonusKey] = current - 1;
      this.saveOansistas();
      this.renderOansistasList();
    }
  }

  handleTypeChange(val) {
    const roleGroup = document.getElementById("formOanRoleGroup");
    if (roleGroup) {
      if (val === "lider") {
        roleGroup.classList.remove("hidden");
      } else {
        roleGroup.classList.add("hidden");
      }
    }
  }

  openNewOansistaModal(clubId = null, defaultType = "oansista") {
    const modal = document.getElementById("oansistaFormModal");
    if (!modal) return;

    const isLider = defaultType === "lider";
    const modalTitle = document.getElementById("oansistaModalTitle");
    if (modalTitle) modalTitle.textContent = "Nova Ficha";
    
    document.getElementById("formOansistaId").value = "";
    document.getElementById("formOanName").value = "";
    document.getElementById("formOanAge").value = isLider ? "30" : "";
    document.getElementById("formOanBirth").value = "";
    document.getElementById("formOanAddress").value = "";
    document.getElementById("formOanPhone").value = "";
    document.getElementById("formOanLiving").value = isLider ? "Cônjuge" : "Os pais";
    document.getElementById("formOanNotes").value = "";

    const typeSelect = document.getElementById("formOanType");
    if (typeSelect) {
      typeSelect.value = defaultType;
      this.handleTypeChange(defaultType);
    }
    const roleInput = document.getElementById("formOanRole");
    if (roleInput) roleInput.value = isLider ? "Líder de Clube" : "";

    const yearInput = document.getElementById("formOanYear");
    if (yearInput) yearInput.value = "2027";

    const clubSelect = document.getElementById("formOanClub");
    if (clubSelect) {
      clubSelect.value = clubId || this.currentClub || "flama";
      if (this.currentClub !== "todos" && !this.isMasterAdmin) {
        clubSelect.value = this.currentClub;
      }
    }

    modal.classList.remove("hidden");
  }

  openEditModal(oanId) {
    const oan = this.oansistas.find(o => o.id === oanId);
    if (!oan) return;

    const modal = document.getElementById("oansistaFormModal");
    if (!modal) return;

    const isLider = oan.type === "lider";
    const modalTitle = document.getElementById("oansistaModalTitle");
    if (modalTitle) modalTitle.textContent = isLider ? "Editar Ficha de Líder" : "Editar Cadastro do Oansista";

    document.getElementById("formOansistaId").value = oan.id;
    document.getElementById("formOanName").value = oan.name;
    document.getElementById("formOanAge").value = oan.age;
    document.getElementById("formOanBirth").value = oan.birthDate || "";
    document.getElementById("formOanAddress").value = oan.address || "";
    document.getElementById("formOanPhone").value = oan.phone || "";
    document.getElementById("formOanLiving").value = oan.livingWith || (isLider ? "Cônjuge" : "Os pais");
    document.getElementById("formOanNotes").value = oan.notes || "";

    const typeSelect = document.getElementById("formOanType");
    if (typeSelect) {
      typeSelect.value = oan.type || "oansista";
      this.handleTypeChange(typeSelect.value);
    }
    const roleInput = document.getElementById("formOanRole");
    if (roleInput) roleInput.value = oan.role || "";

    const yearInput = document.getElementById("formOanYear");
    if (yearInput) yearInput.value = (oan.year || 2027).toString();

    const clubSelect = document.getElementById("formOanClub");
    if (clubSelect) clubSelect.value = oan.club;

    modal.classList.remove("hidden");
  }

  saveOansistaFromModal() {
    const id = document.getElementById("formOansistaId").value;
    const name = document.getElementById("formOanName").value.trim();
    const age = parseInt(document.getElementById("formOanAge").value);
    const birthDate = document.getElementById("formOanBirth").value;
    const address = document.getElementById("formOanAddress").value.trim();
    const phone = document.getElementById("formOanPhone").value.trim();
    const livingWith = document.getElementById("formOanLiving").value;
    const club = document.getElementById("formOanClub").value;
    const notes = document.getElementById("formOanNotes").value.trim();
    const year = parseInt(document.getElementById("formOanYear")?.value) || 2027;
    const type = document.getElementById("formOanType")?.value || "oansista";
    const role = document.getElementById("formOanRole")?.value.trim() || (type === "lider" ? "Líder de Clube" : "");

    if (!name) {
      alert("O nome é obrigatório.");
      return;
    }
    if (isNaN(age) || age < 1) {
      alert("A idade é obrigatória.");
      return;
    }

    if (id) {
      // Editar existente
      const oan = this.oansistas.find(o => o.id === id);
      if (oan) {
        oan.name = name;
        oan.age = age;
        oan.birthDate = birthDate;
        oan.address = address;
        oan.phone = phone;
        oan.livingWith = livingWith;
        oan.club = club;
        oan.notes = notes;
        oan.year = year;
        oan.type = type;
        oan.role = role;
        this.selectedOansistaId = id;
      }
    } else {
      // Criar novo
      const prefix = type === "lider" ? "lid-" : "oan-";
      const newId = prefix + Date.now();
      const newOan = {
        id: newId,
        type: type,
        role: role,
        year: year,
        club: club,
        manual: `${club}_default`,
        name: name,
        age: age,
        birthDate: birthDate,
        address: address,
        phone: phone,
        livingWith: livingWith,
        attendance: {},
        sections: {
          pi: [], grau: [], e1: [], e2: [], e3: [], e4: [], t1: [], t2: [], t3: [], t4: []
        },
        bonusActivities: {},
        customTalentosBonus: 0,
        notes: notes
      };
      this.oansistas.unshift(newOan);
      this.selectedOansistaId = newId;
    }

    this.saveOansistas();
    document.getElementById("oansistaFormModal")?.classList.add("hidden");
    this.renderOansistasList();
  }

  deleteOansista(id) {
    if (!confirm("Tem certeza que deseja remover este oansista?")) return;
    this.oansistas = this.oansistas.filter(o => o.id !== id);
    if (this.selectedOansistaId === id) {
      this.selectedOansistaId = null;
    }
    this.saveOansistas();
    this.renderOansistasList();
  }

  printFicha(id) {
    const oan = this.oansistas.find(o => o.id === id);
    if (!oan) return;
    const club = CLUBS_DATA[oan.club] || CLUBS_DATA.ursinho;
    const totalTalentos = this.calculateTotalTalentos(oan);

    const win = window.open("", "_blank");
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ficha OANSE - ${oan.name}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 25px; color: #1e293b; line-height: 1.5; }
          .header { border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-size: 20px; font-weight: bold; color: #0f172a; }
          .subtitle { font-size: 13px; color: #64748b; }
          .badge { background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 13px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
          .field { background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 8px; }
          .field-label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: bold; }
          .field-value { font-size: 14px; font-weight: bold; color: #1e293b; }
          .talentos-box { background: #fef3c7; border: 2px solid #f59e0b; padding: 12px; border-radius: 12px; margin-bottom: 15px; text-align: center; }
          .talentos-val { font-size: 28px; font-weight: 900; color: #92400e; }
          .footer { margin-top: 30px; border-top: 1px dashed #cbd5e1; padding-top: 15px; font-size: 11px; text-align: center; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">Igreja Batista Regular Maanaim</div>
            <div class="subtitle">Ministério OANSE • Ficha Oficial do Oansista (Ano ${oan.year || 2027})</div>
          </div>
          <div class="badge">${club.fullName} • Ano ${oan.year || 2027}</div>
        </div>

        <div class="talentos-box">
          <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #b45309;">Saldo Total de Talentos</div>
          <div class="talentos-val">T$ ${totalTalentos}</div>
        </div>

        <div class="grid">
          <div class="field"><div class="field-label">Nome Completo</div><div class="field-value">${oan.name}</div></div>
          <div class="field"><div class="field-label">Idade / Ano OANSE</div><div class="field-value">${oan.age} anos • Ano ${oan.year || 2027}</div></div>
          <div class="field"><div class="field-label">Data de Nascimento</div><div class="field-value">${oan.birthDate || 'N/A'}</div></div>
          <div class="field"><div class="field-label">Telefone / Contato</div><div class="field-value">${oan.phone || 'N/A'}</div></div>
          <div class="field" style="grid-column: span 2;"><div class="field-label">Endereço</div><div class="field-value">${oan.address || 'N/A'}</div></div>
          <div class="field" style="grid-column: span 2;"><div class="field-label">Mora com os pais</div><div class="field-value">${oan.livingWith || 'Os pais'}</div></div>
        </div>

        <div class="footer">
          "Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar" - 2 Timóteo 2:15
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `);
    win.document.close();
  }

  formatDate(dateStr) {
    if (!dateStr) return "";
    const p = dateStr.split("-");
    if (p.length === 3) return `${p[2]}/${p[1]}/${p[0]}`;
    return dateStr;
  }

  formatDateShort(dateStr) {
    if (!dateStr) return "";
    const p = dateStr.split("-");
    if (p.length === 3) return `${p[2]}/${p[1]}`;
    return dateStr;
  }

  attachAuthListeners() {
    // Ação de Login
    document.getElementById("btnLeaderLogin")?.addEventListener("click", () => {
      const input = document.getElementById("leaderPasswordInput");
      const err = document.getElementById("leaderLoginError");
      if (!input) return;

      const res = this.authenticate(input.value);
      if (!res.success) {
        if (err) {
          err.textContent = res.message;
          err.classList.remove("hidden");
        }
      } else {
        if (err) err.classList.add("hidden");
        input.value = "";
      }
    });

    // Enter para submeter formulário de login
    document.getElementById("leaderPasswordInput")?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        document.getElementById("btnLeaderLogin")?.click();
      }
    });

    // Limpar mensagem de erro ao digitar
    document.getElementById("leaderPasswordInput")?.addEventListener("input", () => {
      const err = document.getElementById("leaderLoginError");
      if (err) err.classList.add("hidden");
    });

    // Toggle para visualizar/ocultar senha no mobile/desktop
    document.getElementById("btnToggleLeaderPassword")?.addEventListener("click", () => {
      const input = document.getElementById("leaderPasswordInput");
      const eyeOpen = document.getElementById("eyeIconOpen");
      const eyeClosed = document.getElementById("eyeIconClosed");
      if (!input) return;
      if (input.type === "password") {
        input.type = "text";
        eyeOpen?.classList.add("hidden");
        eyeClosed?.classList.remove("hidden");
      } else {
        input.type = "password";
        eyeOpen?.classList.remove("hidden");
        eyeClosed?.classList.add("hidden");
      }
    });

    document.getElementById("searchOansistaInput")?.addEventListener("input", () => {
      this.renderOansistasList();
    });

    document.getElementById("filterYearSelect")?.addEventListener("change", (e) => {
      this.currentYearFilter = e.target.value;
      this.renderOansistasList();
    });

    document.getElementById("filterMemberTypeSelect")?.addEventListener("change", (e) => {
      this.currentMemberTypeFilter = e.target.value;
      this.renderOansistasList();
    });

    document.getElementById("btnSaveOansista")?.addEventListener("click", () => {
      this.saveOansistaFromModal();
    });
  }
}

// Instância global
let oansistasManager;
window.addEventListener("DOMContentLoaded", () => {
  oansistasManager = new OansistasManager();
  window.oansistasManager = oansistasManager;
});
