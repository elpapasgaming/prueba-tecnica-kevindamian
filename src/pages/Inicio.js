import { Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";

function Inicio() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");

    useEffect(() => {
        const autenticado = localStorage.getItem("autenticado");
        if (autenticado !== "true") {
            navigate("/");
        }

        const nombreUsuario = localStorage.getItem("usuario");    
        if (nombreUsuario) {
            setUsuario(nombreUsuario);
        }

    }, [navigate]);

    return (
        <Paper sx={{ maxWidth: 600, margin: "30px auto", padding: 4 }}>
            <h2>Hola{usuario ? ` ${usuario}` : ""}</h2>
            <p>Seleccione una opción para continuar:</p>
            <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                    variant="outlined"
                    onClick={() => navigate("/lista")}
                >
                    Gestionar Publicaciones
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => navigate("/fotos")}
                >
                    Ver fotos
                </Button>
            </Box>
        </Paper>
    );
}

export default Inicio;