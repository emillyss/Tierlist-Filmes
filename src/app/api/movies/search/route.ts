
import { NextResponse } from "next/server"; 

const API_KEY = "c0ea455c"; // favor nao fazer mais de 1k requisicoes/dia se nao......

export async function GET(req: Request) { // fazendo uma funçãozinha pra GET na HTTP
  const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
  if (!title) {
    return NextResponse.json(
      { error: "Título obrigatório" },
      { status: 400 }
    );
  }

  const omdbUrl = `http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`;
  const response = await fetch(omdbUrl);
  const data = await response.json();

  if (data.Response === "False") {
    return NextResponse.json({ error: "Filme não foi encontrado" }, { status: 404 });
  }
  
  const movie = {
    id: data.imdbID,
    title: data.Title,
    year: data.Year,
    poster: data.Poster,
    runtime: data.Runtime,
    genre: data.Genre,
    plot: data.Plot,
    director: data.Director,
    writer: data.Writer,
    actors: data.Actors,
    country: data.Country,
    awards: data.Awards,
    imdbRating: data.imdbRating,
  }; // só n devolve a categoria pq o user que escolhe

  return NextResponse.json(movie);
}

//Recebe o nome do filme check
//Consulta a OMDb API check
//Retorna dados filtrados do filme para a página /tierlist/add check

