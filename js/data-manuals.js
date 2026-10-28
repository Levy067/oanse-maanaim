// Tabela de Regras e Valores de Talentos OANSE
// Baseada no sistema oficial PauloVGL TalentosCount: https://paulovgl.github.io/Oanse_TalentosCount/
// Significado oficial das siglas:
// E = Exercício Bíblico (E1, E2, E3, E4)
// T = Atividade (T1, T2, T3, T4)

const SECTION_CATEGORIES = [
  { id: "pi", label: "Prova de Ingresso", max: 9, short: "PI", legend: "Prova de Ingresso" },
  { id: "grau", label: "Grau", max: 12, short: "Grau", legend: "Grau de Memorização" },
  { id: "e1", label: "Exercício Bíblico 1 (E1)", max: 17, short: "E1", legend: "Exercício Bíblico 1" },
  { id: "e2", label: "Exercício Bíblico 2 (E2)", max: 17, short: "E2", legend: "Exercício Bíblico 2" },
  { id: "e3", label: "Exercício Bíblico 3 (E3)", max: 17, short: "E3", legend: "Exercício Bíblico 3" },
  { id: "e4", label: "Exercício Bíblico 4 (E4)", max: 17, short: "E4", legend: "Exercício Bíblico 4" },
  { id: "t1", label: "Atividade 1 (T1)", max: 17, short: "T1", legend: "Atividade 1" },
  { id: "t2", label: "Atividade 2 (T2)", max: 17, short: "T2", legend: "Atividade 2" },
  { id: "t3", label: "Atividade 3 (T3)", max: 17, short: "T3", legend: "Atividade 3" },
  { id: "t4", label: "Atividade 4 (T4)", max: 17, short: "T4", legend: "Atividade 4" }
];

// Seções específicas para o Clube Ursinho (além das padrões)
const URSINHO_CATEGORIES = [
  { id: "pi_ursinho", label: "Prova de Ingresso Ursinho", items: [
    { num: 1, label: "Seção A", val: 0.5 },
    { num: 2, label: "Seção B", val: 1.0 }
  ]},
  { id: "abraco", label: "Abraço do Ursinho (1 ao 24)", max: 24, short: "Abraço", legend: "Abraço do Ursinho" },
  { id: "dia_especial", label: "Dia Especial (1 ao 6)", max: 6, short: "Dia Esp.", legend: "Dia Especial" }
];

// Valores específicos por clube e manual (em Talentos T$)
const MANUALS_RULES = {
  // ================= URSINHO =================
  "ursinho_amor": {
    name: "Manual Amor",
    clubId: "ursinho",
    defaultVal: 0.5,
    custom: {
      "pi_ursinho_1": 0.5, // Seção A
      "pi_ursinho_2": 1.0, // Seção B
      "abraco_3": 1.0,
      "abraco_10": 1.0,
      // todas as outras do abraço 1..24 padrão 0.5
      // dia_especial 1..6 padrão 0.5
    }
  },
  "ursinho_alegria": {
    name: "Manual Alegria",
    clubId: "ursinho",
    defaultVal: 0.5,
    custom: {
      "abraco_1": 0.5,
      "abraco_2": 0.5,
      "abraco_3": 1.0,
      "abraco_4": 2.0,
      "abraco_5": 1.5,
      // outras 0.5
    }
  },

  // ================= FAÍSCA =================
  "faisca_caminhante": {
    name: "Manual Caminhante",
    clubId: "faisca",
    defaultVal: 0.5,
    custom: {
      "grau_2": 0.5, "grau_3": 0.5, "grau_4": 0.5,
      "e1_2": 0.5, "e1_3": 0.5, "e1_4": 0.5,
      "e2_2": 1.0, "e2_3": 0.5, "e2_4": 1.0,
      "e3_8": 0.5,
      "e4_2": 0.5, "e4_3": 0.5, "e4_4": 0.5, "e4_5": 0.5, "e4_6": 2.0
    }
  },
  "faisca_saltador": {
    name: "Manual Saltador",
    clubId: "faisca",
    defaultVal: 0.5,
    custom: {
      "grau_1": 1.0, "grau_2": 2.0, "grau_3": 3.0, "grau_4": 4.0, "grau_5": 5.0,
      "e1_1": 1.0, "e1_2": 1.0, "e2_1": 1.0, "e2_2": 1.0
    }
  },
  "faisca_saltitante": {
    name: "Manual Saltador",
    clubId: "faisca",
    defaultVal: 0.5,
    custom: {
      "grau_1": 1.0, "grau_2": 2.0, "grau_3": 3.0, "grau_4": 4.0, "grau_5": 5.0,
      "e1_1": 1.0, "e1_2": 1.0, "e2_1": 1.0, "e2_2": 1.0
    }
  },
  "faisca_escalador": {
    name: "Manual Escalador",
    clubId: "faisca",
    defaultVal: 0.5,
    custom: {
      "grau_1": 1.0, "grau_2": 2.0, "grau_3": 3.0, "grau_4": 4.0, "grau_5": 5.0,
      "e1_1": 1.0, "e1_2": 1.0, "e2_1": 1.0, "e2_2": 1.0
    }
  },

  // ================= FLAMA =================
  "flama_sabia": {
    name: "Manual Sabiá",
    clubId: "flama",
    defaultVal: 0.5,
    custom: {
      "pi_2": 0.5, "pi_3": 0.5, "pi_4": 1.0, "pi_5": 1.0,
      "grau_5": 0.5, "grau_6": 1.0, "grau_7": 1.5,
      "e1_5": 1.0, "e1_7": 1.0, "e1_8": 1.5,
      "e2_4": 1.5, "e2_5": 1.5, "e2_6": 1.0, "e2_8": 1.5,
      "e3_3": 0.5, "e3_5": 1.0, "e3_6": 1.0,
      "e4_2": 0.5, "e4_3": 1.0, "e4_4": 1.0, "e4_6": 1.5, "e4_7": 1.0
    }
  },
  "flama_aguia": {
    name: "Manual Águia",
    clubId: "flama",
    defaultVal: 0.5,
    custom: {
      "grau_3": 0.5, "grau_4": 1.5, "grau_5": 2.0, "grau_6": 1.5, "grau_7": 1.0,
      "e1_6": 1.0, "e1_7": 1.5, "e1_8": 1.0,
      "e2_3": 1.5, "e2_4": 2.0, "e2_5": 1.5, "e2_7": 1.5, "e2_8": 1.0,
      "e3_4": 2.0, "e3_5": 1.5, "e3_6": 1.5, "e3_8": 1.0, "e3_9": 1.0, "e3_10": 1.5,
      "e4_4": 1.5, "e4_7": 2.0, "e4_8": 1.0, "e4_9": 1.0, "e4_10": 2.5
    }
  },

  // ================= TOCHA =================
  "tocha_carneiro": {
    name: "Manual Carneiro",
    clubId: "tocha",
    defaultVal: 0.5,
    custom: {
      "pi_1": 0.5, "pi_2": 0.5, "pi_3": 0.5, "pi_4": 1.0, "pi_5": 1.0,
      "grau_6": 1.5, "grau_7": 1.0, "grau_8": 0.5, "grau_9": 1.5, "grau_10": 1.5,
      "e1_4": 0.5, "e1_5": 1.0, "e1_8": 1.0, "e1_9": 1.0,
      "e2_3": 1.0, "e2_4": 1.0, "e2_5": 1.0, "e2_8": 1.0, "e2_9": 1.0,
      "e3_5": 1.0, "e3_6": 1.0, "e3_7": 1.5, "e3_9": 1.0,
      "e4_4": 1.5, "e4_5": 1.0, "e4_7": 0.5, "e4_9": 0.5
    }
  },
  "tocha_leao": {
    name: "Manual Leão",
    clubId: "tocha",
    defaultVal: 0.5,
    custom: {
      "grau_5": 1.0, "grau_6": 1.0, "grau_7": 1.0, "grau_8": 1.0, "grau_9": 0.5,
      "e1_3": 1.5, "e1_5": 1.5, "e1_6": 1.0, "e1_8": 0.5, "e1_12": 1.0,
      "e2_5": 1.0, "e2_6": 0.5, "e2_8": 0.5, "e2_9": 0.5,
      "e3_2": 0.5, "e3_3": 0.5, "e3_4": 0.5, "e3_6": 0.5, "e3_8": 0.5, "e3_9": 0.5,
      "e4_2": 0.5, "e4_3": 1.0, "e4_5": 1.5, "e4_6": 1.0, "e4_8": 1.0, "e4_9": 0.5, "e4_11": 1.5, "e4_12": 0.5
    }
  },

  // ================= JV =================
  "jv_sprint": {
    name: "Manual Sprint",
    clubId: "jv",
    defaultVal: 1.0,
    custom: {
      "grau_1": 1.0, "grau_2": 2.0, "grau_3": 3.0, "grau_4": 4.0, "grau_5": 5.0
    }
  },
  "jv_maratona": {
    name: "Manual Maratona",
    clubId: "jv",
    defaultVal: 1.0,
    custom: {
      "grau_1": 1.0, "grau_2": 2.0, "grau_3": 3.0, "grau_4": 4.0, "grau_5": 5.0
    }
  },

  // ================= VQ7 =================
  "vq7_fundamentos": {
    name: "Fundamentos da Fé (4 Panfletos)",
    clubId: "vq7",
    defaultVal: 1.0,
    custom: {
      "grau_1": 2.0, "grau_2": 2.0, "grau_3": 2.0, "grau_4": 2.0, "grau_5": 2.0
    }
  },
  "vq7_estudos_principais": {
    name: "Estudos Principais (Romanos, Efésios e Gálatas)",
    clubId: "vq7",
    defaultVal: 1.0,
    custom: {
      "grau_1": 2.0, "grau_2": 2.0, "grau_3": 2.0, "grau_4": 2.0, "grau_5": 2.0
    }
  },
  "vq7_estudos_complementares": {
    name: "Estudos Complementares (Temas Bíblicos)",
    clubId: "vq7",
    defaultVal: 1.0,
    custom: {
      "grau_1": 2.0, "grau_2": 2.0, "grau_3": 2.0, "grau_4": 2.0, "grau_5": 2.0
    }
  },
  "vq7_testemunho": {
    name: "Manual Testemunho 24/7",
    clubId: "vq7",
    defaultVal: 1.0,
    custom: {
      "grau_1": 2.0, "grau_2": 2.0, "grau_3": 2.0, "grau_4": 2.0, "grau_5": 2.0
    }
  }
};

// Atividades especiais que somam talentos
const SPECIAL_ACTIVITIES = [
  { id: "biblia", name: "Trouxe a Bíblia", points: 1.0, icon: "📖" },
  { id: "farda", name: "Farda / Uniforme Completo", points: 1.0, icon: "👕" },
  { id: "visitante", name: "Trouxe Amigo Visitante", points: 2.0, icon: "🤝" },
  { id: "tarefa", name: "Tarefa de Casa Cumprida", points: 1.0, icon: "✍️" },
  { id: "concurso_biblico", name: "Concurso Bíblico", points: 10.0, icon: "🏆" },
  { id: "olimpiadas", name: "Olimpíadas", points: 10.0, icon: "🥇" }
];

/**
 * Função para calcular o valor de uma seção específica
 */
function getSectionTalentValue(manualKey, sectionKey) {
  const manual = MANUALS_RULES[manualKey];
  if (!manual) return 0.5;
  if (manual.custom && manual.custom[sectionKey] !== undefined) {
    return manual.custom[sectionKey];
  }
  return manual.defaultVal || 0.5;
}
