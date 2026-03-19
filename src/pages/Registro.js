import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function Registro({ post, onSave, onClose, onDelete }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setBody(post.body || "");
    }
  }, [post]);

  const handleSave = () => {
    if (!title || !body) {
      alert("Debe completar todos los campos");
      return;
    }

    onSave({
      ...post,
      title,
      body,
    });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea eliminar este post?"
    );

    if (confirmDelete) {
      onDelete(post.id);
    }
  };

  if (!post) return null;

  return (
    <Box>
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

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
      >
        {post.id && (
          <Button color="error" onClick={handleDelete}>
            Eliminar
          </Button>
        )}

        <Box>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Registro;