

// Добавление настроек в ядро
wafle.options = {

	// [logger.js] - Все выводы wafle.log() будут показываться	
	consolePrint: true,

	// [load_funcs.js] - Все загрузки по типу loadCSS() не будут кэшировать файлы
	disableCacheLinks: true,

	// [module_loader.js] - Папка с модулями
	modulesDir: "/user_modules/"

};