import { useState } from "react";
import { assetPath } from "../utils/assetPath.js";

export default function AgeGate({ onAccept }) {
  const [blocked, setBlocked] = useState(false);

  if (blocked) {
    return (
      <main className="age-page">
        <img className="particles" src={assetPath("particulas.png")} alt="" />
        <section className="age-content">
          <img src={assetPath("mars-logo-white.svg")} alt="MARS Cervejaria" />
          <div>
            <p className="age-title">Infelizmente voce nao pode acessar este site</p>
            <div className="age-actions">
              <button type="button" className="outline-button" onClick={() => setBlocked(false)}>
                Voltar
              </button>
            </div>
          </div>
          <img className="sad-face" src={assetPath("triste.svg")} alt="" />
        </section>
      </main>
    );
  }

  return (
    <main className="age-page">
      <img className="particles" src={assetPath("particulas.png")} alt="" />
      <section className="age-content">
        <img src={assetPath("mars-logo-white.svg")} alt="MARS Cervejaria" />
        <div>
          <p className="age-title">A MARS se preocupa com o consumo consciente</p>
          <p className="age-question">Voce tem mais de 18 anos?</p>
          <div className="age-actions">
            <button type="button" className="primary-button" onClick={onAccept}>
              Sim
            </button>
            <button type="button" className="outline-button" onClick={() => setBlocked(true)}>
              Nao
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
