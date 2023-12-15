

// elem = Объект-элемент или селектор

// Класс модифицированного элемента
class EditableElem {
	constructor(elem) {
		this.selector = null;
		this.element = elemize(elem);
		this.parent = null;

		this.init();
	}

	// Инициализация / Установка нового селектора
	init() {

	}

	// Поставить внутрь элемента
	place(parentElem) {
		parentElem = el(parentElem);
		console.log(parentElem);
		console.log(this.element);
		parentElem.element.appendChild(this.element);
	}
}


// Функция превращает селектор/элемент в элемент
function elemize(elem) {

	// Если это селектор, превращаем в элемент
	if (typeof(elem) == "string") {
		elem = document.querySelector(elem);
	}
	return elem;
}


// Функция превращает селектор/элемент/модэлем в модэлем
function el(elem) {
	if (elem instanceof EditableElem) {
		elem = elem.element;
	} else {
		elem = elemize(elem);
	}

	var newElem = new EditableElem(elem);
	return newElem;
}