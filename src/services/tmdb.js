const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const headersConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
}

export const movieService = {

    obterPopulares: async () => {
        try {
            const response = await fetch(`${BASE_URL}/movie/popular?language=pt-BR&page=1`, headersConfig);
            if (!response.ok) throw new Error('Erro ao obter filmes populares');

            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Erro ao obter filmes populares:", error);
            return [];
        }
    },

    buscarFilmes: async (nome) => {
        try {
            const query = encodeURIComponent(nome);
            const response = await fetch(`${BASE_URL}/search/movie?query=${query}&language=pt-BR&page=1`, headersConfig);
            if (!response.ok) throw new Error('Erro ao buscar filmes');

            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
            return [];
        }
    }
}