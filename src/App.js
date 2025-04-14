import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChamadoForm from "./pages/ChamadoForm";
import HistoricoChamados from "./pages/HistoricoChamados";
import { AuthProvider } from "./context/AuthProvider";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/historico" element={<HistoricoChamados />} />
                    <Route path="/novo-chamado" element={<ChamadoForm />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
