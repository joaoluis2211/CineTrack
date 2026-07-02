


export function CardFilmes({filme}){
    return (
        <div className="flex flex-col rounded-lg min-w-32">
            <img className="min-w-48" src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}/>
        </div>
    )
}