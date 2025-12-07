import Link from "next/link";
import ConexaoBD from "@/app/libs/conexao-bd";
import MovieCard from "@/app/ui/movie-card"; 
import "@/app/styles/tierlist.css";

const arquivo = 'filmes-db.json';
const categories = ['S','A','B','C','D'] as const;
const mensagem = ['Cinema supremo e quem discorda está errado','Brilha, mas não ofusca ninguém', 'Roteiro ok, direção ok, atuação ok: um festival de ok', 'Perderam dinheiro fazendo e perdi meu tempo assistindo', 'Pagaria pra desver'];

export default async function TierlistPage() {
  const dados = await ConexaoBD.retornaBD(arquivo);

  const byCategory: Record<string, any[]> = { S:[], A:[], B:[], C:[], D:[] };

  for (const m of dados) {
    const cat = m.category;
    byCategory[cat].push(m);
  }

  return (
    <div id='principal'>
      <div id='parteCima'>
        
        <h1>Minha Tierlist de Filmes</h1>      
       
        <Link href="/tierlist/add">
          <button id='adicionar'>Adicionar Filme</button>
        </Link>
        
      </div>
      {/* <h3>Lembre-se: apenas sua opinião importa. </h3> */}

      <section>
        {categories.map((cat, index) => (
          <div className={`categoria categoria-${cat}`} key={cat}>
            
            <div id='text-cat'>
              <p id='tituloCat'> <span id='letra'> {cat}. </span> <span id="mensagemCat">{mensagem[index]}</span></p>
            </div>
            

            {byCategory[cat].length > 0 ? (
              byCategory[cat].map(movie => (

                <div className={`card-${cat}`} key={movie.id}>
                  
                  <MovieCard {...movie} />
                  
                </div>
              ))
            ) : (
              <div style={{ fontSize: 13, color: 'black', textAlign: 'center', marginTop: 24 }}>
                Nenhum filme
              </div>
            )}
            
          </div>
        ))}
      </section>

      <div id='mensagem'>
      <p style={{color:'white'}}>Lembre-se: apenas sua opinião importa.</p>
      </div>
    </div>
  );
}


