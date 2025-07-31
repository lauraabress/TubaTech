const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const form = document.getElementById("form-pagamento");
const mensagem = document.getElementById("mensagem-final");

const entregaPago = document.querySelector(".frete-pago");
const entregaGratis = document.querySelector(".frete-gratis");

// Seleciona os campos onde o JS vai injetar os valores:
const precoPago = entregaPago.querySelector(".total");
const precoPagoExtra = entregaPago.querySelector(".valor");
const precoGratis = entregaGratis.querySelector(".total");

if (carrinho.length === 0) {
  entregaPago.innerHTML = "<p>Seu carrinho está vazio.</p>";
  entregaGratis.style.display = "none";
  form.style.display = "none";
} else {
  const resumo = JSON.parse(localStorage.getItem("resumoCompra"));

  if (resumo) {
    let totalProdutos = resumo.valorProdutos;
    let frete = resumo.frete;
    let totalComFrete = resumo.totalFinal;
    let tipoFrete = resumo.tipoFrete;

    // Atualiza os blocos de entrega com valores reais
    precoPago.textContent = `R$${totalComFrete.toFixed(2).replace(".", ",")}`;
    precoPagoExtra.textContent = frete > 0 ? `+R$${frete.toFixed(2).replace(".", ",")}` : "+R$0,00";
    precoGratis.textContent = `R$${totalProdutos.toFixed(2).replace(".", ",")}`;

    // Destaque visual conforme o tipo de frete escolhido
    if (tipoFrete === "GRÁTIS") {
      entregaGratis.classList.add("selecionado");
      entregaPago.classList.remove("selecionado");
    } else {
      entregaPago.classList.add("selecionado");
      entregaGratis.classList.remove("selecionado");
    }

    // Evento de finalização
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formaPagamento = form.pagamento.value;
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

      // Limpa dados
      localStorage.removeItem("carrinho");
      localStorage.removeItem("resumoCompra");
      form.style.display = "none";
    });

  } else {
    entregaPago.innerHTML = "<p>Resumo não disponível.</p>";
    entregaGratis.style.display = "none";
    form.style.display = "none";
  }
}
