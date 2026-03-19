import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, TextField, Button, Typography } from "@mui/material";

function Login({ setAutenticado }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const autenticado = localStorage.getItem("autenticado") === "true";
    if (autenticado) {
      navigate("/inicio");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      alert("Debe ingresar usuario y contraseña");
      return;
    }
    localStorage.setItem("autenticado", "true");
  
    localStorage.setItem("usuario", username);
  
    setAutenticado(true);
    navigate("/inicio");
  };
  

  return (
    <Paper
      sx={{
        maxWidth: 400,
        margin: "60px auto",
        padding: 4,
      }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Iniciar sesión
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Usuario"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Ingresar
        </Button>
      </form>
    </Paper>
  );
}

export default Login;