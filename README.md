# Projeto com Prisma ORM

Bem-vindo ao projeto que utiliza o Prisma ORM para interagir com o banco de dados. Este README fornecerá as instruções necessárias para você iniciar o projeto localmente.

## Requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- Node.js (https://nodejs.org/)
- npm (gerenciador de pacotes do Node.js, já incluído na instalação do Node.js)
- Um banco de dados suportado pelo Prisma (por exemplo, PostgreSQL, MySQL, SQLite)

## Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias. Um exemplo básico para o PostgreSQL:

   ```bash
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome-do-banco"

   ```

4. Se você estiver começando um novo projeto, pode ser útil executar as migrações para criar o esquema do banco de dados e os dados iniciais. Execute os seguintes comandos:

   ```bash
    npx prisma migrate dev
   ```

5. Após a configuração, você pode iniciar o projeto localmente. Execute o seguinte comando:

   Para usar no modo "watch"

   ```bash
    npx run start:dev
   ```

## Para Frontend

1. Crie um localhost, com o seguinte comando:

```bash
npm run start
```
