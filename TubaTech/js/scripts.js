// =======================
// ADICIONAR AO CARRINHO
// =======================
const botoesCarrinho = document.querySelectorAll(".btn-carrinho");

botoesCarrinho.forEach(botao => {
  botao.addEventListener("click", () => {
    const card = botao.closest(".item-card");
    const nome = card.querySelector("h3")?.innerText;
    const categoria = card.querySelector("p:nth-of-type(1)")?.innerText.replace("Categoria: ", "") || "";
    const precoTexto = card.querySelector("p:nth-of-type(2)")?.innerText.replace("Preço: R$ ", "").replace(",", ".") || "0";
    const imagem = card.querySelector("img")?.getAttribute("src");

    const produto = {
      nome,
      categoria,
      preco: parseFloat(precoTexto),
      imagem
    };

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    mostrarMensagem("✅ Produto adicionado ao carrinho!");
  });
});

function mostrarMensagem(mensagem) {
  const popup = document.createElement("div");
  popup.innerText = mensagem;
  popup.classList.add("popup-sucesso");
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// =======================
// FILTRO POR CATEGORIA
// =======================
const botoesCategoria = document.querySelectorAll("nav button");
const cards = document.querySelectorAll(".item-card");

botoesCategoria.forEach(botao => {
  botao.addEventListener("click", () => {
    const categoriaSelecionada = botao.dataset.categoria;

    // Remove destaque de todos os botões e ativa apenas o clicado
    botoesCategoria.forEach(btn => btn.classList.remove("active"));
    botao.classList.add("active");

    // Filtra os produtos pela categoria selecionada
    cards.forEach(card => {
      const categoriaCard = card.dataset.categoria;
      if (categoriaSelecionada === "todos" || categoriaSelecionada === categoriaCard) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
