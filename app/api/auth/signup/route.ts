import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    // Verificar se o usuário já existe no Supabase (na tabela que criamos)
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ message: 'Usuário já existe' }, { status: 409 });
    }

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found
      throw fetchError;
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{ email, password_hash: hashedPassword }])
      .select();

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ message: 'Usuário registrado com sucesso', user: newUser[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao registrar usuário:', error);
    return NextResponse.json({ message: error.message || 'Erro interno do servidor' }, { status: 500 });
  }
} 