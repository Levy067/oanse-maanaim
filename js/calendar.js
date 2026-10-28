// Gerenciador do Calendário 2027 OANSE - Igreja Batista Regular Maanaim

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const WEEKDAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

class OanseCalendar {
  constructor() {
    this.year = 2027;
    this.currentMonth = 0; // 0 = Janeiro 2027
    this.events = this.loadEvents();
    this.selectedDateStr = null;
    this.init();
  }

  loadEvents() {
    try {
      const saved = localStorage.getItem("oanse_events_2027");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Erro ao carregar eventos do calendário:", e);
    }
    // Eventos iniciais padrão de exemplo para 2027 na Igreja Maanaim
    return [
      {
        id: "ev-1",
        date: "2027-02-06",
        title: "Abertura do Ano OANSE 2027",
        club: "todos",
        time: "14:30 - 17:00",
        location: "Templo Principal Maanaim",
        type: "especial",
        description: "Grande culto e recepção de todos os clubes: Ursinho, Faísca, Flama, Tocha, JV e VQ7!"
      },
      {
        id: "ev-2",
        date: "2027-04-17",
        title: "1ª Feira de Talentos 2027",
        club: "todos",
        time: "15:00 - 17:30",
        location: "Salão Social",
        type: "talentos",
        description: "Troca de talentos acumulados por brinquedos, livros bíblicos e guloseimas."
      },
      {
        id: "ev-3",
        date: "2027-06-19",
        title: "Olimpíadas OANSE Regionais",
        club: "todos",
        time: "08:30 - 16:00",
        location: "Ginásio Esportivo",
        type: "competicao",
        description: "Gincana e provas oficiais do Círculo Oanse entre igrejas convidadas."
      },
      {
        id: "ev-4",
        date: "2027-11-27",
        title: "Culto de Investidura e Formatura 2027",
        club: "todos",
        time: "19:00",
        location: "Templo Principal",
        type: "investidura",
        description: "Entrega de troféus, condecorações, faixas e encerramento oficial do ano."
      }
    ];
  }

  saveEvents() {
    try {
      localStorage.setItem("oanse_events_2027", JSON.stringify(this.events));
      if (window.firebaseSync && window.firebaseSync.isConfigured) {
        window.firebaseSync.saveToCloud({ events: this.events });
      }
    } catch (e) {
      console.error("Erro ao salvar eventos:", e);
    }
  }

  init() {
    this.renderMonthSelector();
    this.renderMonth(this.currentMonth);
    this.renderUpcomingEvents();
    this.attachEventListeners();
  }

  renderMonthSelector() {
    const container = document.getElementById("calendarMonthNav");
    if (!container) return;

    container.innerHTML = `
      <div class="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div class="flex items-center space-x-3">
          <button id="calPrevMonthBtn" class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h3 class="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              <span id="calCurrentMonthTitle">${MONTH_NAMES[this.currentMonth]}</span>
              <span class="text-blue-600 bg-blue-50 dark:bg-blue-900/40 text-sm px-2.5 py-0.5 rounded-full font-bold">2027</span>
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Reuniões aos Sábados • Igreja Batista Regular Maanaim</p>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <select id="calMonthDropdown" class="text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-700 dark:text-slate-200">
            ${MONTH_NAMES.map((m, idx) => `<option value="${idx}" ${idx === this.currentMonth ? "selected" : ""}>${m}</option>`).join("")}
          </select>
          <button id="calNextMonthBtn" class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
          <button id="calAddEventTopBtn" class="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Novo Evento</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById("calPrevMonthBtn")?.addEventListener("click", () => {
      this.currentMonth = (this.currentMonth - 1 + 12) % 12;
      this.updateView();
    });

    document.getElementById("calNextMonthBtn")?.addEventListener("click", () => {
      this.currentMonth = (this.currentMonth + 1) % 12;
      this.updateView();
    });

    document.getElementById("calMonthDropdown")?.addEventListener("change", (e) => {
      this.currentMonth = parseInt(e.target.value);
      this.updateView();
    });

    document.getElementById("calAddEventTopBtn")?.addEventListener("click", () => {
      this.openEventModal();
    });
  }

  updateView() {
    const title = document.getElementById("calCurrentMonthTitle");
    if (title) title.textContent = MONTH_NAMES[this.currentMonth];
    const drop = document.getElementById("calMonthDropdown");
    if (drop) drop.value = this.currentMonth;
    this.renderMonth(this.currentMonth);
  }

  renderMonth(monthIndex) {
    const grid = document.getElementById("calendarGrid");
    if (!grid) return;

    // Cabeçalho dos dias da semana
    let html = `
      <div class="grid grid-cols-7 gap-1.5 md:gap-2 mb-2 text-center text-xs font-black uppercase tracking-wider text-slate-500">
        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div class="text-blue-600 font-extrabold flex items-center justify-center gap-1">
          <span>Sáb</span>
          <span class="w-2 h-2 rounded-full bg-blue-600 inline-block animate-pulse"></span>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-1.5 md:gap-2">
    `;

    // 2027 Calendar logic
    const firstDayDate = new Date(this.year, monthIndex, 1);
    const startingDay = firstDayDate.getDay(); // 0 = Dom, 6 = Sáb
    const daysInMonth = new Date(this.year, monthIndex + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.year, monthIndex, 0).getDate();

    // Dias do mês anterior para preencher a grade
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDay = daysInPrevMonth - i;
      html += `
        <div class="min-h-[75px] md:min-h-[95px] p-1.5 bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl opacity-40 select-none">
          <span class="text-xs font-medium text-slate-400">${prevDay}</span>
        </div>
      `;
    }

    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(this.year, monthIndex, day);
      const isSaturday = dayDate.getDay() === 6;
      const isSunday = dayDate.getDay() === 0;
      const dateStr = `${this.year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      
      const dayEvents = this.events.filter(e => e.date === dateStr);

      let cardClasses = "min-h-[75px] md:min-h-[95px] p-1.5 md:p-2 bg-white dark:bg-slate-800 border rounded-xl transition duration-150 cursor-pointer relative flex flex-col justify-between group shadow-xs hover:shadow-md hover:border-blue-400 ";
      
      if (isSaturday) {
        cardClasses += "border-blue-200 dark:border-blue-900/60 bg-gradient-to-b from-blue-50/60 to-white dark:from-blue-950/20 dark:to-slate-800 ";
      } else {
        cardClasses += "border-slate-200 dark:border-slate-700/80 ";
      }

      html += `
        <div class="${cardClasses}" onclick="oanseCalendar.onDayClicked('${dateStr}')">
          <div class="flex items-center justify-between mb-1">
            <span class="inline-flex items-center justify-center w-6 h-6 text-xs font-black rounded-lg ${
              isSaturday 
                ? 'bg-blue-600 text-white shadow-xs' 
                : isSunday 
                  ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40' 
                  : 'text-slate-700 dark:text-slate-300'
            }">
              ${day}
            </span>

            ${isSaturday ? '<span class="text-[9px] font-bold uppercase tracking-tight text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/60 px-1 rounded">Clube</span>' : ''}
          </div>

          <div class="flex-1 overflow-hidden space-y-1">
            ${dayEvents.slice(0, 2).map(ev => `
              <div class="text-[10px] md:text-xs font-bold truncate px-1.5 py-0.5 rounded-md ${this.getEventBadgeStyle(ev.type, ev.club)}" title="${ev.title} (${ev.time || ''})">
                ${ev.title}
              </div>
            `).join("")}
            ${dayEvents.length > 2 ? `<div class="text-[9px] font-bold text-slate-500 pl-1">+${dayEvents.length - 2} mais</div>` : ''}
          </div>

          <div class="opacity-0 group-hover:opacity-100 transition text-[10px] text-blue-600 dark:text-blue-400 font-bold flex items-center justify-end mt-1">
            <span>+ evento</span>
          </div>
        </div>
      `;
    }

    // Dias do próximo mês para completar 35 ou 42 células
    const totalCells = startingDay + daysInMonth;
    const remaining = (totalCells % 7 === 0) ? 0 : 7 - (totalCells % 7);
    for (let j = 1; j <= remaining; j++) {
      html += `
        <div class="min-h-[75px] md:min-h-[95px] p-1.5 bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl opacity-40 select-none">
          <span class="text-xs font-medium text-slate-400">${j}</span>
        </div>
      `;
    }

    html += `</div>`;
    grid.innerHTML = html;
  }

  getEventBadgeStyle(type, club) {
    if (type === "talentos") return "bg-amber-100 text-amber-900 border border-amber-300";
    if (type === "investidura") return "bg-purple-100 text-purple-900 border border-purple-300";
    if (type === "competicao") return "bg-rose-100 text-rose-900 border border-rose-300";
    if (club === "ursinho") return "bg-rose-100 text-rose-800";
    if (club === "faisca") return "bg-amber-100 text-amber-800";
    if (club === "flama") return "bg-emerald-100 text-emerald-800";
    if (club === "tocha") return "bg-sky-100 text-sky-800";
    if (club === "jv") return "bg-yellow-100 text-yellow-800";
    if (club === "vq7") return "bg-teal-100 text-teal-800";
    return "bg-blue-100 text-blue-800";
  }

  onDayClicked(dateStr) {
    this.selectedDateStr = dateStr;
    const dayEvents = this.events.filter(e => e.date === dateStr);
    
    const parts = dateStr.split("-");
    const formatted = `${parts[2]}/${parts[1]}/${parts[0]}`;
    const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const weekday = WEEKDAY_NAMES[dateObj.getDay()];

    const container = document.getElementById("dayEventsModalBody");
    const title = document.getElementById("dayEventsModalTitle");
    if (title) title.textContent = `Eventos de ${weekday}, ${formatted}`;

    if (container) {
      if (dayEvents.length === 0) {
        container.innerHTML = `
          <div class="text-center py-8">
            <div class="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <p class="text-slate-600 dark:text-slate-300 font-semibold mb-1">Nenhum evento agendado para este dia.</p>
            <p class="text-xs text-slate-400">Clique abaixo para adicionar um evento ou reunião neste dia.</p>
          </div>
        `;
      } else {
        container.innerHTML = dayEvents.map(ev => `
          <div class="p-3.5 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600 mb-2 relative group">
            <div class="flex items-start justify-between">
              <div>
                <span class="inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 ${this.getEventBadgeStyle(ev.type, ev.club)}">
                  ${ev.club ? (ev.club.toUpperCase()) : 'GERAL'} • ${ev.type ? ev.type.toUpperCase() : 'EVENTO'}
                </span>
                <h4 class="text-base font-bold text-slate-800 dark:text-white">${ev.title}</h4>
                <div class="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap gap-3 mt-1">
                  ${ev.time ? `<span class="flex items-center gap-1">⏰ ${ev.time}</span>` : ''}
                  ${ev.location ? `<span class="flex items-center gap-1">📍 ${ev.location}</span>` : ''}
                </div>
                ${ev.description ? `<p class="text-xs text-slate-600 dark:text-slate-300 mt-2 bg-white dark:bg-slate-800 p-2 rounded-lg">${ev.description}</p>` : ''}
              </div>
              <button onclick="oanseCalendar.deleteEvent('${ev.id}')" class="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 transition" title="Excluir evento">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>
        `).join("");
      }
    }

    const modal = document.getElementById("dayEventsModal");
    if (modal) modal.classList.remove("hidden");
  }

  openEventModal(dateStr = null) {
    const modal = document.getElementById("addEventModal");
    if (!modal) return;

    const dateInput = document.getElementById("eventDateInput");
    if (dateInput) {
      dateInput.value = dateStr || this.selectedDateStr || `${this.year}-${String(this.currentMonth + 1).padStart(2, "0")}-01`;
    }

    modal.classList.remove("hidden");
  }

  saveNewEventFromForm() {
    const titleInput = document.getElementById("eventTitleInput");
    const dateInput = document.getElementById("eventDateInput");
    const timeInput = document.getElementById("eventTimeInput");
    const clubInput = document.getElementById("eventClubSelect");
    const typeInput = document.getElementById("eventTypeSelect");
    const locationInput = document.getElementById("eventLocationInput");
    const descInput = document.getElementById("eventDescInput");

    if (!titleInput || !titleInput.value.trim()) {
      alert("Por favor, digite o título do evento.");
      return;
    }

    if (!dateInput || !dateInput.value) {
      alert("Por favor, selecione uma data em 2027.");
      return;
    }

    const newEvent = {
      id: "ev-" + Date.now(),
      title: titleInput.value.trim(),
      date: dateInput.value,
      time: timeInput ? timeInput.value.trim() : "",
      club: clubInput ? clubInput.value : "todos",
      type: typeInput ? typeInput.value : "regular",
      location: locationInput ? locationInput.value.trim() : "",
      description: descInput ? descInput.value.trim() : ""
    };

    this.events.push(newEvent);
    this.saveEvents();
    
    // Atualizar visualizações
    this.renderMonth(this.currentMonth);
    this.renderUpcomingEvents();

    // Fechar modais
    document.getElementById("addEventModal")?.classList.add("hidden");
    document.getElementById("dayEventsModal")?.classList.add("hidden");

    // Limpar formulário
    titleInput.value = "";
    if (descInput) descInput.value = "";
  }

  deleteEvent(id) {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;
    this.events = this.events.filter(e => e.id !== id);
    this.saveEvents();
    this.renderMonth(this.currentMonth);
    this.renderUpcomingEvents();

    if (this.selectedDateStr) {
      this.onDayClicked(this.selectedDateStr);
    }
  }

  renderUpcomingEvents() {
    const container = document.getElementById("upcomingEventsList");
    if (!container) return;

    // Ordenar eventos por data
    const sorted = [...this.events].sort((a, b) => a.date.localeCompare(b.date));

    if (sorted.length === 0) {
      container.innerHTML = `<p class="text-sm text-slate-500 py-4">Nenhum evento cadastrado no ano.</p>`;
      return;
    }

    container.innerHTML = sorted.map(ev => {
      const parts = ev.date.split("-");
      const day = parts[2];
      const monthShort = MONTH_NAMES[parseInt(parts[1]) - 1].substring(0, 3).toUpperCase();

      return `
        <div class="flex items-center space-x-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs hover:border-blue-400 transition">
          <div class="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-black shrink-0">
            <span class="text-xs uppercase">${monthShort}</span>
            <span class="text-lg leading-none">${day}</span>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold text-slate-800 dark:text-white truncate">${ev.title}</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-2">
              <span>${ev.club.toUpperCase()}</span>
              ${ev.time ? `• <span>${ev.time}</span>` : ''}
              ${ev.location ? `• <span>${ev.location}</span>` : ''}
            </p>
          </div>
          <button onclick="oanseCalendar.onDayClicked('${ev.date}')" class="text-slate-400 hover:text-blue-600 p-1.5 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;
    }).join("");
  }

  attachEventListeners() {
    document.getElementById("btnSaveNewEvent")?.addEventListener("click", () => {
      this.saveNewEventFromForm();
    });

    document.getElementById("btnOpenAddEventFromDay")?.addEventListener("click", () => {
      this.openEventModal(this.selectedDateStr);
    });
  }
}

// Instância global
let oanseCalendar;
window.addEventListener("DOMContentLoaded", () => {
  oanseCalendar = new OanseCalendar();
  window.oanseCalendar = oanseCalendar;
});
