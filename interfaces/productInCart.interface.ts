export interface IProductInCart {
  id: string
  id_produto: string
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
