// Função para adicionar um novo comentário
async function addComment() {
  const commentInput = document.getElementById("commentInput");
  const texto = commentInput.value.trim();

  if (texto === "") {
    alert("⚠️ Escreva um comentário antes de enviar!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texto }),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Comentário adicionado:", data);
    commentInput.value = ""; // Limpar o campo após envio
    loadComments(); // Atualizar a lista de comentários
  } catch (error) {
    console.error("❌ Erro ao adicionar comentário:", error);
  }
}

// Função para carregar os comentários do backend
async function loadComments() {
  try {
    const response = await fetch("http://localhost:3000/comentarios");

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const comentarios = await response.json();
    const commentSection = document.getElementById("commentsList");
    commentSection.innerHTML = ""; // Limpar lista antes de renderizar novamente

    comentarios.forEach(comment => {
      let commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      commentDiv.innerHTML = `<p>${comment.texto}</p><time>${new Date(comment.data).toLocaleString()}</time>`;
      commentSection.appendChild(commentDiv);
    });
  } catch (error) {
    console.error("❌ Erro ao buscar comentários:", error);
  }
}

// Carregar comentários ao abrir a página
document.addEventListener("DOMContentLoaded", loadComments);
