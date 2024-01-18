let nextPage = 'frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1';

init();
fetchProducts();

function init() {
	document.querySelector('#form-section form').addEventListener('submit', onSelectionFormSubmit);
	document.querySelector('#form-title-wrapper img').addEventListener('click', () => {
		document.querySelector('#form-section').classList.toggle('collapsed');
	});
	document.querySelector('#btn-selection-more').addEventListener('click', () => {
		fetchProducts();
	});
	document.querySelector('#input-cpf').addEventListener('input', e => formatCPF(e.target));
	document.querySelector('#share-section form').addEventListener('submit', onShareFormSubmit);
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

function formatCPF(target) {
	let digits = (target.value.match(/[0-9]/g) ?? ['']).join('');
	digits = digits.substring(0, Math.min(digits.length, 11));
	let result = '';
	for (let i = 0; i < digits.length; i++) {
		if (i > 0 && i < 8 && i % 3 === 0) {
			result += '.';
		} else if (i > 0 && i % 9 === 0) {
			result += '-';
		}
		result += digits[i];
	}
	target.value = result;
}

function addProducts(products) {
	const container = document.querySelector('#card-container');
	products.forEach(product => {
		const card = document.createElement('div');
		card.className = 'card';
		card.innerHTML += `
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
		card.querySelector('button').addEventListener('click', () => { onBuyClick(product) });
		container.append(card);
	});
}

function onBuyClick(product) {
	alert(`Produto comprado:
	 Id: ${product.id}
	 Nome: ${product.name}
	 Descrição: ${product.description}
	 Preço: ${formatCurrency(product.price)}
`);
}

function onSelectionFormSubmit() {
	alert(`Formulário enviado:
	 Nome: ${document.querySelector('#input-name').value}
	 Email: ${document.querySelector('#input-email').value}
	 CPF: ${document.querySelector('#input-cpf').value}
	 Sexo: ${document.querySelector('#gender-male').checked ? 'Masculino' : 'Feminino'}
`);
}

function onShareFormSubmit(e) {
	// 	alert(`Formulário enviado:
	// 	 Nome: ${document.querySelector('#share-info-container input[type=text]').value}
	// 	 Nome: ${document.querySelector('#share-info-container input[type=email]').value}
	// `);
	const name = document.querySelector('#share-info-container input[type=text]').value;
	window.open(`./newsletter.html?name=${name}`, target = "blank");
	e.preventDefault();
}