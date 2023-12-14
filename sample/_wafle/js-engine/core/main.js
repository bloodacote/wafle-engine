
// - - - - - - - - - - - -
// Основное ядро движка
class WafleCore {
	constructor() {
		this.version = "alpha";
		this.creator = "Bloodacote";
		this.options = {

			// [logger.js] - Все выводы wafle.log() будут показываться	
			consolePrint: true,

			// [load_funcs.js] - Все загрузки по типу loadCSS() не будут кэшировать файлы
			disableCacheLinks: true
		};
	}
}


// Запускаем ядро
window.wafle = new WafleCore();