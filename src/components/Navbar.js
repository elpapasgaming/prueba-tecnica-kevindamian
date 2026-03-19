import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar({ setAutenticado }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("autenticado");
    setAutenticado(false);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate("/inicio")}>
            Inicio
          </Button>
          <Button color="inherit" onClick={() => navigate("/lista")}>
            Publicaciones
          </Button>
          <Button color="inherit" onClick={() => navigate("/fotos")}>
            Fotos
          </Button>
        </Box>

        <Button color="inherit" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;