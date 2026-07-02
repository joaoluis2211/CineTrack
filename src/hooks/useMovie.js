import {useState, useEffect} from 'react';
import { movieService } from '../services/tmdb';

export function useMovie (){
    const [populares, setPopulares] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const carregarTodosFilmes = async () => {
            try{
                setCarregando(true);

                const [popularesResponse] = await Promise.all([
                    movieService.obterPopulares(),
                ]);

                setPopulares(popularesResponse);
            } catch (error) {
                setErro("Erro ao carregar filmes:");
                console.error(error);
            } finally {
                setCarregando(false);
            }
        }
        carregarTodosFilmes();
    }, []);

    return { populares, carregando, erro };
}