# Portal OANSE • Igreja Batista Regular Maanaim (2027)

> **"Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade."** — *2 Timóteo 2:15*

Sistema completo e portal web responsivo desenvolvido para o **Ministério OANSE da Igreja Batista Regular Maanaim**, focado na evangelização, discipulado bíblico, acompanhamento semanal de oansistas e líderes, controle de presenças e contagem automática de Talentos ($T$).

---

## 🚀 Como Publicar na Web (GitHub + Vercel + Firebase)

O sistema foi preparado para rodar em nuvem com sincronização bidirecional em tempo real: qualquer alteração de presença, pontuação ou cadastro feita por um líder no celular ou computador é refletida instantaneamente para todos que estiverem com o link aberto.

### 1. Criar o Repositório no GitHub
1. Acesse [github.com](https://github.com) e crie um novo repositório (ex: `oanse-maanaim` ou `O2027`), público ou privado, sem inicializar com README.
2. No seu terminal (ou Git Bash), conecte este repositório local ao GitHub:
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```

### 2. Publicar na Vercel (Hospedagem Gratuita com Link Oficial)
1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. Clique em **"Add New..."** > **"Project"**.
3. Selecione o repositório importado do GitHub e clique em **"Deploy"**.
4. Em menos de 1 minuto, a Vercel gerará o link oficial seguro HTTPS (ex: `https://oanse-maanaim.vercel.app`).
5. A cada novo `git push`, a Vercel atualiza o site automaticamente em segundos!

### 3. Ativar o Firebase (Banco de Dados em Tempo Real)
1. Acesse o [Firebase Console](https://console.firebase.google.com/) e crie um projeto gratuito (ex: `oanse-maanaim`).
2. No menu lateral, acerte em **Build > Firestore Database** > **Criar banco de dados** e escolha **Modo de Teste** (permite leitura e gravação imediatas).
3. Vá em **Configurações do Projeto** (ícone de engrenagem) > **Geral** > **Seus aplicativos** > clique no ícone web `</>`.
4. Copie o objeto `firebaseConfig` fornecido e cole no arquivo [`js/firebase-config.js`](js/firebase-config.js).
5. Faça o commit e push para o GitHub:
   ```bash
   git add js/firebase-config.js
   git commit -m "chore: adiciona credenciais do Firebase Firestore"
   git push
   ```
6. Pronto! O badge no topo da página passará de `⚪ Modo Local` para `🟢 Nuvem Sincronizada`.

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
  - **Visualizador de Manuais Oficiais do Clube** (modal com estado "Sem dados para exibir" aguardando material oficial)
  - **Visualizador de Farda Oficial (Frente e Verso)** com as fotos/mockups reais de cada clube
  - **Faixa do Clube** (modal com estado "Sem conteúdo para exibir" com condecorações futuras)
  - Faixas etárias, lemas oficiais e versículos-chave de cada clube.

---

### 📋 2ª ABA: Área do Líder & Ficha dos Oansistas
- **Acesso Seguro por Senha:**
  - Senhas individuais para cada clube e senha mestra para a coordenação (mantidas seguras e ocultas da UI).
- **Fichas de Oansistas e Fichas de Líderes:**
  - Dropdown interativo para selecionar oansistas ou líderes cadastrados.
  - Card cinza padronizado para líderes de todos os clubes.
  - Regra de talentos: 1 presença de líder = 1 talento; seções faladas com pontuação padrão.
- **Presença Pré-Preenchida em Todos os Sábados:**
  - Lista completa dos sábados oficiais: 1º Semestre (Fev a Jun) e 2º Semestre (Ago a Nov) com marcação direta `P` (Presente) e `F` (Falta).
- **Cálculo Automático de Talentos (T$):**
  - Prova de Ingresso, Grau, E1 a E4, T1 a T4, Ursinho.
  - Pontos extras com `[-]` e `[+]`: Bíblia, Farda, Visitante, Tarefa, Concurso Bíblico (+10 T$), Olimpíadas (+10 T$).
  - Impressão formatada da ficha do oansista e do líder.

---

### 📅 3ª ABA: Calendário do OANSE 2027
- Calendário completo de 2027 com destaque para os sábados do Ministério.
- Adição e remoção de eventos com persistência sincronizada no Firebase Firestore.
