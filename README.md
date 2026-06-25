# MARS Cervejaria React

Projeto convertido do layout HTML/CSS da MARS Cervejaria para React.

## Recursos

- Tela de confirmacao de maioridade.
- Paginas publicas: inicio, sobre, contatos e adquira a sua.
- Login administrativo simulado.
- CRUD de cervejas, clientes e pedidos.
- Pedidos com uma ou mais cervejas no mesmo cadastro.
- Persistencia dos dados no `localStorage`.
- Relatorio com dados relacionados entre pedidos, clientes e cervejas.

## Como rodar

```bash
npm install
npm run dev
```

Depois abra o endereco que aparecer no terminal.

## Login

- E-mail: `admin@mars.com`
- Senha: `123456`

## Estrutura

- `src/App.jsx` controla qual tela aparece e guarda as listas principais.
- `src/context/AuthContext.jsx` faz o login, logout e controle de sessao.
- `src/hooks/useLocalStorage.js` salva os dados no navegador.
- `src/components/CrudPage.jsx` e usado nos cadastros de cervejas e clientes.
- `src/components/OrderManager.jsx` controla os pedidos com lista de itens.
- `src/components/Report.jsx` combina pedidos, clientes e cervejas pelo id para montar o relatorio.
