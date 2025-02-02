# ☕ Cafeteria Cubspresso

## Descrição
Este projeto é um catálogo online de cafés, desenvolvido com React. O objetivo é listar diferentes tipos de café, permitindo aos usuários visualizar informações detalhadas sobre cada um.

## Funcionalidades
- Exibição de uma lista de cafés.
- Cada café possui um card com imagem, nome e descrição.
- Possibilidade de visualizar detalhes de cada café.
- Consumo de uma API fake para obter os dados.

## Tecnologias Utilizadas
- React
- Vite
- TypeScript
- JSON Server (para simular a API)
- Styled Components (para estilização)

## Instalação e Execução
1. Clone o repositório:
   sh
   git clone https://github.com/seu-repositorio/Projeto-Cafeteria-Cubspresso.git
   
2. Acesse a pasta do projeto:
   sh
   cd Projeto-Cafeteria-Cubspresso
   
3. Instale as dependências:
   sh
   npm install
   
4. Inicie a API fake:
   sh
   npx json-server --watch db.json --port 3000
   
5. Inicie o projeto:
   sh
   npm run dev
   

## Estrutura do Projeto

/catalogo-cafe
│── public/
│   ├── product-*.png       # Imagens dos produtos
│── src/
│   ├── assets/             # Recursos como imagens e ícones
│   ├── components/         # Componentes reutilizáveis
│   ├── contexts/           # Context API
│   ├── css/                # Estilos da aplicação
│   ├── hooks/              # Hooks personalizados
│   ├── pages/              # Páginas principais
│   ├── services/           # Requisições HTTP
│   ├── types/              # Definições de tipos TypeScript
│   ├── utils/              # Funções utilitárias
│   └── main.tsx            # Ponto de entrada do React
│── db.json                 # Banco de dados fake
│── package.json            # Dependências e scripts
│── tsconfig.json           # Configuração do TypeScript
│── vite.config.ts          # Configuração do Vite


## API Fake (JSON Server)
O db.json deve conter uma estrutura semelhante a:
json
{
  "produtos": [
    {
      "id": "1",
      "nome": "Espresso",
      "imagem": "product-01.png",
      "descricao": "Imagine um café espresso como um abraço acolhedor em uma xícara. Com sua cor profunda e rica, ele é o convite perfeito para um momento de pausa. O aroma intenso que sobe suavemente é como um caloroso cumprimento, prometendo um instante de prazer e concentração. Ao dar o primeiro gole, a textura aveludada e o sabor robusto envolvem o paladar, oferecendo um equilíbrio encantador entre a doçura e a leve amargura. É um prazer pequeno, mas incrivelmente satisfatório, ideal para um rápido reequilíbrio durante o dia. Cada xícara é uma pausa deliciosa, um momento só seu, para recarregar e seguir em frente com renovada energia e tranquilidade.",
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

## Licença
Este projeto está sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato
Se tiver dúvidas ou sugestões, entre em contato:

Gabriel Avena  
GitHub: [github.com/gabrielponde](https://github.com/gabrielponde)