//É o meio campo entre next - BD local

//Recebe os dados do filme escolhido pelo usuário
//Chama a conexão com o "banco de dados" local(conexão-bd)
//Salva o filme no arquivo filmes-db.json

import { NextResponse } from 'next/server';
import ConexaoBD from '@/app/libs/conexao-bd';

const arquivo = 'filmes-db.json';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = String(body.title || '').trim();
    const category = String(body.category || 'C').toUpperCase();

    if (!title) {
      return NextResponse.json({ error: 'Título obrigatório' }, { status: 400 });
    }

    const filmes = await ConexaoBD.retornaBD(arquivo);

    const novo = {
      id: crypto.randomUUID(),
      title,
      posterPath: body.posterPath || null,
      release_date: body.release_date || null,
      category: ['S','A','B','C','D'].includes(category) ? category : 'C',
      createdAt: new Date().toISOString()
    };

    filmes.push(novo);
    await ConexaoBD.armazenaBD(arquivo, filmes);

    return NextResponse.json({ success: true, movie: novo });
  } catch (err) {
    console.error('[api/movies/save] erro:', err);
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 });
  }
}
