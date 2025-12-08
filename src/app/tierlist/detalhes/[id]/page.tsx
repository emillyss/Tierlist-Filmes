
import ConexaoBD from "@/app/libs/conexao-bd";
import "@/app/styles/movie-card.css";
import "@/app/styles/detalhes.css";
import { MovieProps } from "@/app/ui/movie-card";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

const arquivo = 'filmes-db.json';

interface ViewMovieProps{
    params: Promise<{id: string}>; //uma promessa que quando passar de pagina vai ficar esperando esse id
}

export default async function VisualizarDetalhes({params}: ViewMovieProps){

    const {id} = await params;
    
    const movieDB = await ConexaoBD.retornaBD(arquivo);

    //pegando as informações do filme para exibir
    const movieToView: MovieProps = movieDB.find((p: MovieProps) => p.id === id);


    return(
        <div id='tudo'>
        <article id="card-movie">
        <div>
        <h2 style={{textAlign: 'center'}}> <span>{movieToView.title} </span> <span  style={{ fontSize: 20, color: '#666', textAlign: 'center', marginTop: 24 }}>({movieToView.year})</span></h2>
            <div id='central'>
                    <div id='imagem'>
                        {movieToView.poster ? (
                        <Image
                            src={movieToView.poster}
                            alt={`Poster - ${movieToView.title}`}
                            width={300}
                            height={450}
                        />
                        ) : (
                        <div style={{ fontSize: 13, color: '#666', textAlign: 'center', marginTop: 24 }}>Sem poster</div>
                        )}
                    </div>

                    <div className='dadoSimples'>

                    <div className='dados'>
                    <p className='nome'>Genre: </p>
                    <p style={{marginLeft: '32px'}}>{movieToView.genre}</p>
                    </div>

                    <div className='dados'>
                    <p className='nome'>Runtime: </p>
                    <p style={{marginLeft: '10px'}}>{movieToView.runtime}</p>
                    </div>

                    <div className='dados'>
                    <p className='nome'>Director: </p>
                    <p style={{marginLeft: '15px'}}>{movieToView.director}</p>
                    </div>

                    <div className='dados'>
                    <p className='nome'>Writer: </p>
                    <p style={{marginLeft: '30px'}}>{movieToView.writer}</p>
                    </div>

                    <div className='dados'>
                    <p className='nome'>Actors: </p>
                    <p style={{marginLeft: '28px'}}>{movieToView.actors}</p>
                    </div>

                    <div className='dados'>
                    <p className='nome'>Country: </p>
                    <p style={{marginLeft: '15px'}}>{movieToView.country}</p>
                    </div>

                    <div className='dados'>
                    <p className='nome'>Awards: </p>
                    <p style={{marginLeft: '20px'}}>{movieToView.awards}</p>
                    </div>

                    <div className='dados'>
                    <p className='nome'>Plot: </p>
                    <p style={{marginLeft: '45px'}}>{movieToView.plot}</p>
                    </div>


                    <Link href="/tierlist">
                    <button id='btnVoltar'>Voltar</button>
                    </Link>
                    </div>

            </div>
        </div>
        </article>
        </div>
        
    )

}