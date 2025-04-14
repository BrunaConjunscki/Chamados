import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Container,
    Alert,
    TextField,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ChamadoForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, cliente, projetos } = location.state || {};

    const [message, setMessage] = useState({ text: "", type: "" });
    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        projeto: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.titulo || !formData.descricao || !formData.projeto) {
            setMessage({ text: "Preencha todos os campos!", type: "error" });
            return;
        }

        try {
            await axios.post(
                "https://integrador.in.saltsystems.com.br/webhook/ea6ef958-b813-4734-b9f1-93def7870aec/abrir-chamado",
                { email, cliente, ...formData }
            );
            setMessage({ text: "Chamado aberto com sucesso!", type: "success" });
            setFormData({ titulo: "", descricao: "", projeto: "" });

            setTimeout(() => navigate("/historico", { state: { email, cliente, projetos } }), 1500);
        } catch (error) {
            setMessage({ text: "Erro ao abrir chamado", type: "error" });
        }
    };

    const handleFechar = () => {
        navigate("/historico", { state: { email, cliente, projetos } });
    };

    return (
        <Container maxWidth={false}
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
            <Card sx={{ width: 400, padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: "white", position: "relative" }}>
                <IconButton
                    onClick={handleFechar}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    aria-label="fechar"
                >
                    <CloseIcon />
                </IconButton>

                <CardContent>
                    <Typography variant="h5" sx={{ mb: 1, textAlign: "center", fontWeight: "bold", color: "#333" }}>
                        Novo Chamado
                    </Typography>

                    {/* <Typography sx={{ mb: 2 }}>
                        <strong>Cliente:</strong> {cliente}
                        <br />
                        <strong>Email:</strong> {email}
                    </Typography> */}

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
                        sx={{ mt: 2, backgroundColor: "#8A55D4", '&:hover': { backgroundColor: "#7A47C0" } }}
                    >
                        Abrir Chamado
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

export default ChamadoForm;
