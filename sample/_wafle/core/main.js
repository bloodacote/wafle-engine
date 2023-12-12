

// - - - - - - - - - - - -
// Основное ядро движка
class WafleCore {
	constructor() {

		// Базовые данные
		this.version = "alpha";
		this.creator = "Bloodacote";
		this.options = {};

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