const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const resumo = document.getElementById("resumo-pagamento");
const form = document.getElementById("form-pagamento");
const mensagem = document.getElementById("mensagem-final");

if (carrinho.length === 0) {
  resumo.innerHTML = "<p>Seu carrinho está vazio.</p>";
  form.style.display = "none";
} else {
  let total = carrinho.reduce((soma, item) => soma + item.preco, 0);
  let frete = total > 200 ? 0 : 29.9;

  resumo.innerHTML = `
    <p>Valor dos produtos: R$ ${total.toFixed(2).replace('.', ',')}</p>
    <p>Frete: ${frete === 0 ? "Grátis" : "R$ 29,90"}</p>
    <p><strong>Total: R$ ${(total + frete).toFixed(2).replace('.', ',')}</strong></p>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formaPagamento = form.pagamento.value;

    let totalFinal = total + frete;

    if (formaPagamento === "pix") {
      totalFinal *= 0.9; // 10% de desconto
    }

    resumo.innerHTML += `<p><strong>Valor final com desconto: R$ ${totalFinal.toFixed(2).replace('.', ',')}</strong></p>`;

    // Finaliza a compra
    localStorage.removeItem("carrinho");
    form.style.display = "none";
    mensagem.style.display = "block";
  });
}
