# ☕ Cafeteria Cubspresso

## Descrição
Este projeto é um catálogo online de cafés, desenvolvido com Next.js. O objetivo é listar diferentes tipos de café, permitindo aos usuários visualizar informações detalhadas sobre cada um.

## Funcionalidades
- Exibição de uma lista de cafés.
- Cada café possui um card com imagem, nome e descrição.
- Possibilidade de visualizar detalhes de cada café.
- Consumo de uma API fake para obter os dados.

## Tecnologias Utilizadas
- Next.js
- TypeScript
- JSON Server (para simular a API)
- Styled Components (para estilização)
- Cypress (para testes end-to-end)
- Jest (para testes unitários)

## Instalação e Execução
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-repositorio/Projeto-Cafeteria-Cubspresso.git
   ```
   
2. Acesse a pasta do projeto:
   ```sh
   cd Projeto-Cafeteria-Cubspresso
   ```
   
3. Instale as dependências:
   ```sh
   npm install
   ```
   
4. Inicie a API fake:
   ```sh
   npx json-server --watch db.json --port 3333
   ```
   
5. Inicie o projeto:
   ```sh
   npm run dev
   ```
   
6. Execute os testes:
   - Testes unitários com Jest:
     ```sh
     npm run test
     ```
   - Testes end-to-end com Cypress:
     ```sh
     npm run cypress:open
     ```
   
## Estrutura do Projeto

```
/catalogo-cafe
│── __tests__/            # Testes unitários e de integração
│── .next/                # Build do Next.js
│── .swc/                 # Compilação do SWC
│── app/                  # Pasta principal da aplicação Next.js
│── assets/               # Recursos como imagens e ícones
│── components/           # Componentes reutilizáveis
│── css/                  # Estilos da aplicação
│── cypress/              # Configuração e testes Cypress
│── hooks/                # Hooks personalizados
│── interfaces/           # Definições de interfaces TypeScript
│── node_modules/         # Dependências do projeto
│── public/               # Arquivos públicos
│── services/             # Requisições HTTP
│── utils/                # Funções utilitárias
│── db.json               # Banco de dados fake
│── jest.config.js        # Configuração do Jest
│── jest.setup.js         # Configuração do Jest
│── next-env.d.ts         # Definições de ambiente do Next.js
│── package.json          # Dependências e scripts
│── tsconfig.json         # Configuração do TypeScript
│── cypress.config.ts     # Configuração do Cypress
│── types.d.ts            # Definições globais de tipos TypeScript
```

## API Fake (JSON Server)
O `db.json` deve conter uma estrutura semelhante a:

```json
{
  "produtos": [
    {
      "id": "1",
      "nome": "Espresso",
      "imagem": "product-01.png",
      "descricao": "Imagine um café espresso como um abraço acolhedor em uma xícara...",
      "preco": {
        "de": 800,
        "por": 600
      },
      "vegano": true,
      "categoria": "clássicos"
    }
  ],
  "carrinho": [
    {
      "id": "e8c2",
      "idProduto": "2",
      "nome": "Americano",
      "imagem": "product-02.png",
      "preco": 600,
      "vegano": true,
      "quantidade": 2,
      "observacao": ""
    }
  ]
}
```

## Licença
Este projeto está sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato
Se tiver dúvidas ou sugestões, entre em contato:

Gabriel Avena  
GitHub: [github.com/gabrielponde](https://github.com/gabrielponde)

