const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const formEnvio = document.getElementById("form-envio");
const formPagamento = document.getElementById("form-pagamento");
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
  formEnvio.style.display = "none";
  formPagamento.style.display = "none";
} else {
  const resumo = JSON.parse(localStorage.getItem("resumoCompra"));
 
  if (resumo) {
    let totalProdutos = resumo.valorProdutos;
    let freteAplicado = resumo.frete;
    let freteOriginal = resumo.freteOriginal || freteAplicado; // Lê o frete original
    let totalComFrete = resumo.totalFinal;
    let tipoFrete = resumo.tipoFrete;
 
    // Atualiza os blocos de entrega com valores reais
    precoPago.textContent = `R$${totalComFrete.toFixed(2).replace(".", ",")}`;
    // Agora, usa 'freteOriginal' para a exibição
    precoPagoExtra.textContent = `+R$${freteOriginal.toFixed(2).replace(".", ",")}`;
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
 
      // Limpa dados
      localStorage.removeItem("carrinho");
      localStorage.removeItem("resumoCompra");
      formEnvio.style.display = "none";
      formPagamento.querySelectorAll('input').forEach(input => input.disabled = true);
      document.querySelector('#concluir-compra').disabled = true;
    });
 
  } else {
    entregaPago.innerHTML = "<p>Resumo não disponível.</p>";
    entregaGratis.style.display = "none";
    formEnvio.style.display = "none";
    formPagamento.style.display = "none";
  }
}