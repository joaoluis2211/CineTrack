export function Navbar(){
    return(
        <nav className="flex bg-black py-6 px-12 items-center justify-between">
            <h1 className="text-white text-5xl">Cine<span className="text-red-700 text-5xl">Track</span></h1>
            <div className="flex gap-8 items-center">
                <a className="hover:text-red-700 text-lg text-white" href="#">Inicio</a>
                <a className="hover:text-red-700 text-lg text-white" href="#">Filmes</a>
                <a className="hover:text-red-700 text-lg text-white" href="#">Series</a>
                <a className="hover:text-red-700 text-lg text-white" href="#">Novidades</a>
            </div>
        </nav>
    )
}