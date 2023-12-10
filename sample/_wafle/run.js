
/* #= = =# BASE INFO #= = =#

	:: WAFLE Engine - запускной файл
	:: Создатель: Bloodacote

	:: Файл, который запускает ядро и
	заставляет работать все системы

#= = =# BASE INFO #= = =# */


// - - - - - - - - - - - -
// Ядро
class WafleCore {
	constructor() {

		// Базовые данные
		this.version = "alpha";
		this.creator = "Bloodacote";
		this.options = {
			consolePrint: true
		};

	}
}


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


// - - - - - - - - - - - -
// Инициализация ядра
var wafle = new WafleCore();

if (wafle.options.consolePrint == true) {
	console.log("[WAFLE LOADED]");
}

loadScript("/_wafle/sample.js");