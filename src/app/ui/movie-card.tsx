//card visual do filme

import ConexaoBD from '@/app/libs/conexao-bd';
import Image from "next/image";
import Link from "next/link";
import "@/app/styles/movie-card.css";
import { redirect } from 'next/navigation';
import estrela from 'public/estrela.png';



export interface MovieProps {
  id: string;
  title: string;
  year: string;
  poster?: string | null;
  runtime: string;
  genre: string;
  plot: string;
  category: 'S' | 'A' | 'B' | 'C' | 'D';
  director: string;
  writer: string;
  actors: string;
  country: string;
  awards: string;
  imdbRating: string;
}

const arquivo = 'filmes-db.json';


export default function MovieCard(props: MovieProps) {

  // Server action para deletar o filme
  const deleteMovie = async () => {
    'use server';
    const filme = await ConexaoBD.retornaBD(arquivo);

    const pokemonToRemove =  filme.findIndex((f) => f.id === props.id);

    filme.splice(pokemonToRemove,1);

    await ConexaoBD.armazenaBD(arquivo, filme);

    redirect('/tierlist');
  };

  // Server action para mudar a categoria (recebe FormData do form)
  const changeCategoryLeft = async (formData: FormData) => {
    'use server';

    const id = formData.get('id') as string;
    const category = formData.get('category') as string;

    const map = { S: "S", A: "S", B: "A", C: "B", D: "C" };
    const newCat = map[category];

    const filme = await ConexaoBD.retornaBD(arquivo);
    const idx = filme.findIndex((f) => f.id === props.id);

    filme[idx].category = newCat;

    await ConexaoBD.armazenaBD(arquivo, filme);

    redirect('/tierlist');
  };

  const changeCategoryRight = async (formData: FormData) => {
    'use server';

    const id = formData.get('id') as string;
    const category = formData.get('category') as string;
    
    const map = { S: "A", A: "B", B: "C", C: "D", D: "D" };
    const newCat = map[category];

    const filme = await ConexaoBD.retornaBD(arquivo);
    const idx = filme.findIndex((f) => f.id === props.id);

    filme[idx].category = newCat;

    await ConexaoBD.armazenaBD(arquivo, filme);

    redirect('/tierlist');
  };


  return (

    <article>


      {props.category !== 'S' && (
        <form action={changeCategoryLeft}>
          <input type="hidden" name="id" value={props.id} />
          <input type="hidden" name="category" value={props.category} />
          <button className='btn-moverLeft' type="submit"> ‹ </button>
        </form>
      )}
    
      <div id='card'>
        <p style={{textAlign: 'center'}}> <span  id='titulo'>{props.title} </span> <span  style={{ fontSize: 13, color: '#666', textAlign: 'center', marginTop: 24 }}>({props.year})</span>
        </p>
        <div id='centro'>
          <div id='imagem'>
            {props.poster ? (
              <Image
                src={props.poster}
                alt={`Poster - ${props.title}`}
                width={100}
                height={150}
              />
            ) : (
              <div style={{ fontSize: 13, color: '#666', textAlign: 'center', marginTop: 24 }}>Sem poster</div>
            )}
          </div>

          <div className='dadoSimples'>
              <div id='nota'>
              <Image
                src={estrela}
                alt={'estrela'}
                width={30}
                height={30}
              />
              <p id='rating'>{props.imdbRating}</p>
             </div>

              <p id='genero'>{props.genre}</p>  

              <Link href={`/tierlist/detalhes/${props.id}`}>
                <button id='btnDetalhes'>Detalhes</button>
              </Link>
              
              <form action={deleteMovie}>
                <button id="btnDelete">x</button>
              </form>
          </div>
    


      </div>
      </div>

      {props.category !== 'D' && (
      <form action={changeCategoryRight}>
        <input type="hidden" name="id" value={props.id} />
        <input type="hidden" name="category" value={props.category} />
        <button className='btn-moverRight' type="submit"> › </button>
      </form>
      )}

    </article>

  );

}
