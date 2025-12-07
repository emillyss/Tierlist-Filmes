//Página onde o usuário busca e adiciona filmes.
//É chamada pelo botão "Adicionar filme" em tierlist/page.tsx
//Faz chamadas à API OMDb via /api/movies/search
//Contém um botão de salvar que usa /api/movies/save
//Redireciona para tierlist/page.tsx

'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMoviePage() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'S'|'A'|'B'|'C'|'D'>('C');
  const [poster, setPoster] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [movieData, setMovieData] = useState<any>(null);

const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!query.trim()) return alert("Digite algo para pesquisar");

  try {
    const res = await fetch(`/api/movies/search?title=${encodeURIComponent(query)}`);
    const json = await res.json();

    if (!res.ok) {
      alert(json.error || "Erro ao buscar o filme");
      return;
    }
      setTitle(json.title);
      setPoster(json.poster || '');
      setReleaseDate(json.release_date || json.released || '');
      setMovieData(json);

  } catch (err) {
    console.error("Erro na busca:", err);
    alert("Erro ao buscar filme");
  }
};
  // envia para /api/movies/save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert('Informe o título antes de salvar.');

    try {
      const res = await fetch('/api/movies/save', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...movieData, // vinii: alterei para ele enviar não só os dados da API e mas sim API+Cat.
          category
        })
      });

      const json = await res.json();
      if (res.ok) {
        // volta para a lista; a página server lerá o JSON atualizado
        router.push('/tierlist');
      } else {
        alert(json.error || 'Erro ao salvar');
      }
    } catch (err) {
      console.error('Erro ao salvar:', err);
      alert('Erro ao salvar');
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '32px auto', padding: 16 }}>
      <header style={{ marginBottom: 18 }}>
        <h2 style={{ margin: 0 }}>Adicionar Filme</h2>
      </header>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar nome do filme (simulado)"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Pesquisar</button>
      </form>

      <form onSubmit={handleSave} style={{ border: '1px solid #eee', padding: 12, borderRadius: 6 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 2 }}>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Título</label>
            <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: 8 }} />

            <label style={{ display: 'block', fontSize: 13, margin: '12px 0 6px' }}>Categoria</label>
            <select value={category} onChange={e => setCategory(e.target.value as any)} style={{ padding: 8 }}>
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button type="submit" style={{ padding: '8px 12px' }}>Salvar</button>
          <button type="button" onClick={() => router.push('/tierlist')} style={{ padding: '8px 12px' }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
