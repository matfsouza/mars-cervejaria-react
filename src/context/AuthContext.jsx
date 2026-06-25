import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const AuthContext = createContext(null);

const LOGIN_EMAIL = "admin@mars.com";
const LOGIN_PASSWORD = "123456";

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("mars:user", null);

  function login(email, password) {
    if (!email.trim() || !password.trim()) {
      return { ok: false, message: "Preencha o e-mail e a senha." };
    }

    if (email === LOGIN_EMAIL && password === LOGIN_PASSWORD) {
      setUser({ name: "Equipe MARS", email });
      return { ok: true };
    }

    return { ok: false, message: "E-mail ou senha incorretos." };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
