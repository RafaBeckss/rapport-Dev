<h1 align="center">
    <br>
    <p align="center"> rapport-Dev :computer: <p>
</h1></br>

## 👩🏾‍💻 **Apresentação** 

---

A **rapport-Dev** é o projeto de conclusão do curso intensivo Back-end Todas em Tech back-end da turma ON19, iniciativa da [{Reprograma}](https://www.reprograma.com.br/) e do BID Lab, Laboratório de Inovação do Grupo Banco Interamericano de Desenvolvimento.

 O projeto rapport-Dev é uma API no modelo CRUD, com o intuito de capitar relatos de experiencias dos processos seletivos de empresa de tecnologia, afim de informar como são esses processos para diferentes grupos, vivencias e auxiliar na escolha de quem está em busca de uma vaga na área tech.
 
## :dart: Justificativa e Objetivo 
--- 
 Os processos seletivos tendem a ser momentos onde a ansiedade toma conta, por não sabermos como será e oque poderá acontecer. A ansiedade pode atrapalhar na desenvoltura e performance do candidato à vaga, assim podendo interferir no resultado da sua seleção. 

Sabemos que estudar a empresa, se conectar com pessoas da área no linkedin podem ajudar o candidato a está melhor preparado para vaga, mas mesmo assim são limitadas as informações sobre como funciona as etapas dos processos seletivos. Muitas vezes as experiências e as vivências nos processos nem sempre são parecidas entre os candidatos e também por motivos pessoais muitos não querem expor como foi a sua participação em determinado processo. 

A API rappot-Dev busca trazer essas informações de forma mais ampla e precisa, trazendo funcionalidades que permitem aos candidatos a buscar por relatos que se aproximem ao máximo das suas vivências, dando match com questões como gênero, escolaridade, e localidade. Além disso, permitindo que os candidatos que já passaram por processos seletivos relatem suas experiências de forma anônima, deste modo aumentando a privacidade e consequentemente o número de informações sobre os processos seletivos das empresas de tecnologia. Desta maneira, auxiliando os candidatos que irão participar dos processos estejam mais preparados e menos ansiosos, portanto melhorando seus resultados. 

---
## 📝🌐 Tecnologias e Dependências Utilizadas

<br>

| Ferramenta | Descrição |
| --- | --- |
| `javascript` | Linguagem de programação utilizada nesse projeto. |
| `node.js`    | Ambiente de execução do javascript.|
| `express`    | Framework NodeJS. |
| `mongoose`   | Dependência que interage com o MongoDB para a conexão da database, criação do model e das collections.|
| `nodemon`    | Dependência que observa as atualizações realizadas nos documentos para rodar o servidor automaticamente.|
| `npm`| Gerenciador de pacotes.|
| `MongoDb`    | Banco de dados não relacional orietado a documentos.|
| `Mongo Atlas`| Interface gráfica para verificar se os dados foram persistidos.|
| `Postman` | Interface gráfica para realizar os testes.|
| `jsonwebtoken `| Dependência que implementa o protocolo JSON Web Token para segurança de dados.|
| `bcrypt`| Biblioteca para encriptação de dados.|
| `dotenv`| Dependência  para gerenciar facilmente variáveis de ambiente, não é obrigatório para JWT, mas uma boa prática para configurações em geral.|
| `swagger`| Gera a documentação do projeto.|
| `Render`| Utilizado para realizar o deploy da aplicação e hospedar documentação.|
---
🗃️ Documentação [Swagger](https://rapportdev.onrender.com/minha-documentacao/#/).
</br>
## 📁 Arquitetura final do Projeto

<br>

```
 📁rapport-Dev
   |
   |--📁imagens
   |
   |--📁node_modules
   |
   |--📁 src
   |  ||
   |  ||
   |  ||--📁 controllers
   |  |    |- 📝 ModeloSchema.c
   |  |    |- 📄 relatoController.js
   |  |    |- 📄 scripts.js
   |  |    |- 📄 usuarioController.js
   |  |
   |  ||--📁 database
   |  |    |- 📄 mongooseConnect.js
   |  |
   |  ||--📁 models
   |  |    |- 📄 relatoModel.js
   |  |    |- 📄 usuarioModel.js
   |  |
   |  ||--📁 routes
   |  |    |- 📄 index.js
   |  |    |- 📄 relatoRoutes.js
   |  |    |- 📄 usuarioRoutes.js
   |  |
   |  ||-📄 app.js
   |  |
   |  |--📁 swagger
   |  |   |- 📄 swagger_output.json
   |  |
   |- 📄 .env
   |- 📄 .env.example
   |- 📄 .gitignore
   |- 📄 package-lock.json
   |- 📄 package.json
   |- 📄 README.md
   |- 📄 server.js
   |- 📄 swagger.js

```
<br>

## ✅⏯️ Iniciar o projeto
Instale o [Node.js](https://nodejs.org/en/).
</br>

**Base do projeto**
```
Controle de versões: 
Git/GitHub

Editor de código - IDE:
VSCode

Desenvolver o back-end em Javascript:
Nodejs
```
 
**Instalações iniciais**

```
Package.json em JS:
npm init -y

Express, cors e node_modules:
npm i express cors

Nodemon:
npm i -D nodemon
```

**Banco de dados**
```
Mongoose:
npm i mongoose
```

**Autententicação**

```
Jwt:
npm install jsonwebtoken -- save

Bcrypt:
npm install bcrypt -- save
```
**Variaveis de ambiente**
```
Dotenv:
npm install dotenv-safe -- save

*No arquivo .env* 
 Adicione 📌
`PORT=NUMERO_PORTA`  
`SECRET=CHAVE_HASH_SEM_ESPAÇO`  
`DATABASE_URI=CONEXÃO_COM_MONGO_SEM_ASPAS`  
```

**Documentação**

```
Swagger:
npm i swagger-autogen swagger-ui-express
```

## 🔎🔐 **Rotas - EndPoint**
- Usuários

| Verbo  |   EndPoint        |        Descrição da Rota                   | Status | Auth |
| ------ | ------------------| -------------------------------------------| ------ |----- |
| POST   | /novousuario      | Adicionar um novo usuário                  |   200  |  ❌  |
| POST   | /login            | Devolve o token de um usuário              |   200  |  ❌  |
| GET    | /all              | Listar todos os usuários                   |   200  |  ✔️  |
| GET    | /find/:id         | Mostrar usuário pelo ID                    |   200  |  ✔️  |
| GET    | /encontra/:genero | Filtra os usuários pelo gênero             |   200  |  ✔️  |
| GET    | /localiza/atuacao | Filtra os usuários pela localização        |   200  |  ✔️  |
| PATCH  | /editar/:id       | Permite editar informações do usuário      |   200  |  ✔️  |
| DELETE | /delete/:id       | Remove um usuário                          |   200  |  ✔️  |


- Relatos

| Verbo  |   EndPoint        |        Descrição da Rota                   | Status | Auth |
| ------ | ------------------| -------------------------------------------| ------ |----- |
| POST   | /add              | Adicionar um novo relato                   |   200  |  ❌  |
| GET    | /all              | Listar todos os relatos                    |   200  |  ✔️  |
| GET    | /find/:id         | Filtra relato pelo ID                      |   200  |  ✔️  |
| GET    | /encontra/:cargo  | Filtra os relatos pelo cargo               |   200  |  ✔️  |
| GET    | /localiza/:empresa | Filtra os relatos pela empresa            |   200  |  ✔️  |
| PATCH  | /editar/:id       | Permite editar informações do relato      |   200  |  ✔️  |
| DELETE | /delete/:id       | Remove um relato                          |   200  |  ✔️  |

 <br/>
</a>
</p>
<p align="center"> Desenvolvido por Rafa Beckss
<p align="center">
<img src="https://user-images.githubusercontent.com/84551213/171416454-ab93ab7f-e5a0-4276-81ec-4f5cb79dff31.png" alt="logo da reprograma" border="0" width = "200" /> <p align="center"></p>








