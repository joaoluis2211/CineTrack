export function Navbar({ onNavigate, activeSection }) {
  const links = [
    { id: 'inicio', label: 'Início' },
    { id: 'explorar', label: 'Explorar' },
    { id: 'minha-lista', label: 'Minha lista' },
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" onClick={() => onNavigate('inicio')} aria-label="CineTrack - início">
        <span className="brand-mark">C</span>
        <span>Cine<span className="brand-accent">Track</span></span>
      </a>

      <nav className="main-nav" aria-label="Navegação principal">
        {links.map((link) => (
          <button
            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            key={link.id}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <a className="header-note" href="#explorar">Seu próximo filme começa aqui <span>↗</span></a>
    </header>
  );
}
