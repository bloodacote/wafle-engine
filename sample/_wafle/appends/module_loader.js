

// - - - - - - - - - - - -
// Расширение ядра


wafle.modules = {};
wafle.modules.dir = waflePath + wafle.options.modulesDir;
wafle.modules.list = [];

wafle.modules.check = async function(moduleName) {

	//TODO - Пока нифига нет

}

wafle.modules.install = async function(moduleName) {

	// Загрузка информации о модуле
	const modulePath = wafle.modules.dir + moduleName;
	const moduleInfo = await wafle.loadJSON(modulePath + "/info.json");

	// Запуск модуля
	const moduleRunnerPath = modulePath + "/" + moduleInfo.scriptRunner;
	await loadScript(moduleRunnerPath);

	console.log(moduleInfo);
	wafle.say(`Модуль "${moduleName}" установлен`, "log");

}


wafle.modules.install("test_module");


// - - - - - - - - - - - - - - - - -
wafle.say("Менеджер модулей активирован", "log");
// - - - - - - - - - - - - - - - - -