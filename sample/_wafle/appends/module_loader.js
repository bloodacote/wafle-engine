

// - - - - - - - - - - - -
// Расширение ядра


// Добавление переменных
wafle.modules = {};
wafle.modules.list = [];

// Функция проверки модуля
wafle.modules.check = async function(moduleName) {
	try {
		resolve(true);

	} catch (err) {
		resolve(false);
	}
}

// Функция загрузки модуля
wafle.modules.install = async function(moduleName) {

}





// - - - - - - - - - - - - - - - - -
wafle.say("Менеджер модулей активирован", "log");
// - - - - - - - - - - - - - - - - -