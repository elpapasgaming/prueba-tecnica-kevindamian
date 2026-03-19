import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../api/posts";
import Registro from "./Registro";

import {
  Paper,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";

function Lista() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const cardBackground = "#E3F2FD";

  useEffect(() => {
    const autenticado = localStorage.getItem("autenticado") === "true";
    if (!autenticado) {
      navigate("/");
      return;
    }

    const storedPosts = localStorage.getItem("posts");

    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
      setLoading(false);
    } else {
      const fetchPosts = async () => {
        const data = await getPosts();
        setPosts(data);
        localStorage.setItem("posts", JSON.stringify(data));
        setLoading(false);
      };

      fetchPosts();
    }
  }, [navigate]);

  const handleOpenEdit = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleOpenCreate = () => {
    setSelectedPost({ title: "", body: "" });
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedPost(null);
  };

  const handleSave = (updatedPost) => {
    let updatedPosts;

    if (updatedPost.id) {
      updatedPosts = posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
    } else {
      const newPost = {
        ...updatedPost,
        id: posts.length + 1,
      };
      updatedPosts = [newPost, ...posts];
    }

    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    handleClose();
  };

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    handleClose();
  };

  return (
    <Paper sx={{ maxWidth: 1200, margin: "20px auto", padding: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={600}>
          Publicaciones
        </Typography>

        <Button variant="contained" onClick={handleOpenCreate}>
          Nuevo post
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  width: "100%",
                  height: 220,
                  backgroundColor: cardBackground,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
                onClick={() => handleOpenEdit(post)}
              >
                <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      lineHeight: 1.2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={openDialog}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedPost?.id ? "Editar post" : "Nuevo post"}
        </DialogTitle>

        <DialogContent>
          <Registro
            post={selectedPost}
            onSave={handleSave}
            onDelete={handleDelete}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

export default Lista;