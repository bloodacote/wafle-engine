
/*-------# BASE INFO #-----#

	:: WAFLE Engine - запускной файл
	:: Создатель: Bloodacote

	:: Файл, который запускает ядро и
	заставляет работать все системы

#-------------------------*/


// - - - - - - - - - - - -
// Функция для получения пути скрипта
function getScriptPath() {

	var path = document.currentScript.src;
	var pathParts = path.split("/");

	pathParts = pathParts.slice(0, -1); // Отрезаем последний элемент

	path = pathParts.join("/");

	return path;
}


// Установка корневой папки движка
const waflePath = getScriptPath();