import { assetPath } from "../utils/assetPath.js";

export default function Home({ beers, onNavigate }) {
  return (
    <main className="page">
      <section className="hero-section">
        <img className="sun" src={assetPath("sol.png")} alt="" />
        <div className="hero-copy">
          <img className="hero-logo" src={assetPath("mars-logo-white.svg")} alt="MARS Cervejaria" />
          <h1>A cada gole uma sensacao unica</h1>
          <p>
            Cervejas artesanais com estilos diferentes, visual marcante e uma proposta
            simples: combinar sabor, identidade e consumo consciente.
          </p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => onNavigate("sobre")}>
              Ver cervejas
            </button>
            <button type="button" className="outline-button" onClick={() => onNavigate("login")}>
              Area administrativa
            </button>
          </div>
        </div>
        <img className="hero-beers" src={assetPath("mars-beers.png")} alt="Tres cervejas MARS" />
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span>Catalogo</span>
          <h2>Cervejas da MARS</h2>
        </div>

        <div className="beer-grid">
          {/* Cards da pagina inicial feitos a partir da lista de cervejas. */}
          {beers.map((beer) => (
            <article className="beer-card" key={beer.id}>
              <img src={assetPath(beer.imagem)} alt={beer.nome} />
              <div>
                <h3>{beer.nome}</h3>
                <p>{beer.estilo}</p>
                <strong>{formatCurrency(beer.preco)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function formatCurrency(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
