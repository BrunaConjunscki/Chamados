import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Container, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    const validateEmail = async () => {
        if (!email.includes("@")) {
            setMessage({ text: "Digite um email válido", type: "error" });
            return;
        }

        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const response = await axios.post(
                "https://integrador.in.saltsystems.com.br/webhook/53124285-ff75-434f-9e5a-8f6d7ee54946/validar-email",
                { email }
            );

            if (response.data.valid) {
                const cliente = response.data.cliente;
                const projetos = response.data.projetos.split(",");
                navigate("/historico", {
                    state: { email, cliente, projetos }
                });
            } else {
                setMessage({ text: "Acesso negado. Tente novamente", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "Erro ao validar email", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container  maxWidth={false}
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f5f5f5",
        }}>
            <Card sx={{ width: 400, p: 3 }}>
                <CardContent>
                    <Typography variant="h5"  gutterBottom align="center" sx={{ color: "#333", fontWeight: "bold"}}>Abertura de Chamados</Typography>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        onClick={validateEmail}
                        disabled={loading}
                        fullWidth
                        sx={{ backgroundColor: "#8A55D4", '&:hover': { backgroundColor: "#7A47C0" } }}
                    >
                        {loading ? "Validando..." : "Entrar"}
                    </Button>


                    {message.text && (
                        <Alert severity={message.type} sx={{ mt: 2 }}>
                            {message.text}
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default LoginPage;
