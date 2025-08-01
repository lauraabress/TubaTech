// Adiciona produto ao carrinho
document.querySelectorAll('.btn-comprar').forEach((botao) => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.card');
    const imagem = card.querySelector('img').src;
    const titulo = card.querySelector('.card-title').innerText;
    const preco = card.querySelector('.card-text').innerText;
    const categoria = card.classList[1]; // ex: 'celular', 'tablet', etc.

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

// Filtro por categoria
document.querySelectorAll('button[data-categoria]').forEach(botao => {
  botao.addEventListener('click', () => {
    const categoriaSelecionada = botao.getAttribute('data-categoria').toLowerCase();

    const cards = document.querySelectorAll('#produto-container .col-12');

    cards.forEach(col => {
      const card = col.querySelector('.card');
      const cardCategoria = card.classList.contains(categoriaSelecionada);

      if (categoriaSelecionada === 'todos' || cardCategoria) {
        col.style.display = 'block';
      } else {
        col.style.display = 'none';
      }
    });

    // Marca botão ativo
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
    botao.classList.add('active');
  });
});
