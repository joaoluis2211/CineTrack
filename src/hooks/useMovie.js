import { useEffect, useState } from 'react';
import { movieService } from '../services/tmdb';

export function useMovie() {
  const [populares, setPopulares] = useState([]);
  const [bemAvaliados, setBemAvaliados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;

    async function carregarFilmes() {
      try {
        setCarregando(true);
        setErro('');
        const [filmesPopulares, filmesBemAvaliados] = await Promise.all([
          movieService.obterPopulares(),
          movieService.obterMaisBemAvaliados(),
        ]);
        if (ativo) {
          setPopulares(filmesPopulares);
          setBemAvaliados(filmesBemAvaliados);
        }
      } catch (error) {
        if (ativo) setErro(error.message || 'Não foi possível carregar os filmes.');
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarFilmes();
    return () => { ativo = false; };
  }, []);

  return { populares, bemAvaliados, carregando, erro };
}
