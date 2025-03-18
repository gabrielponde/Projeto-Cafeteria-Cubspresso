export interface IProduct {
  id: number; // Alterado para number, pois o Supabase usa int4
  nome: string;
  imagem: string;
  descricao: string;
  preco_de: number; // Preço original
  preco_por: number; // Preço com desconto
  vegano: boolean;
  categoria: 'gelados' | 'classicos';
}