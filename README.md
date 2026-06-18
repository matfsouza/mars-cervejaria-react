# MARS Cervejaria React

Projeto convertido do layout HTML/CSS da MARS Cervejaria para React.

## Recursos

- Tela de confirmacao de maioridade.
- Paginas publicas: inicio, sobre, contatos e adquira a sua.
- Login administrativo simulado.
- CRUD de cervejas, clientes e pedidos.
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
- `src/components/CrudPage.jsx` e o componente usado nos tres CRUDs.
- `src/components/Report.jsx` usa `map` nos pedidos e `find` para buscar cliente e cerveja pelo id.
