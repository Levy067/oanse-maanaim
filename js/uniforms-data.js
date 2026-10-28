// Visualizador de Fardas e Uniformes OANSE (Frente e Verso)
// Igreja Batista Regular Maanaim

const UNIFORM_ILLUSTRATIONS = {
  ursinho: {
    front: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Colete Frente -->
        <path d="M75,40 C95,55 120,60 150,60 C180,60 205,55 225,40 L260,100 L230,115 L215,85 L215,290 L85,290 L85,85 L70,115 L40,100 Z" fill="#1D4ED8" stroke="#DC2626" stroke-width="6" />
        <!-- Abertura Central em V -->
        <path d="M110,60 L150,150 L190,60" fill="none" stroke="#DC2626" stroke-width="5" />
        <line x1="150" y1="150" x2="150" y2="290" stroke="#DC2626" stroke-width="4" stroke-dasharray="8 6" />
        <!-- Botões -->
        <circle cx="150" cy="180" r="5" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" />
        <circle cx="150" cy="220" r="5" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" />
        <circle cx="150" cy="260" r="5" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" />
        <!-- Patch do Ursinho no Peito -->
        <g transform="translate(92, 115) scale(0.35)">
          <circle cx="60" cy="60" r="55" fill="#FFFFFF" stroke="#DC2626" stroke-width="6" />
          <image href="assets/img/ursinho.png" x="15" y="15" width="90" height="90" />
        </g>
        <!-- Condecoração Pegada -->
        <g transform="translate(165, 125) scale(0.7)">
          <path d="M15,25 C10,18 20,10 28,15 C35,20 32,32 20,35 C12,33 8,28 15,25 Z" fill="#FBBF24" />
          <circle cx="14" cy="10" r="4" fill="#FBBF24" />
          <circle cx="24" cy="7" r="4" fill="#FBBF24" />
          <circle cx="34" cy="11" r="4" fill="#FBBF24" />
        </g>
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">FRENTE • Colete Ursinho</text>
      </svg>
    `,
    back: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Colete Costas -->
        <path d="M75,40 C110,48 190,48 225,40 L260,100 L230,115 L215,85 L215,290 L85,290 L85,85 L70,115 L40,100 Z" fill="#1D4ED8" stroke="#DC2626" stroke-width="6" />
        <!-- Emblema Central Costas -->
        <g transform="translate(100, 95) scale(0.85)">
          <rect x="0" y="0" width="118" height="55" rx="16" fill="#FFFFFF" stroke="#DC2626" stroke-width="3" />
          <text x="59" y="24" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="900" font-size="14" fill="#DC2626">OANSE</text>
          <text x="59" y="42" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="11" fill="#1E3A8A">URSINHO</text>
        </g>
        <!-- Faixa de Distintivos das Costas -->
        <rect x="105" y="170" width="90" height="26" rx="6" fill="#FEE2E2" stroke="#DC2626" stroke-width="2" />
        <text x="150" y="187" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="10" fill="#991B1B">Abraço do Ursinho</text>
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">VERSO (COSTAS) • Colete Ursinho</text>
      </svg>
    `
  },

  faisca: {
    front: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Camisa/Colete Faísca Frente -->
        <path d="M70,40 C100,55 200,55 230,40 L275,105 L235,125 L215,95 L215,290 L85,290 L85,95 L65,125 L25,105 Z" fill="#DC2626" stroke="#991B1B" stroke-width="3" />
        <path d="M115,45 C130,70 170,70 185,45" fill="none" stroke="#FEE2E2" stroke-width="4" />
        <!-- Logo Faísca no Peito -->
        <g transform="translate(100, 75) scale(0.8)">
          <circle cx="62" cy="62" r="50" fill="#FFFFFF" stroke="#EAB308" stroke-width="4" />
          <image href="assets/img/faisca.png" x="22" y="22" width="80" height="80" />
        </g>
        <!-- Asas e Coroas de Premiação -->
        <g transform="translate(80, 190)">
          <rect x="0" y="0" width="140" height="35" rx="8" fill="#FEF9C3" stroke="#EAB308" stroke-width="2" />
          <text x="70" y="22" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="bold" font-size="11" fill="#854D0E">👑 ASAS & COROAS</text>
        </g>
        <!-- Pedras de Esmeraldas e Rubis -->
        <circle cx="115" cy="245" r="9" fill="#10B981" stroke="#065F46" stroke-width="2" />
        <circle cx="150" cy="245" r="9" fill="#EF4444" stroke="#991B1B" stroke-width="2" />
        <circle cx="185" cy="245" r="9" fill="#10B981" stroke="#065F46" stroke-width="2" />
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">FRENTE • Uniforme Faísca</text>
      </svg>
    `,
    back: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Camisa Costas -->
        <path d="M70,40 C110,48 190,48 230,40 L275,105 L235,125 L215,95 L215,290 L85,290 L85,95 L65,125 L25,105 Z" fill="#DC2626" stroke="#991B1B" stroke-width="3" />
        <path d="M115,42 C135,50 165,50 185,42" fill="none" stroke="#991B1B" stroke-width="3" />
        <!-- Estampa Costas Faísca -->
        <g transform="translate(85, 90)">
          <rect x="0" y="0" width="130" height="65" rx="14" fill="#FFFFFF" stroke="#EAB308" stroke-width="3" />
          <text x="65" y="28" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="900" font-size="16" fill="#DC2626">CLUBE</text>
          <text x="65" y="50" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="900" font-size="18" fill="#EAB308">FAÍSCA</text>
        </g>
        <!-- Lema -->
        <rect x="65" y="180" width="170" height="30" rx="8" fill="#991B1B" />
        <text x="150" y="200" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="10" fill="#FEF9C3">"Minha Luz Brilhará para Jesus"</text>
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">VERSO (COSTAS) • Uniforme Faísca</text>
      </svg>
    `
  },

  flama: {
    front: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Camisa Verde Flama Frente -->
        <path d="M70,40 C100,55 200,55 230,40 L275,105 L235,125 L215,95 L215,290 L85,290 L85,95 L65,125 L25,105 Z" fill="#15803D" stroke="#166534" stroke-width="3" />
        <!-- Colarinho -->
        <path d="M115,45 L150,75 L185,45" fill="none" stroke="#DCFCE7" stroke-width="4" />
        <!-- Faixa Transversal de Condecoração (Diagonal) -->
        <polygon points="185,45 215,70 120,290 90,290" fill="#22C55E" opacity="0.85" stroke="#FFFFFF" stroke-width="2" />
        <!-- Emblema da Chama no Peito Esquerdo -->
        <g transform="translate(85, 80) scale(0.65)">
          <circle cx="45" cy="45" r="40" fill="#FFFFFF" stroke="#166534" stroke-width="3" />
          <image href="assets/img/flama.png" x="10" y="10" width="70" height="70" />
        </g>
        <!-- Distintivos na Faixa -->
        <circle cx="165" cy="140" r="8" fill="#FBBF24" stroke="#78350F" stroke-width="1.5" />
        <circle cx="145" cy="190" r="8" fill="#3B82F6" stroke="#1E3A8A" stroke-width="1.5" />
        <circle cx="125" cy="240" r="8" fill="#EF4444" stroke="#991B1B" stroke-width="1.5" />
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">FRENTE • Farda Verde Flama</text>
      </svg>
    `,
    back: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Camisa Costas -->
        <path d="M70,40 C110,48 190,48 230,40 L275,105 L235,125 L215,95 L215,290 L85,290 L85,95 L65,125 L25,105 Z" fill="#15803D" stroke="#166534" stroke-width="3" />
        <!-- Faixa nas costas -->
        <polygon points="185,45 215,70 120,290 90,290" fill="#22C55E" opacity="0.85" stroke="#FFFFFF" stroke-width="2" />
        <!-- Estampa Costas -->
        <g transform="translate(85, 100)">
          <rect x="0" y="0" width="130" height="60" rx="12" fill="#FFFFFF" stroke="#166534" stroke-width="3" />
          <text x="65" y="26" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="900" font-size="15" fill="#166534">CLUBE</text>
          <text x="65" y="48" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="900" font-size="18" fill="#22C55E">FLAMA</text>
        </g>
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">VERSO (COSTAS) • Farda Flama</text>
      </svg>
    `
  },

  tocha: {
    front: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Camisa Azul Tocha Frente -->
        <path d="M70,40 C100,55 200,55 230,40 L275,105 L235,125 L215,95 L215,290 L85,290 L85,95 L65,125 L25,105 Z" fill="#1E40AF" stroke="#1E3A8A" stroke-width="3" />
        <path d="M115,45 L150,80 L185,45" fill="none" stroke="#DBEAFE" stroke-width="4" />
        <!-- Faixa Transversal de Condecoração -->
        <polygon points="115,45 85,70 180,290 210,290" fill="#3B82F6" opacity="0.9" stroke="#DBEAFE" stroke-width="2" />
        <!-- Emblema da Tocha no Peito -->
        <g transform="translate(145, 80) scale(0.65)">
          <circle cx="45" cy="45" r="40" fill="#FFFFFF" stroke="#1E3A8A" stroke-width="3" />
          <image href="assets/img/tocha.png" x="12" y="12" width="66" height="66" />
        </g>
        <!-- Condecorações de Grau e Medalhões -->
        <rect x="110" y="145" width="22" height="14" rx="3" fill="#F59E0B" stroke="#B45309" stroke-width="1.5" />
        <rect x="135" y="195" width="22" height="14" rx="3" fill="#10B981" stroke="#047857" stroke-width="1.5" />
        <circle cx="170" cy="245" r="10" fill="#FBBF24" stroke="#D97706" stroke-width="2" />
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">FRENTE • Farda Azul Tocha</text>
      </svg>
    `,
    back: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Camisa Costas -->
        <path d="M70,40 C110,48 190,48 230,40 L275,105 L235,125 L215,95 L215,290 L85,290 L85,95 L65,125 L25,105 Z" fill="#1E40AF" stroke="#1E3A8A" stroke-width="3" />
        <!-- Faixa nas costas -->
        <polygon points="115,45 85,70 180,290 210,290" fill="#3B82F6" opacity="0.9" stroke="#DBEAFE" stroke-width="2" />
        <!-- Estampa Costas -->
        <g transform="translate(85, 95)">
          <rect x="0" y="0" width="130" height="65" rx="14" fill="#FFFFFF" stroke="#1E3A8A" stroke-width="3" />
          <text x="65" y="28" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="900" font-size="15" fill="#1E3A8A">CLUBE</text>
          <text x="65" y="50" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="900" font-size="18" fill="#3B82F6">TOCHA</text>
        </g>
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">VERSO (COSTAS) • Farda Tocha</text>
      </svg>
    `
  },

  jv: {
    front: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Camisa JV Frente -->
        <path d="M70,40 C100,55 200,55 230,40 L275,105 L235,125 L215,95 L215,290 L85,290 L85,95 L65,125 L25,105 Z" fill="#18181B" stroke="#09090B" stroke-width="3" />
        <!-- Gola Redonda Esportiva -->
        <path d="M115,45 C130,68 170,68 185,45" fill="none" stroke="#EAB308" stroke-width="4" />
        <!-- Faixas Esportivas Laterais Douradas e Verde -->
        <path d="M85,140 L85,290 L95,290 L95,140 Z" fill="#EAB308" />
        <path d="M205,140 L205,290 L215,290 L215,140 Z" fill="#EAB308" />
        <!-- Logo JV no Peito -->
        <g transform="translate(100, 80) scale(0.8)">
          <image href="assets/img/jv.png" x="10" y="10" width="100" height="90" />
        </g>
        <!-- Distintivos Pins JV -->
        <rect x="90" y="200" width="120" height="28" rx="8" fill="#27272A" stroke="#EAB308" stroke-width="1.5" />
        <text x="150" y="218" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="bold" font-size="10" fill="#EAB308">JOVENS VENCEDORES</text>
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">FRENTE • Camisa Oficial JV</text>
      </svg>
    `,
    back: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Camisa Costas -->
        <path d="M70,40 C110,48 190,48 230,40 L275,105 L235,125 L215,95 L215,290 L85,290 L85,95 L65,125 L25,105 Z" fill="#18181B" stroke="#09090B" stroke-width="3" />
        <!-- Faixas Esportivas Laterais -->
        <path d="M85,140 L85,290 L95,290 L95,140 Z" fill="#EAB308" />
        <path d="M205,140 L205,290 L215,290 L215,140 Z" fill="#EAB308" />
        <!-- Logo JV Grande nas Costas -->
        <g transform="translate(95, 75) scale(0.9)">
          <image href="assets/img/jv.png" x="10" y="10" width="100" height="90" />
        </g>
        <rect x="75" y="195" width="150" height="30" rx="8" fill="#27272A" stroke="#EAB308" stroke-width="1.5" />
        <text x="150" y="215" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="11" fill="#FEF08A">ROMANOS 8:37</text>
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">VERSO (COSTAS) • Camisa JV</text>
      </svg>
    `
  },

  vq7: {
    front: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Camisa Polo VQ7 Frente -->
        <path d="M70,40 C100,55 200,55 230,40 L275,105 L235,125 L215,95 L215,290 L85,290 L85,95 L65,125 L25,105 Z" fill="#0A1931" stroke="#051329" stroke-width="3" />
        <!-- Colarinho Polo Nobre -->
        <polygon points="115,40 150,110 185,40 165,35 150,55 135,35" fill="#152C52" stroke="#FFFFFF" stroke-width="1.5" />
        <line x1="150" y1="110" x2="150" y2="155" stroke="#FFFFFF" stroke-width="2" />
        <circle cx="150" cy="122" r="3" fill="#FFFFFF" />
        <circle cx="150" cy="142" r="3" fill="#FFFFFF" />
        <!-- Logo Oficial A MISSÃO VQ7 no Peito Esquerdo -->
        <g transform="translate(85, 95) scale(0.65)">
          <circle cx="45" cy="45" r="42" fill="#FFFFFF" stroke="#0A1931" stroke-width="3" />
          <image href="assets/img/vq7.png" x="5" y="5" width="80" height="80" />
        </g>
        <!-- Faixa / Patch de Honra VQ7 -->
        <g transform="translate(75, 205)">
          <rect x="0" y="0" width="150" height="32" rx="8" fill="#152C52" stroke="#3B82F6" stroke-width="1.5" />
          <text x="75" y="20" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="bold" font-size="11" fill="#FFFFFF">A MISSÃO VQ7</text>
        </g>
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">FRENTE • Camisa Polo VQ7</text>
      </svg>
    `,
    back: `
      <svg viewBox="0 0 300 340" class="w-full h-auto drop-shadow-md">
        <!-- Camisa Polo Costas -->
        <path d="M70,40 C110,48 190,48 230,40 L275,105 L235,125 L215,95 L215,290 L85,290 L85,95 L65,125 L25,105 Z" fill="#0A1931" stroke="#051329" stroke-width="3" />
        <!-- Colarinho Costas -->
        <path d="M115,40 C135,46 165,46 185,40" fill="none" stroke="#FFFFFF" stroke-width="2" />
        <!-- Escudo A MISSÃO VQ7 Grande nas Costas -->
        <g transform="translate(100, 75) scale(0.85)">
          <circle cx="60" cy="60" r="58" fill="#FFFFFF" stroke="#3B82F6" stroke-width="3" />
          <image href="assets/img/vq7.png" x="5" y="5" width="110" height="110" />
        </g>
        <rect x="65" y="195" width="170" height="30" rx="8" fill="#152C52" stroke="#3B82F6" stroke-width="1.5" />
        <text x="150" y="215" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="10" fill="#E0E7FF">24H / 7 DIAS COM CRISTO</text>
        <text x="150" y="325" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#1E293B">VERSO (COSTAS) • Polo VQ7</text>
      </svg>
    `
  }
};
