import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    // 1. Encontrar o usuário no Supabase
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('id, email, password_hash')
      .eq('email', email)
      .single();

    if (fetchError || !user) {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }

    // 2. Comparar a senha fornecida com a senha hasheada
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }

    // 3. Gerar o JWT
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET não está definido nas variáveis de ambiente.');
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login bem-sucedido', token }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao fazer login:', error);
    return NextResponse.json({ message: error.message || 'Erro interno do servidor' }, { status: 500 });
  }
} 