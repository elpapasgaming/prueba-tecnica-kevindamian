import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper } from "@mui/material";

function Form() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const autenticado = localStorage.getItem("autenticado");
    if (!autenticado){
        navigate ("/");
        return;
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !body) {
      alert("Debe completar todos los campos");
      return;
    }

    alert("Registro creado");
    navigate("/lista");
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 600, margin: "20px auto" }}>
      <h2>Nuevo registro</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Contenido"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Guardar
        </Button>
      </form>
    </Paper>
  );
}

export default Form;