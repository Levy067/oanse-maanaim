# Portal OANSE • Igreja Batista Regular Maanaim (2027)

> **"Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade."** — *2 Timóteo 2:15*

Sistema completo e portal web responsivo desenvolvido para o **Ministério OANSE da Igreja Batista Regular Maanaim**, focado na evangelização, discipulado bíblico, acompanhamento semanal de oansistas, controle de presença e contagem automática de Talentos ($T$).

---

## 📱 Estrutura e Funcionalidades

### 🌟 1ª ABA: Início & Clubes
- **Identidade e Definição do OANSE:** Significado do acróstico (*Obreiro Aprovado Não Se Envergonha*), versículo-chave (2 Timóteo 2:15) e nova logomarca oficial do OANSE.
- **Programação Semanal (5 Momentos Oficiais):**
  1. Abertura e Louvores
  2. Estudo Devocional
  3. Momento do Manual
  4. Jogos Oanse
  5. Lanche e Despedida
- **Barra Interativa de Clubes com Borda Colorida no Hover:**
  - 🐻 **Ursinho:** Borda Vermelha (`#DC2626`)
  - ⚡ **Faísca:** Borda Amarela (`#EAB308`)
  - 🌿 **Flama:** Borda Verde (`#16A34A`)
  - 🔥 **Tocha:** Borda Azul (`#2563EB`)
  - 🏃 **JV:** Borda Preta (`#000000`)
  - 🛡️ **VQ7:** Borda Azul Marinho (`#0A1931`)
- **Páginas Detalhadas dos Clubes:**
  - **Visualizador de Manuais Oficiais do Clube** (modal interativo com detalhes de cada manual, seções e talentos)
  - **Visualizador de Farda Oficial (Frente e Verso)** com as fotos/mockups reais de cada clube
  - Faixa e condecorações
  - Faixas etárias limpas e lemas

---

### 📋 2ª ABA: Área do Líder & Ficha dos Oansistas
- **Acesso Seguro por Senha:**
  - Senhas individuais para cada clube e senha mestra para a coordenação (mantidas seguras e ocultas da UI).
- **Abas de Seleção de Oansistas:**
  - Barra de seleção para alternar entre os oansistas cadastrados e abrir a ficha individual com um clique.
- **Presença Pré-Preenchida em Todos os Sábados:**
  - Lista completa dos sábados oficiais do ano: 1º Semestre (Fevereiro a Junho) e 2º Semestre (Agosto a Novembro) com marcação direta `P` (Presente) e `F` (Falta) e percentual de frequência.
- **Ficha de Cadastro em Cards:**
  - Nome completo, idade, data de nascimento, endereço, telefone, com quem mora, **Ano do OANSE selecionável**.
- **Marcação de Seções e Cálculo Automático de Talentos (T$):**
  - Prova de Ingresso (1 ao 9), Grau (1 ao 12), E1 a E4 (1 ao 17), T1 a T4 (1 ao 17) e Ursinho.
  - Cálculo instantâneo em tempo real baseado no sistema oficial de contagem.
  - **Atividades e Pontos Extras com botões `[-]` e `[+]`**: Bíblia, Farda, Visitante, Tarefa, Concurso Bíblico, Olimpíadas.
  - Impressão formatada da ficha do oansista.

---

### 📅 3ª ABA: Calendário do OANSE 2027
- Calendário completo de 2027 com destaque para sábados.
- Adição e remoção de eventos com persistência em `localStorage`.
