//card visual do filme

import ConexaoBD from '@/app/libs/conexao-bd';
import { redirect } from 'next/navigation';

export interface MovieProps {
  id: string;
  title: string;
  posterPath?: string | null;
  release_date?: string | null;
  overview?: string | null;
  category: 'S' | 'A' | 'B' | 'C' | 'D';
}

const arquivo = 'filmes-db.json';

export default function MovieCard(props: MovieProps) {

  // Server action para deletar o filme (recebe FormData do form)
  const deleteMovie = async (formData: FormData) => {
    'use server';
    const id = String(formData.get('id') ?? props.id);

    const filmes = await ConexaoBD.retornaBD(arquivo);
    const idx = filmes.findIndex((f: any) => f.id === id);
    if (idx !== -1) {
      filmes.splice(idx, 1);
      await ConexaoBD.armazenaBD(arquivo, filmes);
    }

    redirect('/tierlist');
  };

  // Server action para mudar a categoria (recebe FormData do form)
  const changeCategory = async (formData: FormData) => {
    'use server';
    const id = String(formData.get('id') ?? props.id);
    const newCat = String(formData.get('category') ?? props.category).toUpperCase();

    if (!['S','A','B','C','D'].includes(newCat)) {
      redirect('/tierlist');
      return;
    }

    const filmes = await ConexaoBD.retornaBD(arquivo);
    const idx = filmes.findIndex((f: any) => f.id === id);
    if (idx !== -1) {
      filmes[idx].category = newCat;
      await ConexaoBD.armazenaBD(arquivo, filmes);
    }

    redirect('/tierlist');
  };

  // pequeno helper para mostrar ano protegido
  const renderYear = () => {
    if (!props.release_date) return '';
    return `(${String(props.release_date).slice(0,4)})`;
  };

  const posterUrl = (props as any).poster || props.posterPath || null;

  return (
    <div style={{ border: '1px solid #e6e6e6', padding: 10, borderRadius: 6, background: '#fff' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ width: 88, minHeight: 120 }}>
          {posterUrl ? (
            <img src={String(posterUrl)} alt={props.title} style={{ width: '100%', borderRadius: 4 }} />
          ) : (
            <div style={{ width: '100%', height: 120, background: '#f3f3f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', borderRadius: 4 }}>
              Sem poster
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>{props.title} <span style={{ fontWeight: 400, color: '#666' }}>{renderYear()}</span></div>
          {props.overview && <p style={{ margin: '8px 0', fontSize: 13, color: '#444' }}>{props.overview}</p>}

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
            {/* Form que altera categoria */}
            <form action={changeCategory} method="post" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <input type="hidden" name="id" value={props.id} />
              <select name="category" defaultValue={props.category} style={{ padding: 6 }}>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
              <button type="submit" style={{ padding: '6px 8px' }}>Mudar</button>
            </form>

            {/* Form que deleta o filme */}
            <form action={deleteMovie} method="post" style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={props.id} />
              <button type="submit" style={{ padding: '6px 8px' }}>Deletar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
