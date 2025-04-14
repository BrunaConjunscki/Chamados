import { createContext, useContext, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const login = async (email) => {
    if (!email.includes("@")) {
      throw new Error("Digite um email válido");
    }

    const response = await axios.post(
      "https://integrador.in.saltsystems.com.br/webhook/53124285-ff75-434f-9e5a-8f6d7ee54946/validar-email",
      { email }
    );

    if (response.data.valid) {
      const cliente = response.data.cliente;
      const projetos = response.data.projetos.split(",");
      const userData = { email, cliente, projetos };

      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
      navigate("/historico");
    } else {
      throw new Error("Acesso negado. Tente novamente");
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
