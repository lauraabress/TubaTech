const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const formEnvio = document.getElementById("form-envio");
const formPagamento = document.getElementById("form-pagamento");
const mensagem = document.getElementById("mensagem-final");

const entregaPago = document.querySelector(".frete-incluso");
const entregaGratis = document.querySelector(".frete-gratis");

const valorFretePago = entregaPago.querySelector(".total");
const totalFretePago = entregaPago.querySelector(".valor");

const totalFreteGratis = entregaGratis.querySelector(".valor");

if (carrinho.length === 0) {
  entregaPago.innerHTML = "<p>Seu carrinho está vazio.</p>";
  entregaGratis.style.display = "none";
  formEnvio.style.display = "none";
  formPagamento.style.display = "none";
} else {
  const resumo = JSON.parse(localStorage.getItem("resumoCompra"));

  if (resumo) {
    const totalProdutos = resumo.valorProdutos;
    const freteAplicado = resumo.frete;
    const freteOriginal = resumo.freteOriginal || freteAplicado;
    const totalComFrete = resumo.totalFinal;
    const tipoFrete = resumo.tipoFrete;

    // Sempre mostra o valor do frete no bloco de frete pago
    valorFretePago.textContent = `+R$${freteOriginal.toFixed(2).replace(".", ",")}`;

    // Atualiza os blocos de acordo com o tipo de frete escolhido
    if (tipoFrete === "GRÁTIS") {
      // selecionado: grátis
      entregaGratis.classList.add("selecionado");
      entregaPago.classList.remove("selecionado");

      // frete grátis mostra total dos produtos
      totalFreteGratis.textContent = `R$${totalProdutos.toFixed(2).replace(".", ",")}`;

      // frete pago mostra apenas frete, total zerado
      totalFretePago.textContent = "R$0,00";

    } else {
      // selecionado: pago
      entregaPago.classList.add("selecionado");
      entregaGratis.classList.remove("selecionado");

      totalFretePago.textContent = `R$${totalComFrete.toFixed(2).replace(".", ",")}`;
      totalFreteGratis.textContent = "R$0,00";
    }

    // Finalização do pagamento
    formPagamento.addEventListener("submit", (e) => {
      e.preventDefault();

      const formaPagamento = formPagamento.pagamento.value;
      if (!formaPagamento) {
        alert("Escolha uma forma de pagamento.");
        return;
      }

      let totalFinal = totalComFrete;
      if (formaPagamento === "pix") {
        totalFinal *= 0.9;
      }

      mensagem.innerHTML = `Pagamento concluído com sucesso! 🎉<br><strong>Valor final: R$ ${totalFinal.toFixed(2).replace(".", ",")}</strong>`;
      mensagem.style.display = "block";

      localStorage.removeItem("carrinho");
      localStorage.removeItem("resumoCompra");

      formEnvio.style.display = "none";
      formPagamento.querySelectorAll("input").forEach((input) => input.disabled = true);
      document.querySelector("#concluir-compra").disabled = true;
    });

  } else {
    entregaPago.innerHTML = "<p>Resumo não disponível.</p>";
    entregaGratis.style.display = "none";
    formEnvio.style.display = "none";
    formPagamento.style.display = "none";
  }
}
