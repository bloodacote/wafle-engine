

// Добавление настроек в ядро
wafle.options = {


	// - - - - - - - - - - - - -
	// [appends/logger.js]

	consolePrint: true, // Все выводы wafle.log() будут показываться
	loggerTypes: { // Список статусов логгера
		log: {
			badge: "[?]",
			color: "#cf9458"
		},
		error: {
			badge: "[x]",
			color: "#ff4141"
		},
		warn: {
			badge: "[!]",
			color: "#d9e532"
		},
		nice: {
			badge: "[v]",
			color: "#6bff53"
		}
	},
			

	// - - - - - - - - - - - - -
	// [appends/load_funcs.js]

	disableCacheLinks: true // Все загрузки по типу loadCSS() не будут кэшировать файлы



};