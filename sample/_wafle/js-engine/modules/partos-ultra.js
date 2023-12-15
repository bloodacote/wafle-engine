

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
		this.parent = this.element.parentNode;
	}

	// Поставить внутрь элемента
	place(parentElem) {
		parentElem = elemize(parentElem);

		parentElem.appendChild(this.element);
		this.init();
	}

	// Поставить перед элементом
	insertBefore(otherElem) {
		otherElem = elemize(otherElem);
		var parentElem = otherElem.parentNode;

		parentElem.insertBefore(this.element, otherElem);
		this.init();
	}

	// Поставить после элемента
	insertAfter(otherElem) {
		otherElem = elemize(otherElem);
		var parentElem = otherElem.parentNode;

		this.insertBefore(otherElem);
		edit(otherElem).insertBefore(this);
		this.init();
	}
}


// Функция превращает селектор/элемент/модэлем в элемент
function elemize(elem) {

	// Модэлем -> элемент
	if (elem instanceof EditableElem) {
		elem = elem.element;
	}

	// Селектор -> элемент
	if (typeof(elem) == "string") {
		elem = document.querySelector(elem);
	}

	return elem;
}


// Функция превращает селектор/элемент/модэлем в модэлем
function edit(elem) {

	// Модэлем -> элемент
	if (elem instanceof EditableElem) {
		elem = elem.element;

	// Селектор/элемент -> элемент
	} else {
		elem = elemize(elem);
	}

	var newElem = new EditableElem(elem);
	return newElem;
}