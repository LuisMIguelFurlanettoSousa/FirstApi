# 🔐 Implementando Autenticação com Node.js, Express, bcrypt e JWT 🔐

Hoje concluí um projeto onde implementei autenticação segura em uma aplicação Node.js! 🚀

## ✅ O que foi feito?

- Criei **rotas públicas e privadas**
- Implementei **registro de usuários** com criptografia de senha usando **bcrypt**
- Utilizei **JWT (JSON Web Token)** para autenticação via token
- Protegi rotas garantindo que apenas **usuários autenticados** tenham acesso

💡 A segurança dos dados do usuário é essencial, e esse processo fortalece a proteção contra acessos não autorizados.

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **bcrypt**
- **JWT (JSON Web Token)**
- **Dotenv**
- **MongoDB / PostgreSQL** *(dependendo do banco escolhido)*

## 📂 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/LuisMIguelFurlanettoSousa/FirstApi.git
   ```
2. Instale as dependências:
   ```bash
   cd FistApi
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` com as credenciais necessárias (exemplo abaixo):
   ```env
   PORT=3000
   JWT_SECRET=seu_segredo_super_seguro
   DATABASE_URL=mongodb://localhost:27017/meubanco
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

## 📌 Rotas da API

- **POST /register** → Registra um novo usuário
- **POST /login** → Realiza autenticação e retorna um token JWT
- **GET /private** → Acessível apenas para usuários autenticados

---

✨ **Este projeto ajudou a fortalecer minhas habilidades em autenticação e segurança no desenvolvimento web!** ✨

📩 Feedbacks são bem-vindos! Conecte-se comigo e confira mais projetos no meu [GitHub](https://github.com/seu-usuario).

