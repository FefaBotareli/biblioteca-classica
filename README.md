# Desafio Técnico - Biblioteca Clássica

Aplicação fullstack desacoplada desenvolvida como parte do processo seletivo para Desenvolvedor Júnior.

## 📜 Descrição

Esta é uma aplicação de gestão de uma biblioteca, permitindo o CRUD (Criar, Ler, Editar, Apagar) de Livros e Autores. A aplicação foi construída com um backend Laravel a servir uma API segura e um frontend React para a interação do utilizador.

---

## ✨ Funcionalidades Implementadas

* **Backend (API RESTful):**
    * CRUD completo para Autores.
    * CRUD completo para Livros.
    * Relacionamento `one-to-many` entre Autores e Livros.
* **Segurança:**
    * Autenticação de utilizadores baseada em tokens com Laravel Sanctum.
    * Rotas de CRUD protegidas, acessíveis apenas a utilizadores autenticados.
    * Endpoints para registo, login e logout de utilizadores.
* **Frontend (React):**
    * Interface de utilizador reativa, moderna e responsiva.
    * Fluxo de autenticação completo (login/registo).
    * Gestão completa de Autores e Livros através de formulários em janelas modais para uma melhor UX.
    * Navegação entre as diferentes secções da aplicação.

---

## 🛠️ Tecnologias Utilizadas

* **Backend:** PHP 8.x, Laravel 12.x
* **Base de Dados:** MySQL
* **Frontend:** React (Vite), CSS Puro
* **Autenticação:** Laravel Sanctum
* **Ferramentas:** Composer, NPM, Git, Postman

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos
* PHP >= 8.2
* Composer
* Node.js e NPM
* Um servidor de base de dados MySQL

### 1. Configuração do Backend (Laravel)

```bash
# Clone o repositório
git clone URL_DO_SEU_REPOSITORIO.git
cd desafio-fullstack/desafio-biblioteca

# Instale as dependências do PHP
composer install

# Copie o ficheiro de ambiente e configure a sua base de dados
cp .env.example .env
# (Edite o .env com os detalhes da sua base de dados: DB_DATABASE, DB_USERNAME, DB_PASSWORD)

# Gere a chave da aplicação
php artisan key:generate

# Execute as migrações para criar as tabelas na base de dados
php artisan migrate:fresh

# Inicie o servidor da API
php artisan serve

```
---

## 📖 Documentação da API

A API requer autenticação para a maioria dos endpoints. O fluxo é: `Registar` -> `Login` (para obter um token) -> `Aceder a outros endpoints` (enviando o token).

**Header de Autenticação:**
Para todos os endpoints protegidos, envie os seguintes headers:
- `Accept: application/json`
- `Authorization: Bearer SEU_TOKEN_DE_ACESSO`

---

### Autenticação

#### `POST /api/register`
Regista um novo utilizador.

* **Corpo da Requisição (JSON):**
    ```json
    {
        "name": "Nome do Utilizador",
        "email": "email@exemplo.com",
        "password": "password123",
        "password_confirmation": "password123"
    }
    ```
* **Resposta de Sucesso (201 Created):**
    ```json
    {
        "access_token": "1|seuTokenSuperSecreto...",
        "token_type": "Bearer",
        "user": { ...dados do utilizador... }
    }
    ```

#### `POST /api/login`
Autentica um utilizador e retorna um token de acesso.

* **Corpo da Requisição (JSON):**
    ```json
    {
        "email": "email@exemplo.com",
        "password": "password123"
    }
    ```
* **Resposta de Sucesso (200 OK):**
    ```json
    {
        "access_token": "2|outroTokenSuperSecreto...",
        "token_type": "Bearer",
        "user": { ...dados do utilizador... }
    }
    ```
---

### Autores (Protegido)

#### `GET /api/autores`
Lista todos os autores.

#### `POST /api/autores`
Cria um novo autor.

* **Corpo da Requisição (JSON):**
    ```json
    {
        "nome": "Jane Austen",
        "pseudonimo": null,
        "data_nascimento": "1775-12-16",
        "data_morte": "1817-07-18"
    }
    ```
* **Resposta de Sucesso (201 Created):** Retorna o objeto do autor recém-criado.

*(Você pode continuar este padrão para os outros endpoints: `GET /api/autores/{id}`, `PUT /api/autores/{id}`, `DELETE /api/autores/{id}`, e também para Livros e Gêneros)*

