// vercarrinho.js

function carregarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = 0;

  lista.innerHTML = "";

  carrinho.forEach((produto, index) => {
    const precoNumerico = parseFloat(produto.preco.replace("R$", "").replace(",", "."));
    total += precoNumerico * produto.quantidade;

    const item = document.createElement("div");
    item.classList.add("carrinho-item");
    item.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.titulo}">
      <div class="carrinho-info">
        <h4>${produto.titulo}</h4>
        <p>${produto.categoria}</p>
        <p><strong>${produto.preco}</strong></p>
      </div>
      <div class="carrinho-quantidade">
        <button onclick="alterarQtd(${index}, -1)">−</button>
        <span>${produto.quantidade}</span>
        <button onclick="alterarQtd(${index}, 1)">+</button>
      </div>
    `;
    lista.appendChild(item);
  });

  document.getElementById("total").innerText = "Total: R$ " + total.toFixed(2).replace(".", ",");
}

function alterarQtd(index, delta) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho[index]) {
    carrinho[index].quantidade += delta;
    if (carrinho[index].quantidade <= 0) {
      carrinho.splice(index, 1); // remove
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
  }
}

function limparCarrinho() {
  localStorage.removeItem("carrinho");
  carregarCarrinho();
}

function voltar() {
  window.location.href = "index.html";
}

window.onload = carregarCarrinho;
