export const initialBeers = [
  {
    id: "beer-1",
    nome: "Sol da Tarde",
    estilo: "Pilsen",
    teor: "4,8%",
    preco: 12,
    estoque: 36,
    imagem: "sol-da-tarde.png",
    descricao: "Cerveja leve, dourada e refrescante, pensada para dias quentes.",
  },
  {
    id: "beer-2",
    nome: "Florest",
    estilo: "Tripel",
    teor: "8,0%",
    preco: 18,
    estoque: 22,
    imagem: "florest.png",
    descricao: "Tripel com aroma frutado, corpo mais forte e final levemente citrico.",
  },
  {
    id: "beer-3",
    nome: "Blue Dark",
    estilo: "Weizenbier",
    teor: "5,6%",
    preco: 15,
    estoque: 28,
    imagem: "blue-dark.png",
    descricao: "Cerveja de trigo com notas de banana e cravo, mantendo boa refrescancia.",
  },
];

export const initialClients = [
  {
    id: "client-1",
    nome: "Bruno Andrade",
    email: "bruno@email.com",
    telefone: "(61) 99911-2040",
    cidade: "Taguatinga",
  },
  {
    id: "client-2",
    nome: "Leticia Rocha",
    email: "leticia@email.com",
    telefone: "(61) 98220-1577",
    cidade: "Aguas Claras",
  },
  {
    id: "client-3",
    nome: "Carlos Mendes",
    email: "carlos@email.com",
    telefone: "(61) 99131-4420",
    cidade: "Ceilandia",
  },
];

export const initialOrders = [
  {
    id: "order-1",
    clienteId: "client-1",
    cervejaId: "beer-1",
    quantidade: 4,
    status: "Separando",
    data: "2026-06-10",
  },
  {
    id: "order-2",
    clienteId: "client-2",
    cervejaId: "beer-2",
    quantidade: 2,
    status: "Entregue",
    data: "2026-06-11",
  },
  {
    id: "order-3",
    clienteId: "client-3",
    cervejaId: "beer-3",
    quantidade: 3,
    status: "Novo",
    data: "2026-06-12",
  },
];

export const beerImageOptions = [
  { value: "sol-da-tarde.png", label: "Sol da Tarde" },
  { value: "florest.png", label: "Florest" },
  { value: "blue-dark.png", label: "Blue Dark" },
];
