// Dados Oficiais dos Clubes OANSE - Igreja Batista Regular Maanaim
const CLUBS_DATA = {
  ursinho: {
    id: "ursinho",
    name: "Ursinho",
    fullName: "Clube Ursinho",
    badge: "assets/img/ursinho.png",
    uniformMockup: "assets/img/farda-ursinho.png",
    color: "#DC2626",
    borderColor: "#DC2626", // Vermelho
    colorLight: "#FEE2E2",
    colorDark: "#991B1B",
    age: "4 e 5 anos",
    gender: "Meninos e Meninas",
    motto: "Jesus me ama!",
    verse: '"Nisto está o amor: não em que nós tenhamos amado a Deus, mas em que ele nos amou e enviou o seu Filho como propiciação pelos nossos pecados." (1 João 4:10)',
    password: "ursinho2027",
    description: "O Clube Ursinhos é dedicado para crianças de 4 e 5 anos e seu lema é \"Jesus me ama!\". 🐻❤️\n\nAssim como os nomes de seus manuais, Amor e Alegria não faltam neste clube com os pequeninos que fazem parte dele!\n\nNo Ministério Oanse, desde bem novos, eles têm o privilégio de aprenderem a Palavra de Deus e são ensinados da necessidade de crer em Jesus para a salvação, amá-lo e reconhecê-lo como único caminho para a vida eterna!",
    manuals: [
      { id: "amor", name: "Manual Amor", desc: "Primeiro manual do Ursinho com histórias de criação, amor de Deus e versículos fundamentais." },
      { id: "alegria", name: "Manual Alegria", desc: "Segundo manual com ênfase na obediência alegre e o discipulado inicial." }
    ],
    uniform: {
      title: "Camiseta Oficial Vermelha Ursinho",
      details: "Camiseta vermelha com o emblema oficial do Clube Ursinho estampado na frente e a logo OANSE na parte superior das costas.",
      instructions: "Usada com calça ou bermuda confortável e calçados adequados para as brincadeiras."
    },
    sash: {
      title: "Faixa e Condecorações Ursinho",
      details: "Os ursinhos recebem distintivos em forma de pegada e condecorações costuradas ou fixadas conforme completam os 'Abraços do Ursinho' e seções de memorização."
    },
    activities: [
      "Tempo dos Ursinhos (História Bíblica com Fantoches)",
      "Tempo dos Manuais (Revisão um-a-um com o líder)",
      "Tempo de Brincadeiras (Jogos no Círculo Oanse)",
      "Lanche Comunitário e Oração"
    ]
  },

  faisca: {
    id: "faisca",
    name: "Faísca",
    fullName: "Clube Faísca",
    badge: "assets/img/faisca.png",
    uniformMockup: "assets/img/farda-faisca.png",
    color: "#EAB308",
    borderColor: "#EAB308", // Amarelo
    colorLight: "#FEF9C3",
    colorDark: "#A16207",
    age: "6 a 8 anos",
    gender: "Meninos e Meninas",
    motto: "Meu amigo para Cristo!",
    verse: '"Porque Deus amou ao mundo de tal maneira que deu o seu Filho unigênito, para que todo o que nele crê não pereça, mas tenha a vida eterna." (João 3:16)',
    password: "faisca2027",
    description: "O Clube Faíscas é especialmente para crianças de 6, 7 e 8 anos e seu lema é \"Meu amigo para Cristo!\". 💛\n\nSeus manuais são Saltador, Caminhante e Escalador. Nessa jornada de 3 anos no clube, nossos faisquinhas saltam de alegria na caminhada iniciada com Deus e vão escalando cada vez mais as verdades do Evangelho!\n\nA mensagem que o Ministério Oanse se dedica a entregar aos pequeninos, encontro após encontro lhes é trazida à memória através do seu versículo chave!",
    manuals: [
      { id: "caminhante", name: "Manual Caminhante", desc: "Passos iniciais na fé: Prova de Ingresso, Grau e Exercícios Bíblicos E1 a E4." },
      { id: "saltador", name: "Manual Saltador", desc: "Progresso na memorização e aprendizado dinâmico de personagens bíblicos." },
      { id: "escalador", name: "Manual Escalador", desc: "Avanço e coroação com condecorações especiais de perseverança." }
    ],
    uniform: {
      title: "Camiseta Oficial Amarela Faísca",
      details: "Camiseta amarela com o personagem oficial Faísca na frente e logo OANSE nas costas.",
      instructions: "Usada com calça ou bermuda escura e tênis para as atividades no Círculo Oanse."
    },
    sash: {
      title: "Faixa Oficial Faísca (Asas e Coroas)",
      details: "As crianças recebem as asas do Faísca, coroas de cada manual (Caminhante, Saltador, Escalador) e condecorações fixadas no uniforme/faixa."
    },
    activities: [
      "Reunião Conjunta e Louvor Vibrante",
      "Jogos do Quadrilátero Faísca no Círculo Oanse",
      "Escuta da Lição Bíblica e Memorização Ativa",
      "Cerimônia de entrega de Talentos e Moedas"
    ]
  },

  flama: {
    id: "flama",
    name: "Flama",
    fullName: "Clube Flama",
    badge: "assets/img/flama.png",
    uniformMockup: "assets/img/farda-flama.png",
    color: "#16A34A",
    borderColor: "#16A34A", // Verde
    colorLight: "#DCFCE7",
    colorDark: "#15803D",
    age: "9 e 10 anos",
    gender: "Meninos e Meninas",
    motto: "O outro menino e menina para Cristo!",
    verse: '"Mas, ao que não trabalha, porém crê naquele que justifica o ímpio, a sua fé lhe é atribuída como justiça." (Romanos 4:5)',
    password: "flama2027",
    description: "O Clube Flama é para crianças de 9 e 10 anos e seu lema é \"O outro menino e menina para Cristo!\". 💚\n\nOs manuais são Sabiá e Águia e trazem versículos e exercícios bíblicos que ensinam seus oansistas a se firmarem nas verdades da Palavra de Deus dia após dia.\n\nNo Ministério Oanse, os flamas vão trilhando um caminho de confiança e crescimento na fé no Senhor Jesus, entendendo que somente nele podem ser considerados justos diante de Deus.",
    manuals: [
      { id: "sabia", name: "Manual Sabiá", desc: "Foco no discipulado diário, Prova de Ingresso, Grau e Exercícios Bíblicos E1 a E4 com atividades práticas." },
      { id: "aguia", name: "Manual Águia", desc: "Aprofundamento na Palavra de Deus, oração, missões mundiais e aplicação cristã prática." }
    ],
    uniform: {
      title: "Camiseta Oficial Verde Flama",
      details: "Camiseta verde com o emblema oficial do Clube Flama estampado na frente e logo OANSE nas costas.",
      instructions: "Usada com a faixa transversal de condecorações e calça/bermuda padrão."
    },
    sash: {
      title: "Faixa Oficial de Condecorações Flama",
      details: "Faixa diagonal verde/branca onde são fixados os distintivos de Grau, barras de Exercícios Bíblicos e Atividades, além de frequência anual."
    },
    activities: [
      "Consagração de Abertura e Oração",
      "Desafios Bíblicos e Competições no Círculo Oanse",
      "Aconselhamento e Escuta de Seções com os Líderes",
      "Feira de Talentos do Oanse Maanaim"
    ]
  },

  tocha: {
    id: "tocha",
    name: "Tocha",
    fullName: "Clube Tocha",
    badge: "assets/img/tocha.png",
    uniformMockup: "assets/img/farda-tocha.png",
    color: "#2563EB",
    borderColor: "#2563EB", // Azul
    colorLight: "#DBEAFE",
    colorDark: "#1D4ED8",
    age: "11 e 12 anos",
    gender: "Meninos e Meninas",
    motto: "O outro jovem para Cristo",
    verse: '"Porquanto a graça de Deus se manifestou salvadora a todos os homens, educando-nos para que, renegadas a impiedade e as paixões mundanas, vivamos, no presente século, sensata, justa e piedosamente, aguardando a bendita esperança e a manifestação da glória do nosso grande Deus e Salvador Cristo Jesus." (Tito 2:11-13)',
    password: "tocha2027",
    description: "O Clube Tocha conta com a participação dos adolescentes de 11 e 12 anos e seu lema é \"O outro jovem para Cristo\". 💙\n\nOs manuais deste clube são dois: Carneiro e Leão. Durante dois anos, nossos tochas são ensinados e motivados a praticar a Palavra de Deus, tendo Cristo como alvo de vida!\n\nNo Oanse, aprendemos e propagamos a verdade de que devemos refletir para o mundo, dia após dia, o brilho do nosso Salvador Jesus.",
    manuals: [
      { id: "carneiro", name: "Manual Carneiro", desc: "Estudo de sacrifício, redenção em Cristo, doutrinas bíblicas e Prova de Ingresso Tocha." },
      { id: "leao", name: "Manual Leão", desc: "Coragem na fé, fidelidade sob pressão, profecias e testemunho cristão autêntico." }
    ],
    uniform: {
      title: "Camiseta Oficial Azul Tocha",
      details: "Camiseta azul royal com o emblema oficial da Tocha na frente e logo OANSE nas costas.",
      instructions: "Usada com a faixa oficial de condecorações e calça escura formal ou esportiva."
    },
    sash: {
      title: "Faixa Oficial de Condecorações Tocha",
      details: "Faixa oficial com espaço para as divisas de Grau, medalhões de mérito, condecorações de Exercícios Bíblicos e medalhas das Olimpíadas."
    },
    activities: [
      "Estudo Bíblico em Grupo Pequeno",
      "Jogos Estratégicos e Esportivos no Círculo",
      "Treinamento para as Olimpíadas Oanse Regionais",
      "Projetos Práticos de Evangelização e Ação Social"
    ]
  },

  jv: {
    id: "jv",
    name: "JV",
    fullName: "Clube JV (Jovens Vencedores)",
    badge: "assets/img/jv.png",
    uniformMockup: "assets/img/farda-jv.png",
    color: "#18181B",
    borderColor: "#000000", // Preto
    colorLight: "#F4F4F5",
    colorDark: "#09090B",
    age: "13 e 14 anos",
    gender: "Rapazes e Moças",
    motto: "Jovens Vencedores para Cristo!",
    verse: '"Portanto, também nós, visto que temos a rodear-nos tão grande nuvem de testemunhas, desembaraçando-nos de todo peso e do pecado que tenazmente nos assedia, corramos, com perseverança, a carreira que nos está proposta, olhando firmemente para o Autor e Consumador da fé, Jesus." (Hebreus 12:1-2)',
    password: "jv2027",
    description: "O Clube Jovens Vencedores, também chamado JV, é para adolescentes de 13 e 14 anos e seu lema é: \"Jovens Vencedores para Cristo!\" 🖤\n\nSeus manuais são Sprint e Maratona e é neste clube que nós temos os grupos: Vem ver, Vem seguir e Vem servir. É no JV que nossos adolescentes são estimulados a se fortalecerem em Jesus, vivendo na Palavra de Deus e sendo chamados ao serviço do Reino.\n\nO Ministério Oanse tem sido essencial na vida dos jovens que estão crescendo não apenas em estatura, mas também no conhecimento e na fé de Cristo nesta caminhada trilhada com ele.",
    manuals: [
      { id: "sprint", name: "Manual Sprint", desc: "Corrida inicial: estudos temáticos, memorização de passagens e leitura de livros bíblicos inteiros." },
      { id: "maratona", name: "Manual Maratona", desc: "Perseverança na carreira cristã com foco em apologética, liderança e ética cristã." }
    ],
    uniform: {
      title: "Camiseta Oficial Preta JV",
      details: "Camiseta preta esportiva com o logotipo oficial Jovens Vencedores no peito esquerdo e logo OANSE nas costas.",
      instructions: "Confortável para gincanas e dinâmicas juvenis com calça ou bermuda adequada."
    },
    sash: {
      title: "Faixa e Insígnias Oficiais JV",
      details: "No JV, as condecorações evoluem para distintivos modernos, pins de lapela e o Troféu / Medalhão de Conclusão do JV."
    },
    activities: [
      "Debates Bíblicos Contemporâneos",
      "Acampamentos de Fim de Semana e Vigílias",
      "Gincanas de Alta Energia e Concursos de Conhecimento",
      "Serviço Ativo como Ajudantes nos Clubes Menores"
    ]
  },

  vq7: {
    id: "vq7",
    name: "VQ7",
    fullName: "Clube VQ7 (24 horas, 7 dias da semana)",
    badge: "assets/img/vq7.png",
    uniformMockup: "assets/img/farda-vq7.png", // Foto real enviada pelo usuário
    color: "#0F2C59",
    borderColor: "#0A1931", // Azul Marinho
    colorLight: "#E0E7FF",
    colorDark: "#051329",
    age: "15 anos em diante",
    gender: "Jovens e Adolescentes",
    motto: "Viver inteiramente para Jesus 24 horas por dia nos 7 dias da semana, porque a missão do cristão nunca para!",
    verse: '"Pois não me envergonho do evangelho, porque é o poder de Deus para a salvação de todo aquele que crê, primeiro do judeu e também do grego; visto que a justiça de Deus se revela no evangelho, de fé em fé, como está escrito: O justo viverá por fé." (Romanos 1:16-17)',
    password: "vq72027",
    description: "O Clube VQ7 - 24 horas, 7 dias da semana - é para adolescentes de 15 anos em diante e prepara-os para cumprirem sua missão: “Viver inteiramente para Jesus 24 horas por dia nos 7 dias da semana, porque a missão do cristão nunca para!”. 🧡\n\nSeu material é dividido em: Fundamentos da Fé (4 panfletos de introdução), os Estudos Principais com 3 cartas paulinas (Romanos, Efésios e Gálatas) e os Estudos Complementares que abordam temas bíblicos diversos (Vontade de Deus; Homens e Mulheres de Deus etc).\n\nNeste Clube temos um programa com o objetivo de levar nossos jovens a estudarem os livros da Bíblia, tirando dúvidas, trazendo explicações e fortalecendo-os cada vez mais na fé. E assim como os outros clubes, também temos premiações e projetos de serviços e missões no VQ7.",
    manuals: [
      { 
        id: "fundamentos", 
        name: "Fundamentos da Fé", 
        desc: "4 panfletos de introdução à caminhada cristã e preparação doutrinária dos jovens." 
      },
      { 
        id: "estudos_principais", 
        name: "Estudos Principais (Cartas Paulinas)", 
        desc: "Estudo bíblico de 3 cartas paulinas fundamentais: Romanos, Efésios e Gálatas." 
      },
      { 
        id: "estudos_complementares", 
        name: "Estudos Complementares", 
        desc: "Abordam temas bíblicos diversos: Vontade de Deus, Homens e Mulheres de Deus, etc." 
      }
    ],
    uniform: {
      title: "Camiseta Oficial Azul Marinho VQ7",
      details: "Camiseta azul marinho oficial com o logotipo 'A MISSÃO VQ7' estampado no peito esquerdo e logo OANSE nas costas.",
      instructions: "Postura madura e exemplo de liderança espiritual para toda a igreja."
    },
    sash: {
      title: "Faixa de Honra e Premiações VQ7",
      details: "Premiações por mérito, projetos de serviços e missões, além do reconhecimento e honra na conclusão do clube."
    },
    activities: [
      "Estudos dos Livros da Bíblia (tirando dúvidas, explicações e fortalecimento na fé)",
      "Projetos de Serviços e Missões no VQ7",
      "Premiações e Condecorações de Honra",
      "Vivência e Missão 24 horas por dia nos 7 dias da semana"
    ]
  }
};

// Senha mestra da Igreja Maanaim (Pastor / Coordenação Geral)
const MASTER_PASSWORD = "maanaim2027";
