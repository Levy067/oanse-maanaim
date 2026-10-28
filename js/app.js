// Controlador Principal da Aplicação OANSE Maanaim

class OanseApp {
  constructor() {
    this.currentTab = "tab-inicio";
    this.currentClubView = null;
    this.init();
  }

  init() {
    this.setupTabs();
    this.renderClubsBar();
    this.setupModals();
    this.setupClubDetailView();
    this.setupUniformModal();
    this.handleInitialHash();
    window.addEventListener("hashchange", () => this.handleHashChange());
  }

  handleInitialHash() {
    if (window.location.hash) {
      this.handleHash(window.location.hash);
    }
  }

  handleHashChange() {
    if (window.location.hash) {
      this.handleHash(window.location.hash);
    }
  }

  handleHash(hash) {
    const clean = hash.replace("#", "");
    if (clean.startsWith("clube-")) {
      const clubId = clean.replace("clube-", "");
      this.switchTab("tab-inicio");
      this.openClubDetail(clubId);
    } else if (clean.startsWith("manuals-")) {
      const clubId = clean.replace("manuals-", "");
      this.switchTab("tab-inicio");
      this.openClubDetail(clubId);
      this.openManualsModal(clubId);
    } else if (clean.startsWith("faixa-") || clean.startsWith("sash-")) {
      const clubId = clean.replace("faixa-", "").replace("sash-", "");
      this.switchTab("tab-inicio");
      this.openClubDetail(clubId);
      this.openSashModal(clubId);
    } else if (clean.startsWith("farda-")) {
      const clubId = clean.replace("farda-", "");
      this.switchTab("tab-inicio");
      this.openClubDetail(clubId);
      this.openUniformModal(clubId);
    } else if (clean === "tab-lideres" || clean === "tab-calendario" || clean === "tab-inicio") {
      this.switchTab(clean);
    }
  }

  setupTabs() {
    const tabButtons = document.querySelectorAll("[data-tab-target]");
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-tab-target");
        this.switchTab(targetId);
      });
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Atualizar hash na URL se não for visualização de clube
    if (!this.currentClubView) {
      history.replaceState(null, null, "#" + tabId);
    }

    // Se estivermos vendo o detalhe de um clube e mudar de aba, voltar para a listagem
    if (tabId !== "tab-inicio") {
      this.closeClubDetail();
    }

    // Esconder todas as abas
    document.querySelectorAll(".tab-content").forEach(el => {
      el.classList.add("hidden");
    });

    // Mostrar aba ativa
    const activeEl = document.getElementById(tabId);
    if (activeEl) {
      activeEl.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Atualizar estilo visual da barra inferior
    document.querySelectorAll("[data-tab-target]").forEach(btn => {
      const target = btn.getAttribute("data-tab-target");
      const icon = btn.querySelector(".tab-icon");
      const label = btn.querySelector(".tab-label");

      if (target === tabId) {
        btn.classList.add("text-blue-600", "dark:text-blue-400");
        btn.classList.remove("text-slate-500", "dark:text-slate-400");
        if (icon) icon.classList.add("scale-110");
        if (label) label.classList.add("font-black");
      } else {
        btn.classList.remove("text-blue-600", "dark:text-blue-400");
        btn.classList.add("text-slate-500", "dark:text-slate-400");
        if (icon) icon.classList.remove("scale-110");
        if (label) label.classList.remove("font-black");
      }
    });

    // Se for a aba de líderes, re-renderizar
    if (tabId === "tab-lideres" && window.oansistasManager) {
      oansistasManager.checkSession();
    }

    // Se for o calendário, atualizar visualização
    if (tabId === "tab-calendario" && window.oanseCalendar) {
      oanseCalendar.updateView();
    }
  }

  renderClubsBar() {
    const bar = document.getElementById("clubsNavBarList");
    if (!bar) return;

    const clubs = Object.values(CLUBS_DATA);

    bar.innerHTML = clubs.map(club => `
      <div onclick="oanseApp.openClubDetail('${club.id}')" 
           onmouseenter="this.style.borderColor = '${club.borderColor}'; this.style.boxShadow = '0 12px 24px -6px ${club.borderColor}40'"
           onmouseleave="this.style.borderColor = ''; this.style.boxShadow = ''"
           class="group flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700/80 hover:shadow-xl transition-all duration-300 cursor-pointer text-center relative overflow-hidden transform hover:-translate-y-1">
        
        <!-- Faixa colorida no topo -->
        <div class="absolute top-0 left-0 right-0 h-1.5" style="background-color: ${club.borderColor}"></div>

        <!-- Logo / Badge do Clube com a imagem oficial -->
        <div class="w-16 h-16 sm:w-20 sm:h-20 mb-2 relative flex items-center justify-center p-1 rounded-2xl bg-slate-50 dark:bg-slate-700/50 group-hover:scale-105 transition-transform duration-300">
          <img src="${club.badge}" alt="${club.name}" class="w-full h-full object-contain filter drop-shadow-sm">
        </div>

        <h4 class="text-sm sm:text-base font-black text-slate-800 dark:text-white transition-colors" style="color: ${club.id === 'jv' ? '#09090b' : ''}">
          ${club.name}
        </h4>
        <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
          ${club.age}
        </span>
        <p class="text-[10px] text-slate-600 dark:text-slate-300 italic mt-1 font-semibold line-clamp-2 px-1">
          Lema: "${club.motto.replace(/^"|"$/g, '')}"
        </p>

        <div class="mt-2 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full" 
             style="background-color: ${club.colorLight}; color: ${club.colorDark};">
          Ver Detalhes →
        </div>
      </div>
    `).join("");
  }

  openClubDetail(clubId) {
    const club = CLUBS_DATA[clubId];
    if (!club) return;

    this.currentClubView = clubId;
    history.replaceState(null, null, "#clube-" + clubId);

    // Preencher dados na página detalhada do clube
    document.getElementById("detailClubName").textContent = club.fullName;
    document.getElementById("detailClubAge").textContent = club.age;
    document.getElementById("detailClubBadge").src = club.badge;
    document.getElementById("detailClubMotto").textContent = `Lema: "${club.motto.replace(/^"|"$/g, '')}"`;
    document.getElementById("detailClubVerse").textContent = club.verse;
    document.getElementById("detailClubDesc").textContent = club.description;

    // Cor do cabeçalho
    const headerBanner = document.getElementById("detailClubBanner");
    if (headerBanner) {
      headerBanner.style.background = `linear-gradient(135deg, ${club.colorDark}, ${club.color})`;
    }

    // Logo do clube de fundo minimamente transparente (banner e página)
    const bannerBgLogo = document.getElementById("detailClubBannerBgLogo");
    if (bannerBgLogo) {
      bannerBgLogo.src = (clubId === "vq7") ? "assets/img/vq7-white.png" : club.badge;
    }

    const pageBgLogo = document.getElementById("detailClubPageBgWatermark");
    if (pageBgLogo) {
      pageBgLogo.src = (clubId === "vq7") ? "assets/img/vq7-white.png" : club.badge;
    }

    // Manuais
    const manualsSummaryEl = document.getElementById("detailClubManualsSummary");
    if (manualsSummaryEl) {
      manualsSummaryEl.textContent = club.manuals.map(m => m.name).join(" • ");
    }

    // Farda / Uniforme
    document.getElementById("detailClubUniformTitle").textContent = club.uniform.title;
    document.getElementById("detailClubUniformDetails").textContent = club.uniform.details;
    document.getElementById("detailClubUniformInstructions").textContent = club.uniform.instructions;

    // Faixa do Clube
    document.getElementById("detailClubSashTitle").textContent = club.sash.title;
    document.getElementById("detailClubSashDetails").textContent = club.sash.details;

    // Mostrar visão de detalhe e esconder tela inicial de clubes
    document.getElementById("inicioMainView")?.classList.add("hidden");
    document.getElementById("clubDetailView")?.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  closeClubDetail() {
    this.currentClubView = null;
    history.replaceState(null, null, "#tab-inicio");
    document.getElementById("clubDetailView")?.classList.add("hidden");
    document.getElementById("inicioMainView")?.classList.remove("hidden");
  }

  setupClubDetailView() {
    document.getElementById("btnBackFromClubDetail")?.addEventListener("click", () => {
      this.closeClubDetail();
    });

    document.getElementById("btnGoToLeaderFromDetail")?.addEventListener("click", () => {
      if (this.currentClubView && window.oansistasManager) {
        this.closeClubDetail();
        this.switchTab("tab-lideres");
      }
    });

    document.getElementById("btnOpenUniformModal")?.addEventListener("click", () => {
      this.openUniformModal(this.currentClubView);
    });

    document.getElementById("btnOpenManualsModal")?.addEventListener("click", () => {
      this.openManualsModal(this.currentClubView);
    });

    document.getElementById("btnOpenSashModal")?.addEventListener("click", () => {
      this.openSashModal(this.currentClubView);
    });
  }

  openUniformModal(clubId = null) {
    const id = clubId || this.currentClubView || "flama";
    const club = CLUBS_DATA[id];
    if (!club) return;

    const modal = document.getElementById("uniformModal");
    const title = document.getElementById("uniformModalTitle");
    const imageContainer = document.getElementById("uniformImageContainer");
    const detailsContainer = document.getElementById("uniformModalDetails");

    if (title) title.textContent = `Farda Oficial (Frente e Verso) • ${club.fullName}`;

    if (imageContainer) {
      const mockupSrc = club.uniformMockup || `assets/img/farda-${id}.png`;
      imageContainer.innerHTML = `
        <div class="bg-white dark:bg-slate-900 p-3 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center">
          <img src="${mockupSrc}" alt="Farda ${club.name}" class="w-full max-h-[460px] object-contain rounded-2xl">
          <div class="mt-3 text-center">
            <span class="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
              ${club.fullName} • Visão Oficial Frente e Verso
            </span>
          </div>
        </div>
      `;
    }

    if (detailsContainer) {
      detailsContainer.innerHTML = `
        <div class="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <p><strong class="text-slate-800 dark:text-white">Descrição do Uniforme:</strong> ${club.uniform.details}</p>
          <p><strong class="text-slate-800 dark:text-white">Instruções de Uso:</strong> ${club.uniform.instructions}</p>
          <p><strong class="text-slate-800 dark:text-white">Condecorações e Faixa:</strong> ${club.sash.details}</p>
        </div>
      `;
    }

    modal?.classList.remove("hidden");
  }

  openManualsModal(clubId = null) {
    const id = clubId || this.currentClubView || "flama";
    const club = CLUBS_DATA[id];
    if (!club) return;

    const modal = document.getElementById("manualsModal");
    const title = document.getElementById("manualsModalTitle");
    const listContainer = document.getElementById("manualsModalList");

    if (title) title.textContent = `Manuais do Clube • ${club.fullName}`;

    if (listContainer) {
      listContainer.innerHTML = `
        <div class="bg-slate-50 dark:bg-slate-900/60 p-8 sm:p-12 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center flex flex-col items-center justify-center my-3">
          <div class="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-500 dark:text-blue-400 flex items-center justify-center mb-4 shadow-xs">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <h4 class="text-xl font-black text-slate-800 dark:text-white mb-2">Sem dados para exibir</h4>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            As informações e conteúdos dos manuais do ${club.fullName} serão disponibilizados futuramente.
          </p>
          <div class="mt-4 px-3.5 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300">
            Aguardando material dos manuais
          </div>
        </div>
      `;
    }

    modal?.classList.remove("hidden");
  }

  openSashModal(clubId = null) {
    const id = clubId || this.currentClubView || "flama";
    const club = CLUBS_DATA[id];
    if (!club) return;

    const modal = document.getElementById("sashModal");
    const title = document.getElementById("sashModalTitle");
    const imageContainer = document.getElementById("sashModalImageContainer");
    const detailsContainer = document.getElementById("sashModalDetails");

    if (title) title.textContent = `Faixa do Clube • ${club.fullName}`;

    if (imageContainer) {
      imageContainer.innerHTML = `
        <div class="bg-slate-50 dark:bg-slate-900/60 p-8 sm:p-12 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center flex flex-col items-center justify-center my-3">
          <div class="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 dark:text-amber-400 flex items-center justify-center mb-4 shadow-xs">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
          </div>
          <h4 class="text-xl font-black text-slate-800 dark:text-white mb-2">Sem conteúdo para exibir</h4>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            As informações e diretrizes da faixa do ${club.fullName} serão adicionadas futuramente.
          </p>
          <div class="mt-4 px-3.5 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300">
            Aguardando publicação do material oficial
          </div>
        </div>
      `;
    }

    if (detailsContainer) {
      detailsContainer.innerHTML = "";
    }

    modal?.classList.remove("hidden");
  }

  getSashData(id, club) {
    const dataMap = {
      ursinho: {
        name: "Colete Oficial e Condecorações Ursinho",
        instructions: "Os pequeninos do Clube Ursinho utilizam os distintivos de pegada e condecorações costurados no colete oficial. Cada seção de versículo decorada e cada 'Abraço do Ursinho' concluído rende uma pegada de honra.",
        badges: [
          { name: "Emblema Oficial Ursinho", type: "Identificação", desc: "Patch oficial do Clube Ursinho no peito esquerdo com acabamento bordado.", colorClass: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300" },
          { name: "Pegadas de Memorização", type: "Manuais Amor & Alegria", desc: "Distintivos em formato de pegada dourada por cada seção bíblica concluída.", colorClass: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
          { name: "Abraço do Ursinho", type: "Mérito Inicial", desc: "Condecoração especial pela conclusão das lições introdutórias do clube.", colorClass: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300" },
          { name: "Estrela de Fidelidade", type: "Frequência Sábados", desc: "Condecoração de perseverança e presença ativa nos encontros semanais.", colorClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" }
        ],
        svg: `
          <svg viewBox="0 0 540 260" class="w-full max-h-[300px] rounded-2xl drop-shadow-md bg-gradient-to-br from-red-900 via-red-800 to-blue-900 p-2">
            <defs>
              <filter id="shadow-u" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.4"/>
              </filter>
              <linearGradient id="gold-grad-u" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FDE68A" />
                <stop offset="50%" stop-color="#F59E0B" />
                <stop offset="100%" stop-color="#B45309" />
              </linearGradient>
            </defs>
            <rect x="20" y="20" width="500" height="220" rx="24" fill="#1E3A8A" stroke="#DC2626" stroke-width="6" filter="url(#shadow-u)" />
            <rect x="28" y="28" width="484" height="204" rx="18" fill="none" stroke="#FDE68A" stroke-width="2" stroke-dasharray="8 6" />
            <g transform="translate(45, 45)" filter="url(#shadow-u)">
              <circle cx="65" cy="65" r="58" fill="#FFFFFF" stroke="url(#gold-grad-u)" stroke-width="5" />
              <image href="assets/img/ursinho.png" x="15" y="15" width="100" height="100" />
              <circle cx="65" cy="65" r="58" fill="none" stroke="#DC2626" stroke-width="2" />
            </g>
            <text x="180" y="65" font-family="'Arial Black', sans-serif" font-weight="900" font-size="14.5" fill="#FFFFFF">FAIXA DE CONDECORAÇÕES URSINHO</text>
            <text x="180" y="88" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="11" fill="#FDE68A">Lema: "Jesus me ama!" • 1 João 4:10</text>
            <line x1="180" y1="98" x2="500" y2="98" stroke="#DC2626" stroke-width="2" />
            <g transform="translate(180, 118)">
              <g transform="translate(0, 0)">
                <ellipse cx="20" cy="35" rx="14" ry="18" fill="url(#gold-grad-u)" />
                <circle cx="10" cy="12" r="5" fill="url(#gold-grad-u)" />
                <circle cx="20" cy="8" r="5" fill="url(#gold-grad-u)" />
                <circle cx="30" cy="12" r="5" fill="url(#gold-grad-u)" />
                <text x="20" y="70" text-anchor="middle" font-size="9" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#FFFFFF">Amor 1</text>
              </g>
              <g transform="translate(65, 0)">
                <ellipse cx="20" cy="35" rx="14" ry="18" fill="url(#gold-grad-u)" />
                <circle cx="10" cy="12" r="5" fill="url(#gold-grad-u)" />
                <circle cx="20" cy="8" r="5" fill="url(#gold-grad-u)" />
                <circle cx="30" cy="12" r="5" fill="url(#gold-grad-u)" />
                <text x="20" y="70" text-anchor="middle" font-size="9" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#FFFFFF">Amor 2</text>
              </g>
              <g transform="translate(130, 0)">
                <ellipse cx="20" cy="35" rx="14" ry="18" fill="url(#gold-grad-u)" />
                <circle cx="10" cy="12" r="5" fill="url(#gold-grad-u)" />
                <circle cx="20" cy="8" r="5" fill="url(#gold-grad-u)" />
                <circle cx="30" cy="12" r="5" fill="url(#gold-grad-u)" />
                <text x="20" y="70" text-anchor="middle" font-size="9" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#FFFFFF">Alegria 1</text>
              </g>
              <g transform="translate(195, 0)">
                <ellipse cx="20" cy="35" rx="14" ry="18" fill="url(#gold-grad-u)" />
                <circle cx="10" cy="12" r="5" fill="url(#gold-grad-u)" />
                <circle cx="20" cy="8" r="5" fill="url(#gold-grad-u)" />
                <circle cx="30" cy="12" r="5" fill="url(#gold-grad-u)" />
                <text x="20" y="70" text-anchor="middle" font-size="9" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#FFFFFF">Alegria 2</text>
              </g>
              <g transform="translate(255, 0)">
                <rect x="0" y="10" width="55" height="42" rx="8" fill="#DC2626" stroke="url(#gold-grad-u)" stroke-width="2" />
                <text x="27" y="28" text-anchor="middle" font-size="8" font-family="'Arial Black', sans-serif" font-weight="900" fill="#FFFFFF">ABRAÇO</text>
                <text x="27" y="42" text-anchor="middle" font-size="8" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#FDE68A">DO URSO</text>
                <text x="27" y="70" text-anchor="middle" font-size="9" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#FFFFFF">Mérito</text>
              </g>
            </g>
          </svg>
        `
      },
      faisca: {
        name: "Faixa Oficial Faísca (Asas e Coroas)",
        instructions: "Usada sobre o uniforme oficial. Nela são cravadas as joias de memorização (esmeraldas e rubis), as coroas de cada manual (Caminhante, Saltador e Escalador) e as Asas Oficiais do Faísca.",
        badges: [
          { name: "Asas do Faísca", type: "Insígnia de Honra", desc: "Asas douradas recebidas na investidura do clube.", colorClass: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
          { name: "Coroas dos Manuais", type: "Caminhante, Saltador, Escalador", desc: "Coroas metálicas conquistadas ao concluir cada manual bíblico.", colorClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300" },
          { name: "Esmeraldas Verdes", type: "Memorização Bíblica", desc: "Pedras cravadas na faixa pelas seções de versículos falados.", colorClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" },
          { name: "Rubis Vermelhos", type: "Atividades Práticas", desc: "Pedras cravadas pela fidelidade nos estudos e tarefas.", colorClass: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300" }
        ],
        svg: `
          <svg viewBox="0 0 540 260" class="w-full max-h-[300px] rounded-2xl drop-shadow-md bg-gradient-to-br from-amber-600 via-yellow-500 to-red-700 p-2">
            <defs>
              <filter id="shadow-f" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.4"/>
              </filter>
            </defs>
            <rect x="20" y="20" width="500" height="220" rx="24" fill="#991B1B" stroke="#EAB308" stroke-width="6" filter="url(#shadow-f)" />
            <rect x="28" y="28" width="484" height="204" rx="18" fill="#B91C1C" />
            <rect x="28" y="80" width="484" height="40" fill="#FBBF24" opacity="0.25" />
            <g transform="translate(45, 45)" filter="url(#shadow-f)">
              <circle cx="65" cy="65" r="58" fill="#FFFFFF" stroke="#EAB308" stroke-width="5" />
              <image href="assets/img/faisca.png" x="15" y="15" width="100" height="100" />
              <circle cx="65" cy="65" r="58" fill="none" stroke="#DC2626" stroke-width="2" />
            </g>
            <text x="180" y="65" font-family="'Arial Black', sans-serif" font-weight="900" font-size="14.5" fill="#FFFFFF">FAIXA DE CONDECORAÇÕES FAÍSCA</text>
            <text x="180" y="88" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="11" fill="#FEF08A">Lema: "Meu amigo para Cristo!" • João 3:16</text>
            <line x1="180" y1="98" x2="500" y2="98" stroke="#EAB308" stroke-width="2" />
            <g transform="translate(180, 118)">
              <g transform="translate(0, 5)">
                <rect x="0" y="0" width="75" height="35" rx="8" fill="#FEF9C3" stroke="#CA8A04" stroke-width="2" />
                <text x="37" y="17" text-anchor="middle" font-size="14">🪽</text>
                <text x="37" y="30" text-anchor="middle" font-size="9" font-family="'Arial Black', sans-serif" font-weight="bold" fill="#854D0E">ASAS FAÍSCA</text>
              </g>
              <g transform="translate(85, 5)">
                <rect x="0" y="0" width="60" height="35" rx="8" fill="#FEF08A" stroke="#CA8A04" stroke-width="2" />
                <text x="30" y="17" text-anchor="middle" font-size="14">👑</text>
                <text x="30" y="30" text-anchor="middle" font-size="8" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#854D0E">SALTADOR</text>
              </g>
              <g transform="translate(155, 5)">
                <rect x="0" y="0" width="65" height="35" rx="8" fill="#FEF08A" stroke="#CA8A04" stroke-width="2" />
                <text x="32" y="17" text-anchor="middle" font-size="14">👑</text>
                <text x="32" y="30" text-anchor="middle" font-size="8" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#854D0E">CAMINHANTE</text>
              </g>
              <g transform="translate(230, 5)">
                <rect x="0" y="0" width="60" height="35" rx="8" fill="#FEF08A" stroke="#CA8A04" stroke-width="2" />
                <text x="30" y="17" text-anchor="middle" font-size="14">👑</text>
                <text x="30" y="30" text-anchor="middle" font-size="8" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#854D0E">ESCALADOR</text>
              </g>
            </g>
            <g transform="translate(180, 185)">
              <text x="0" y="16" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="11" fill="#FEF08A">Joias Cravadas na Faixa:</text>
              <circle cx="150" cy="12" r="9" fill="#10B981" stroke="#065F46" stroke-width="2" />
              <circle cx="175" cy="12" r="9" fill="#EF4444" stroke="#991B1B" stroke-width="2" />
              <circle cx="200" cy="12" r="9" fill="#10B981" stroke="#065F46" stroke-width="2" />
              <circle cx="225" cy="12" r="9" fill="#EF4444" stroke="#991B1B" stroke-width="2" />
              <circle cx="250" cy="12" r="9" fill="#10B981" stroke="#065F46" stroke-width="2" />
              <circle cx="275" cy="12" r="9" fill="#EF4444" stroke="#991B1B" stroke-width="2" />
            </g>
          </svg>
        `
      },
      flama: {
        name: "Faixa Oficial de Condecorações Flama",
        instructions: "Usada transversalmente do ombro direito ao quadril esquerdo sobre a camiseta verde. Nela são organizados os distintivos de Grau (1 ao 12), as barras azuis de Exercícios Bíblicos (E1 a E4) e as barras amarelas de Atividades (T1 a T4).",
        badges: [
          { name: "Emblema da Chama", type: "Insígnia Superior", desc: "Posicionado no topo da faixa sobre o ombro do oansista.", colorClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" },
          { name: "Divisas de Grau (1 ao 12)", type: "Progressão Anual", desc: "Galões dourados afixados conforme o avanço nos manuais Sabiá e Águia.", colorClass: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
          { name: "Barras E1, E2, E3, E4", type: "Exercícios Bíblicos", desc: "Barras de honra em azul pelos blocos bíblicos memorizados.", colorClass: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300" },
          { name: "Barras T1, T2, T3, T4", type: "Atividades Práticas", desc: "Barras de honra em amarelo pelas atividades dinâmicas e tarefas.", colorClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300" }
        ],
        svg: `
          <svg viewBox="0 0 540 260" class="w-full max-h-[300px] rounded-2xl drop-shadow-md bg-gradient-to-br from-emerald-900 via-green-800 to-teal-950 p-2">
            <defs>
              <filter id="shadow-fl" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.4"/>
              </filter>
            </defs>
            <rect x="20" y="20" width="500" height="220" rx="24" fill="#15803D" stroke="#22C55E" stroke-width="6" filter="url(#shadow-fl)" />
            <rect x="28" y="28" width="484" height="204" rx="18" fill="#166534" />
            <line x1="28" y1="42" x2="512" y2="42" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="10 5" />
            <line x1="28" y1="218" x2="512" y2="218" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="10 5" />
            <g transform="translate(45, 45)" filter="url(#shadow-fl)">
              <circle cx="65" cy="65" r="58" fill="#FFFFFF" stroke="#22C55E" stroke-width="5" />
              <image href="assets/img/flama.png" x="15" y="15" width="100" height="100" />
              <circle cx="65" cy="65" r="58" fill="none" stroke="#15803D" stroke-width="2" />
            </g>
            <text x="180" y="65" font-family="'Arial Black', sans-serif" font-weight="900" font-size="13.5" fill="#FFFFFF">FAIXA OFICIAL DE CONDECORAÇÕES FLAMA</text>
            <text x="180" y="88" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="11" fill="#86EFAC">"O outro menino e menina para Cristo!" • Romanos 4:5</text>
            <line x1="180" y1="98" x2="500" y2="98" stroke="#22C55E" stroke-width="2" />
            <g transform="translate(180, 114)">
              <text x="0" y="15" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="10" fill="#DCFCE7">DIVISAS DE GRAU (1 a 12):</text>
              <g transform="translate(0, 22)">
                <rect x="0" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
                <rect x="22" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
                <rect x="44" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
                <rect x="66" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
                <rect x="88" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
                <rect x="110" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
                <rect x="132" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
                <rect x="154" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
                <rect x="176" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
                <rect x="198" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
                <rect x="220" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
                <rect x="242" y="0" width="18" height="12" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="1" />
              </g>
              <text x="0" y="55" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="10" fill="#DCFCE7">BARRAS BÍBLICAS (E1 a E4) & ATIVIDADES (T1 a T4):</text>
              <g transform="translate(0, 62)">
                <rect x="0" y="0" width="28" height="16" rx="3" fill="#2563EB" stroke="#1D4ED8" stroke-width="1" />
                <text x="14" y="11" text-anchor="middle" font-size="8" font-family="'Arial Black', sans-serif" fill="#FFFFFF">E1</text>
                <rect x="33" y="0" width="28" height="16" rx="3" fill="#2563EB" stroke="#1D4ED8" stroke-width="1" />
                <text x="47" y="11" text-anchor="middle" font-size="8" font-family="'Arial Black', sans-serif" fill="#FFFFFF">E2</text>
                <rect x="66" y="0" width="28" height="16" rx="3" fill="#2563EB" stroke="#1D4ED8" stroke-width="1" />
                <text x="80" y="11" text-anchor="middle" font-size="8" font-family="'Arial Black', sans-serif" fill="#FFFFFF">E3</text>
                <rect x="99" y="0" width="28" height="16" rx="3" fill="#2563EB" stroke="#1D4ED8" stroke-width="1" />
                <text x="113" y="11" text-anchor="middle" font-size="8" font-family="'Arial Black', sans-serif" fill="#FFFFFF">E4</text>
                <rect x="140" y="0" width="28" height="16" rx="3" fill="#EAB308" stroke="#CA8A04" stroke-width="1" />
                <text x="154" y="11" text-anchor="middle" font-size="8" font-family="'Arial Black', sans-serif" fill="#713F12">T1</text>
                <rect x="173" y="0" width="28" height="16" rx="3" fill="#EAB308" stroke="#CA8A04" stroke-width="1" />
                <text x="187" y="11" text-anchor="middle" font-size="8" font-family="'Arial Black', sans-serif" fill="#713F12">T2</text>
                <rect x="206" y="0" width="28" height="16" rx="3" fill="#EAB308" stroke="#CA8A04" stroke-width="1" />
                <text x="220" y="11" text-anchor="middle" font-size="8" font-family="'Arial Black', sans-serif" fill="#713F12">T3</text>
                <rect x="239" y="0" width="28" height="16" rx="3" fill="#EAB308" stroke="#CA8A04" stroke-width="1" />
                <text x="253" y="11" text-anchor="middle" font-size="8" font-family="'Arial Black', sans-serif" fill="#713F12">T4</text>
              </g>
            </g>
          </svg>
        `
      },
      tocha: {
        name: "Faixa Oficial de Condecorações Tocha",
        instructions: "Usada transversalmente sobre a camiseta azul oficial Tocha. Apresenta divisas de Grau, os grandes medalhões metálicos dos manuais Carneiro e Leão, e condecorações especiais de Olimpíadas e Concurso Bíblico.",
        badges: [
          { name: "Emblema da Tocha", type: "Insígnia Superior", desc: "Símbolo da tocha com a chama do Evangelho no topo da faixa.", colorClass: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300" },
          { name: "Medalhão Carneiro", type: "Manual Carneiro", desc: "Medalhão metálico de honra concedido ao finalizar o primeiro manual.", colorClass: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
          { name: "Medalhão Leão", type: "Manual Leão", desc: "Medalhão metálico de honra concedido ao finalizar o segundo manual.", colorClass: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
          { name: "Concurso Bíblico & Olimpíadas", type: "Honra Especial (+10 T$ cada)", desc: "Condecorações de ouro concedidas pelo desempenho excelente nos eventos.", colorClass: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300" }
        ],
        svg: `
          <svg viewBox="0 0 540 260" class="w-full max-h-[300px] rounded-2xl drop-shadow-md bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 p-2">
            <defs>
              <filter id="shadow-t" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.4"/>
              </filter>
            </defs>
            <rect x="20" y="20" width="500" height="220" rx="24" fill="#1E40AF" stroke="#F59E0B" stroke-width="6" filter="url(#shadow-t)" />
            <rect x="28" y="28" width="484" height="204" rx="18" fill="#1D4ED8" />
            <line x1="28" y1="42" x2="512" y2="42" stroke="#FBBF24" stroke-width="3" />
            <line x1="28" y1="218" x2="512" y2="218" stroke="#FBBF24" stroke-width="3" />
            <g transform="translate(45, 45)" filter="url(#shadow-t)">
              <circle cx="65" cy="65" r="58" fill="#FFFFFF" stroke="#F59E0B" stroke-width="5" />
              <image href="assets/img/tocha.png" x="15" y="15" width="100" height="100" />
              <circle cx="65" cy="65" r="58" fill="none" stroke="#1E40AF" stroke-width="2" />
            </g>
            <text x="180" y="65" font-family="'Arial Black', sans-serif" font-weight="900" font-size="13.5" fill="#FFFFFF">FAIXA OFICIAL DE CONDECORAÇÕES TOCHA</text>
            <text x="180" y="88" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="11" fill="#93C5FD">"O outro jovem para Cristo" • Tito 2:11-13</text>
            <line x1="180" y1="98" x2="500" y2="98" stroke="#F59E0B" stroke-width="2" />
            <g transform="translate(180, 118)">
              <g transform="translate(0, 0)">
                <circle cx="28" cy="28" r="24" fill="#FBBF24" stroke="#B45309" stroke-width="3" />
                <text x="28" y="26" text-anchor="middle" font-size="14">🐑</text>
                <text x="28" y="38" text-anchor="middle" font-size="7" font-family="'Arial Black', sans-serif" font-weight="900" fill="#78350F">CARNEIRO</text>
                <text x="28" y="66" text-anchor="middle" font-size="9" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#FFFFFF">Manual 1</text>
              </g>
              <g transform="translate(70, 0)">
                <circle cx="28" cy="28" r="24" fill="#FBBF24" stroke="#B45309" stroke-width="3" />
                <text x="28" y="26" text-anchor="middle" font-size="14">🦁</text>
                <text x="28" y="38" text-anchor="middle" font-size="7" font-family="'Arial Black', sans-serif" font-weight="900" fill="#78350F">LEÃO</text>
                <text x="28" y="66" text-anchor="middle" font-size="9" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#FFFFFF">Manual 2</text>
              </g>
              <g transform="translate(140, 0)">
                <rect x="0" y="6" width="65" height="44" rx="8" fill="#4338CA" stroke="#FBBF24" stroke-width="2" />
                <text x="32" y="26" text-anchor="middle" font-size="13">📖</text>
                <text x="32" y="42" text-anchor="middle" font-size="7.5" font-family="'Arial Black', sans-serif" font-weight="900" fill="#FDE68A">CONCURSO</text>
                <text x="32" y="66" text-anchor="middle" font-size="9" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#67E8F9">+10 T$</text>
              </g>
              <g transform="translate(215, 0)">
                <rect x="0" y="6" width="65" height="44" rx="8" fill="#15803D" stroke="#FBBF24" stroke-width="2" />
                <text x="32" y="26" text-anchor="middle" font-size="13">🏅</text>
                <text x="32" y="42" text-anchor="middle" font-size="7.5" font-family="'Arial Black', sans-serif" font-weight="900" fill="#FDE68A">OLIMPÍADAS</text>
                <text x="32" y="66" text-anchor="middle" font-size="9" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#86EFAC">+10 T$</text>
              </g>
            </g>
          </svg>
        `
      },
      jv: {
        name: "Faixa Esportiva & Insígnias Jovens Vencedores",
        instructions: "Utilizada nas investiduras e eventos oficiais do JV. Contém as divisas de corrida espiritual (Sprint e Maratona), insígnias dos grupos Vem Ver, Vem Seguir e Vem Servir, e a medalha de conclusão ministerial.",
        badges: [
          { name: "Emblema Oficial JV", type: "Identificação", desc: "Logo moderno JV estilizado no peito e faixa.", colorClass: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200" },
          { name: "Divisas Sprint & Maratona", type: "Manuais Bíblicos", desc: "Distintivos de conclusão das etapas de corrida da fé cristã.", colorClass: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
          { name: "Insígnias: Vem Ver, Seguir e Servir", type: "Discipulado", desc: "Pins de lapela representativos de cada fase de maturidade no JV.", colorClass: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300" },
          { name: "Medalhão de Conclusão JV", type: "Graduação", desc: "Grande medalhão concedido aos jovens que completam os 2 anos de JV.", colorClass: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300" }
        ],
        svg: `
          <svg viewBox="0 0 540 260" class="w-full max-h-[300px] rounded-2xl drop-shadow-md bg-gradient-to-br from-slate-950 via-zinc-900 to-neutral-900 p-2">
            <defs>
              <filter id="shadow-jv" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.5"/>
              </filter>
            </defs>
            <rect x="20" y="20" width="500" height="220" rx="24" fill="#18181B" stroke="#71717A" stroke-width="5" filter="url(#shadow-jv)" />
            <rect x="28" y="28" width="484" height="204" rx="18" fill="#09090B" />
            <line x1="28" y1="44" x2="512" y2="44" stroke="#F59E0B" stroke-width="2" />
            <line x1="28" y1="216" x2="512" y2="216" stroke="#F59E0B" stroke-width="2" />
            <g transform="translate(45, 45)" filter="url(#shadow-jv)">
              <circle cx="65" cy="65" r="58" fill="#FFFFFF" stroke="#F59E0B" stroke-width="4" />
              <image href="assets/img/jv.png" x="15" y="15" width="100" height="100" />
              <circle cx="65" cy="65" r="58" fill="none" stroke="#000000" stroke-width="2" />
            </g>
            <text x="180" y="65" font-family="'Arial Black', sans-serif" font-weight="900" font-size="13.5" fill="#FFFFFF">FAIXA & INSÍGNIAS JOVENS VENCEDORES</text>
            <text x="180" y="88" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="11" fill="#FDE047">"Jovens Vencedores para Cristo!" • Hebreus 12:1-2</text>
            <line x1="180" y1="98" x2="500" y2="98" stroke="#71717A" stroke-width="2" />
            <g transform="translate(180, 118)">
              <g transform="translate(0, 0)">
                <rect x="0" y="0" width="80" height="45" rx="8" fill="#27272A" stroke="#38BDF8" stroke-width="2" />
                <text x="40" y="19" text-anchor="middle" font-size="10" font-family="'Arial Black', sans-serif" fill="#38BDF8">VEM VER</text>
                <text x="40" y="34" text-anchor="middle" font-size="8" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#E2E8F0">Sprint</text>
              </g>
              <g transform="translate(90, 0)">
                <rect x="0" y="0" width="85" height="45" rx="8" fill="#27272A" stroke="#34D399" stroke-width="2" />
                <text x="42" y="19" text-anchor="middle" font-size="10" font-family="'Arial Black', sans-serif" fill="#34D399">VEM SEGUIR</text>
                <text x="42" y="34" text-anchor="middle" font-size="8" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#E2E8F0">Maratona</text>
              </g>
              <g transform="translate(185, 0)">
                <rect x="0" y="0" width="85" height="45" rx="8" fill="#27272A" stroke="#FBBF24" stroke-width="2" />
                <text x="42" y="19" text-anchor="middle" font-size="10" font-family="'Arial Black', sans-serif" fill="#FBBF24">VEM SERVIR</text>
                <text x="42" y="34" text-anchor="middle" font-size="8" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#E2E8F0">Ministério</text>
              </g>
            </g>
          </svg>
        `
      },
      vq7: {
        name: "Faixa de Honra & Premiações VQ7",
        instructions: "Usada nas formaturas e encontros ministeriais do VQ7. Destaca a dedicação 24/7, os estudos teológicos das Cartas Paulinas, os projetos de missões e o serviço cristão contínuo.",
        badges: [
          { name: "Emblema 'A MISSÃO VQ7'", type: "Brasão 24/7", desc: "Insígnia central com o compromisso 24 horas por dia nos 7 dias da semana.", colorClass: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300" },
          { name: "Patches Cartas Paulinas", type: "Romanos, Efésios, Gálatas", desc: "Patches bordados de conclusão dos estudos teológicos das cartas paulinas.", colorClass: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300" },
          { name: "Fundamentos da Fé", type: "Doutrina Inicial", desc: "Insígnia de introdução e preparo teológico dos adolescentes.", colorClass: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
          { name: "Serviços & Missões", type: "Ação Prática", desc: "Distintivo concedido por projetos sociais, evangelísticos e missões.", colorClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" }
        ],
        svg: `
          <svg viewBox="0 0 540 260" class="w-full max-h-[300px] rounded-2xl drop-shadow-md bg-gradient-to-br from-slate-950 via-blue-950 to-orange-950 p-2">
            <defs>
              <filter id="shadow-vq" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.5"/>
              </filter>
            </defs>
            <rect x="20" y="20" width="500" height="220" rx="24" fill="#0F2C59" stroke="#EA580C" stroke-width="5" filter="url(#shadow-vq)" />
            <rect x="28" y="28" width="484" height="204" rx="18" fill="#0A1931" />
            <line x1="28" y1="44" x2="512" y2="44" stroke="#F97316" stroke-width="2" />
            <line x1="28" y1="216" x2="512" y2="216" stroke="#F97316" stroke-width="2" />
            <g transform="translate(45, 45)" filter="url(#shadow-vq)">
              <circle cx="65" cy="65" r="58" fill="#FFFFFF" stroke="#EA580C" stroke-width="4" />
              <image href="assets/img/vq7.png" x="15" y="15" width="100" height="100" />
              <circle cx="65" cy="65" r="58" fill="none" stroke="#0F2C59" stroke-width="2" />
            </g>
            <text x="180" y="65" font-family="'Arial Black', sans-serif" font-weight="900" font-size="14" fill="#FFFFFF">FAIXA DE HONRA & PREMIAÇÕES VQ7</text>
            <text x="180" y="88" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="11" fill="#FDBA74">"Viver inteiramente para Jesus 24/7" • Romanos 1:16-17</text>
            <line x1="180" y1="98" x2="500" y2="98" stroke="#EA580C" stroke-width="2" />
            <g transform="translate(180, 118)">
              <g transform="translate(0, 0)">
                <rect x="0" y="0" width="80" height="45" rx="8" fill="#1E293B" stroke="#F97316" stroke-width="1.5" />
                <text x="40" y="19" text-anchor="middle" font-size="9" font-family="'Arial Black', sans-serif" fill="#F97316">FUNDAMENTOS</text>
                <text x="40" y="34" text-anchor="middle" font-size="8" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#CBD5E1">4 Panfletos</text>
              </g>
              <g transform="translate(88, 0)">
                <rect x="0" y="0" width="85" height="45" rx="8" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5" />
                <text x="42" y="19" text-anchor="middle" font-size="9" font-family="'Arial Black', sans-serif" fill="#38BDF8">CARTAS PAULINAS</text>
                <text x="42" y="34" text-anchor="middle" font-size="7.5" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#CBD5E1">Rom • Ef • Gl</text>
              </g>
              <g transform="translate(181, 0)">
                <rect x="0" y="0" width="85" height="45" rx="8" fill="#1E293B" stroke="#10B981" stroke-width="1.5" />
                <text x="42" y="19" text-anchor="middle" font-size="9" font-family="'Arial Black', sans-serif" fill="#10B981">MISSÕES & AÇÃO</text>
                <text x="42" y="34" text-anchor="middle" font-size="8" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#CBD5E1">Serviço Reino</text>
              </g>
            </g>
          </svg>
        `
      }
    };

    return dataMap[id] || dataMap.flama;
  }

  setupUniformModal() {
    // Modal simplificado para exibição direta das fardas oficiais enviadas
  }

  setupModals() {
    // Fechar modais ao clicar no fundo ou no botão X
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          backdrop.classList.add("hidden");
        }
      });
    });

    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.closest(".modal-backdrop")?.classList.add("hidden");
      });
    });
  }
}

// Instância global
let oanseApp;
window.addEventListener("DOMContentLoaded", () => {
  oanseApp = new OanseApp();
  window.oanseApp = oanseApp;
});
