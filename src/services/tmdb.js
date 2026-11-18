const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function request(endpoint) {
  if (!API_KEY) {
    throw new Error('TMDB API key not found. Add VITE_TMDB_API_KEY to your .env file.');
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status}).`);
  }

  return response.json();
}

export const movieService = {
  async obterPopulares() {
    const data = await request('/movie/popular?language=pt-BR&page=1');
    return data.results ?? [];
  },

  async obterMaisBemAvaliados() {
    const data = await request('/movie/top_rated?language=pt-BR&page=1');
    return data.results ?? [];
  },

  async buscarFilmes(nome) {
    const query = encodeURIComponent(nome);
    const data = await request(`/search/movie?query=${query}&language=pt-BR&page=1`);
    return data.results ?? [];
  },
};
