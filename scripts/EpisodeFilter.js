class Filter {
	selectors = {
		root: '[data-js-filter-root]',
		listButtons: '[data-js-filter-list]',
		items: '[data-js-content-item]',
		buttons: '[data-js-filter-button]',
	}

	stateClass = {
		isActive: 'is-active',
	}

	constructor() {
		this.rootElement = document?.querySelector(this.selectors.root);
		this.listButtonsElement = this.rootElement?.querySelector(this.selectors.listButtons);
		this.itemElements = this.rootElement?.querySelectorAll(this.selectors.items);
		this.buttonElements = this.rootElement?.querySelectorAll(this.selectors.buttons);

		if (!this.rootElement || !this.listButtonsElement || this.itemElements.length === 0 || this.buttonElements.length === 0) {
			console.error('Root element or other elements episode section not found');
			return;
		}

		this.bindEvents();
	}

	// Добавление и удаление класса для кнопок, в зависимости от текущего состояния
	onListButtonElementClick = (event) => {
		const targetId = event.target.dataset.id;
		const button = event.target;

		this.buttonElements.forEach(element => element.classList.remove(this.stateClass.isActive));
		button.classList.add(this.stateClass.isActive);

		this.getItem(targetId)
	}

	// Метод - фильтрует посты в зависимости от темы поста, название темы поста прописано в атрибуте class элемента li
	getItem = (category) => {
		this.itemElements.forEach(element => {
			const isVisible = category === 'all' || element.classList.contains(category);
			element.style.display = isVisible ? 'flex' : 'none';
		})
	}

	bindEvents() {
		this.listButtonsElement.addEventListener('click', this.onListButtonElementClick);
	}

	unBindEvents() {
		this.listButtonsElement.removeEventListener('click', this.onListButtonElementClick);
	}
}

export default Filter;