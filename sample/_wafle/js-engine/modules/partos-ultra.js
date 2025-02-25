

// elem = Объект-элемент или селектор

// Класс модифицированного элемента
class EditableElem {
	constructor(elem) {
		this.selector = null;
		this.element = toElem(elem);
		this.parent = null;
		this.func = {};
		this.events = {};

		this.init();
	}

	// Инициализация / Установка нового селектора
	init() {
		this.selector = this.getSelector();
		this.parent = this.element.parentNode;
	}


	//- - - - - - - - - - - - - - - - - - -
	//    РАБОТА С DOM-ДЕРЕВОМ (ПЕРЕДВИЖЕНИЕ И ДОЧЕРНИЕ ЭЛЕМЕНТЫ)
	//- - - - - - - - - - - - - - - - - - -


	// Поставить внутрь элемента
	place(parentElem) {
		parentElem = toElem(parentElem);

		parentElem.appendChild(this.element);
		this.init();
	}

	// Поставить перед элементом
	insertBefore(otherElem) {
		otherElem = toElem(otherElem);
		var parentElem = otherElem.parentNode;

		parentElem.insertBefore(this.element, otherElem);
		this.init();
	}

	// Поставить после элемента
	insertAfter(otherElem) {
		otherElem = toElem(otherElem);
		var parentElem = otherElem.parentNode;

		this.insertBefore(otherElem);
		toEdit(otherElem).insertBefore(this);
		this.init();
	}

	// Найти элемент(ы) по селектору внутри модэлема
	find(selector) {
		var elem = this.element.querySelectorAll(selector);

		if (elem.length == 1) {
			elem = elem[0];
		}

		return elem;
	}

	// Удалить элемент
	delete() {
		this.parent.removeChild(this.element);
	}


	//- - - - - - - - - - - - - - - - - - -
	//    РАБОТА С КОНТЕНТОМ
	//- - - - - - - - - - - - - - - - - - -


	// Быстро получить innerHTML
	getContent() {
		return this.element.innerHTML;
	}

	// Быстро добавить innerHTML
	setHTML(content) {
		this.element.innerHTML = content;
	}

	// Быстро добавить innerText
	setText(content) {
		this.element.innerText = content;
	}

	// Быстро получить value
	getValue() {
		return this.element.value;
	}

	// Быстро добавить value
	setValue(val) {
		this.element.value = val;
	}

	// Заменить части текста
	replace(replaceList) {
		var content = this.element.innerHTML;

		for (let [key, value] of Object.entries(replaceList)) {
			content = content.replace(key, value);
		}

		this.element.innerHTML = content;
	}


	//- - - - - - - - - - - - - - - - - - -
	//    СЕЛЕКТОР
	//- - - - - - - - - - - - - - - - - - -


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
		var selParts = selectorSplit(selector);

		// Установка всех параметров
		this.element.id = selParts.id;
		this.element.classList.value = selParts.classes.join(" ");
	}


	//- - - - - - - - - - - - - - - - - - -
	//    РЕДАКТИРОВАНИЕ КЛАССОВ И АЙДИ
	//- - - - - - - - - - - - - - - - - - -


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

	//- - - - - - - - - - - - - - - - - - -
	//    ПАРАМЕТРЫ
	//- - - - - - - - - - - - - - - - - - -

	setParam(key, value) {
		this.element.setAttribute(key, value);
	}

	getParam(key) {
		return this.element.getAttribute(key);
	}

	//- - - - - - - - - - - - - - - - - - -
	//    РАБОТА С ВНУТРЕННИМИ ФУНКЦИЯМИ
	//- - - - - - - - - - - - - - - - - - -

	addFunc(key, func) {
		this.func[key] = func.bind(this);
	}

	removeFunc(key) {
		this.func[key] = undefined;
	}

	//- - - - - - - - - - - - - - - - - - -
	//    ДЕЙСТВИЯ
	//- - - - - - - - - - - - - - - - - - -

	// Функция добавляет элему действие
	setEvent(type, func) {
		this.events[type] = func;
		this.element[type] = func;
	}
}


//- - - - - - - - - - - - - - - - - - -


// Функция разбивает селектор на части
function selectorSplit(selector) {
	var elemTag = "";
	var elemId = "";
	var elemClasses = [];


	selector = selector.replaceAll(" ", "");

	var selectorSplitter = selector.split("#");

	// Если в селекторе есть знак "#" - айди
	if (selectorSplitter.length != 1) {

		// Разбиение строки на части параметров элемента
		elemTag = selectorSplitter[0];
		selectorSplitter = selector.split(".");
		elemId = selectorSplitter[0].split("#")[1];
		elemClasses = selectorSplitter.slice(1);

	// Если нет знака
	} else {

		// Разбиение строки на части параметров элемента
		selectorSplitter = selector.split(".");
		elemTag = selectorSplitter[0];
		elemClasses = selectorSplitter.slice(1);

	}

	if (elemTag == "") {
		elemTag = "div";
	}

	return {
		tag: elemTag,
		id: elemId,
		classes: elemClasses
	};
}


// Функция превращает селектор/элемент/модэлем в элемент(ы)
function toElem(elem) {

	// Модэлем -> элемент
	if (elem instanceof EditableElem) {
		elem = elem.element;
	}

	// Селектор -> элемент(ы)
	if (typeof(elem) == "string") {
		elem = document.querySelectorAll(elem);

		if (elem.length == 1) {
			elem = elem[0];
		}
	}

	return elem;
}


// Функция превращает селектор/элемент/модэлем в модэлем
function toEdit(elem) {

	// Модэлем -> элемент
	if (elem instanceof EditableElem) {
		elem = elem;
	}
	elem = toElem(elem);

	// Список элементов -> список модэлемов
	if (elem instanceof NodeList) {
		var elemList = elem;
		elem = [];

		for (let elemPart of elemList) {
			elem.push(toEdit(elemPart));
		}

	// Селектор/элемент -> элемент
	} else {
		elem = new EditableElem(elem);
	}

	return elem;
}


// Функция создаёт элемент по селектору
function newElem(selector, parent = null, content = null) {
	var selectorInfo = selectorSplit(selector);

	var newElem = document.createElement(selectorInfo.tag);
	newElem.id = selectorInfo.id;
	newElem.classList.value = selectorInfo.classes.join(" ");

	if (parent != null) {
		toElem(parent).appendChild(newElem);
	}

	newElem.innerHTML = content;
	if (newElem.innerHTML == null) {
		newElem.value = content;
	}

	return newElem;
}


// Функция создаёт модэлем по селектору
function newEdit(selector, parent = null, content = null, funcs = {}, events = {}) {
	var clonedEdit = newElem(selector, parent, content);
	clonedEdit = toEdit(clonedEdit);

	// Добавление функций
	for (let [funcKey, funcAct] of Object.entries(funcs)) {
		clonedEdit.addFunc(funcKey, funcAct);
	}

	// Добавление ивентов
	for (let [eventKey, eventFunc] of Object.entries(events)) {
		clonedEdit.setEvent(eventKey, eventFunc);
	}

	return clonedEdit;
}


// Функция создаёт элемент по образу модэлема
function cloneElem(origElem, parent = null, elemId = "") {
	origElem = toEdit(origElem);

	var clonedElem = newElem(
		origElem.selector,
		parent,
		origElem.getHTML
	);

	clonedElem.value = origElem.getValue();
	clonedElem.id = elemId;
	return clonedElem;
}

// Функция создаёт эдит по образу эдита
function cloneEdit(origEdit, parent = null, elemId = "") {
	origEdit = toEdit(origEdit);

	var clonedEdit = newEdit(
		origEdit.selector,
		parent,
		origEdit.getHTML,
		origEdit.funcs,
		origEdit.events
	);

	clonedEdit.value = origEdit.getValue();
	clonedEdit.id = elemId;
	return clonedEdit;
}


// - - - - - - - - - - - - - - - - -
wafle.say(`(PartOS Ultra) loaded`);
// - - - - - - - - - - - - - - - - -