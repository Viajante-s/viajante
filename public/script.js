// Função para adicionar comentário
document.getElementById('submitComment').addEventListener('click', function() {
    const commentText = document.getElementById('commentText').value;
  
    if (commentText) {
      // Criar um novo elemento de lista para o comentário
      const commentListItem = document.createElement('li');
      commentListItem.textContent = commentText;
  
      // Adicionar o comentário na lista
      document.getElementById('commentsList').appendChild(commentListItem);
  
      // Limpar a caixa de texto após o envio
      document.getElementById('commentText').value = '';
    } else {
      alert('Por favor, escreva um comentário!');
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    fetchComentarios();
  });
  
  function fetchComentarios() {
    fetch('http://localhost:3000/comentarios')  // Solicita os comentários do backend
      .then(response => response.json())
      .then(comentarios => {
        const comentariosContainer = document.getElementById('comentarios');
        comentariosContainer.innerHTML = ''; // Limpa os comentários existentes
  
        comentarios.forEach(comentario => {
          const comentarioElement = document.createElement('div');
          comentarioElement.textContent = comentario.texto;
          comentariosContainer.appendChild(comentarioElement); // Adiciona ao container
        });
      })
      .catch(error => console.log('Erro ao carregar comentários:', error));
  }
  const comentarioForm = document.getElementById('comentarioForm');
comentarioForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const textoComentario = document.getElementById('comentarioInput').value;

  fetch('http://localhost:3000/comentarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ texto: textoComentario })
  })
    .then(response => response.json())
    .then(comentario => {
      console.log('Comentário enviado:', comentario);
      fetchComentarios(); // Recarrega os comentários após o envio
    })
    .catch(error => console.log('Erro ao enviar comentário:', error));
});
