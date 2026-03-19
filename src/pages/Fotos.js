import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPhotos } from "../api/fotos";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";

function Fotos() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const autenticado = localStorage.getItem("autenticado");
    if (autenticado !== "true") {
      navigate("/");
      return;
    }

    const fetchPhotos = async () => {
      const data = await getPhotos();
      setPhotos(data);
      setLoading(false);
    };

    fetchPhotos();
  }, [navigate]);

  return (
    <Paper sx={{ padding: 3, margin: "20px" }}>
      <h2>Galería de fotos</h2>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {photos.map((photo) => (
            <Grid item xs={12} sm={6} md={4} key={photo.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={photo.thumbnailUrl}
                  alt={photo.title}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {photo.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
}

export default Fotos;