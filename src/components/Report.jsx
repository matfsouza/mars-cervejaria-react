export default function Report({ beers, clients, orders }) {
  const rows = orders.map((order) => {
    const client = clients.find((item) => item.id === order.clienteId);
    const beer = beers.find((item) => item.id === order.cervejaId);
    const quantidade = Number(order.quantidade);
    const subtotal = Number(beer?.preco || 0) * quantidade;

    return {
      ...order,
      cliente: client?.nome || "Cliente removido",
      cerveja: beer?.nome || "Cerveja removida",
      estilo: beer?.estilo || "-",
      preco: beer?.preco || 0,
      subtotal,
    };
  });

  const total = rows.reduce((sum, row) => sum + row.subtotal, 0);

  return (
    <main className="page">
      <section className="admin-section">
        <div className="section-heading">
          <span>Relatorio</span>
          <h1>Pedidos por cliente e cerveja</h1>
          <p>Relatorio gerado ligando pedidos, clientes e cervejas pelo id cadastrado.</p>
        </div>

        <div className="report-summary">
          <div>
            <span>Pedidos</span>
            <strong>{rows.length}</strong>
          </div>
          <div>
            <span>Total vendido</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <div>
            <span>Clientes</span>
            <strong>{clients.length}</strong>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Cliente</th>
                <th>Cerveja</th>
                <th>Estilo</th>
                <th>Qtd.</th>
                <th>Status</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{formatDate(row.data)}</td>
                  <td>{row.cliente}</td>
                  <td>{row.cerveja}</td>
                  <td>{row.estilo}</td>
                  <td>{row.quantidade}</td>
                  <td>
                    <span className="status-pill">{row.status}</span>
                  </td>
                  <td>{formatCurrency(row.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR");
}
