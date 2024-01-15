const PAGE = 'frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1';

init();
fetchProducts();

function init() {
	document.querySelector('#btn-more').addEventListener('click', () => { window.open('./') });
}

function fetchProducts() {
	fetch(`https://${PAGE}`)
		.then(res => res.json())
		.then(json => {
			addProducts(json.products);
		});
}

function formatCurrency(value) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	}).format(value);
}

function addProducts(products) {
	const container = document.querySelector('#card-container');
	for (let i = 0; i < 2; i++) {
		const card = document.createElement('div');
		card.className = 'card';
		card.innerHTML += `
			<div class="card">
				<img src="${products[i].image}" alt="${products[i].name}" title="${products[i].name}\nApenas ${formatCurrency(products[i].price)}" loading="lazy">
				<div class="card__info">
					<h4>${products[i].name}</h4>
					<p class="description">${products[i].description}</p>
					<p class="old-price">De: ${formatCurrency(products[i].oldPrice)}</p>
					<h3 class="price">Por: ${formatCurrency(products[i].price)}</h3>
					<p class="installment">ou ${products[i].installments.count}x de ${formatCurrency(products[i].installments.value)}</p>
					<button>Comprar</button>
				</div>
			</div>
		`;
		card.querySelector('button').addEventListener('click', () => { onBuyClick(products[i]) });
		container.append(card);
	}
}

function onBuyClick(product) {
	alert(`Produto comprado:
	 Id: ${product.id}
	 Nome: ${product.name}
	 Descrição: ${product.description}
	 Preço: ${formatCurrency(product.price)}
`);
}