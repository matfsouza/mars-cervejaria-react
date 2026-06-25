import { useMemo, useState } from "react";

const emptyOrder = {
  clienteId: "",
  status: "",
  data: "",
  items: [{ cervejaId: "", quantidade: "" }],
};

export default function OrderManager({ orders, setOrders, clients, beers }) {
  const [form, setForm] = useState(emptyOrder);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const orderedOrders = useMemo(() => [...orders].sort((a, b) => String(b.data).localeCompare(String(a.data))), [orders]);

  function updateField(field, value) {
    setMessage("");
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  function updateItem(index, field, value) {
    setMessage("");
    setForm((currentForm) => ({
      ...currentForm,
      items: currentForm.items.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)),
    }));
  }

  function addItem() {
    setForm((currentForm) => ({
      ...currentForm,
      items: [...currentForm.items, { cervejaId: "", quantidade: "" }],
    }));
  }

  function removeItem(index) {
    setForm((currentForm) => ({
      ...currentForm,
      items: currentForm.items.length === 1 ? currentForm.items : currentForm.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function resetForm() {
    setForm(emptyOrder);
    setEditingId(null);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.clienteId || !form.status || !form.data) {
      setMessage("Preencha cliente, status e data.");
      return;
    }

    const invalidItem = form.items.find((item) => !item.cervejaId || Number(item.quantidade) <= 0);
    if (invalidItem) {
      setMessage("Cada cerveja precisa ter sabor e quantidade.");
      return;
    }

    const cleanedOrder = {
      clienteId: form.clienteId,
      status: form.status,
      data: form.data,
      items: form.items.map((item) => ({
        cervejaId: item.cervejaId,
        quantidade: Number(item.quantidade),
      })),
    };

    if (editingId) {
      setOrders((currentOrders) =>
        currentOrders.map((order) => (order.id === editingId ? { ...cleanedOrder, id: editingId } : order))
      );
      setMessage("Pedido atualizado.");
    } else {
      setOrders((currentOrders) => [...currentOrders, { ...cleanedOrder, id: createId() }]);
      setMessage("Pedido cadastrado.");
    }

    setForm(emptyOrder);
    setEditingId(null);
  }

  function handleEdit(order) {
    setForm({
      clienteId: order.clienteId || "",
      status: order.status || "",
      data: order.data || "",
      items: getOrderItems(order),
    });
    setEditingId(order.id);
    setMessage("");
  }

  function handleDelete(id) {
    const confirmed = window.confirm("Deseja excluir este pedido?");
    if (!confirmed) return;

    setOrders((currentOrders) => currentOrders.filter((order) => order.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <main className="page">
      <section className="admin-section">
        <div className="section-heading">
          <span>Area administrativa</span>
          <h1>CRUD de pedidos</h1>
          <p>Cadastro de pedidos com um cliente e uma ou mais cervejas no mesmo pedido.</p>
        </div>

        <form className="order-form" onSubmit={handleSubmit}>
          <label>
            Cliente
            <select
              value={form.clienteId}
              onChange={(event) => updateField("clienteId", event.target.value)}
              onInput={(event) => updateField("clienteId", event.target.value)}
            >
              <option value="">Selecione</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.nome}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status
            <select
              value={form.status}
              onChange={(event) => updateField("status", event.target.value)}
              onInput={(event) => updateField("status", event.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Novo">Novo</option>
              <option value="Separando">Separando</option>
              <option value="Entregue">Entregue</option>
            </select>
          </label>

          <label>
            Data
            <input
              type="date"
              value={form.data}
              onChange={(event) => updateField("data", event.target.value)}
              onInput={(event) => updateField("data", event.target.value)}
            />
          </label>

          <div className="order-items">
            <div className="order-items-title">
              <strong>Cervejas do pedido</strong>
              <button type="button" className="outline-button dark compact" onClick={addItem}>
                Adicionar cerveja
              </button>
            </div>

            {form.items.map((item, index) => (
              <div className="order-item-row" key={`${index}-${item.cervejaId}`}>
                <label>
                  Cerveja
                  <select
                    value={item.cervejaId}
                    onChange={(event) => updateItem(index, "cervejaId", event.target.value)}
                    onInput={(event) => updateItem(index, "cervejaId", event.target.value)}
                  >
                    <option value="">Selecione</option>
                    {beers.map((beer) => (
                      <option key={beer.id} value={beer.id}>
                        {beer.nome}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Quantidade
                  <input
                    type="number"
                    min="1"
                    value={item.quantidade}
                    onChange={(event) => updateItem(index, "quantidade", event.target.value)}
                    onInput={(event) => updateItem(index, "quantidade", event.target.value)}
                  />
                </label>

                <button type="button" className="outline-button dark compact" onClick={() => removeItem(index)}>
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button">
              {editingId ? "Salvar alteracao" : "Cadastrar pedido"}
            </button>
            {editingId && (
              <button type="button" className="outline-button dark" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>

          {message && <p className="form-message success">{message}</p>}
        </form>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Cervejas</th>
                <th>Status</th>
                <th>Data</th>
                <th>Total</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {orderedOrders.map((order) => (
                <tr key={order.id}>
                  <td>{clients.find((client) => client.id === order.clienteId)?.nome || "Cliente removido"}</td>
                  <td>{formatOrderItems(order, beers)}</td>
                  <td>{order.status}</td>
                  <td>{formatDate(order.data)}</td>
                  <td>{formatCurrency(calculateOrderTotal(order, beers))}</td>
                  <td className="table-actions">
                    <button type="button" onClick={() => handleEdit(order)}>
                      Editar
                    </button>
                    <button type="button" onClick={() => handleDelete(order.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export function getOrderItems(order) {
  if (Array.isArray(order.items) && order.items.length > 0) return order.items;
  if (order.cervejaId) return [{ cervejaId: order.cervejaId, quantidade: Number(order.quantidade) || 1 }];
  return [{ cervejaId: "", quantidade: "" }];
}

function formatOrderItems(order, beers) {
  return getOrderItems(order)
    .map((item) => {
      const beer = beers.find((currentBeer) => currentBeer.id === item.cervejaId);
      return `${item.quantidade}x ${beer?.nome || "Cerveja removida"}`;
    })
    .join(", ");
}

function calculateOrderTotal(order, beers) {
  return getOrderItems(order).reduce((total, item) => {
    const beer = beers.find((currentBeer) => currentBeer.id === item.cervejaId);
    return total + Number(beer?.preco || 0) * Number(item.quantidade || 0);
  }, 0);
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

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return String(Date.now());
}
