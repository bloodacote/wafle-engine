

// Класс модифицированного элемента
class posuElem {
	constructor(selector) {
		this.selector = selector;
		this.elem = null;
		this.place = null;

		this.init();
	}

	// Инициализация / Устанвока нового селектора
	init(selector = this.selector) {
		this.selector = selector;
		this.elem = document.querySelector(this.selector);
		this.place = this.elem.parentElement;
	}
}


// Функция получает элемент
function el(elemSelector) {
	var elem = new posuElem(elemSelector);
	return elem;
}