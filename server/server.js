const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.static('public')); // Serve os arquivos do frontend
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/comentarios')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

// Definir o esquema do comentário
const comentarioSchema = new mongoose.Schema({
  texto: String,
  data: { type: Date, default: Date.now }
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

// Rota para obter todos os comentários
app.get('/comentarios', async (req, res) => {
  try {
    const comentarios = await Comentario.find();
    res.json(comentarios);
  } catch (err) {
    res.status(500).send('Erro ao buscar comentários');
  }
});

// Rota para adicionar um comentário
app.post('/comentarios', async (req, res) => {
  const novoComentario = new Comentario({
    texto: req.body.texto
  });

  try {
    await novoComentario.save();
    res.status(201).json(novoComentario);
  } catch (err) {
    res.status(500).send('Erro ao salvar comentário');
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
