export interface Produto {
    id: string;
    nome: string;
    imagem: string;
    descricao: string;
    preco: {
      de?: number;
      por: number;
    };
    vegano: boolean;
    categoria: string;
  }
  