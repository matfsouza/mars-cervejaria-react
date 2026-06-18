import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { assetPath } from "../utils/assetPath.js";

export default function Login({ onSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const result = login(email, password);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setMessage("");
    onSuccess();
  }

  return (
    <main className="page page-centered">
      <section className="login-card">
        <img src={assetPath("mars-logo.svg")} alt="MARS Cervejaria" />
        <h1>Login administrativo</h1>
        <p className="muted">Acesso usado para cadastrar cervejas, clientes e pedidos.</p>

        <form onSubmit={handleSubmit} className="stack-form">
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@mars.com"
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="123456"
            />
          </label>

          {message && <p className="form-message">{message}</p>}

          <button type="submit" className="primary-button">
            Entrar
          </button>
        </form>

        <p className="helper-text">Teste: admin@mars.com / 123456</p>
      </section>
    </main>
  );
}
