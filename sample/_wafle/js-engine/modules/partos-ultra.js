

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


	//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
	//                             /
	//    ПЕРЕДВИЖЕНИЕ МОДЭЛЕМА
	//_ _ _ _ _ _ _ _ _ _ _ _ _ _/


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


	//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
	//                             /
	//    КОНТЕНТ
	//_ _ _ _ _ _ _ _ _ _ _ _ _ _/

	// Быстро получить innerHTML
	getContent() {
		var content = this.element.innerHTML;
		return content;
	}

	// Быстро добавить innerHTML
	setHTML(content) {
		this.element.innerHTML = content;
	}

	// Быстро добавить innerText
	setText(content) {
		this.element.innerText = content;
	}

	// Заменить части текста
	replace(replaceList) {
		var content = this.element.innerHTML;

		for (let [key, value] of Object.entries(replaceList)) {
			content = content.replace(key, value);
		}

		this.element.innerHTML = content;
	}


	//_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
	//                             /
	//    СТИЛИ И СЕЛЕКТОР
	//_ _ _ _ _ _ _ _ _ _ _ _ _ _/

	// Получить селектор элемента
	getSelector() {
		var selector = "";

		selector += this.element.tagName;
		selector += "#" + this.element.id;

		for (let className of this.element.classList) {
			selector += "." + className;
		}

		selector = selector.toLowerCase();
		return selector;
	}

	// Установить селектор
	setSelector(selector) {
		var elemTag = "";
		var elemId = "";
		var elemClasses = [];


		selector = selector.replaceAll(" ", "");

		var selectorSplitter = selector.split("#");

		// Если в селекторе есть знак "#" - айди
		if (selectorSplitter.length != 1) {

			elemTag = selectorSplitter[0];
			selectorSplitter = selector.split(".");
			elemId = selectorSplitter[0].split("#")[1];
			elemClasses = selectorSplitter.slice(1);

		// Если нет знака
		} else {

			selectorSplitter = selector.split(".");
			elemTag = selectorSplitter[0];
			elemClasses = selectorSplitter.slice(1);

		}

		if (elemTag == "") {
			elemTag = "div";
		}

		// Установка всех параметров
		this.element.id = elemId;
		this.element.classList.value = elemClasses.join(" ");

		//return `Tag: ${elemTag}, Id: ${elemId}, Classes: ${elemClasses}`;
	}

	// Получить ID элемента
	getId() {
		return this.element.id;
	}

	// Изменить ID элемента
	setId(newId) {
		this.element.id = newId;
	}

	// Выставить новые классы
	setClass(classList) {
		if (typeof(classList) == "array") {
			this.element.classList.value = classList.join(" ");

		} else {
			this.element.classList.value = classList;
		}
	}

	// Добавить класс
	addClass(className) {
		this.element.classList.add(className);
	}

	// Убрать класс
	removeClass(className) {
		this.element.classList.remove(className);
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