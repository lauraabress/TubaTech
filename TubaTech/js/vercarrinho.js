const lista = document.getElementById("lista-carrinho");
const total = document.getElementById("total");

const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if (carrinho.length === 0) {
  lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
  total.innerText = "";
} else {
  let valorTotal = 0;
  carrinho.forEach(produto => {
    const div = document.createElement("div");
    div.classList.add("item-carrinho");
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="info">
        <h3>${produto.nome}</h3>
        <p>Categoria: ${produto.categoria}</p>
        <p>Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
      </div>
    `;
    lista.appendChild(div);
    valorTotal += produto.preco;
  });

  if (valorTotal > 200) {
    total.innerText = `Total: R$ ${valorTotal.toFixed(2).replace(".", ",")} (frete grátis)`;
  } else {
    valorTotal += 29.90;
    total.innerText = `Total: R$ ${valorTotal.toFixed(2).replace(".", ",")} (com frete de R$ 29,90)`;
  }
}
 function limparCarrinho() {
      localStorage.removeItem("carrinho");
      location.reload();
    }
