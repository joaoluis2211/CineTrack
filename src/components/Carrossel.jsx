import { useRef } from "react"; // 1. Importamos o useRef
import { CardFilmes } from "./CardFilmes";

export function Carrossel({ titulo, filmes }) {
  // 2. Criamos o "controle remoto" apontando para o carrossel
  const carrosselRef = useRef(null);

  // 3. Função para rolar o carrossel para os lados
  const rolar = (direcao) => {
    if (carrosselRef.current) {
      // Descobre a largura visível atual da tela do usuário
      const larguraTela = carrosselRef.current.clientWidth;
      
      // Se for para a direita, soma a rolagem. Se for esquerda, subtrai.
      const quantidadeRolagem = direcao === "esquerda" ? -larguraTela * 0.75 : larguraTela * 0.75;

      carrosselRef.current.scrollBy({
        left: quantidadeRolagem,
        behavior: "smooth", // Faz deslizar suavemente
      });
    }
  };

  return (
    <div className="w-full py-8 px-4 md:px-12 relative group"> {/* 'group' serve para esconder as setas e só mostrar no hover */}
      
      {/* Título da Categoria */}
      <h2 className="text-xl md:text-2xl font-semibold text-slate-200 mb-2 hover:text-white cursor-pointer transition-colors duration-200 inline-block">
        {titulo}
      </h2>
      
      {/* Container Principal Relativo (para prender as setas dentro dele) */}
      <div className="">
        
        {/* SETA ESQUERDA */}
        <button
          onClick={() => rolar("esquerda")}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 text-2xl font-bold"
        >
          &#8249; {/* Código HTML para a seta < */}
        </button>

        {/* CONTAINER DOS CARDS (O CARROSSEL EM SI) */}
        <div 
          ref={carrosselRef} // 4. Conectamos o nosso controle remoto aqui!
          className="
            flex gap-4 
            overflow-x-auto 
            scroll-smooth 
            py-4
            [&::-webkit-scrollbar]:hidden 
            [-ms-overflow-style:none] 
            [scrollbar-width:none]
          "
        >
          {filmes.slice(0, 12).map((filme) => (
            <div key={filme.id} className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0">
              <CardFilmes filme={filme} />
            </div>
          ))}
        </div>

        {/* SETA DIREITA */}
        <button
          onClick={() => rolar("direita")}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 text-2xl font-bold"
        >
          &#8250; {/* Código HTML para a seta > */}
        </button>

      </div>
    </div>
  );
}