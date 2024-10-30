# Project H

Este projeto consiste em uma rede social acadêmica que permite a interação entre alunos e colaboradores da universidade. Inspirado em plataformas como Twitter, Bluesky e Threads, o foco principal é promover um ambiente de compartilhamento de projetos, eventos, e ações acadêmicas. O objetivo é criar uma ferramenta colaborativa e comunicativa para estudantes dos cursos de TI e Design.

## Tecnologias Utilizadas

### Front-end
- **Next.js 15**: Framework de React para desenvolvimento de aplicações web com renderização híbrida (SSR/SSG).
- **Tailwind CSS**: Framework de CSS utilitário para estilização rápida e responsiva.
- **pnpm**: Gerenciador de pacotes rápido e eficiente para instalar as dependências do front-end.

### Back-end
- **Bun**: Runtime JavaScript rápido, usado para rodar o backend.
- **Fastify**: Framework web para Node.js focado em performance e simplicidade.

## Estrutura do Projeto

- `frontend/`: Contém o código fonte do front-end.
- `backend/`: Contém o código fonte do back-end.

## Pré-requisitos

- **Node.js**: v16 ou superior (recomendado).
- **Bun**: Para rodar o back-end.
- **pnpm**: Para gerenciar dependências do front-end.
- **Docker**: Para rodar o banco de dados em um container.

## Instalação e Configuração

### Clonando o Repositório

```bash
# Clone este repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Navegue até o diretório do projeto
cd seu-repositorio
```

### Configuração do Front-end

1. Navegue até o diretório do `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências usando **pnpm**:
   ```bash
   pnpm install
   ```
3. Execute o ambiente de desenvolvimento:
   ```bash
   pnpm dev
   ```
4. O front-end estará disponível em `http://localhost:3000`.

### Configuração do Back-end

1. Navegue até o diretório do `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências usando **bun**:
   ```bash
   bun install
   ```
3. Suba o container com o banco de dados:
   ```bash
   docker compose up -d
   ```
4. Execute as migrations para criar as tabelas no banco de dados:
   ```bash
   bun db:generate && bun db:migrate
   ```
5. Execute o servidor do back-end:
   ```bash
   bun run dev
   ```
6. O back-end estará disponível em `http://localhost:8080`.

## Scripts Disponíveis

### Front-end

- `pnpm dev`: Inicia o servidor de desenvolvimento do Next.js.
- `pnpm build`: Cria a build de produção do projeto.
- `pnpm start`: Inicia o servidor com a build de produção.

### Back-end

- `bun dev`: Inicia o servidor de desenvolvimento com Fastify.
- `bun start`: Inicia o servidor em modo de produção.

## Funcionalidades Principais
- **Cadastro e autenticação de usuários** com verificação de e-mail institucional.
- **Publicação de conteúdos** (posts) que podem incluir textos, links, e imagens.
- **Interação entre usuários**, incluindo curtidas e comentários em posts.
- **Sistema de seguidores**, permitindo que usuários acompanhem atualizações uns dos outros.

## Diagrama de atividades

Abaixo está o diagrama de atividades do projeto:

![Diagrama de atividades](./project-h-uml.png)

## Backlog

![Backlog](./backlog-project-h.jpg)

## Contribuindo

1. Faça um fork do repositório.
2. Crie uma nova branch com sua feature ou correção: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'Adicionei minha feature'`.
4. Faça um push para a branch: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## Contato
Para mais informações ou dúvidas, entre em contato com o desenvolvedor principal através do e-mail: [seu-email@dominio.com](mailto:seu-email@dominio.com)

