Projeto API Node.js
Stack Utilizada
Linguagem

Node.js (v14.x ou superior): Escolhemos Node.js por sua eficiência, escalabilidade e grande comunidade de desenvolvedores. Sua arquitetura baseada em eventos e não bloqueante é ideal para construir APIs rápidas e responsivas.
Framework

Express.js (v4.x): Optamos pelo Express.js devido à sua simplicidade e flexibilidade. Ele nos permite construir APIs robustas com uma estrutura mínima e altamente configurável.
Pacotes Adicionados

    Nodemon: Para reiniciar automaticamente o servidor durante o desenvolvimento.
    Mongoose: Para modelagem de dados e integração com o MongoDB.
    Dotenv: Para gerenciar variáveis de ambiente.
    JSON Web Token (JWT): Para autenticação baseada em tokens.
    Bcrypt: Para hash de senhas.
    Multer: Para upload de arquivos.

Banco de Dados

MongoDB: Escolhemos o MongoDB devido à sua natureza NoSQL, flexibilidade na modelagem de dados e escalabilidade horizontal. Utilizamos o Mongoose para interagir com o banco de dados de forma simples e estruturada.
Serviço de Hospedagem

Como Instalar e Rodar o Projeto
Pré-requisitos

    Node.js (v14.x ou superior)
    npm (v6.x ou superior) ou yarn (v1.x ou superior)
    MongoDB (v4.x ou superior)

Passos para Instalação

    Clone o repositório do GitHub:

    sh

git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

Navegue até o diretório do projeto:

sh

cd SEU_REPOSITORIO

Instale as dependências do projeto:

sh

npm install

ou

sh

yarn install

Configure as variáveis de ambiente:

    Crie um arquivo .env na raiz do projeto.
    Adicione as variáveis necessárias (exemplo abaixo):

    makefile

        PORT=7777
        MONGO_URI=mongodb://localhost:27017/seu_database
        JWT_SECRET=sua_chave_secreta

Rodando o Projeto

    Inicie o servidor:

    sh

npm start

ou, para desenvolvimento com reinício automático:

sh

npm run dev

ou

sh

yarn start

ou

sh

    yarn dev

    Acesse a API:
        A API estará disponível em http://localhost:7777.

Observações

    Certifique-se de que o MongoDB está rodando localmente ou ajuste a variável MONGO_URI no arquivo .env para apontar para a instância correta do MongoDB.

