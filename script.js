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
  