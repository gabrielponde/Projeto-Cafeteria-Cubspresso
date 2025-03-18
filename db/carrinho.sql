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


INSERT INTO carrinho (id_produto, quantidade, observacao) VALUES
(3, 1, '');
