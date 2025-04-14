import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import ChamadoForm from "./pages/ChamadoForm.js";
import HistoricoChamados from "./pages/HistoricoChamados.js";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/historico" element={<HistoricoChamados />} />
                <Route path="/novo-chamado" element={<ChamadoForm />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
