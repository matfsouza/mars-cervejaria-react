import { useAuth } from "../context/AuthContext.jsx";
import { assetPath } from "../utils/assetPath.js";

// Menu que aparece para todo mundo.
const publicPages = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre", label: "Sobre a MARS" },
  { id: "contatos", label: "Contatos" },
  { id: "adquira", label: "Adquira a sua" },
];

// Menu que aparece so depois do login.
const adminPages = [
  { id: "cervejas", label: "CRUD Cervejas" },
  { id: "clientes", label: "CRUD Clientes" },
  { id: "pedidos", label: "CRUD Pedidos" },
  { id: "relatorio", label: "Relatorio" },
];

export default function Header({ currentPage, onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <button className="brand-button" type="button" onClick={() => onNavigate("inicio")}>
        <img src={assetPath("mars-logo-white.svg")} alt="MARS" />
      </button>

      <nav className="main-nav" aria-label="Navegacao principal">
        {publicPages.map((page) => (
          <button
            key={page.id}
            type="button"
            className={currentPage === page.id ? "active" : ""}
            onClick={() => onNavigate(page.id)}
          >
            {page.label}
          </button>
        ))}

        {/* Se tiver usuario logado, mostra os CRUDs. */}
        {user &&
          adminPages.map((page) => (
            <button
              key={page.id}
              type="button"
              className={currentPage === page.id ? "active" : ""}
              onClick={() => onNavigate(page.id)}
            >
              {page.label}
            </button>
          ))}
      </nav>

      <div className="login-area">
        {user ? (
          <>
            <span>{user.name}</span>
            <button type="button" className="logout-button compact" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button type="button" className="outline-button compact" onClick={() => onNavigate("login")}>
            Entrar
          </button>
        )}
      </div>
    </header>
  );
}
