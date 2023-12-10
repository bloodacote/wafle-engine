
/* #= = =# BASE INFO #= = =#

	:: WAFLE Engine - запускной файл
	:: Создатель: Bloodacote

	:: Файл, который запускает ядро и
	заставляет работать все системы

#= = =# BASE INFO #= = =# */


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

// Инициализация ядра
var wafle = new WafleCore();

if (wafle.options.consolePrint == true) {
	console.log("[WAFLE LOADED]");
}