// Adiciona produto ao carrinho
document.querySelectorAll('.btn-comprar').forEach((botao) => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.card');
    const imagem = card.querySelector('img').src;
    const titulo = card.querySelector('.card-title').innerText;
    const preco = card.querySelector('.card-text').innerText;
    const categoria = card.querySelector('.card-category').innerText;

    const produto = {
      imagem,
      titulo,
      preco,
      categoria,
      quantidade: 1
    };

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const existente = carrinho.find(p => p.titulo === produto.titulo);
    if (existente) {
      existente.quantidade++;
    } else {
      carrinho.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert('Produto adicionado com sucesso!');
  });
});

// Filtro por categoria (sem mudar o layout)
document.querySelectorAll('button[data-categoria]').forEach(botao => {
  botao.addEventListener('click', () => {
    const categoriaSelecionada = botao.getAttribute('data-categoria').toLowerCase();
    const cards = document.querySelectorAll('.col');

    cards.forEach(card => {
      const cardCategoria = card.querySelector('.card').classList;
      if (
        categoriaSelecionada === 'todos' ||
        cardCategoria.contains(categoriaSelecionada)
      ) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Marca botão ativo (opcional visual)
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
    botao.classList.add('active');
  });
});
