

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
}