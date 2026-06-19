# ✈️ FinancialPlan - Seu Intercâmbio

<div align="center">

[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.0-000000?style=flat-square&logo=express)](https://expressjs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-5.0%2B-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io)
[![Jest](https://img.shields.io/badge/Jest-29%2B-C21325?style=flat-square&logo=jest)](https://jestjs.io)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📋 Sobre o Projeto

**FinancialPlan - Seu Intercâmbio** é uma plataforma SaaS Full-Stack inovadora, desenvolvida para simplificar o planejamento financeiro de estudantes e viajantes que se preparam para um intercâmbio internacional. 

O projeto resolve um problema crítico: a falta de uma solução centralizada e intuitiva para gerenciar múltiplas metas financeiras, controlar transações em moedas estrangeiras e organizar todas as pendências relacionadas à viagem de forma coordenada.

Com uma interface moderna e responsiva, o **FinancialPlan** permite que o usuário visualize seu progresso em tempo real, acompanhe seus gastos em diferentes moedas e nunca mais perca um documento ou tarefa importante da preparação para seu intercâmbio.

---

## 🚀 Principais Funcionalidades

- ✅ **Autenticação Segura**: Sistema robusto de autenticação com JWT e criptografia de senhas com Bcrypt
- 💰 **Dashboard Inteligente**: Painel centralizado para gerenciar múltiplos destinos de intercâmbio com metas financeiras independentes
- 🌍 **Suporte a Múltiplas Moedas**: Cálculos precisos em diferentes moedas (USD, EUR, etc.) com conversão automática
- 📊 **Controle de Transações**: Registro detalhado de aportes e transações que alimentam a barra de progresso de cada meta
- ✔️ **Checklist Dinâmico**: Lista de tarefas de viagem (passaporte, vistos, passagens, etc.) vinculada a cada destino
- 📱 **100% Responsivo**: Interface Mobile First que funciona perfeitamente em qualquer dispositivo
- ⚡ **UX Premium**: Skeleton Loaders e animações suaves para uma experiência de usuário excepcional
- 🔄 **Sincronização em Tempo Real**: Atualizações instantâneas dos dados entre frontend e backend

---

## 🛠️ Tecnologias Utilizadas

### 🎨 Front-End

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **React.js** | 18.0+ | Biblioteca JavaScript para construção da UI |
| **Vite** | 5.0+ | Build tool ultrarrápido e moderno |
| **TypeScript** | 5.0+ | Linguagem tipada para maior segurança |
| **Tailwind CSS** | 3.0+ | Framework CSS utilitário para estilização responsiva |
| **React Router DOM** | 6.0+ | Roteamento client-side da aplicação |
| **Lucide React** | 0.360+ | Ícones SVG personalizáveis e modernos |

### 🔧 Back-End

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | 18.0+ | Runtime JavaScript para servidor |
| **Express** | 4.0+ | Framework web minimalista e robusto |
| **TypeScript** | 5.0+ | Linguagem tipada para maior segurança |
| **Prisma ORM** | 5.0+ | ORM moderno para banco de dados relacional |
| **JWT (JSON Web Token)** | - | Autenticação stateless e segura |
| **Bcrypt** | - | Criptografia segura de senhas |
| **Jest** | 29.0+ | Framework de testes automatizados |

### 💾 Banco de Dados

- **PostgreSQL / MySQL**: Banco de dados relacional com suporte a transações ACID
- **Prisma ORM**: Abstração segura e type-safe do banco de dados
- **Transações Atômicas**: Implementação de `Prisma $transaction` para exclusão em cascata segura

---

## 📥 Como Executar o Projeto Localmente

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (v18 ou superior) - [Download aqui](https://nodejs.org)
- **npm** ou **yarn** - Gerenciador de pacotes
- **Git** - Para clonar o repositório
- **PostgreSQL** (ou MySQL) - Banco de dados relacional
- **Um editor de código** - VSCode recomendado

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/VINICIUS0098876/FinancialPlan.git
cd FinancialPlan
```

### 2️⃣ Instalar Dependências

Instale as dependências do projeto em ambos os diretórios:

```bash
# Instalar dependências globais do projeto
npm install

# Caso utilize yarn
yarn install
```

### 3️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/financialplan"

# JWT
JWT_SECRET="sua_chave_secreta_super_segura_aqui"
JWT_EXPIRE_IN="7d"

# API URL (para desenvolvimento)
VITE_API_URL="http://localhost:3000/api"

# Node Environment
NODE_ENV="development"

# Server Port
PORT=3000
```

> ⚠️ **Importante**: Nunca compartilhe suas credenciais! Adicione `.env` ao `.gitignore` se ainda não estiver lá.

### 4️⃣ Configurar Banco de Dados

Configure o banco de dados PostgreSQL e execute as migrações do Prisma:

```bash
# Criar banco de dados (se necessário)
createdb financialplan

# Executar migrações do Prisma
npx prisma migrate dev --name init

# (Opcional) Gerar Prisma Client
npx prisma generate

# (Opcional) Visualizar dados com Prisma Studio
npx prisma studio
```

### 5️⃣ Instalar Dependências do Front-End (se separado)

Caso o front-end esteja em um diretório separado:

```bash
cd frontend
npm install
```

### 6️⃣ Executar o Projeto em Desenvolvimento

#### Backend

```bash
# Inicia o servidor Express na porta 3000
npm run dev

# Ou, se configurado com ts-node
ts-node src/server.ts
```

O servidor estará disponível em: **http://localhost:3000**

#### Frontend

```bash
# Em outro terminal, abra a pasta do frontend
cd frontend

# Inicie o servidor de desenvolvimento Vite
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173**

### 7️⃣ Build para Produção

#### Build do Backend

```bash
npm run build
npm start
```

#### Build do Frontend

```bash
cd frontend
npm run build

# Servir a build em produção
npm run preview
```

---

## 🧪 Testes

O projeto utiliza **Jest** para testes automatizados. Siga os passos abaixo para executar os testes:

### Executar Todos os Testes

```bash
npm test
```

### Executar Testes em Modo Watch

Monitora mudanças de arquivo e re-executa os testes automaticamente:

```bash
npm test -- --watch
```

### Executar Testes com Coverage

Gera um relatório de cobertura de testes:

```bash
npm test -- --coverage
```

### Executar Testes de um Arquivo Específico

```bash
npm test -- src/__tests__/auth.test.ts
```

### Exemplo de Estrutura de Testes

```
src/
├── __tests__/
│   ├── auth.test.ts
│   ├── transactions.test.ts
│   ├── destinations.test.ts
│   └── checklist.test.ts
├── controllers/
├── services/
├── routes/
└── ...
```

---

## 📂 Estrutura do Projeto

```
FinancialPlan/
├── src/
│   ├── controllers/        # Controladores da API
│   ├── services/           # Lógica de negócios
│   ├── routes/             # Definição de rotas
│   ├── middleware/         # Middlewares (autenticação, validação)
│   ├── types/              # Tipos TypeScript
│   ├── prisma/
│   │   └── schema.prisma   # Schema do banco de dados
│   ├── __tests__/          # Testes automatizados
│   └── server.ts           # Ponto de entrada do backend
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── hooks/          # Custom Hooks
│   │   ├── services/       # Serviços de API
│   │   ├── styles/         # Estilos globais
│   │   └── App.tsx         # Componente raiz
│   └── vite.config.ts      # Configuração Vite
├── .env                    # Variáveis de ambiente
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
└── README.md               # Documentação do projeto
```

---

## 🔐 Segurança

- ✅ Senhas criptografadas com **Bcrypt**
- ✅ Autenticação com **JWT** (JSON Web Tokens)
- ✅ Validação de entrada em todas as rotas
- ✅ Proteção contra SQL Injection via Prisma ORM
- ✅ CORS configurado para requisições seguras
- ✅ Transações atômicas para integridade de dados

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você deseja contribuir com o projeto:

1. Faça um **Fork** do repositório
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

---

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 📞 Contato & Suporte

Se você tiver dúvidas, sugestões ou enfrentar problemas, sinta-se livre para:

- 📧 Abrir uma [Issue](https://github.com/VINICIUS0098876/FinancialPlan/issues)
- 💬 Iniciar uma discussão no repositório
- 🔗 Me contatar através do GitHub

---

## 🎯 Roadmap Futuro

- [x] Integração com APIs de câmbio em tempo real
- [ ] Sistema de notificações e lembretes
- [x] Relatórios financeiros e gráficos avançados
- [ ] Compartilhamento de metas com amigos
- [x] Suporte a múltiplos idiomas
- [ ] Aplicativo mobile nativo (React Native)
- [ ] Integração com calendário (Google Calendar, Outlook)

---

<div align="center">

**Desenvolvido por Vinicius**

⭐ Se este projeto foi útil para você, considere deixar uma estrela no repositório!

</div>
