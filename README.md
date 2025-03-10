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
   ```sh
   git clone https://github.com/seu-repositorio/catalogo-cafe.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd catalogo-cafe
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie a API fake:
   ```sh
   npx json-server --watch db.json --port 3001
   ```
5. Inicie o projeto:
   ```sh
   npm run dev
   ```

## Estrutura do Projeto
```
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
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Ponto de entrada do React
│── db.json                 # Banco de dados fake
│── package.json            # Dependências e scripts
│── tsconfig.json           # Configuração do TypeScript
│── vite.config.ts          # Configuração do Vite
```

## API Fake (JSON Server)
O `db.json` deve conter uma estrutura semelhante a:
```json
{
  "coffees": [
    {
      "id": 1,
      "name": "Espresso",
      "description": "Um café forte e concentrado.",
      "image": "espresso.jpg"
    },
    {
      "id": 2,
      "name": "Cappuccino",
      "description": "Café com leite vaporizado e espuma.",
      "image": "cappuccino.jpg"
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

