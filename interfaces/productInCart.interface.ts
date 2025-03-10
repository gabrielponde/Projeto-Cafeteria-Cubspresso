export interface IProductInCart {
  id: string
  idProduto: string
  nome: string
  imagem: string
  descricao: string
  preco: number
  vegano: boolean
  quantidade: number
  observacao: string
}

export interface ICart {
  items: IProductInCart[],
  total: number,
  quantityItemInCart: number
}
