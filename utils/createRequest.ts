import { supabase } from '../lib/supabaseClient'; 

export async function createRequest(url: string, method: string, data?: object) {
  try {
    console.log(`Requisição: ${method} ${url}`);
    const table = url.split('/')[1];
    const id = url.split('/')[2];

    switch (method.toUpperCase()) {
      case 'GET':
        if (id) {
          const { data: singleData, error: singleError } = await supabase
            .from(table)
            .select('*')
            .eq('id', id)
            .single();
          if (singleError) throw singleError;
          console.log('Dados retornados (GET single):', singleData);
          return singleData;
        } else {
          const { data: allData, error: allError } = await supabase
            .from(table)
            .select('*');
          if (allError) throw allError;
          console.log('Dados retornados (GET all):', allData);
          return allData;
        }

      case 'POST':
        // Insere um novo item na tabela
        const { data: postData, error: postError } = await supabase
          .from(table)
          .insert([data]);
        if (postError) throw postError;
        return postData;

      case 'PUT':
        // Atualiza um item existente na tabela
        const { data: putData, error: putError } = await supabase
          .from(table)
          .update(data)
          .eq('id', id);
        if (putError) throw putError;
        return putData;

      case 'DELETE':
        // Remove um item da tabela
        const { data: deleteData, error: deleteError } = await supabase
          .from(table)
          .delete()
          .eq('id', id);
        if (deleteError) throw deleteError;
        return deleteData;

      default:
        throw new Error(`Método ${method} não suportado.`);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert("Ocorreu um erro, tente mais tarde!");
    throw error;
  }
}