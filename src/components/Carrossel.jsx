import { useRef } from 'react';
import { CardFilmes } from './CardFilmes';

export function Carrossel({ titulo, filmes = [], favoritos = [], onToggleFavorite, id }) {
  const carrosselRef = useRef(null);

  function rolar(direcao) {
    if (!carrosselRef.current) return;
    carrosselRef.current.scrollBy({
      left: carrosselRef.current.clientWidth * 0.78 * direcao,
      behavior: 'smooth',
    });
  }

  return (
    <section className="movie-section" id={id}>
      <div className="section-heading">
        <div>
          <span className="eyebrow">CURADORIA CINETRACK</span>
          <h2>{titulo}</h2>
        </div>
        {filmes.length > 4 && (
          <div className="carousel-controls">
            <button type="button" onClick={() => rolar(-1)} aria-label="Rolar para a esquerda">←</button>
            <button type="button" onClick={() => rolar(1)} aria-label="Rolar para a direita">→</button>
          </div>
        )}
      </div>

      {filmes.length > 0 ? (
        <div className="movie-track" ref={carrosselRef}>
          {filmes.map((filme) => (
            <CardFilmes
              key={filme.id}
              filme={filme}
              favorito={favoritos.some((item) => item.id === filme.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">Nenhum filme para mostrar por enquanto.</p>
      )}
    </section>
  );
}
