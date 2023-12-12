
/* #= = =# BASE INFO #= = =#

	:: WAFLE Engine - запускной файл
	:: Создатель: Bloodacote

	:: Файл, который запускает ядро и
	заставляет работать все системы

#= = =# BASE INFO #= = =# */


// - - - - - - - - - - - -
// Функция для загрузки JS-скриптов из движка
async function loadScript(url) {
	return new Promise(function (resolve, reject) {

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
		await loadScript("/_wafle/core/main.js"); // Загрузка ядра
		window.wafle = new WafleCore(); // Инициализация ядра

		// Загружаем дополнительный функционал ядра
		await loadScript("/_wafle/appends/logger.js"); // Логгер - wafle.say()
		await loadScript("/_wafle/appends/load_funcs.js"); // Функции загрузки
		await loadScript("/_wafle/appends/module_loader.js"); // Загрузчик пользовательских модулей


		// #--  --  --  --  --  --#
		// Конец инициализации, всё готово
		wafle.say("Движок Wafle успешно загружен! :)", "nice");

		pageFunc();

		resolve(true);
	});
}