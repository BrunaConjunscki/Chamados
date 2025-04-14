import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Tooltip,
    IconButton
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HistoricoChamados = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email, cliente, projetos } = location.state || {};

    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleNovoChamado = () => {
        navigate("/novo-chamado", {
            state: { email, cliente, projetos }
        });
    };

    const handleSair = () => {
        navigate("/");
    };

    useEffect(() => {
        const fetchChamados = async () => {
            try {
                const response = await axios.get("https://integrador.in.saltsystems.com.br/webhook/5d12a722-aaf6-42c0-975b-513cbe28c3da/listar-chamados", {
                    email,
                    cliente
                });
                setChamados(response.data || []);
            } catch (error) {
                console.error("Erro ao buscar chamados:", error);
            } finally {
                setLoading(false);
            }
        };

        if (email && cliente) {
            fetchChamados();
        }
    }, [email, cliente]);

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ backgroundColor: "#f5f5f5", mt: 6, borderRadius: "5px", p: 2 }}
                mb={4}
            >
                <Typography variant="h4" fontWeight="bold" sx={{ color: "#444", fontSize: "2rem" }}>
                    Histórico de Chamados
                </Typography>
                <Box display="flex" alignItems="center">
                    <Button
                        variant="contained"
                        onClick={handleNovoChamado}
                        sx={{
                            backgroundColor: "#8A55D4",
                            '&:hover': { backgroundColor: "#7A47C0" }
                        }}
                    >
                        Novo Chamado
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleSair}
                        sx={{ ml: 2 }}
                    >
                        Sair
                    </Button>
                    <Tooltip title={`Email: ${email}\nCliente: ${cliente}`} arrow>
                        <IconButton sx={{ color: "#444", '&:hover': { color: "#8A55D4" }, ml: 2 }}>
                            <AccountCircleIcon sx={{ fontSize: "2.5rem" }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Grid container spacing={2}>
                {loading ? (
                    <Grid item xs={12}>
                        <Typography align="center">Carregando chamados...</Typography>
                    </Grid>
                ) : chamados.length === 0 ? (
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography align="center" variant="body1" color="text.secondary">
                                    Nenhum chamado encontrado.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ) : (
                    chamados.map((chamado, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{chamado.titulo}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {chamado.descricao}
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                        Projeto: {chamado.projeto}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Ver Detalhes</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default HistoricoChamados;
