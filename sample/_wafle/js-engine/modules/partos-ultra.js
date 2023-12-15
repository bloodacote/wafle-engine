

// elem = Объект-элемент или селектор

// Класс модифицированного элемента
class EditableElem {
	constructor(elem) {
		this.selector = null;
		this.element = elem;
		this.parent = null;

		this.init();
	}

	// Инициализация / Установка нового селектора
	init() {
		this.parent = this.element.parentNode;
	}
}


// Функция возвращает элемент
function el(elem) {

	// Если это селектор, превращаем в элемент
	if (typeof(elem) == "string") {
		elem = document.querySelector(elem);
	}

	var newElem = new EditableElem(elem);
	return newElem;
}