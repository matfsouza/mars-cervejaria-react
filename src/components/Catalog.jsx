import { assetPath } from "../utils/assetPath.js";

export default function Catalog({ beers }) {
  return (
    <main className="page">
      <section className="content-section">
        <div className="section-heading">
          <span>Escolha a sua</span>
          <h1>Catalogo MARS</h1>
        </div>

        <div className="catalog-list">
          {/* Catalogo dinamico: se cadastrar cerveja nova, aparece aqui. */}
          {beers.map((beer) => (
            <article className="catalog-item" key={beer.id}>
              <img src={assetPath(beer.imagem)} alt={beer.nome} />
              <div>
                <h2>{beer.nome}</h2>
                <p className="beer-style">
                  {beer.estilo} | {beer.teor}
                </p>
                <p>{beer.descricao}</p>
                <div className="catalog-meta">
                  <strong>{formatCurrency(beer.preco)}</strong>
                  <span>{beer.estoque} unidades em estoque</span>
                </div>
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
