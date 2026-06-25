import { getOrderItems } from "./OrderManager.jsx";

export default function Report({ beers, clients, orders }) {
  // Um pedido com varias cervejas vira varias linhas no relatorio.
  const rows = orders.flatMap((order) => {
    const client = clients.find((item) => item.id === order.clienteId);

    return getOrderItems(order).map((orderItem) => {
      // Aqui acontece o JOIN pelo id da cerveja.
      const beer = beers.find((item) => item.id === orderItem.cervejaId);
      const quantidade = Number(orderItem.quantidade);
      const subtotal = Number(beer?.preco || 0) * quantidade;

      return {
        id: `${order.id}-${orderItem.cervejaId}`,
        pedidoId: order.id,
        data: order.data,
        status: order.status,
        cliente: client?.nome || "Cliente removido",
        cerveja: beer?.nome || "Cerveja removida",
        estilo: beer?.estilo || "-",
        quantidade,
        subtotal,
      };
    });
  });

  // Total geral vendido.
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
            <strong>{orders.length}</strong>
          </div>
          <div>
            <span>Total vendido</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <div>
            <span>Itens vendidos</span>
            <strong>{rows.length}</strong>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Pedido</th>
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
                  <td>{row.pedidoId.slice(-5)}</td>
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
  if (!value) return "-";
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR");
}
