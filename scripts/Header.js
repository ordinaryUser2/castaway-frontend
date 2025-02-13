class Header {
	selectors = {
		root: '[data-js-header]',
		menu: '[data-js-header-overlay-menu]',
		burgerButton: '[data-js-header-overlay-button]',
		anchors: '[data-js-header-anchor]',
	}

	stateClasses = {
		isActive: 'is-active',
		isLock: 'is-lock',
	}

	constructor() {
		this.rootElement = document?.querySelector(this.selectors.root);
		this.menuList = this.rootElement?.querySelector(this.selectors.menu);
		this.burgerButtonElement = this.rootElement?.querySelector(this.selectors.burgerButton);
		this.anchorElements = this.rootElement?.querySelectorAll(this.selectors.anchors);
		
		if (!this.rootElement || !this.menuList || !this.burgerButtonElement || this.anchorElements.length === 0) {
			console.error('Header root element or other elements not found');
			return;
		}

		this.isMenuOpen = false;
		this.updateAttributes();
		this.bindEvents();
	}

	onButtonClick = () => {
		this.isMenuOpen = !this.isMenuOpen;

		this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
		this.menuList.classList.toggle(this.stateClasses.isActive);
		document.documentElement.classList.toggle(this.stateClasses.isLock);

		this.updateAttributes();
	}

	// Метод - обновляющий значение атрибутов у бургер-кнопки в зависимости от состояния меню (открыто или закрыто)
	updateAttributes = () => {
		const value = this.isMenuOpen ? 'Close Menu' : 'Open menu';
		this.burgerButtonElement.setAttribute('aria-label', value);
		this.burgerButtonElement.setAttribute('title', value);
	}

	// Метод - удаляющий класс 'is-active' у бкргер-кнопки и меню, а также класс 'is-lock' у html и обновляющий атрибуты
	onAnchorElementClick = () => {
		this.burgerButtonElement.classList.remove(this.stateClasses.isActive);
		this.menuList.classList.remove(this.stateClasses.isActive);
		document.documentElement.classList.remove(this.stateClasses.isLock);
		
		this.isMenuOpen = false;
		this.updateAttributes();
	}

	bindEvents() {
		this.burgerButtonElement.addEventListener('click', this.onButtonClick);
		this.anchorElements.forEach(element => {
			element.addEventListener('click', this.onAnchorElementClick);
		});
	}

	unbindEvents() {
		this.burgerButtonElement.removeEventListener('click', this.onButtonClick);
		this.anchorElements.forEach(element => {
			element.removeEventListener('click', this.onAnchorElementClick);
		});
	}
}

export default Header;