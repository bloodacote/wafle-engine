
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

	// Здесь будет загрузка ядра
	load() {
		console.warn("[WAFLE] Скрипт загрузки ядра не инициализирован!");
	}

	// Загрузка ядра И ПОСЛЕ запускается любой код
	async start(pageFunc) {
		await this.load();
		pageFunc();
	}
}


// Запускаем ядро
window.wafle = new WafleCore();