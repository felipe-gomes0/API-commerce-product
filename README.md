# API Commerce Product

Esta é uma API RESTful desenvolvida para gerenciamento de fluxo de estoque de produtos. O projeto foi criado com o objetivo didático de demonstrar a aplicação de princípios de **Arquitetura Limpa (Clean Architecture)** e **SOLID** em uma aplicação Node.js com TypeScript.

O sistema simula operações de compra (reabastecimento de estoque) e venda (saída de estoque), mantendo a integridade dos dados e separando claramente as responsabilidades de cada camada.

## Tecnologias

-   **Node.js**: Ambiente de execução JavaScript.
-   **TypeScript**: Superset do JavaScript com tipagem estática.
-   **Express**: Framework web para lidar com as rotas e requisições HTTP.
-   **Prisma**: ORM moderno para interação com o banco de dados.
-   **SQLite**: Banco de dados relacional (configuração padrão).

## Princípios SOLID Aplicados

Este projeto segue rigorosamente os princípios SOLID para garantir um código sustentável, testável e fácil de manter:

1.  **S - Single Responsibility Principle (Princípio da Responsabilidade Única)**:
    -   Cada classe tem uma única responsabilidade. Por exemplo, `ProductController` lida apenas com requisições HTTP, enquanto `ProductServiceImplementation` contém a regra de negócio e `ProductRepositoryPrisma` interage com o banco de dados.

2.  **O - Open/Closed Principle (Princípio Aberto/Fechado)**:
    -   As entidades e casos de uso estão abertos para extensão, mas fechados para modificação. Novas regras de negócio podem ser adicionadas estendendo funcionalidades sem alterar o código base crítico.

3.  **L - Liskov Substitution Principle (Princípio da Substituição de Liskov)**:
    -   As implementações concretas podem ser substituídas por suas abstrações sem quebrar o sistema. O serviço depende da interface `ProductRepository`, permitindo que o `ProductRepositoryPrisma` seja trocado por qualquer outra implementação (ex: em memória para testes) sem alterar a lógica de negócio.

4.  **I - Interface Segregation Principle (Princípio da Segregação de Interface)**:
    -   Interfaces específicas como `ProductService` e `ProductRepository` definem contratos claros, garantindo que as classes não sejam forçadas a implementar métodos que não utilizam.

5.  **D - Dependency Inversion Principle (Princípio da Inversão de Dependência)**:
    -   Módulos de alto nível (Services) não dependem de módulos de baixo nível (Implementações de banco de dados). Ambos dependem de abstrações (Interfaces). No código, `ProductServiceImplementation` recebe `ProductRepository` no construtor, invertendo a dependência.

## Como Executar

### Pré-requisitos

-   Node.js (v18 ou superior recomendado)
-   npm (Gerenciador de pacotes do Node)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone <url-do-repositorio>
    cd API-commerce-product
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

### Configuração de Ambiente

1.  Crie um arquivo `.env` na raiz do projeto.
2.  Defina a variável `DATABASE_URL`. Para SQLite (padrão):
    ```env
    DATABASE_URL="file:./dev.db"
    ```

### Configuração do Banco de Dados

Execute as migrações para criar as tabelas no banco de dados:

```bash
npx prisma db push
# ou
npx prisma migrate dev
```

### Rodando a Aplicação

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor iniciará na porta `8000` (padrão).

## Endpoints da API

### Produtos

#### Criar Produto (`POST /products/create`)
Cadastra um novo produto no sistema.
-   **Objetivo**: Inicializar um item no inventário.
-   **Body**: `{ "name": "Produto A", "price": 100.00 }`

#### Listar Produtos (`GET /products`)
Retorna todos os produtos cadastrados com seus saldos atuais.
-   **Objetivo**: Visualizar o estado atual do estoque.

#### Comprar Produto / Reabastecer (`POST /products/:id/buy`)
Registra uma entrada de estoque para um produto específico.
-   **Objetivo**: Simula a loja comprando mais itens de um fornecedor para aumentar o estoque disponível.
-   **Body**: `{ "amount": 50 }`
-   **Resposta**: Retorna o novo saldo (balance) atualizado.

#### Vender Produto (`POST /products/:id/sell`)
Registra uma saída de estoque de um produto.
-   **Objetivo**: Simula a venda de um item para um cliente, diminuindo o estoque disponível.
-   **Body**: `{ "amount": 1 }`
-   **Resposta**: Retorna o novo saldo (balance) atualizado.
