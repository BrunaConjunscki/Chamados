import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Container, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const userData = await login(email);
            navigate("/historico", { state: userData });
        } catch (error) {
            setMessage({ text: error.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Card sx={{ width: 400, p: 3 }}>
                <CardContent>
                    <Typography
                        variant="h5"
                        gutterBottom
                        align="center"
                        sx={{ color: "#333", fontWeight: "bold" }}
                    >
                        Abertura de Chamados
                    </Typography>
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
                        onClick={handleLogin}
                        disabled={loading}
                        fullWidth
                        sx={{ backgroundColor: "#8A55D4", "&:hover": { backgroundColor: "#7A47C0" } }}
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
