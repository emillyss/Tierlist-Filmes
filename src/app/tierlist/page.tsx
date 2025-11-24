//Exibe os filmes organizados por categorias S/A/B/C/D
//Possui botão "Adicionar filme" que redireciona para tierlist/add/page.tsx

import Link from "next/link";
import ConexaoBD from "@/app/libs/conexao-bd";
import MovieCard from "@/app/ui/movie-card"; // se @ não estiver funcionando, use '../../ui/movie-card'

const arquivo = 'filmes-db.json';
const categories = ['S','A','B','C','D'] as const;

export default async function TierlistPage() {
  const dados = await ConexaoBD.retornaBD(arquivo); // lê filmes-db.json

  // agrupa por categoria
  const byCategory: Record<string, any[]> = { S:[], A:[], B:[], C:[], D:[] };
  for (const m of dados) {
    const cat = (m.category || 'C').toUpperCase();
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(m);
  }

  return (
    <div style={{ maxWidth: 900, margin: '32px auto', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Minha Tierlist de Filmes</h1>
        <Link href="/tierlist/add">
          <button style={{ padding: '8px 12px', cursor: 'pointer' }}>Adicionar Filme</button>
        </Link>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {categories.map(cat => (
          <div key={cat} style={{ border: '1px solid #ddd', borderRadius: 6, padding: 8, minHeight: 180, background: '#fafafa' }}>
            <h3 style={{ marginTop: 0, marginBottom: 8, textAlign: 'center' }}>{cat}</h3>

            {byCategory[cat] && byCategory[cat].length > 0 ? (
              byCategory[cat].map(movie => (
                // aqui usamos o componente MovieCard em vez do card inline
                <div key={movie.id} style={{ marginBottom: 8 }}>
                  <MovieCard {...movie} />
                </div>
              ))
            ) : (
              <div style={{ fontSize: 13, color: '#666', textAlign: 'center', marginTop: 24 }}>
                Nenhum filme
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}


