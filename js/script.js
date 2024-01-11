let nextPage = 'frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1';

init();

function init() {
	fetchProducts();

	document.querySelector('#form-title-wrapper img').addEventListener('click', () => {
		document.querySelector('#form-section').classList.toggle('collapsed');
	});
	document.querySelector('#btn-selection-more').addEventListener('click', () => {
		fetchProducts();
	});
}

function fetchProducts() {
	fetch(`https://${nextPage}`)
		.then(res => res.json())
		.then(json => {
			nextPage = json.nextPage;
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
	let newHTML = '';
	products.forEach(product => {
		newHTML += `
			<div class="card">
				<img src="${product.image}" alt="${product.name}" title="${product.name}\nApenas ${formatCurrency(product.price)}" loading="lazy">
				<div class="card__info">
					<h4>${product.name}</h4>
					<p class="description">${product.description}</p>
					<p class="old-price">De: ${formatCurrency(product.oldPrice)}</p>
					<h3 class="price">Por: ${formatCurrency(product.price)}</h3>
					<p class="installment">ou ${product.installments.count}x de ${formatCurrency(product.installments.value)}</p>
					<button>Comprar</button>
				</div>
			</div>
		`;
	});
	container.innerHTML += newHTML;
}