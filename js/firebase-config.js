// ====================================================================
// Configuração e Sincronizador Firebase Firestore em Tempo Real
// Portal OANSE • Igreja Batista Regular Maanaim
// ====================================================================
//
// COMO ATIVAR A SINCRONIZAÇÃO EM NUVEM:
// 1. Acesse o Console do Firebase: https://console.firebase.google.com/
// 2. Crie um projeto gratuito (ex: "oanse-maanaim")
// 3. Vá em "Build" > "Firestore Database" e clique em "Criar banco de dados".
// 4. Selecione "Modo de Teste" (para permitir leitura e escrita imediata).
// 5. Vá nas "Configurações do Projeto" (ícone de engrenagem) > "Geral".
// 6. Na seção "Seus aplicativos", adicione um Web App (ícone </>) e copie os dados.
// 7. Cole suas chaves reais abaixo substituindo os valores "COLE_...":
// ====================================================================

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCPXVbFcP4sKPYSpF9pKINmevOp7MhfkEw",
  authDomain: "oanse-maanaim.firebaseapp.com",
  projectId: "oanse-maanaim",
  storageBucket: "oanse-maanaim.firebasestorage.app",
  messagingSenderId: "214632568568",
  appId: "1:214632568568:web:14e9aa2e5f2dab85648d0d",
  measurementId: "G-1KSNVNVWW6"
};

class FirebaseSyncManager {
  constructor() {
    this.isConfigured = false;
    this.db = null;
    this.docRef = null;
    this.isPushing = false;
    this.syncTimeout = null;
    this.hasInitialLoaded = false;
  }

  init() {
    // Verifica se o usuário já preencheu com o projectId real
    if (
      !FIREBASE_CONFIG.projectId ||
      FIREBASE_CONFIG.projectId.includes("COLE_") ||
      FIREBASE_CONFIG.projectId.trim() === ""
    ) {
      console.log("[Firebase] Modo Local ativo. Adicione suas credenciais em js/firebase-config.js para sincronizar na nuvem.");
      this.updateStatusBadge("local", "Modo Local");
      return;
    }

    try {
      if (typeof firebase === "undefined") {
        console.warn("[Firebase] SDK não carregado. Operando em Modo Local/Offline.");
        this.updateStatusBadge("offline", "Offline");
        return;
      }

      if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
      }

      this.db = firebase.firestore();
      // Documento único central para o ano letivo
      this.docRef = this.db.collection("portal_oanse").doc("dados_2027");
      this.isConfigured = true;
      this.updateStatusBadge("connecting", "Conectando Nuvem...");

      this.setupRealtimeListener();
    } catch (err) {
      console.error("[Firebase] Erro ao conectar:", err);
      this.updateStatusBadge("error", "Erro Firebase");
    }
  }

  setupRealtimeListener() {
    if (!this.docRef) return;

    this.docRef.onSnapshot(
      (docSnapshot) => {
        // Se estamos no meio de um envio local para a nuvem, não reprocessamos nosso próprio envio
        if (this.isPushing) return;

        if (docSnapshot.exists) {
          const cloudData = docSnapshot.data();
          console.log("[Firebase] Dados recebidos da nuvem em tempo real:", cloudData);

          // 1. Sincroniza Oansistas e Líderes
          if (cloudData.oansistas && Array.isArray(cloudData.oansistas) && window.oansistasManager) {
            window.oansistasManager.oansistas = cloudData.oansistas;
            try {
              localStorage.setItem("oanse_oansistas_maanaim", JSON.stringify(cloudData.oansistas));
            } catch (e) {
              console.warn("Falha no cache local:", e);
            }

            // Atualiza a visualização caso a tela de líderes esteja aberta
            if (typeof window.oansistasManager.renderOansistasList === "function") {
              window.oansistasManager.renderOansistasList();
            }
            if (window.oansistasManager.selectedOansistaId && typeof window.oansistasManager.renderSelectedOansista === "function") {
              window.oansistasManager.renderSelectedOansista();
            }
          }

          // 2. Sincroniza Eventos do Calendário
          if (cloudData.events && Array.isArray(cloudData.events) && window.oanseCalendar) {
            window.oanseCalendar.events = cloudData.events;
            try {
              localStorage.setItem("oanse_events_2027", JSON.stringify(cloudData.events));
            } catch (e) {
              console.warn("Falha no cache local de eventos:", e);
            }

            if (typeof window.oanseCalendar.renderMonth === "function") {
              window.oanseCalendar.renderMonth(window.oanseCalendar.currentMonth);
            }
            if (typeof window.oanseCalendar.renderUpcomingEvents === "function") {
              window.oanseCalendar.renderUpcomingEvents();
            }
          }

          this.hasInitialLoaded = true;
          this.updateStatusBadge("synced", "Nuvem Sincronizada");
        } else {
          // Documento na nuvem ainda não existe: envia os dados iniciais locais para criar o banco
          console.log("[Firebase] Banco inicial vazio na nuvem. Enviando dados padrão iniciais...");
          this.saveToCloud({
            oansistas: window.oansistasManager ? window.oansistasManager.oansistas : null,
            events: window.oanseCalendar ? window.oanseCalendar.events : null
          });
        }
      },
      (error) => {
        console.error("[Firebase] Erro no listener em tempo real:", error);
        this.updateStatusBadge("error", "Erro Conexão");
      }
    );
  }

  saveToCloud(payload = {}) {
    if (!this.isConfigured || !this.docRef) return;

    this.updateStatusBadge("syncing", "Salvando na Nuvem...");

    clearTimeout(this.syncTimeout);
    this.syncTimeout = setTimeout(async () => {
      try {
        this.isPushing = true;
        const updatePayload = {
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (payload.oansistas) updatePayload.oansistas = payload.oansistas;
        if (payload.events) updatePayload.events = payload.events;

        await this.docRef.set(updatePayload, { merge: true });
        console.log("[Firebase] Sincronização em nuvem concluída com sucesso!");
        this.updateStatusBadge("synced", "Nuvem Sincronizada");
      } catch (err) {
        console.error("[Firebase] Erro ao salvar dados na nuvem:", err);
        this.updateStatusBadge("error", "Erro ao Salvar");
      } finally {
        setTimeout(() => {
          this.isPushing = false;
        }, 350);
      }
    }, 350); // Debounce de 350ms para evitar requisições excessivas
  }

  updateStatusBadge(status, text) {
    const badge = document.getElementById("cloudSyncStatusBadge");
    if (!badge) return;

    let dotColor = "bg-slate-400";
    let textColor = "text-slate-600";
    let bgColor = "bg-slate-100 border-slate-200";

    if (status === "synced") {
      dotColor = "bg-emerald-500";
      textColor = "text-emerald-700 font-bold";
      bgColor = "bg-emerald-50 border-emerald-200";
    } else if (status === "syncing" || status === "connecting") {
      dotColor = "bg-amber-500 animate-pulse";
      textColor = "text-amber-700 font-bold";
      bgColor = "bg-amber-50 border-amber-200";
    } else if (status === "error") {
      dotColor = "bg-red-500";
      textColor = "text-red-700 font-bold";
      bgColor = "bg-red-50 border-red-200";
    }

    badge.className = `hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border shadow-2xs transition-all duration-200 ${bgColor} ${textColor}`;
    badge.innerHTML = `
      <span class="w-2 h-2 rounded-full ${dotColor}"></span>
      <span>${text}</span>
    `;
    badge.title = `Status de Sincronização: ${text}`;
  }
}

// Instância global de sincronização
window.firebaseSync = new FirebaseSyncManager();

// Inicializa assim que o DOM carregar
window.addEventListener("DOMContentLoaded", () => {
  window.firebaseSync.init();
});
