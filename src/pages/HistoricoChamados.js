import React from "react";
import { Button, Container, Typography, Box, Grid, Card, CardContent, CardActions, Tooltip, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HistoricoChamados = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email, cliente, projetos } = location.state || {};

    const handleNovoChamado = () => {
        navigate("/novo-chamado", {
            state: { email, cliente, projetos }
        });
    };

    const handleSair = () => {
        navigate("/");
    };

    // Simulação de lista de chamados
    const chamados = []; // substitua com dados reais se tiver

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center"  sx={{ backgroundColor: "#f5f5f5", mt: 6, borderRadius: "5px" }} mb={4}>
                <Typography ml={2} variant="h4" fontWeight="bold" sx={{ color: "#444", fontSize: "2rem" }}>
                    Histórico de Chamados
                </Typography>
                <Box display="flex" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <Button variant="contained" onClick={handleNovoChamado} 
                            sx={{ backgroundColor: "#8A55D4", '&:hover': { backgroundColor: "#7A47C0" },  }}>
                            Novo Chamado
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleSair} sx={{ ml: 2 }}>
                            Sair
                        </Button>
                        <Tooltip title={`Email: ${email}\nCliente: ${cliente}`} arrow>
                            <IconButton sx={{ color: "#444", '&:hover': { color: "#8A55D4" } }}>
                                <AccountCircleIcon sx={{ fontSize: "2.5rem" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>                    
                </Box>
            </Box>

            {/* Lista de chamados */}
            <Grid container spacing={2}>
                {chamados.length === 0 ? (
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
                                    <Typography variant="body2" color="text.secondary">{chamado.descricao}</Typography>
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
