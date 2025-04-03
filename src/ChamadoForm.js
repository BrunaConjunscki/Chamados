import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Container, Alert } from "@mui/material";
import axios from "axios";

const ChamadoForm = () => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [cliente, setCliente] = useState("");
    const [projetos, setProjetos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        projeto: "",
    });

    const validateEmail = async () => {
        if (!email.includes("@")) {
            setMessage({ text: "Digite um email válido", type: "error" });
            return;
        }

        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const response = await axios.post(
                "https://integrador.in.saltsystems.com.br/webhook/9ecd04fc-38b6-4aab-8979-72b4a3599a3a/validar-email",
                { email }
            );

            if (response.data.valid) {
                setIsEmailValid(true);
                setCliente(response.data.cliente);
                setProjetos(response.data.projetos.split(","));
                setMessage({ text: "Email validado com sucesso!", type: "success" });
            } else {
                setIsEmailValid(false);
                setProjetos([]);
                setMessage({ text: "Acesso negado. Tente novamente", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Erro ao validar email", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "https://integrador.in.saltsystems.com.br/webhook/9ecd04fc-38b6-4aab-8979-72b4a3599a3a/abrir-chamado",
                { email, cliente, ...formData }
            );
            setMessage({ text: "Chamado aberto com sucesso!", type: "success" });
            setEmail("");
            setIsEmailValid(false);
            setCliente("");
            setProjetos([]);
            setFormData({ titulo: "", descricao: "", projeto: "" });
        } catch (error) {
            setMessage({ text: "Erro ao abrir chamado", type: "error" });
        }
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                padding: 2,
            }}
        >
            <Card sx={{ width: 400, padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: "white" }}>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
                        Abrir Chamado
                    </Typography>

                    <TextField
                        label="Email do Cliente"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        disabled={loading}
                    />
                    <Button variant="contained" color="primary" onClick={validateEmail} disabled={loading} fullWidth>
                        {loading ? "Validando..." : "Acessar"}
                    </Button>

                    {message.text && (
                        <Alert severity={message.type} sx={{ mt: 2 }}>
                            {message.text}
                        </Alert>
                    )}

                    {isEmailValid && (
                        <>
                            <Typography sx={{ mt: 2 }}>
                                <strong>Cliente:</strong> {cliente}
                            </Typography>

                            <TextField
                                label="Título"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />

                            <TextField
                                label="Descrição"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                            />

                            <TextField
                                select
                                label="Projeto"
                                name="projeto"
                                value={formData.projeto}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                SelectProps={{ native: true }}
                            >
                                <option value=""></option>
                                {projetos.map((projeto, index) => (
                                    <option key={index} value={projeto}>
                                        {projeto}
                                    </option>
                                ))}
                            </TextField>

                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                onClick={handleSubmit}
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Abrir Chamado
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default ChamadoForm;
