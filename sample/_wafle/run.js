
/* #= = =# BASE INFO #= = =#

	:: WAFLE Engine - запускной файл
	:: Создатель: Bloodacote

	:: Файл, который запускает ядро и
	заставляет работать все системы

#= = =# BASE INFO #= = =# */


// Функция для получения пути скрипта
function getScriptPath() {

	var path = document.currentScript.src;
	var pathParts = path.split("/");

	pathParts = pathParts.slice(0, -1); // Отрезаем последний элемент

	path = pathParts.join("/");
	//path += "/";

	return path;
}


// Установка корневой папки движка
const waflePath = getScriptPath();


// - - - - - - - - - - - -
// Функция для загрузки JS-скриптов из движка
async function loadScript(url, isInternal = false) {
	return new Promise(function (resolve, reject) {

		// Если скрипт внутренний, то присоединяем папку движка
		if (isInternal) {
			url = waflePath + url;
		}

		// Создаём скрипт и даём ссылку
		var elemScript = document.createElement("script");
		elemScript.src = url;

		// Когда скрипт загрузится, функция закончит выполнение
		elemScript.onload = function () {
			resolve(true);
		}

		// Добавляем скрипт на сайтик
		document.head.appendChild(elemScript);
	});
}


// - - - - - - - - - - - - - - - - - - -
// Загрузка ядра и всех его составляющих
// - - - - - - - - - - - - - - - - - - -


// Создаём скрипт запуска ядра (снизу удобнее редактировать загрузку)
async function wafleStart(pageFunc) {
	return new Promise(async function (resolve, reject) {
		// #--  --  --  --  --  --#

		// Подгружаем ядро
		await loadScript("/core/main.js", true); // Загрузка ядра
		window.wafle = new WafleCore(); // Инициализация ядра
		await loadScript("/core/options.js", true); // Загрузка настроек ядра

		// Загружаем дополнительный функционал ядра
		await loadScript("/appends/logger.js", true); // Логгер - wafle.say()
		await loadScript("/appends/load_funcs.js", true); // Функции загрузки
		await loadScript("/appends/module_loader.js", true); // Загрузчик пользовательских модулей


		// #--  --  --  --  --  --#
		// Конец инициализации, всё готово
		wafle.say("Движок Wafle успешно загружен! :)", "nice");

		pageFunc();

		resolve(true);
	});
}