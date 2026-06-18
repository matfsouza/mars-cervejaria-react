import AgeGate from "./components/AgeGate.jsx";
import Acquire from "./components/Acquire.jsx";
import Catalog from "./components/Catalog.jsx";
import Contact from "./components/Contact.jsx";
import CrudPage from "./components/CrudPage.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Report from "./components/Report.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { beerImageOptions, initialBeers, initialClients, initialOrders } from "./data/initialData.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

const protectedPages = ["cervejas", "clientes", "pedidos", "relatorio"];

export default function App() {
  const { user } = useAuth();
  const [ageAccepted, setAgeAccepted] = useLocalStorage("mars:ageAccepted", false);
  const [page, setPage] = useLocalStorage("mars:currentPage", "inicio");
  const [beers, setBeers] = useLocalStorage("mars:beers", initialBeers);
  const [clients, setClients] = useLocalStorage("mars:clients", initialClients);
  const [orders, setOrders] = useLocalStorage("mars:orders", initialOrders);

  if (!ageAccepted) {
    return <AgeGate onAccept={() => setAgeAccepted(true)} />;
  }

  const currentPage = protectedPages.includes(page) && !user ? "login" : page;

  return (
    <div className="app-shell">
      <img className="particles" src="/assets/particulas.png" alt="" />
      <Header currentPage={currentPage} onNavigate={setPage} />
      {renderPage(currentPage)}
      <footer className="site-footer">Criado e desenvolvido por Mars Design Grafico @</footer>
    </div>
  );

  function renderPage(activePage) {
    if (activePage === "login") {
      return <Login onSuccess={() => setPage("cervejas")} />;
    }

    if (activePage === "catalogo" || activePage === "sobre") {
      return <Catalog beers={beers} />;
    }

    if (activePage === "contatos") {
      return <Contact />;
    }

    if (activePage === "adquira") {
      return <Acquire beers={beers} />;
    }

    if (activePage === "cervejas") {
      return (
        <CrudPage
          title="CRUD de cervejas"
          description="Cadastro dos produtos que aparecem no catalogo da cervejaria."
          items={beers}
          setItems={setBeers}
          fields={beerFields}
          columns={beerColumns}
          emptyForm={emptyBeer}
        />
      );
    }

    if (activePage === "clientes") {
      return (
        <CrudPage
          title="CRUD de clientes"
          description="Cadastro simples de clientes interessados nas cervejas MARS."
          items={clients}
          setItems={setClients}
          fields={clientFields}
          columns={clientColumns}
          emptyForm={emptyClient}
        />
      );
    }

    if (activePage === "pedidos") {
      return (
        <CrudPage
          title="CRUD de pedidos"
          description="Pedidos ligados a um cliente e a uma cerveja por meio dos ids."
          items={orders}
          setItems={setOrders}
          fields={createOrderFields(clients, beers)}
          columns={createOrderColumns(clients, beers)}
          emptyForm={emptyOrder}
        />
      );
    }

    if (activePage === "relatorio") {
      return <Report beers={beers} clients={clients} orders={orders} />;
    }

    return <Home beers={beers} onNavigate={setPage} />;
  }
}

const emptyBeer = {
  nome: "",
  estilo: "",
  teor: "",
  preco: "",
  estoque: "",
  imagem: "",
  descricao: "",
};

const beerFields = [
  { key: "nome", label: "Nome", required: true },
  { key: "estilo", label: "Estilo", required: true },
  { key: "teor", label: "Teor alcoolico", required: true, placeholder: "Ex: 5,0%" },
  { key: "preco", label: "Preco", type: "number", min: "0", step: "0.01", required: true },
  { key: "estoque", label: "Estoque", type: "number", min: "0", required: true },
  { key: "imagem", label: "Imagem", type: "select", options: beerImageOptions, required: true },
  { key: "descricao", label: "Descricao", type: "textarea", required: true },
];

const beerColumns = [
  { key: "nome", label: "Nome" },
  { key: "estilo", label: "Estilo" },
  { key: "teor", label: "Teor" },
  { key: "preco", label: "Preco", render: (item) => formatCurrency(item.preco) },
  { key: "estoque", label: "Estoque" },
];

const emptyClient = {
  nome: "",
  email: "",
  telefone: "",
  cidade: "",
};

const clientFields = [
  { key: "nome", label: "Nome", required: true },
  { key: "email", label: "E-mail", type: "email", required: true },
  { key: "telefone", label: "Telefone", required: true },
  { key: "cidade", label: "Cidade", required: true },
];

const clientColumns = [
  { key: "nome", label: "Nome" },
  { key: "email", label: "E-mail" },
  { key: "telefone", label: "Telefone" },
  { key: "cidade", label: "Cidade" },
];

const emptyOrder = {
  clienteId: "",
  cervejaId: "",
  quantidade: "",
  status: "",
  data: "",
};

function createOrderFields(clients, beers) {
  return [
    {
      key: "clienteId",
      label: "Cliente",
      type: "select",
      required: true,
      options: clients.map((client) => ({ value: client.id, label: client.nome })),
    },
    {
      key: "cervejaId",
      label: "Cerveja",
      type: "select",
      required: true,
      options: beers.map((beer) => ({ value: beer.id, label: beer.nome })),
    },
    { key: "quantidade", label: "Quantidade", type: "number", min: "1", required: true },
    {
      key: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "Novo", label: "Novo" },
        { value: "Separando", label: "Separando" },
        { value: "Entregue", label: "Entregue" },
      ],
    },
    { key: "data", label: "Data", type: "date", required: true },
  ];
}

function createOrderColumns(clients, beers) {
  return [
    {
      key: "clienteId",
      label: "Cliente",
      render: (item) => clients.find((client) => client.id === item.clienteId)?.nome || "Cliente removido",
    },
    {
      key: "cervejaId",
      label: "Cerveja",
      render: (item) => beers.find((beer) => beer.id === item.cervejaId)?.nome || "Cerveja removida",
    },
    { key: "quantidade", label: "Qtd." },
    { key: "status", label: "Status" },
    { key: "data", label: "Data", render: (item) => formatDate(item.data) },
  ];
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
