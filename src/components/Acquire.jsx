import { useState } from "react";
import { assetPath } from "../utils/assetPath.js";

const emptyInterest = {
  nome: "",
  email: "",
  cervejaId: "",
};

export default function Acquire({ beers }) {
  const [interest, setInterest] = useState(emptyInterest);
  const [message, setMessage] = useState("");

  function updateField(field, value) {
    setMessage("");
    setInterest((currentInterest) => ({ ...currentInterest, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!interest.nome.trim() || !interest.email.trim() || !interest.cervejaId) {
      setMessage("Preencha nome, e-mail e cerveja.");
      return;
    }

    const selectedBeer = beers.find((beer) => beer.id === interest.cervejaId);
    setMessage(`Pedido de interesse enviado para ${selectedBeer?.nome}.`);
    setInterest(emptyInterest);
  }

  return (
    <main className="page">
      <section className="content-section acquire-layout">
        <div>
          <div className="section-heading">
            <span>Adquira a sua</span>
            <h1>Escolha sua MARS</h1>
            <p>
              Preencha seus dados e escolha uma das cervejas disponiveis para
              receber o atendimento da equipe.
            </p>
          </div>

          <form className="stack-form public-form" onSubmit={handleSubmit}>
            <label>
              Nome
              <input
                type="text"
                value={interest.nome}
                placeholder="Digite seu nome"
                onChange={(event) => updateField("nome", event.target.value)}
              />
            </label>

            <label>
              E-mail
              <input
                type="email"
                value={interest.email}
                placeholder="Digite seu e-mail"
                onChange={(event) => updateField("email", event.target.value)}
              />
            </label>

            <label>
              Cerveja
              <select value={interest.cervejaId} onChange={(event) => updateField("cervejaId", event.target.value)}>
                <option value="">Selecione</option>
                {beers.map((beer) => (
                  <option key={beer.id} value={beer.id}>
                    {beer.nome}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit" className="primary-button">
              Enviar
            </button>

            {message && <p className="form-message success">{message}</p>}
          </form>
        </div>

        <img className="acquire-beers" src={assetPath("mars-beers.png")} alt="Cervejas MARS" />
      </section>
    </main>
  );
}
