import { useState } from 'react'
import './App.css'
import { useMovie } from './hooks/useMovie'
import { Carrossel } from './components/Carrossel'
import { Navbar } from './components/Navbar'
import { movieService } from './services/tmdb' // Importamos o serviço para fazer a busca

function App() {
  const { populares } = useMovie()
  
  // 1. Estados para a busca
  const [pesquisa, setPesquisa] = useState('')
  const [filmesPesquisados, setFilmesPesquisados] = useState([])
  const [buscando, setBuscando] = useState(false)

  // 2. Função que dispara a busca na API do TMDB
  const lidarComBusca = async (e) => {
    const termo = e.target.value
    setPesquisa(termo)

    // Se o usuário apagar tudo, limpa os resultados
    if (termo.trim() === '') {
      setFilmesPesquisados([])
      return
    }

    try {
      setBuscando(true)
      // Chama o seu método de buscar passando o termo digitado
      const resultados = await movieService.buscarFilmes(termo)
      setFilmesPesquisados(resultados)
    } catch (error) {
      console.error("Erro ao buscar filmes:", error)
    } finally {
      setBuscando(false)
    }
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar />
      
      {/* Mudamos h-screen para min-h-screen para o fundo preto descer se a página crescer */}
      <main className='min-h-screen bg-black pt-6 pb-12'>
          
          {/* CARROSSEL DE POPULARES */}
          <Carrossel filmes={populares} titulo="Filmes Populares"/>

          {/* SEÇÃO DE BUSCA */}
          <div className="px-4 md:px-12 my-8">
            <label className="block text-sm font-medium text-slate-400 mb-2">
              O que você quer assistir hoje?
            </label>
            <input 
              type="text" 
              value={pesquisa}
              onChange={lidarComBusca} // Dispara a busca a cada letra digitada
              placeholder="Digite o nome de um filme..." 
              className="w-full max-w-md px-4 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>

          {/* CARROSSEL DE RESULTADOS da pesquisa (Só aparece se o usuário digitou algo) */}
          {pesquisa && (
            <Carrossel 
              filmes={filmesPesquisados} 
              titulo={buscando ? "Buscando..." : `Resultados para: "${pesquisa}"`}
            />
          )}

      </main>
    </div>
  )
}

export default App