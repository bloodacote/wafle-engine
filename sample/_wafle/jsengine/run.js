
/*-------# BASE INFO #-----#

	:: WAFLE Engine - запускной файл
	:: Создатель: Bloodacote

	:: Файл, который запускает ядро и
	заставляет работать все системы

#-------------------------*/


// - - - - - - - - - - - -
// Функция для получения пути скрипта
function getScriptPath() {

	var path = document.currentScript.src;
	var pathParts = path.split("/");

	pathParts = pathParts.slice(0, -1); // Отрезаем последний элемент

	path = pathParts.join("/");

	return path;
}


// Установка корневой папки движка
const waflePath = getScriptPath();


// - - - - - - - - - - - -
// Функция для загрузки JS-скриптов из движка
async function loadScript(url, isInternal = false) {
	return new Promise(function (resolve, reject) {

		if (isInternal) {
			url = waflePath + url;
		}

		var elemScript = document.createElement("script");
		elemScript.src = url;

		elemScript.onload = function () {
			resolve(true);
		}

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

		await loadScript("/core/main.js", true);
		window.wafle = new WafleCore();

		await loadScript("/core/options.js", true);

		await loadScript("/appends/logger.js", true);
		await loadScript("/appends/load_funcs.js", true);
		//await loadScript("/appends/module_loader.js", true);


		// #--  --  --  --  --  --#
		wafle.say("Движок Wafle успешно загружен! :)", "nice");
		pageFunc();
		resolve(true);
	});
}