interface IProductPreco {
  de: number
  por: number
}

export interface IProduct {
  id: string
  nome: string
  imagem: string
  descricao: string
  preco: IProductPreco
  vegano: boolean
  categoria: 'gelados' | 'classicos'
}