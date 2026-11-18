import { useEffect, useState } from 'react';
import './App.css';
import { useMovie } from './hooks/useMovie';
import { Carrossel } from './components/Carrossel';
import { Navbar } from './components/Navbar';
import { movieService } from './services/tmdb';

const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';
const STORAGE_KEY = 'cinetrack-favorites';

function lerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function App() {
  const { populares, bemAvaliados, carregando, erro } = useMovie();
  const [pesquisa, setPesquisa] = useState('');
  const [filmesPesquisados, setFilmesPesquisados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [erroBusca, setErroBusca] = useState('');
  const [favoritos, setFavoritos] = useState(lerFavoritos);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mostrarLista, setMostrarLista] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    const termo = pesquisa.trim();
    if (!termo) {
      setFilmesPesquisados([]);
      setErroBusca('');
      setBuscando(false);
      return undefined;
    }

    let ativo = true;
    const timeout = setTimeout(async () => {
      try {
        setBuscando(true);
        setErroBusca('');
        const resultados = await movieService.buscarFilmes(termo);
        if (ativo) setFilmesPesquisados(resultados);
      } catch (error) {
        if (ativo) setErroBusca(error.message || 'Não foi possível realizar a busca.');
      } finally {
        if (ativo) setBuscando(false);
      }
    }, 400);

    return () => {
      ativo = false;
      clearTimeout(timeout);
    };
  }, [pesquisa]);

  const destaque = populares[0];
  const outrosPopulares = populares.slice(1);

  function alternarFavorito(filme) {
    setFavoritos((atuais) => (
      atuais.some((item) => item.id === filme.id)
        ? atuais.filter((item) => item.id !== filme.id)
        : [...atuais, filme]
    ));
  }

  function navegar(secao) {
    setActiveSection(secao);
    setMostrarLista(secao === 'minha-lista');
    if (secao === 'explorar') {
      document.getElementById('explorar')?.scrollIntoView({ behavior: 'smooth' });
    } else if (secao === 'minha-lista') {
      document.getElementById('minha-lista')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const favoritosIds = favoritos.map((filme) => filme.id);
  const filmeEstaSalvo = (filme) => favoritosIds.includes(filme.id);

  return (
    <div className="app-shell" id="inicio">
      <Navbar onNavigate={navegar} activeSection={activeSection} />

      <main>
        {!pesquisa.trim() && destaque && (
          <section
            className="hero"
            style={{ '--hero-image': destaque.backdrop_path ? `url(${BACKDROP_BASE}${destaque.backdrop_path})` : 'none' }}
          >
            <div className="hero-content">
              <span className="hero-kicker"><span className="kicker-line" /> FILME EM DESTAQUE</span>
              <p className="hero-overline">A escolha de hoje</p>
              <h1>{destaque.title}</h1>
              <div className="hero-meta">
                <span className="rating">★ {Number(destaque.vote_average || 0).toFixed(1)} <small>/ 10</small></span>
                <span>{destaque.release_date?.slice(0, 4) || 'Lançamento'}</span>
                <span>Filme popular</span>
              </div>
              <p className="hero-description">{destaque.overview || 'Uma história esperando para ser descoberta. Explore os detalhes deste filme na sua próxima sessão.'}</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => navegar('explorar')}>Explorar filmes <span>↗</span></button>
                <button className={`button button-secondary ${filmeEstaSalvo(destaque) ? 'saved' : ''}`} onClick={() => alternarFavorito(destaque)}>
                  {filmeEstaSalvo(destaque) ? '♥ Na minha lista' : '+ Minha lista'}
                </button>
              </div>
            </div>
            <div className="hero-index"><span>01</span><i /> POPULAR AGORA</div>
          </section>
        )}

        <section className="discovery-bar" id="explorar">
          <div>
            <span className="eyebrow">EXPLORE O UNIVERSO DO CINEMA</span>
            <h2>{pesquisa.trim() ? 'Encontre seu próximo filme' : 'Histórias que merecem sua atenção.'}</h2>
          </div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={pesquisa}
              onChange={(event) => setPesquisa(event.target.value)}
              placeholder="Buscar por título..."
              aria-label="Buscar filmes por título"
            />
            {pesquisa && <button type="button" onClick={() => setPesquisa('')} aria-label="Limpar busca">×</button>}
          </label>
        </section>

        {pesquisa.trim() ? (
          <section className="search-results movie-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">RESULTADOS DA TMDB</span>
                <h2>{buscando ? 'Procurando filmes...' : `Resultados para “${pesquisa.trim()}”`}</h2>
              </div>
              <span className="result-count">{filmesPesquisados.length} encontrados</span>
            </div>
            {buscando ? (
              <p className="empty-state">Buscando no catálogo...</p>
            ) : erroBusca ? (
              <p className="error-state">{erroBusca}</p>
            ) : filmesPesquisados.length ? (
              <div className="movie-grid">
                {filmesPesquisados.map((filme) => (
                  <div key={filme.id}>
                    <article className="movie-card">
                      <div className="poster-wrap">
                        {filme.poster_path ? <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={`Pôster de ${filme.title}`} loading="lazy" /> : <div className="poster-placeholder"><span>CT</span><small>Imagem indisponível</small></div>}
                        <button className={`favorite-button ${filmeEstaSalvo(filme) ? 'is-favorite' : ''}`} type="button" onClick={() => alternarFavorito(filme)} aria-label="Adicionar ou remover da minha lista">{filmeEstaSalvo(filme) ? '♥' : '+'}</button>
                        <span className="poster-rating">★ {Number(filme.vote_average || 0).toFixed(1)}</span>
                      </div>
                      <div className="movie-card-info"><h3 title={filme.title}>{filme.title}</h3><span>{filme.release_date?.slice(0, 4) || 'Ano indisponível'}</span></div>
                    </article>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">Nenhum resultado encontrado. Tente outro título.</p>
            )}
          </section>
        ) : (
          <>
            {carregando && <div className="loading-message">Preparando sua seleção de filmes...</div>}
            {erro && <div className="error-state">{erro} Confira sua chave da TMDB no arquivo .env.</div>}
            {!carregando && !erro && (
              <>
                <Carrossel titulo="Populares no momento" filmes={outrosPopulares} favoritos={favoritos} onToggleFavorite={alternarFavorito} />
                <Carrossel titulo="Mais bem avaliados" filmes={bemAvaliados} favoritos={favoritos} onToggleFavorite={alternarFavorito} />
              </>
            )}
          </>
        )}

        <section className={`my-list-section ${mostrarLista ? 'list-highlight' : ''}`} id="minha-lista">
          <div className="section-heading">
            <div><span className="eyebrow">SUA SELEÇÃO PESSOAL</span><h2>Minha lista <span className="list-count">{favoritos.length}</span></h2></div>
            <p>Filmes que você quer guardar para depois.</p>
          </div>
          {favoritos.length ? (
            <div className="movie-grid">
              {favoritos.map((filme) => (
                <div key={filme.id}>
                  <article className="movie-card">
                    <div className="poster-wrap">
                      {filme.poster_path ? <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={`Pôster de ${filme.title}`} loading="lazy" /> : <div className="poster-placeholder"><span>CT</span><small>Imagem indisponível</small></div>}
                      <button className="favorite-button is-favorite" type="button" onClick={() => alternarFavorito(filme)} aria-label={`Remover ${filme.title} da minha lista`}>♥</button>
                      <span className="poster-rating">★ {Number(filme.vote_average || 0).toFixed(1)}</span>
                    </div>
                    <div className="movie-card-info"><h3 title={filme.title}>{filme.title}</h3><span>{filme.release_date?.slice(0, 4) || 'Ano indisponível'}</span></div>
                  </article>
                </div>
              ))}
            </div>
          ) : (
            <div className="list-empty"><span>＋</span><h3>Sua lista começa aqui</h3><p>Use o botão + nos filmes para salvar aqueles que deseja assistir.</p></div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark">C</span><span>Cine<span className="brand-accent">Track</span></span></a>
        <p>Descubra. Salve. Assista.</p>
        <span>Dados de filmes fornecidos por TMDB.</span>
      </footer>
    </div>
  );
}

export default App;
