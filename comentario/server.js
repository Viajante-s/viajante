const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite CORS para todas as origens
app.use(bodyParser.json()); // Parseia JSON no corpo da requisição

// Conectando ao MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/comentarios", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((error) => console.error("❌ Erro ao conectar ao MongoDB:", error));

// Modelo de Comentário
const Comentario = mongoose.model("Comentario", {
  texto: String,
  data: Date,
});

// Rota para adicionar um comentário
app.post("/comments", async (req, res) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ mensagem: "⚠️ O texto do comentário é obrigatório!" });
  }

  const novoComentario = new Comentario({
    texto: texto,
    data: new Date(),
  });

  try {
    await novoComentario.save();
    console.log("✅ Comentário salvo:", novoComentario);
    res.status(201).json({ mensagem: "✅ Comentário salvo com sucesso!", comentario: novoComentario });
  } catch (error) {
    console.error("❌ Erro ao salvar comentário:", error);
    res.status(500).json({ mensagem: "❌ Erro ao salvar comentário!" });
  }
});

// Rota para obter todos os comentários
app.get("/comentarios", async (req, res) => {
  try {
    const comentarios = await Comentario.find().sort({ data: -1 });
    res.json(comentarios);
  } catch (error) {
    console.error("❌ Erro ao buscar comentários:", error);
    res.status(500).json({ mensagem: "❌ Erro ao buscar comentários!" });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
