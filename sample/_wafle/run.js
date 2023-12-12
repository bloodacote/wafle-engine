
/* #= = =# BASE INFO #= = =#

	:: WAFLE Engine - запускной файл
	:: Создатель: Bloodacote

	:: Файл, который запускает ядро и
	заставляет работать все системы

#= = =# BASE INFO #= = =# */


// - - - - - - - - - - - -
// Основное ядро движка
class WafleCore {
	constructor() {

		// Базовые данные
		this.version = "alpha";
		this.creator = "Bloodacote";

		this.options = { // Настройки

			// Все выводы wafle.log() будут показываться
			consolePrint: true,

			// Все загрузки по типу loadCSS() и тд. буду иметь метку ?t=1234, сбивая кэширование файлов
			disableCacheLinks: true

		};

	}


	// Здесь будет загрузка ядра
	load() {
		console.warn("[WAFLE] Скрипт загрузки ядра не инициализирован!");
	}


	// Загрузка ядра И ПОСЛЕ запускается любой код
	async start(pageFunc) {
		await this.load();
		pageFunc();
	}


	// Стилизованный вывод в консоль
	log(text) {
		if (this.options.consolePrint == true) {
			console.log( "%c" + text, `
				background-color: #251b11;
				border-left: 2px solid #cf9458;
				border-radius: 0px 3px 3px 0px;

				padding: 3px 5px;
				padding-left: 8px;
				margin: 0;

				color: #cf9458;
				font-size: 12pt;
			`);
		}
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


// Создаём скрипт запуска ядра (снизу удобнее редактировать загрузку)
wafle.load = async function() {
	return new Promise(async function (resolve, reject) {
		// #--  --  --  --  --  --#


		// Загружаем необходимый функционал из ядра
		await loadScript("/_wafle/core/load_funcs.js"); // Функции загрузки



		// #--  --  --  --  --  --#
		// Конец инициализации, всё готово
		wafle.log("Ядро Wafle загружено! :)");
		resolve(true);
	});
}