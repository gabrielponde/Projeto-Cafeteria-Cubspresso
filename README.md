# ☕ Cafeteria Cubspresso

## Descrição
Este projeto é um catálogo online de cafés, desenvolvido com Next.js. O objetivo é listar diferentes tipos de café, permitindo aos usuários visualizar informações detalhadas sobre cada um.

## Funcionalidades
- Exibição de uma lista de cafés.
- Cada café possui um card com imagem, nome e descrição.
- Possibilidade de visualizar detalhes de cada café.
- Integração com um banco de dados PostgreSQL via Supabase para armazenar e recuperar dados.

## Tecnologias Utilizadas
- Next.js
- TypeScript
- Supabase (banco de dados PostgreSQL e API)
- Styled Components (para estilização)
- Cypress (para testes end-to-end)
- Jest (para testes unitários)
- dotenv (para gerenciamento de variáveis de ambiente)

## Instalação e Execução
1. Clone o repositório:
```bash
git clone https://github.com/seu-repositorio/Projeto-Cafeteria-Cubspresso.git
```

2. Acesse a pasta do projeto:
```bash
cd Projeto-Cafeteria-Cubspresso
```

3. Instale as dependências:
```bash
npm install
```

4. Configure as variáveis de ambiente:
- Crie um arquivo .env.local na raiz do projeto.
- Adicione as seguintes variáveis de ambiente (substitua pelos valores corretos do seu projeto Supabase):
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. Inicie o projeto:
```bash
npm run dev
```

6. Execute os testes:
- Testes unitários com Jest:
```bash
npm run test
```

- Testes end-to-end com Cypress:
```bash
npm run cypress:open
```

## Estrutura do Projeto

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
│── .env.local            # Variáveis de ambiente
│── jest.config.js        # Configuração do Jest
│── jest.setup.js         # Configuração do Jest
│── next-env.d.ts         # Definições de ambiente do Next.js
│── package.json          # Dependências e scripts
│── tsconfig.json         # Configuração do TypeScript
│── cypress.config.ts     # Configuração do Cypress
│── types.d.ts            # Definições globais de tipos TypeScript

## Banco de Dados (Supabase)

- Crie a tabela usando:
```sql
CREATE DATABASE cafeteria;
```

- O banco de dados PostgreSQL é gerenciado pelo Supabase. A estrutura da tabela de produtos e carrinho deve ser semelhante respectivamente a:
```sql
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco_de NUMERIC NOT NULL,
    preco_por NUMERIC NOT NULL,
    vegano BOOLEAN NOT NULL,
    categoria VARCHAR(255) NOT NULL
);
```
```sql
CREATE TABLE carrinho (
    id SERIAL PRIMARY KEY,
    id_produto INTEGER REFERENCES produtos(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    imagem TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    vegano BOOLEAN NOT NULL,
    quantidade INTEGER NOT NULL,
    observacao TEXT
);
```

- Exemplo de dados na tabela produtos:
```sql 
INSERT INTO produtos (nome, imagem, descricao, preco_de, preco_por, vegano, categoria) VALUES
('Espresso', './image/product-01.png', 'Imagine um café espresso como um abraço acolhedor em uma xícara. Com sua cor profunda e rica, ele é o convite perfeito para um momento de pausa. O aroma intenso que sobe suavemente é como um caloroso cumprimento, prometendo um instante de prazer e concentração. Ao dar o primeiro gole, a textura aveludada e o sabor robusto envolvem o paladar, oferecendo um equilíbrio encantador entre a doçura e a leve amargura. É um prazer pequeno, mas incrivelmente satisfatório, ideal para um rápido reequilíbrio durante o dia. Cada xícara é uma pausa deliciosa, um momento só seu, para recarregar e seguir em frente com renovada energia e tranquilidade.', 800.00, 500.00, TRUE, 'classicos'),
('Americano', './image/product-02.png', 'O café americano é um abraço suave, sem pressa, mas profundamente reconfortante. Com sua cor mais clara e sabor sutilmente diluído, ele transmite uma sensação de leveza, como um toque delicado na alma. Ao dar o primeiro gole, sua suavidade envolve o paladar, permitindo uma experiência de pura clareza e frescor. Não é intenso, mas tem o equilíbrio perfeito para quem busca um momento tranquilo, sem perder a profundidade do café. É o parceiro ideal para um dia produtivo ou para uma pausa descontraída, em que a mente pode se relaxar e se renovar.', 800.00, 500.00, TRUE, 'classicos'),
('Café com leite', './image/product-03.png', 'O café com leite é como um abraço aconchegante no meio de um dia agitado. A mistura suave de café e leite cria uma sensação acolhedora, onde a intensidade do espresso se encontra com a cremosidade reconfortante do leite, criando uma harmonia perfeita. Cada gole é uma dança suave entre o amargo e o doce, um toque de calor que aquece o coração. Ideal para aqueles momentos em que você precisa de um equilíbrio entre energia e serenidade, é o tipo de café que envolve e acalma, como um gesto de carinho.', 1000.00, 800.00, FALSE, 'classicos'),
('Cappuccino', './image/product-04.png', 'O cappuccino é como uma carícia que desperta os sentidos. Sua espuma densa e cremosa forma uma capa delicada sobre o espresso forte, equilibrando perfeitamente os sabores com uma suavidade quase etérea. Cada gole traz a combinação encantadora entre o amargo do café e a doçura suave do leite vaporizado, seguido de um toque de cacau que adiciona uma camada extra de prazer. Um cappuccino é um convite para desacelerar e desfrutar de um momento de leveza e prazer, como um suspiro em meio ao ritmo acelerado do dia.', 1000.00, 800.00, FALSE, 'classicos'),
('Latte', './image/product-05.png', 'O latte é um abraço suave que desperta o prazer de uma pausa tranquila. A suavidade do leite vaporizado envolve o café expresso em uma mistura harmoniosa que é pura delicadeza em cada gole. A textura cremosa oferece uma experiência confortável e relaxante, sem abrir mão do sabor autêntico do café. A leveza do latte é como um momento de respiro, uma pausa que permite ao corpo e à mente relaxarem. É perfeito para aqueles que buscam um café mais suave, mas cheio de personalidade, uma pausa deliciosa e reconfortante.', 800.00, 500.00, FALSE, 'classicos'),
('Macchiato', './image/product-06.png', 'O macchiato é um gesto audacioso, pequeno mas intenso. A crema suave do leite é apenas um toque, quase um segredo, que acompanha o espresso forte e vibrante. Sua intensidade é direta, mas suavizada pela suavidade do leite, criando um equilíbrio simples, mas poderoso. É o tipo de café que não perde tempo, que vai direto ao ponto, trazendo uma explosão de sabor em um gole só. Perfeito para quem gosta de intensidade sem exageros, o macchiato oferece um momento rápido, mas marcante.', 1000.00, 800.00, FALSE, 'classicos'),
('Mocha', './image/product-07.png', 'O mocha é uma explosão de conforto e indulgência em cada xícara. A doçura do chocolate se mistura perfeitamente ao sabor robusto do café expresso, criando uma experiência de puro prazer. A espuma de leite se une a esses dois elementos de forma a suavizar e equilibrar o sabor, enquanto o toque de cacau dá uma camada extra de doçura e aconchego. Cada gole é um abraço caloroso, doce e envolvente, perfeito para aqueles momentos em que a vida pede um pouco mais de doçura.', 1000.00, 800.00, FALSE, 'classicos'),
('Irish Coffee', './image/product-08.png', 'O Irish Coffee é um convite à celebração, onde o calor do café se mistura com a suavidade do uísque e a cremosidade do creme. Seu sabor complexo e envolvente traz uma sensação de conforto e descontração, como uma conversa tranquila entre amigos à beira da lareira. A suavidade do creme sobre o café e o toque sutil do uísque transformam cada gole em um prazer refinado, perfeito para os momentos em que você quer um pouco mais de intensidade e sofisticação.', 1000.00, 800.00, FALSE, 'classicos'),
('Cold Brew', './image/product-09.png', 'O cold brew é o equilíbrio perfeito entre refrescância e sabor profundo. Sua extração lenta e fria traz um café com uma suavidade notável, sem perder sua força. Ao tomar um gole, a suavidade do café se mistura à sua frescura gelada, proporcionando uma sensação de alívio e clareza. Ideal para dias quentes, o cold brew é como um respiro revigorante que desperta os sentidos sem sobrecarregar. Seu sabor complexo e suave é perfeito para quem busca uma pausa fresca e revigorante.', 800.00, 500.00, TRUE, 'gelados'),
('Frappuccino', './image/product-10.png', 'O frappuccino é uma festa de frescor e doçura, onde o café encontra a indulgência em um copo gelado. Com uma textura cremosa e rica, ele combina a intensidade do café com a doçura de cremes e xaropes, criando uma experiência deliciosa e refrescante. Cada gole é um prazer gelado, que mistura a energia do café com a diversão de uma sobremesa. Perfeito para os dias quentes ou para qualquer momento que peça uma explosão de sabor e frescor.', 800.00, 500.00, FALSE, 'gelados'),
('Café gelado com Laranja e Tônica', './image/product-11.png', 'O café gelado com laranja e tônica é uma verdadeira explosão de frescor e sofisticação. A acidez vibrante da laranja combina com a leve efervescência da tônica, criando uma mistura única que eleva o sabor profundo do café gelado. Cada gole traz uma sensação revigorante, como uma brisa fresca em um dia quente. A tônica adiciona um toque sutilmente amargo, equilibrando a doçura da laranja e trazendo uma complexidade delicada ao sabor do café. Ideal para quem busca uma experiência refrescante, leve e energética, este café é uma verdadeira fusão de sabores que desperta os sentidos e oferece uma pausa refrescante e moderna.', 800.00, 500.00, TRUE, 'gelados'),
('Milk shake de Café', './image/product-12.png', 'O milkshake de café é uma mistura doce e gelada, onde o sabor do café se encontra com a cremosidade do leite e a indulgência do sorvete. Cada gole é como uma viagem para um mundo de prazer, com a doçura do leite e a intensidade do café criando uma harmonia perfeita. É como um momento de diversão e prazer, ideal para quem quer saborear o melhor dos dois mundos: a energia do café com a suavidade de um milkshake gelado. Um prazer doce e refrescante, perfeito para qualquer hora do dia.', 1000.00, 800.00, FALSE, 'gelados');
```

## Licença

Este projeto está sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Se tiver dúvidas ou sugestões, entre em contato:

Gabriel Avena
GitHub: github.com/gabrielponde