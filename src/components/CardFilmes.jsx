const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export function CardFilmes({ filme, favorito, onToggleFavorite }) {
  const poster = filme.poster_path ? `${IMAGE_BASE}${filme.poster_path}` : null;
  const ano = filme.release_date ? filme.release_date.slice(0, 4) : 'Ano indisponível';

  return (
    <article className="movie-card">
      <div className="poster-wrap">
        {poster ? (
          <img className="movie-poster" src={poster} alt={`Pôster de ${filme.title}`} loading="lazy" />
        ) : (
          <div className="poster-placeholder"><span>CT</span><small>Imagem indisponível</small></div>
        )}
        <button
          className={`favorite-button ${favorito ? 'is-favorite' : ''}`}
          type="button"
          onClick={() => onToggleFavorite(filme)}
          aria-label={favorito ? `Remover ${filme.title} da minha lista` : `Adicionar ${filme.title} à minha lista`}
          title={favorito ? 'Remover da minha lista' : 'Adicionar à minha lista'}
        >
          {favorito ? '♥' : '+'}
        </button>
        <span className="poster-rating">★ {Number(filme.vote_average || 0).toFixed(1)}</span>
      </div>
      <div className="movie-card-info">
        <h3 title={filme.title}>{filme.title}</h3>
        <span>{ano}</span>
      </div>
    </article>
  );
}
